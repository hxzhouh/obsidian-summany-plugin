import { MarkdownView, MetadataCache, Notice, Plugin, PluginSettingTab, Setting, TFile, parseYaml, requestUrl, stringifyYaml } from 'obsidian';
import { SummanySettingTab } from './src/SettingTab';
import { GenerateSummany } from './src/generate';
import { GenerateTranslate } from './src/generate';
// Remember to rename these classes and interfaces!

interface SummanyPluginSettings {
	devToApiKey: string;
    baseUrl: string;
	apiKey: string;
	model:string[];
	customPrompt: string;
	geminiApiKey: string;
}

const DEFAULT_SETTINGS: SummanyPluginSettings = {
	devToApiKey: '',
    baseUrl: '',
	apiKey: '',
	model: [],
	customPrompt: 'Please summarize the following article into a paragraph of no more than 150 words, highlighting the main points and making it concise and easy to understand.',
	geminiApiKey: '',
};

const chineseFooter = (slug: string) => `\n---\n
- [本文长期连接](${slug})
- 如果您觉得我的博客对你有帮助，请通过 [RSS](https://huizhou92.com/index.xml)订阅我。
- 或者在[X](https://x.com/@piaopiaopig)上关注我。
- 如果您有[Medium](https://medium.huizhou92.com/)账号，能给我个关注嘛？我的文章第一时间都会发布在Medium。`;

const englishFooter = (slug: string) => `\n---\n
- [Long Time Link](${slug})
- If you find my blog helpful, please subscribe to me via [RSS](https://huizhou92.com/index.xml)
- Or follow me on [X](https://x.com/@piaopiaopig)
-  If you have a [Medium](https://medium.huizhou92.com/) account, follow me there. My articles will be published there as soon as possible.`

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
		 // 获取当前活动的文件
		 const activeFile = this.app.workspace.getActiveFile();
		 if (!activeFile) {
			 // 如果没有活动文件，返回
			 return;
		 }
	 
		 // 获取当前文件所在的目录路径
		 const currentFolder = activeFile.parent?.path || "";
		 
		 // 生成新文件名 (例如：原文件名-translated.md)
		 const newFileName = `${activeFile.basename}-translated.md`;
		 const newFilePath = `${currentFolder}/${newFileName}`;
		 const editorContent=this.readLoaclFile();
		 console.log(editorContent);
		 try {
			 // 创建新文件
			 await this.app.vault.create(
				 newFilePath,
				 await editorContent || "",
			 );
		 } catch (error) {
			 console.error("创建文件失败:", error);
		 }
	}

	async readLoaclFile() {
		// 获取当前活动的文件
		const activeFile = this.app.workspace.getActiveFile();
		if (!activeFile) {
			return;
		}
	
		// 从编辑器获取内容
		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
		const editorContent = activeView?.editor.getValue();
		
		  // 移除YAML frontmatter
		  if (editorContent) {
			  const processedContent = editorContent.replace(/^---\n([\s\S]*?)\n---\n/, '');
			  if (processedContent){
				const translateContent =await GenerateTranslate(this,processedContent);
				return translateContent;
			  }else{
				  new Notice("没有内容");
				  return "";
			  }
		  } else {
			  new Notice("没有内容");
			  return "";
		  }
	}
    async addSummany() {
		const activeLeaf = this.app.workspace.activeLeaf;
		if (!activeLeaf) return;
		const view = activeLeaf.view;
		if (!(view instanceof MarkdownView)) return;
	
		const editor = view.editor;
		const content = editor.getValue();

		let summary = '';
		summary = await GenerateSummany(this, content);
		if (!summary) {
			new Notice('No summary generated!');
			return;
		}
		 // 4. 更新 frontmatter
		 const yamlRegex = /^---\n([\s\S]*?)\n---/;
		 const match = content.match(yamlRegex);
		 if (match) {
			 const parsed = parseYaml(match[1]) || {};
			 parsed.description = summary;
			 const newFrontmatter = `---\n${stringifyYaml(parsed)}---`;
			 editor.setValue(content.replace(yamlRegex, newFrontmatter));
		 } else {
			 const newFrontmatter = `---\description: ${summary}\n---\n${content}`;
			 editor.setValue(newFrontmatter);
		 }
		 new Notice('Summany Generated!');
	}
	async changeHeadingLevel(change: number) {
		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (!activeView) {
			new Notice('No active markdown view');
			return;
		}
		const editor = activeView.editor;
		const content = editor.getValue();
		const lines = content.split('\n');
		const updatedLines = lines.map(line => {
			if (line.startsWith('#')) {
				if (change > 0 && line.startsWith('######')) {
					return line; // 如果已经是最高级别，则不做任何改变
				}
				if (change < 0 && !line.startsWith('# ')) {
					return line; // 如果已经是最低级别，则不做任何改变
				}
				return change > 0 ? '#' + line : line.replace(/^#/, '');
			}
			return line;
		});
		editor.setValue(updatedLines.join('\n'));
		new Notice('Heading levels updated!');
	}
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}
	async saveSettings() {
		await this.saveData(this.settings);
	}
}
