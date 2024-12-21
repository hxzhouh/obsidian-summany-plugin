import { App, Notice, PluginSettingTab, requestUrl, Setting } from 'obsidian';
import SummanyPlugin from './main';

export class SummanySettingTab extends PluginSettingTab {
    plugin: SummanyPlugin;

    constructor(app: App, plugin: SummanyPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        new Setting(containerEl)
            .setName('Base URL(Optional)')
            .setDesc('For 3rd party OpenAI Format endpoints only. Leave blank for other providers')
            .addText(text => 
                text
                    .setPlaceholder('https://api.example.com/v1')
                    .setValue(this.plugin.settings.baseUrl)
                    .onChange(async (value) => {
                        this.plugin.settings.baseUrl = value;
                        await this.plugin.saveSettings();
                    })
            );
        new Setting(containerEl)
            .setName('API Key(Required)')
            .setDesc('API key for the 3rd party provider')
            .addText(text => 
                text
                    .setPlaceholder('sk-xxxxxxxxxxxxxxxxxxxxxxxx')
                    .setValue(this.plugin.settings.apiKey)
                    .onChange(async (value) => {
                        this.plugin.settings.apiKey = value;
                        await this.plugin.saveSettings();
                    })
            );
        new Setting(containerEl)
            .setName('Models (Required)')
            .setDesc('Comma-separated list of models, default use gpt-4o-mini')
            .addTextArea(text => 
            text
                .setPlaceholder('model1,model2,model3')
                .setValue(this.plugin.settings.model.join(','))
                .onChange(async (value) => {
                this.plugin.settings.model = value.split(',').map(model => model.trim());
                await this.plugin.saveSettings();
                })
            );
            new Setting(containerEl)
                .setName('Custom Prompt(Optional)')
                .setDesc('Custom prompt to be used for generating summaries\n <b>Default:</b> Please summarize the following article into a paragraph of no more than 150 words, highlighting the main points and making it concise and easy to understand.')
                .addTextArea(text => 
                text
                    .setPlaceholder('Enter your custom prompt here...')
                    .setValue(this.plugin.settings.customPrompt)
                    .onChange(async (value) => {
                    this.plugin.settings.customPrompt = value;
                    await this.plugin.saveSettings();
                    })
                );
        new Setting(containerEl)
            .setName('Check')
            .setDesc('Click to validate your API key and base URL by sending a request.')
            .addButton((btn) =>
                btn
                    .setButtonText('Check')
                    .setCta()
                    .onClick(async () => {
                        await this.checkOpenAIConfig(); // 触发检查
                    })
            );
    }
    async checkOpenAIConfig() {
        const { baseUrl, apiKey } = this.plugin.settings;
        if (!apiKey) {
            new Notice('API Key is not set!');
            return;
        }

        // 如果未设置 Base URL，可以使用默认 OpenAI Endpoint
        let finalUrl = baseUrl || 'https://api.openai.com/';
        finalUrl=finalUrl+"/v1/models";

        try {
            const result = await requestUrl({
                url: finalUrl,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${apiKey}`
                }
            });
            if (result.status === 200) {
                new Notice('Success! Your configuration is valid.');
            } else {
                new Notice(`Request failed with status: ${result.status}`);
            }
        } catch (error) {
            new Notice(`Request failed. Error: ${error}`);
        }
    }
}
export {};