import { MarkdownView, Notice, Plugin, TFile, parseYaml, stringifyYaml } from 'obsidian';
import { SummanySettingTab } from './src/SettingTab';
import GenerateSummary, { GetLlmConfigByType,GenerateTranslate, Copilot } from './src/Copilot';
import { LLMFactory } from './src/llm/LLMFactory';
import { SummanyPluginSettings,DEFAULT_SETTINGS,chineseFooter,englishFooter } from 'src/config';
import { FileUtils } from './src/utils/FileUtils';

// Remember to rename these classes and interfaces!

async function saveFileContent(file: TFile, content: string) {
	const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
	if (!activeView) {
		new Notice('No active markdown view');
		return;
	}
	activeView.editor.setValue(content);
}

async function getActiveFileContent() {
	const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
	if (!activeView) {
		new Notice('No active markdown view');
		return null;
	}
	return activeView.editor.getValue();
}

async function updateFrontmatter(content: string, frontmatter: any) {
	const yamlRegex = /^---\n([\s\S]*?)\n---/;
	const newFrontmatter = `---\n${stringifyYaml(frontmatter)}---`;
	return content.replace(yamlRegex, newFrontmatter);
}

export default class SummanyPlugin extends Plugin {
	settings: SummanyPluginSettings;
	private fileUtils: FileUtils;

