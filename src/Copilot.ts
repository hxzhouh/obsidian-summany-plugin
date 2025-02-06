import SummanyPlugin from "main";
import { Notice, requestUrl } from "obsidian";
import { LLMFactory } from "./llm/LLMFactory";
import { LLMProvider, LLMConfig } from './llm/LLMInterface';
const translatePrompt = `You are a professional English translator...`;


interface PromptTemplate {
    language: string;
    tone: string;
}

const DEFAULT_TEMPLATE: PromptTemplate = {
    language: 'Chinese',
    tone: 'informal',
};

const createRewritePrompt = (template: Partial<PromptTemplate> = {}): string => {
    const config = { ...DEFAULT_TEMPLATE, ...template };
    
    return `You are a science and technology author who is proficient in Chinese and English. 
    Please help me rewrite this article in ${config.language}.
    I hope anyone can read it easily, and the tone should be ${config.tone}.
    The input file is in markdown format, so please keep the image link and citation link.
    Take care to maintain the technical details and logical structure of the original text, while taking into account the differences in expression habits between Chinese and English. In the process of transcription, please pay special attention to the following matters:
    - Linguistic accuracy: Ensure accurate translation of scientific and technical terms and avoid ambiguity.
    - Cultural differences: Adjust the expressions to make them more in line with the cultural background of the target readers.
    - Technical details: Provide necessary background information or explanations for complex technical content.
    - Structure and formatting: Maintain the logical structure of the original text and ensure that the transcribed text is well organized.
    - SEO Optimization: Consider SEO factors during the transcription process and use appropriate keywords and phrases.
    - Copyright and citation: Respect the copyright of the original article by citing the source and original author.

    Output the following
    ### "Title":"Title is a SEO friendly Title. ",
    ### "Subtitle":"Subtitle is a short description of the article.",
    ### "Summany":"Summany is a summary of the article. No more than 200 characters",
    ### "BlogContent":"BlogContent is the main content of the article."
    `;
};

export async function GenerateTranslate(plugin: SummanyPlugin, content: string) {
    const llm = LLMFactory.createLLM(plugin.settings.llmType, GetLlmConfigByType(plugin));
    if (!llm) {
        new Notice('LLM provider not found!');
        return '';
    }

    const response = await llm.generateContent(translatePrompt, content);
    return response.content;
}
export class Copilot {
    private llmProvider: LLMProvider;

    constructor(provider: LLMProvider) {
        this.llmProvider = provider;
    }
    
    async GenerateRewrite(content: string, template?: Partial<PromptTemplate>): Promise<string>{
        const prompt = createRewritePrompt(template)
        try {      
            const response = await this.llmProvider.generateContent(prompt, content);
            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            return response.content
        } catch (error) {
            console.error("GenerateRewrite error:", error);
            throw error;
        }
    }
}

export async function GenerateSummany(plugin: SummanyPlugin, content: string) {

    const llm = LLMFactory.createLLM(plugin.settings.llmType, GetLlmConfigByType(plugin));
    if (!llm) {
        new Notice('LLM provider not found!');
        return '';
    }
    const response = await llm.generateContent(plugin.settings.customPrompt + " \n check the input content's language, return the same language.only return the summary.\n The content is: \n ", content);
    return response.content;
}

export function GetLlmConfigByType(plugin: SummanyPlugin): LLMConfig {
    switch (plugin.settings.llmType) {
        case 'openai':
            return {
                apiKey: plugin.settings.opanAiApiKey,
                baseUrl: plugin.settings.baseUrl,
                model: plugin.settings.openAiModel[0]
            };
        case 'gemini':
            return {
                apiKey: '',
                baseUrl: '',
                model: '',
            };
        case 'deepseek':
            return {
                apiKey: plugin.settings.deepSeekApiKey,
                baseUrl: plugin.settings.deepSeekApiUrl,
                model: plugin.settings.deepSeekModel[0]
            };
        default:
            return {
                apiKey: '',
                baseUrl: '',
                model: '',
            };
    }
}