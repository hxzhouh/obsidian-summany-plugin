export interface SummanyPluginSettings {
 
    devToApiKey: string;
    llmType: string;
    baseUrl: string;
    opanAiApiKey: string;
    openAiModel:string[];
    customPrompt: string;
    geminiApiKey: string;
    geminiApiUrl: string;
    geminiModel: string[];
    deepSeekApiKey: string;
    deepSeekApiUrl: string;
    deepSeekModel: string[];
}

export const DEFAULT_SETTINGS: SummanyPluginSettings = {
    llmType: 'openai',
    devToApiKey: '',
    baseUrl: '',
    opanAiApiKey: '',
    openAiModel: ['gpt-4o-mini'],
    customPrompt: 'Please summarize the following article into a paragraph of no more than 150 words, highlighting the main points and making it concise and easy to understand.',
    geminiApiKey: '',
    geminiApiUrl: '',
    geminiModel: ['gemini-2.0-flash','gemini-1.5-flash'],
    deepSeekApiKey: '',
    deepSeekApiUrl: '',
    deepSeekModel: [],
};


export const chineseFooter = (slug: string) => `\n---\n
- [本文长期链接](${slug})
- 如果您觉得我的博客对你有帮助，请通过 [RSS](https://huizhou92.com/index.xml)订阅我。
- 或者在[X](https://x.com/@piaopiaopig)上关注我。
- 如果您有[Medium](https://medium.huizhou92.com/)账号，能给我个关注嘛？我的文章第一时间都会发布在Medium。`;

export const englishFooter = (slug: string) => `\n---\n
- [Long Time Link](${slug})
- If you find my blog helpful, please subscribe to me via [RSS](https://huizhou92.com/index.xml)
- Or follow me on [X](https://x.com/@piaopiaopig)
- If you have a [Medium](https://medium.huizhou92.com/) account, follow me there. My articles will be published there as soon as possible.`

