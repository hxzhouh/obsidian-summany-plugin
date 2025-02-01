import SummanyPlugin from "main";
import { Notice, requestUrl } from "obsidian";
import { LLMFactory } from "./llm/LLMFactory";

const translatePrompt = `You are a professional English translator...`;

interface OpenAIRequest {
    prompt: string;
    content: string;
    model?: string;
}

async function callOpenAI(plugin: SummanyPlugin, request: OpenAIRequest): Promise<string> {
    try {
        const url = (plugin.settings.baseUrl || 'https://api.openai.com') + '/v1/chat/completions';
        const response = await requestUrl({
            url: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${plugin.settings.apiKey}`
            },
            body: JSON.stringify({
                model: request.model || plugin.settings.model[0] || 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: request.prompt
                    },
                    {
                        role: 'user',
                        content: request.content.trim()
                    }
                ],
                temperature: 0.7
            })
        });

        const choices = response.json.choices;
        if (choices && choices.length > 0) {
            return choices[0].message.content;
        }
        throw new Error('No choices available in the response.');
    } catch (error) {
        new Notice(`Error: ${error}`);
        console.error(error);
        return '';
    }
}
export async function GenerateTranslate(plugin: SummanyPlugin, content: string) {
    const llm = LLMFactory.createLLM(plugin.settings.llmType, {
        apiKey: plugin.settings.llmType === 'openai' ? plugin.settings.openaiApiKey : plugin.settings.geminiApiKey,
        baseUrl: plugin.settings.openaiBaseUrl,
        model: plugin.settings.openaiModel
      });

    return await callOpenAI(plugin, {
        prompt: translatePrompt,
        content: content
    });
}

export async function GenerateSummany(plugin: SummanyPlugin, content: string) {
    return await callOpenAI(plugin, {
        prompt: plugin.settings.customPrompt + " \n check the input content's language, return the same language.only return the summary.\n The content is: \n ",
        content: "The content is: \n" + content
    });
}