## hugo-copilot
This is a plug-in specially designed for Hugo users, which aims to help Hugo users complete blog creation smoothly.
The functions provided are:
1. Generate an article summary
2. Extract slug
3. One-click to raise or lower the title level
4. Support one-click translation

## How It Works
- The main logic is implemented in the SummanyPlugin class from main.ts.
- Plugin settings, such as baseUrl, apiKey, model, and customPrompt, are configured via the SummanySettingTab class in SettingTab.ts.

## Installation
Copy main.js, manifest.json, and styles.css to your Vault’s .obsidian/plugins/hugo-copilot folder.
Enable the Summany Plugin from Obsidian’s settings.
### Usage
Open a Markdown note.
Run the “Generate Summary” command from the command palette to generate a summary.
The plugin updates your frontmatter with the summary.
### Settings
Go to “Summany Plugin” in Obsidian’s settings to specify:
1. Base URL for requests
1. API key for authentication
1. Model names
1. A custom prompt for generating summaries

Enjoy summarizing your notes efficiently!