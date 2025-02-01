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
  }