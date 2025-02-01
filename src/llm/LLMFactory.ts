import { LLMProvider, LLMConfig } from './LLMInterface';
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
        case 'deepseek':
        return new DeepSeekProvider(config);
      default:
        throw new Error(`Unknown LLM type: ${type}`);
    }
  }
}