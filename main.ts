import { MarkdownView, Notice, Plugin, PluginSettingTab, Setting, parseYaml, requestUrl, stringifyYaml } from 'obsidian';
import { SummanySettingTab } from './SettingTab';
import { GenerateSummany } from './generate';
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
    }

    onunload() {
        // Any cleanup logic when the plugin is disabled
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