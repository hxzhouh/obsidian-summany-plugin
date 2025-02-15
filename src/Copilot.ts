import SummanyPlugin from "main";
import { Notice, Plugin, requestUrl } from "obsidian";
import { LLMFactory } from "./llm/LLMFactory";
import { LLMProvider, LLMConfig } from './llm/LLMFactory';
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
    - Do not process the code snippet, keep it as it is.    
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
    async CheckConfig(): Promise<boolean> {
        return await this.llmProvider.checkConfig();
    }
    async CreateImage(title:string,logo:string): Promise<string> {
        try {
            const response = await this.llmProvider.createImage(title,logo);
            if (response.status !== 200) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            return response.content
        } catch (error) {
            console.error("CreateImage error:", error);
            throw error;
        }
    }
}


function cleanJSONString(jsonString:string): string {
    const Marker = "```";
    const lines = jsonString.split('\n'); // 将字符串分割成行
    if (lines.length > 0) {
        const firstLine = lines[0];
        if (firstLine.includes(Marker)) {
            lines.shift();
        }
    }
    if (lines.length > 0) {
        const lastLine = lines[lines.length - 1];
        if (lastLine.includes(Marker)) {
            lines.pop();
        }
    }
    return lines.join('\n').trim();
  }

const createSummaryPrompt= (language:string): string => {    
    return `Use ${language} Answer the question
    Returns json data in the following strict format
    {
        "description":"",
        "social":""
    }
    description: summarizes the key points of this article, requires SEO optimization, pays attention to long-tail keywords, and at the same time attracts people's curiosity.
    
    social: summarizes the main points of this article in sentences of no more than 140 characters, Mainly used for publishing on x, attracting people's curiosity at the same time.
    `;
};

export default async function GenerateSummary(plugin: SummanyPlugin, language:string,content: string) {

    const llm = LLMFactory.createLLM(plugin.settings.llmType, GetLlmConfigByType(plugin));
    if (!llm) {
        new Notice('LLM provider not found!');
        return '';
    }
    const response = await llm.generateContent(createSummaryPrompt(language), content);

    console.log(response.content);
    return cleanJSONString(response.content);
}

export  async function CheckConfig(plugin: SummanyPlugin): Promise<boolean> {
    const llm = LLMFactory.createLLM(plugin.settings.llmType, GetLlmConfigByType(plugin));
    if (!llm) {
        new Notice('LLM provider not found!');
        return false;
    }
    return await llm.checkConfig();

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
                apiKey: plugin.settings.geminiApiKey,
                baseUrl: plugin.settings.geminiApiUrl,
                model: plugin.settings.geminiModel[0],
            };
        case 'deepSeek':
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