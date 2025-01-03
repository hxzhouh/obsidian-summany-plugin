import { Notice, requestUrl } from "obsidian";
import SummanyPlugin from './main';
const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function checkGeminiConfigBySdk(plugin: SummanyPlugin) {
    const { geminiApiKey } = plugin.settings;
    if (!geminiApiKey) {
        new Notice('Gemini API Key is not set!');
        return;
    }
    console.log(geminiApiKey);
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "Explain how AI works";
    try {
        const result = await model.generateContent(prompt);
        console.log(result);
        if (result.status === 200) {
            new Notice('Success! Your configuration is valid.');
        } else {
            new Notice(`Request failed with status: ${result.status}`);
        }
    } catch (error) {
        console.log(error);
        new Notice(`Request failed. Error: ${error}`);
    }
}
