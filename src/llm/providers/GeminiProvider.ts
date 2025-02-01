import { LLMProvider, LLMConfig, LLMResponse } from '../LLMInterface';
import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiProvider implements LLMProvider {
  private genAI: any;
  
  constructor(private config: LLMConfig) {
    this.genAI = new GoogleGenerativeAI(config.apiKey);
  }

  async generateContent(prompt: string, content: string): Promise<LLMResponse> {
    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`${prompt}\n${content}`);
    
    return {
      content: result.response.text(),
      status: 200
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