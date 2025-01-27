import { Notice, requestUrl } from "obsidian";
import SummanyPlugin from '../main';
export async function checkOpenAIConfig(plugin: SummanyPlugin) {
    const { baseUrl, apiKey } = plugin.settings;
    if (!apiKey) {
        new Notice('OpenAi API Key is not set!');
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
        console.log(error);
        new Notice(`Request failed. Error: ${error}`);
    }
}