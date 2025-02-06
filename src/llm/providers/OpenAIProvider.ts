import { LLMProvider, LLMConfig, LLMResponse } from '../LLMInterface';
import { requestUrl } from 'obsidian';

export class OpenAIProvider implements LLMProvider {
  constructor(private config: LLMConfig) {}

  async generateContent(prompt: string, content: string): Promise<LLMResponse> {
    const url = (this.config.baseUrl || 'https://api.openai.com') + '/v1/chat/completions';
    const response = await requestUrl({
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        model: this.config.model || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: content }
        ]
      })
    });
    console.log(response);
    console.log(this.config)
    return {
      content: response.json.choices[0].message.content,
      status: response.status
    };
  }

  async checkConfig(): Promise<boolean> {
    try {
      await this.generateContent("test", "test");
      return true;
    } catch {
      return false;
    }
  }
}