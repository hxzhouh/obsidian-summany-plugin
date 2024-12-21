/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var h=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var P=Object.getOwnPropertyNames;var b=Object.prototype.hasOwnProperty;var v=(r,o)=>{for(var s in o)h(r,s,{get:o[s],enumerable:!0})},k=(r,o,s,e)=>{if(o&&typeof o=="object"||typeof o=="function")for(let t of P(o))!b.call(r,t)&&t!==s&&h(r,t,{get:()=>o[t],enumerable:!(e=S(o,t))||e.enumerable});return r};var C=r=>k(h({},"__esModule",{value:!0}),r);var A={};v(A,{default:()=>u});module.exports=C(A);var a=require("obsidian");var n=require("obsidian"),c=class extends n.PluginSettingTab{constructor(s,e){super(s,e);this.plugin=e}display(){let{containerEl:s}=this;s.empty(),new n.Setting(s).setName("Base URL(Optional)").setDesc("For 3rd party OpenAI Format endpoints only. Leave blank for other providers").addText(e=>e.setPlaceholder("https://api.example.com/v1").setValue(this.plugin.settings.baseUrl).onChange(async t=>{this.plugin.settings.baseUrl=t,await this.plugin.saveSettings()})),new n.Setting(s).setName("API Key(Required)").setDesc("API key for the 3rd party provider").addText(e=>e.setPlaceholder("sk-xxxxxxxxxxxxxxxxxxxxxxxx").setValue(this.plugin.settings.apiKey).onChange(async t=>{this.plugin.settings.apiKey=t,await this.plugin.saveSettings()})),new n.Setting(s).setName("Models (Required)").setDesc("Comma-separated list of models, default use gpt-4o-mini").addTextArea(e=>e.setPlaceholder("model1,model2,model3").setValue(this.plugin.settings.model.join(",")).onChange(async t=>{this.plugin.settings.model=t.split(",").map(i=>i.trim()),await this.plugin.saveSettings()})),new n.Setting(s).setName("Custom Prompt(Optional)").setDesc(`Custom prompt to be used for generating summaries
 <b>Default:</b> Please summarize the following article into a paragraph of no more than 150 words, highlighting the main points and making it concise and easy to understand.`).addTextArea(e=>e.setPlaceholder("Enter your custom prompt here...").setValue(this.plugin.settings.customPrompt).onChange(async t=>{this.plugin.settings.customPrompt=t,await this.plugin.saveSettings()})),new n.Setting(s).setName("Check").setDesc("Click to validate your API key and base URL by sending a request.").addButton(e=>e.setButtonText("Check").setCta().onClick(async()=>{await this.checkOpenAIConfig()}))}async checkOpenAIConfig(){let{baseUrl:s,apiKey:e}=this.plugin.settings;if(!e){new n.Notice("API Key is not set!");return}let t=s||"https://api.openai.com/";t=t+"/v1/models";try{let i=await(0,n.requestUrl)({url:t,method:"GET",headers:{Authorization:`Bearer ${e}`}});i.status===200?new n.Notice("Success! Your configuration is valid."):new n.Notice(`Request failed with status: ${i.status}`)}catch(i){new n.Notice(`Request failed. Error: ${i}`)}}};var T={baseUrl:"",apiKey:"",model:[],customPrompt:"Please summarize the following article into a paragraph of no more than 150 words, highlighting the main points and making it concise and easy to understand."},u=class extends a.Plugin{async onload(){await this.loadSettings(),this.addSettingTab(new c(this.app,this)),this.addCommand({id:"summary by openai",name:"Generate Summary",callback:()=>this.addSummany()})}onunload(){}async addSummany(){let s=this.app.workspace.activeLeaf;if(!s)return;let e=s.view;if(!(e instanceof a.MarkdownView))return;let t=e.editor,i=t.getValue(),U=this.settings.customPrompt+` 
 check the input content's language, return the same language.only return the summary.
 The content is: 
 `+i.trim();try{let m=this.settings.baseUrl||"https://api.openai.com";m=m+"/v1/chat/completions";let d={url:m,method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.settings.apiKey}`},body:JSON.stringify({model:this.settings.model[0]||"gpt-4o-mini",messages:[{role:"system",content:this.settings.customPrompt+`
 Ensure the summary is concise, clear, and in the same language as the input.`},{role:"user",content:`The content is: 
`+i.trim()}],temperature:.7})};console.log(d);let y=await(0,a.requestUrl)(d);console.log(y);let g="",p=y.json.choices;if(p&&p.length>0){let l=p[0].message.content;console.log("Summary:",l),g=l}else new a.Notice("No choices available in the response."),console.error("No choices available in the response.");let x=/^---\n([\s\S]*?)\n---/,w=i.match(x);if(w){let l=(0,a.parseYaml)(w[1])||{};l.Summany=g;let f=`---
${(0,a.stringifyYaml)(l)}---`;t.setValue(i.replace(x,f))}else{let l=`---
Summany: ${g}
---
${i}`;t.setValue(l)}new a.Notice("Summany Generated!")}catch(m){new a.Notice(`Error: ${m}`),console.error(m)}}async loadSettings(){this.settings=Object.assign({},T,await this.loadData())}async saveSettings(){await this.saveData(this.settings)}};
