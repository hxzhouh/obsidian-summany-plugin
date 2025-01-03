import SummanyPlugin from "main";
import { Notice, requestUrl } from "obsidian";


export async function GenerateSummany(plugin: SummanyPlugin, content: string) {
    // 1. 提示用户输入
    let summary = '';
    try {
        // 2. 调用 OpenAI 接口
        let url = plugin.settings.baseUrl || 'https://api.openai.com';
        url=url + '/v1/chat/completions';
        let request = {
            url: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${plugin.settings.apiKey}`
            },
            body: JSON.stringify({
                model: plugin.settings.model[0] || 'gpt-4o-mini', // 使用有效模型名称
                messages: [
                    {
                        role: 'system',
                        content: plugin.settings.customPrompt + " \n check the input content's language, return the same language.only return the summary.\n The content is: \n "
                    },
                    {
                        role: 'user',
                        content: "The content is: \n" + content.trim()
                    }
                ],
                temperature: 0.7
            })
        };
        const result = await requestUrl(request);
        // 3. 解析返回结果
        const json = result.json; // 获取 JSON 数据
        const choices = json.choices; // 获取 choices 数组
        if (choices && choices.length > 0) {
            const content = choices[0].message.content; // 提取 content
            summary = content;
        } else {
            new Notice('No choices available in the response.');
            console.error("No choices available in the response.");
        }
    } catch (error) {
        new Notice(`Error: ${error}`);
        console.error(error);
    }
    
    return summary;
}