import { LLMProvider, LLMConfig, LLMResponse } from '../LLMFactory';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';

export class GeminiProvider implements LLMProvider {
  private genAI: GoogleGenerativeAI;
  
  constructor(private config: LLMConfig) {
    this.genAI = new GoogleGenerativeAI(config.apiKey);
  }

  async generateContent(prompt: string, content: string): Promise<LLMResponse> {
   throw new Error("Method not implemented.");
  }
  
  async createImage(title: string, logo: string): Promise<LLMResponse> {
    console.log("Creating image by GeminiProvider");
    try {
      
      const model = this.genAI.getGenerativeModel({ model: "imagen-3.0-generate-002" });
      const prompt = imageCreatePrompt(title,logo);
      // const image = {
      //   inlineData: {
      //     data: Buffer.from(fs.readFileSync("cookie.png")).toString("base64"),
      //     mimeType: "image/png",
      //   },
      // };
      const result = await model.generateContent([prompt]);
      console.log(result.response.text());
      return {
        content: imageCreatePrompt(title,logo),
        status: 200
      }
    } catch (error) {
      throw new Error("Failed to create image by GeminiProvider: " + error);
    }
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

const imageCreatePrompt = (title:string,logo:string): string => { 
  return `A 16:9 anime-style technical blog cover, 
  clean minimalist design with soft gradients,
  central bold text "${title}" in modern tech font,
  The picture needs to fit the theme: "${title}"
  tech-themed elements floating in background (circuit lines, data streams, cloud servers) in flat anime style,
  ${logo} icon integrated in top-right corner with subtle glow,
  color scheme: cool blues + crisp whites + slate grays,
  soft shadows and ambient lighting,
  --ar 16:9 --style anime-minimalist`
}