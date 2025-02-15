import { OpenAIProvider } from './providers/OpenAIProvider';
import { GeminiProvider } from './providers/GeminiProvider';
import { DeepSeekProvider } from './providers/DeepSeekProvider';

export class LLMFactory {
  static createLLM(type: string, config: LLMConfig): LLMProvider {
    switch (type) {
      case 'openai':
        return new OpenAIProvider(config);
      case 'gemini':
        return new GeminiProvider(config);
        case 'deepSeek':
        return new DeepSeekProvider(config);
      default:
        throw new Error(`Unknown LLM type: ${type}`);
    }
  }
}

export interface LLMResponse {
  content: string;
  status: number;
}

export interface LLMConfig {
  apiKey: string;
  baseUrl?: string;
  model?: string;
}

export interface LLMProvider {
  generateContent(prompt: string, content: string): Promise<LLMResponse>;
  checkConfig(): Promise<boolean>;
  createImage(title:string,logo:string): Promise<LLMResponse>
}