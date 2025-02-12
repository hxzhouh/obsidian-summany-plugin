import { App,  
    Notice,  
    PluginSettingTab,  
    Setting,
    sanitizeHTMLToDom 
} from 'obsidian';
import SummanyPlugin from '../main';
import { CheckConfig } from './Copilot';
export class SummanySettingTab extends PluginSettingTab {
    plugin: SummanyPlugin;

    constructor(app: App, plugin: SummanyPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Dev.to config' });
        new Setting(containerEl)
        .setName('DEV Community API Keys.(https://dev.to/settings/extensions)')
        .setDesc(
            sanitizeHTMLToDom(
              "<b>Security warning!</b><br />This will be stored unencrypted in your obsidian plugin folder. Do not use this plugin if you do not fully understand the security implications of this.",
            ),
          )
          .addText((text) =>
            text
              .setPlaceholder("Enter your secret")
              .setValue(this.plugin.settings.devToApiKey)
              .onChange(async (value) => {
                this.plugin.settings.devToApiKey = value;
                await this.plugin.saveSettings();
              }),
          );        
        new Setting(containerEl)
        .setName('LLM Provider')
        .setDesc('Select which LLM provider to use')
        .addDropdown(dropdown => dropdown
          .addOptions({
            'openai': 'OpenAI',
            'gemini': 'Google Gemini',
            "deepSeek": "DeepSeek",
          })
          .setValue(this.plugin.settings.llmType)
          .onChange(async (value: string) => {
            this.plugin.settings.llmType = value;
            await this.plugin.saveSettings();
          })
        ).addButton((btn) =>
            btn.setButtonText('Check')
                .setCta()
                .onClick(async () => {
                    if (await CheckConfig(this.plugin)) {// 触发检查
                        new Notice('Success! Your configuration is valid.');
                    }else {
                        new Notice('Failed! Your configuration is invalid.');
                    }
                })
        );
        containerEl.createEl('h2', { text: 'OpenAi config'});
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
                    .setValue(this.plugin.settings.opanAiApiKey)
                    .onChange(async (value) => {
                        this.plugin.settings.opanAiApiKey = value;
                        await this.plugin.saveSettings();
                    })
            );
        new Setting(containerEl)
            .setName('Models (Required)')
            .setDesc('Comma-separated list of models, default use gpt-4o-mini')
            .addTextArea(text => 
            text
                .setPlaceholder('model1,model2,model3')
                .setValue(this.plugin.settings.openAiModel.join(','))
                .onChange(async (value) => {
                this.plugin.settings.openAiModel = value.split(',').map(model => model.trim());
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
        containerEl.createEl('h2', { text: 'Google Gemini config' });
        new Setting(containerEl)
        .setName('Gemini API Key')
        .setDesc('')
        .addText(text =>
            text.setPlaceholder('https://aistudio.google.com/app/apikey')
                .setValue(this.plugin.settings.geminiApiKey).onChange(async (value) => {
                    this.plugin.settings.geminiApiKey = value;
                    await this.plugin.saveSettings();
                })
        )
        new Setting(containerEl).setName('Gemini URL').setDesc('Gemini API URL')
        .addText(text => 
            text
            .setPlaceholder('https://generativelanguage.googleapis.com')
            .setValue(this.plugin.settings.geminiApiUrl)
            .onChange(async (value) => {
            this.plugin.settings.geminiApiUrl = value})
        );
        new Setting(containerEl).setName('Models').setDesc('Comma-separated list of models')
        .addTextArea(text => 
            text
            .setPlaceholder('model1,model2,model3')
            .setValue(this.plugin.settings.geminiModel.join(','))
            .onChange(async (value) => {
            this.plugin.settings.geminiModel = value.split(',').map(model => model.trim())
        }));
        containerEl.createEl('h2', { text: 'DeepSeek config' });
        new Setting(containerEl).setName('DeepSeek').setDesc('DeepSeek API Key')
        .addText(text => 
            text
            .setPlaceholder('DeepSeek API Key')
            .setValue(this.plugin.settings.deepSeekApiKey)
            .onChange(async (value) => {
            this.plugin.settings.deepSeekApiKey = value})
        );
        new Setting(containerEl).setName('DeepSeek URL').setDesc('DeepSeek API URL')
        .addText(text => 
            text
            .setPlaceholder('DeepSeek URL')
            .setValue(this.plugin.settings.deepSeekApiUrl)
            .onChange(async (value) => {
            this.plugin.settings.deepSeekApiUrl = value})
        );
        new Setting(containerEl).setName('Models').setDesc('Comma-separated list of models')
        .addTextArea(text => 
            text
            .setPlaceholder('model1,model2,model3')
            .setValue(this.plugin.settings.deepSeekModel.join(','))
            .onChange(async (value) => {
            this.plugin.settings.deepSeekModel = value.split(',').map(model => model.trim())
        }));
    }
}
export {};
