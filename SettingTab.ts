import { App,  PluginSettingTab,  Setting } from 'obsidian';
import SummanyPlugin from './main';
import { checkOpenAIConfig } from './OpenAi';  
import { checkGeminiConfigBySdk } from './gemini'; 
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
            .setName('Gemini API Key')
            .setDesc('')
            .addText(text =>
                text.setPlaceholder('Gemini API Key') .setPlaceholder('https://aistudio.google.com/app/apikey')
                    .setValue(this.plugin.settings.geminiApiKey).onChange(async (value) => {
                        this.plugin.settings.geminiApiKey = value;
                        await this.plugin.saveSettings();
                    })
                )
                .addButton(button => {
                    button.setButtonText('Check')
                      .onClick(async () => {
                        await checkGeminiConfigBySdk(this.plugin);
                      });
                  });
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
                        await checkOpenAIConfig(this.plugin); // 触发检查
                    })
            );
    }

}
export {};