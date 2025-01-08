import { MarkdownView, Notice, Plugin, PluginSettingTab, Setting, TFile, parseYaml, requestUrl, stringifyYaml } from 'obsidian';
import { SummanySettingTab } from './src/SettingTab';
import { GenerateSummany } from './src/generate';
import { GenerateTranslate } from './src/generate';
// Remember to rename these classes and interfaces!

interface SummanyPluginSettings {
    baseUrl: string;
	apiKey: string;
	model:string[];
	customPrompt: string;
	geminiApiKey: string;
}

const DEFAULT_SETTINGS: SummanyPluginSettings = {
    baseUrl: '',
	apiKey: '',
	model: [],
	customPrompt: 'Please summarize the following article into a paragraph of no more than 150 words, highlighting the main points and making it concise and easy to understand.',
	geminiApiKey: '',
};
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
    }

    onunload() {
        // Any cleanup logic when the plugin is disabled
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
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}
	async saveSettings() {
		await this.saveData(this.settings);
	}
}