	async onload() {

		await this.loadSettings();

		const llmProvider = LLMFactory.createLLM(this.settings.llmType, GetLlmConfigByType(this));
		const copilot = new Copilot(llmProvider);

		this.addSettingTab(new SummanySettingTab(this.app, this));
		this.fileUtils = new FileUtils(this.app);
		this.addCommand({
			id: 'create image',
			name: 'create image',

			callback:async () => {
				const response= copilot.CreateImage('title','logo');
				console.log(response);
			}
		});
        this.addCommand({
            id: 'summary by ai',
            name: 'Generate Summary',
            callback: () => this.addSummany(),
        });
		this.addCommand({
			id: 'translate by Ai',
			name: 'translate by Ai',
			callback: () => this.translateByAi(),
		})
		this.addCommand({
			id: 'rewrite by Ai',
			name: 'rewrite by Ai',
			callback: async () => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (!activeView) {
					new Notice('No active markdown view');
					return;
				}
				if (!activeView.file) {
					new Notice('No active file');
					console.log('No active file');
					return;
				}
				let isZhCN = activeView.file.path.includes('zh-cn');
				const content = activeView.editor.getValue();
				let result : string;
				let fileName : string;	
				const currentFolder = activeView.file!.parent?.path || "";
				if (isZhCN) {
					fileName = `${currentFolder}/${activeView.file!.basename.replace('zh-cn','')}.md`;
					result = await copilot.GenerateRewrite(content, { 
						language: 'US English',
						tone: 'formal',
					});
				} else {
					fileName = `${currentFolder}/${activeView.file!.basename}.zh-cn.md`;
					result = await copilot.GenerateRewrite(content, {
						language: 'Chinese',
						tone: 'formal',
					});
				}
				await this.createNewFile(fileName,result);
			},
		})
		this.addCommand({
			id: 'generate-slug',
			name: 'Generate Slug',
			callback: async () => {
				let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (!activeView) {
					new Notice('No active markdown view');
					return;
				}
				if (!activeView.file) {
					new Notice('No active file');
					console.log('No active file');
					return;
				}
				let isZhCN = activeView.file.path.includes('zh-cn');
			  //在这里判断文件名是否包含 zh-cn
			  const metadataCache = this.app.metadataCache.getFileCache(activeView.file);
	
			  const title = metadataCache?.frontmatter?.["title"]
			  var footer = "";
			  let slug = await this.generateSlug(title);
			  if (metadataCache && metadataCache.frontmatter) {
				  const frontmatter = metadataCache.frontmatter;
				  if (isZhCN) {
					// 如果是中文，转成 url编码
					slug = encodeURIComponent(slug);
					frontmatter["slug"] = slug;
					frontmatter["long_time_url"] = `https://www.huizhou92.com/zh-cn/p/${slug}/`;
					footer = chineseFooter(`https://huizhou92.com/zh-cn/p/${slug}/`);
				  } else {
					frontmatter["slug"] = slug;
					frontmatter["long_time_url"] = `https://www.huizhou92.com/p/${slug}/`;
					footer = englishFooter(`https://huizhou92.com/p/${slug}/`);
				  }
				  // 将 footer 添加到文件的最后面
				  const content = activeView.editor.getValue();
				  const newContent = `${content}\n${footer}`;
				  activeView.editor.setValue(newContent);
				  const yamlRegex = /^---\n([\s\S]*?)\n---/;
				  const newFrontmatter = `---\n${stringifyYaml(frontmatter)}---`;
				  activeView.editor.setValue(newContent.replace(yamlRegex, newFrontmatter));
			  } else {
				  new Notice('Metadata or frontmatter is null or undefined');
			  }
			},
			});
			this.addCommand({
				id: 'increase-heading-level',
				name: 'Increase Heading Level',
				callback: () => this.changeHeadingLevel(1),
			});
			this.addCommand({
				id: 'decrease-heading-level',
				name: 'Decrease Heading Level',
				callback: () => this.changeHeadingLevel(-1),
			});
    }
    onunload() {
        // Any cleanup logic when the plugin is disabled
    }
	
	async generateSlug(title: string) {
		return title
			.toLowerCase() // 将字符串转换为小写
			.replace(/[\s]+/g, '-') // 将空格替换为短横线
			.replace(/[^\w\u4e00-\u9fa5\-]/g, '') // 移除特殊字符，保留字母、数字、汉字和短横线
			.replace(/-+/g, '-'); // 将连续的短横线替换为单个短横线
	}
	async createNewFile(name: string,content:string) {
		try {
			console.log('createNewFile:', name,"content:",content);
			await this.app.vault.create(name, content || "");
		} catch (error) {
			throw new Error("创建文件失败"+ error);
		}
	}
	async translateByAi() {
		// 将当前文件重命名为 ${activeFile.basename}.zh-cn.md
		const activeFile = this.app.workspace.getActiveFile();
		if (!activeFile) return;
		const fileBaseName: string = activeFile.basename;
		const newFileName = `${activeFile.basename}.zh-cn.md`;
		this.app.fileManager.renameFile(activeFile, newFileName)

		const currentFolder = activeFile.parent?.path || "";
		// const newFileName = `${activeFile.basename}-translated.md`;
		const newFilePath = `${currentFolder}/${fileBaseName}`;
		const editorContent = await this.readLoaclFile();
		await this.createNewFile(newFilePath, editorContent);
	}

	async getFileContent() : Promise<string> {
		const editorContent = await getActiveFileContent.call(this);
		if (!editorContent) return "";

		const processedContent = editorContent.replace(/^---\n([\s\S]*?)\n---\n/, '');
		return processedContent;
	}

	async readLoaclFile() {
		const processedContent = await this.getFileContent();
		if (processedContent) {
			return await GenerateTranslate(this, processedContent);
		} else {
			new Notice("没有内容");
			return "";
		}
	}
    async addSummany() {
		console.log('call addSummany');
		await this.fileUtils.withActiveFile(async ({view, isZhCN}) => {
			const content = view.editor.getValue();
			if (!content) return;
			let summary = await GenerateSummary(
				this, 
				isZhCN ? 'Chinese' : 'American English',
				content
			);
			if (!summary) {
				new Notice('No summary generated!');
				return;
			}
			console.log('summary:', summary);
			interface Summary {
				description: string;
				social: string;
			}

			const obj = JSON.parse(summary) as Summary;	
			const yamlRegex = /^---\n([\s\S]*?)\n---/;
			const match = content.match(yamlRegex);
			if (match) {
				const parsed = parseYaml(match[1]) || {};
				parsed.description = obj.description;
				parsed.social = obj.social;
				const newContent = await updateFrontmatter(content, parsed);
				await saveFileContent.call(this, this.app.workspace.getActiveFile(), newContent);
			} else {
				const newFrontmatter = `---\ndescription: ${obj.description}\nsocial:${obj.social}\n ---\n${content}`;
				
				await saveFileContent.call(this, this.app.workspace.getActiveFile(), newFrontmatter);
			}
			new Notice('Summany Generated!');
		});
	}

	async changeHeadingLevel(change: number) {
		const content = await getActiveFileContent.call(this);
		if (!content) return;

		const lines = content.split('\n');
		const updatedLines = lines.map((line: string) => {
			if (line.startsWith('#')) {
				const headingLevel = line.match(/^#+/)?.[0]?.length ?? 0;
				if (change > 0 && headingLevel >= 6) return line;
				if (change < 0 && headingLevel <= 1) return line;
				return change > 0 ? '#' + line : line.substring(1);
			}
			return line;
		});
		await saveFileContent.call(this, this.app.workspace.getActiveFile(), updatedLines.join('\n'));
		new Notice('Heading levels updated!');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}
	async saveSettings() {
		await this.saveData(this.settings);
	}
}