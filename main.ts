import { MarkdownView, Notice, Plugin, PluginSettingTab, Setting, parseYaml, requestUrl, stringifyYaml } from 'obsidian';
import { SummanySettingTab } from './SettingTab';
// Remember to rename these classes and interfaces!

interface SummanyPluginSettings {

    baseUrl: string;
	apiKey: string;
	model:string[];
	customPrompt: string;
}

const DEFAULT_SETTINGS: SummanyPluginSettings = {
    baseUrl: '',
	apiKey: '',
	model: [],
	customPrompt: 'Please summarize the following article into a paragraph of no more than 150 words, highlighting the main points and making it concise and easy to understand.',
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
	
		// 1. 组装 prompt
		let prompt =  this.settings.customPrompt + " \n check the input content's language, return the same language.only return the summary.\n The content is: \n " + content.trim();

		// let prompt = this.settings.customPrompt + " \n check the input content's language, return the same language. Only return the summary.\n The content is: \n " + content.trim();

		try {
			// 2. 调用 OpenAI 接口
			let url = this.settings.baseUrl || 'https://api.openai.com';
			url=url + '/v1/chat/completions';
			let request = {
				url: url,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.settings.apiKey}`
				},
				body: JSON.stringify({
					model: this.settings.model[0] || 'gpt-4o-mini', // 使用有效模型名称
					messages: [
						{
							role: 'system',
							content: this.settings.customPrompt + "\n Ensure the summary is concise, clear, and in the same language as the input."
						},
						{
							role: 'user',
							content: "The content is: \n" + content.trim()
						}
					],
					temperature: 0.7
				})
			};
			console.log(request);
			const result = await requestUrl(request);
			console.log(result);
			// 3. 解析返回结果
			let summary = '';
			const json = result.json; // 获取 JSON 数据
			const choices = json.choices; // 获取 choices 数组
			if (choices && choices.length > 0) {
				const content = choices[0].message.content; // 提取 content
				console.log("Summary:", content); // 输出摘要
				summary = content;
			} else {
				new Notice('No choices available in the response.');
				console.error("No choices available in the response.");
			}
	
			// 4. 更新 frontmatter
			const yamlRegex = /^---\n([\s\S]*?)\n---/;
			const match = content.match(yamlRegex);
			if (match) {
				const parsed = parseYaml(match[1]) || {};
				parsed.Summany = summary;
				const newFrontmatter = `---\n${stringifyYaml(parsed)}---`;
				editor.setValue(content.replace(yamlRegex, newFrontmatter));
			} else {
				const newFrontmatter = `---\nSummany: ${summary}\n---\n${content}`;
				editor.setValue(newFrontmatter);
			}
			new Notice('Summany Generated!');
		} catch (error) {
			new Notice(`Error: ${error}`);
			console.error(error);
		}
	}
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}
	async saveSettings() {
		await this.saveData(this.settings);
	}
}