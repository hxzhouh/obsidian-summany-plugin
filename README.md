## Summany Plugin
This is an Obsidian plugin that generates concise summaries for your notes using OpenAI-like interfaces.
It reads the content from the active Markdown editor and automatically adds the summary under the Summany key in the frontmatter.

## How It Works
• The main logic is implemented in the SummanyPlugin class from main.ts.
• Plugin settings, such as baseUrl, apiKey, model, and customPrompt, are configured via the SummanySettingTab class in SettingTab.ts.

## Installation
Copy main.js, manifest.json, and styles.css to your Vault’s .obsidian/plugins/summany-plugin folder.
Enable the Summany Plugin from Obsidian’s settings.
Usage
Open a Markdown note.
Run the “Generate Summary” command from the command palette to generate a summary.
The plugin updates your frontmatter with the summary.
Settings
Go to “Summany Plugin” in Obsidian’s settings to specify:
• Base URL for requests
• API key for authentication
• Model names
• A custom prompt for generating summaries

Enjoy summarizing your notes efficiently!