import { App,  
    PluginSettingTab,  
    Setting,
    sanitizeHTMLToDom 
} from 'obsidian';
import SummanyPlugin from '../main';
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
            new Setting(containerEl)
			.setName("Site URL")
			.setDesc(
				"The URL of your Ghost site. Make sure to include https:// at the beginning"
			)
			.addText((text) =>
				text
					.setPlaceholder("https://ghost.org")
					.setValue(this.plugin.settings.ghostUrl)
					.onChange(async (value) => {
						this.plugin.settings.ghostUrl = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Access Token")
			.setDesc("Your Staff Access Token or Admin API Key:")
			.addText((text) =>
				text
					.setPlaceholder("6251555c94ca6")
					.setValue(this.plugin.settings.ghostApiKey)
					.onChange(async (value) => {
						this.plugin.settings.ghostApiKey = value;
						await this.plugin.saveSettings();
					})
			);
    }
}
export {};