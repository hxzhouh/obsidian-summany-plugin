import { MarkdownView, MetadataCache, Notice, Plugin, PluginSettingTab, Setting, TFile, parseYaml, requestUrl, stringifyYaml } from 'obsidian';
import { SummanySettingTab } from './src/SettingTab';
import { GenerateSummany } from './src/Copilot';
import { GenerateTranslate } from './src/Copilot';
import { publishPost } from './src/ghost_publish';
import { LLMFactory } from './src/llm/LLMFactory';
// Remember to rename these classes and interfaces!

interface SummanyPluginSettings {
	devToApiKey: string;
	llmType: string;
    baseUrl: string;
	apiKey: string;
	model:string[];
	customPrompt: string;
	geminiApiKey: string;
	ghostUrl: string;
	ghostApiKey: string;
}

const DEFAULT_SETTINGS: SummanyPluginSettings = {
	llmType: '',
	devToApiKey: '',
    baseUrl: '',
	apiKey: '',
	model: [],
	customPrompt: 'Please summarize the following article into a paragraph of no more than 150 words, highlighting the main points and making it concise and easy to understand.',
	geminiApiKey: '',
	ghostUrl: '',
	ghostApiKey: '',
};



const chineseFooter = (slug: string) => `\n---\n
- [本文长期链接](${slug})
- 如果您觉得我的博客对你有帮助，请通过 [RSS](https://huizhou92.com/index.xml)订阅我。
- 或者在[X](https://x.com/@piaopiaopig)上关注我。
- 如果您有[Medium](https://medium.huizhou92.com/)账号，能给我个关注嘛？我的文章第一时间都会发布在Medium。`;

const englishFooter = (slug: string) => `\n---\n
- [Long Time Link](${slug})
- If you find my blog helpful, please subscribe to me via [RSS](https://huizhou92.com/index.xml)
- Or follow me on [X](https://x.com/@piaopiaopig)
-  If you have a [Medium](https://medium.huizhou92.com/) account, follow me there. My articles will be published there as soon as possible.`

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

    async onload() {
		await this.loadSettings();
		this.addSettingTab(new SummanySettingTab(this.app, this));
        this.addCommand({
            id: 'summary by openai',
            name: 'Generate Summary',
            callback: () => this.addSummany(),
        });
		this.addCommand({
			id: 'translate by Ai',
			name: 'translate by Ai',
			callback: () => this.translateByAi(),
		})
		this.addCommand({
			id: 'generate-slug',
			name: 'Generate Slug',
			callback: async () => {
		
			  const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
			  if (!activeView) {
				new Notice('No active markdown view');
				return;
			  }
			  if (!activeView.file) {
				new Notice('No active file');
				return;
			  }
			  //在这里判断文件名是否包含 zh-cn
			  const isZhCN = activeView.file.path.includes('zh-cn');

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
			this.addCommand({
				id: 'publish to ghost',
				name: 'Publish to Ghost',
				callback: () => {
					const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
					if (!activeView) {
						new Notice('No active markdown view');
						return;
					}
					publishPost(this, activeView);
				}
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

		try {
			await this.app.vault.create(newFilePath, editorContent || "");
		} catch (error) {
			console.error("创建文件失败:", error);
		}
	}

	async readLoaclFile() {
		const editorContent = await getActiveFileContent.call(this);
		if (!editorContent) return "";

		const processedContent = editorContent.replace(/^---\n([\s\S]*?)\n---\n/, '');
		if (processedContent) {
			return await GenerateTranslate(this, processedContent);
		} else {
			new Notice("没有内容");
			return "";
		}
	}

    async addSummany() {
		const content = await getActiveFileContent.call(this);
		if (!content) return;

		let summary = await GenerateSummany(this, content);
		if (!summary) {
			new Notice('No summary generated!');
			return;
		}
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
