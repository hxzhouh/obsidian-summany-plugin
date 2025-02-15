/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var j=Object.defineProperty;var Se=Object.getOwnPropertyDescriptor;var Ae=Object.getOwnPropertyNames;var _e=Object.prototype.hasOwnProperty;var Le=(e,n)=>{for(var t in n)j(e,t,{get:n[t],enumerable:!0})},Re=(e,n,t,i)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of Ae(n))!_e.call(e,s)&&s!==t&&j(e,s,{get:()=>n[s],enumerable:!(i=Se(n,s))||i.enumerable});return e};var Te=e=>Re(j({},"__esModule",{value:!0}),e);var rt={};Le(rt,{default:()=>K});module.exports=Te(rt);var u=require("obsidian");var h=require("obsidian");var U=require("obsidian");var z=require("obsidian"),I=class{constructor(n){this.config=n}async generateContent(n,t){let i=(this.config.baseUrl||"https://api.openai.com")+"/v1/chat/completions",s=await(0,z.requestUrl)({url:i,method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.config.apiKey}`},body:JSON.stringify({model:this.config.model||"gpt-4o-mini",messages:[{role:"system",content:n},{role:"user",content:t}]})});return{content:s.json.choices[0].message.content,status:s.status}}async checkConfig(){try{return await this.generateContent("test","test"),!0}catch(n){return!1}}async createImage(n,t){throw console.log("Creating image by OpenAIProvider"),new Error("Method not implemented.")}};var J;(function(e){e.STRING="string",e.NUMBER="number",e.INTEGER="integer",e.BOOLEAN="boolean",e.ARRAY="array",e.OBJECT="object"})(J||(J={}));var W;(function(e){e.LANGUAGE_UNSPECIFIED="language_unspecified",e.PYTHON="python"})(W||(W={}));var X;(function(e){e.OUTCOME_UNSPECIFIED="outcome_unspecified",e.OUTCOME_OK="outcome_ok",e.OUTCOME_FAILED="outcome_failed",e.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(X||(X={}));var Z=["user","model","function","system"],Q;(function(e){e.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",e.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",e.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",e.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",e.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT"})(Q||(Q={}));var ee;(function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",e.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",e.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",e.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",e.BLOCK_NONE="BLOCK_NONE"})(ee||(ee={}));var te;(function(e){e.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",e.NEGLIGIBLE="NEGLIGIBLE",e.LOW="LOW",e.MEDIUM="MEDIUM",e.HIGH="HIGH"})(te||(te={}));var ne;(function(e){e.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",e.SAFETY="SAFETY",e.OTHER="OTHER"})(ne||(ne={}));var _;(function(e){e.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",e.STOP="STOP",e.MAX_TOKENS="MAX_TOKENS",e.SAFETY="SAFETY",e.RECITATION="RECITATION",e.LANGUAGE="LANGUAGE",e.OTHER="OTHER"})(_||(_={}));var ie;(function(e){e.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",e.RETRIEVAL_QUERY="RETRIEVAL_QUERY",e.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",e.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",e.CLASSIFICATION="CLASSIFICATION",e.CLUSTERING="CLUSTERING"})(ie||(ie={}));var se;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.AUTO="AUTO",e.ANY="ANY",e.NONE="NONE"})(se||(se={}));var oe;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.MODE_DYNAMIC="MODE_DYNAMIC"})(oe||(oe={}));var m=class extends Error{constructor(n){super(`[GoogleGenerativeAI Error]: ${n}`)}},v=class extends m{constructor(n,t){super(n),this.response=t}},N=class extends m{constructor(n,t,i,s){super(n),this.status=t,this.statusText=i,this.errorDetails=s}},w=class extends m{};var be="https://generativelanguage.googleapis.com",Oe="v1beta",Ie="0.21.0",Me="genai-js",A;(function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"})(A||(A={}));var H=class{constructor(n,t,i,s,o){this.model=n,this.task=t,this.apiKey=i,this.stream=s,this.requestOptions=o}toString(){var n,t;let i=((n=this.requestOptions)===null||n===void 0?void 0:n.apiVersion)||Oe,o=`${((t=this.requestOptions)===null||t===void 0?void 0:t.baseUrl)||be}/${i}/${this.model}:${this.task}`;return this.stream&&(o+="?alt=sse"),o}};function Ne(e){let n=[];return e!=null&&e.apiClient&&n.push(e.apiClient),n.push(`${Me}/${Ie}`),n.join(" ")}async function xe(e){var n;let t=new Headers;t.append("Content-Type","application/json"),t.append("x-goog-api-client",Ne(e.requestOptions)),t.append("x-goog-api-key",e.apiKey);let i=(n=e.requestOptions)===null||n===void 0?void 0:n.customHeaders;if(i){if(!(i instanceof Headers))try{i=new Headers(i)}catch(s){throw new w(`unable to convert customHeaders value ${JSON.stringify(i)} to Headers: ${s.message}`)}for(let[s,o]of i.entries()){if(s==="x-goog-api-key")throw new w(`Cannot set reserved header name ${s}`);if(s==="x-goog-api-client")throw new w(`Header name ${s} can only be set using the apiClient field`);t.append(s,o)}}return t}async function ke(e,n,t,i,s,o){let a=new H(e,n,t,i,o);return{url:a.toString(),fetchOptions:Object.assign(Object.assign({},Ue(o)),{method:"POST",headers:await xe(a),body:s})}}async function T(e,n,t,i,s,o={},a=fetch){let{url:r,fetchOptions:c}=await ke(e,n,t,i,s,o);return Pe(r,c,a)}async function Pe(e,n,t=fetch){let i;try{i=await t(e,n)}catch(s){De(s,e)}return i.ok||await Fe(i,e),i}function De(e,n){let t=e;throw e instanceof N||e instanceof w||(t=new m(`Error fetching from ${n.toString()}: ${e.message}`),t.stack=e.stack),t}async function Fe(e,n){let t="",i;try{let s=await e.json();t=s.error.message,s.error.details&&(t+=` ${JSON.stringify(s.error.details)}`,i=s.error.details)}catch(s){}throw new N(`Error fetching from ${n.toString()}: [${e.status} ${e.statusText}] ${t}`,e.status,e.statusText,i)}function Ue(e){let n={};if((e==null?void 0:e.signal)!==void 0||(e==null?void 0:e.timeout)>=0){let t=new AbortController;(e==null?void 0:e.timeout)>=0&&setTimeout(()=>t.abort(),e.timeout),e!=null&&e.signal&&e.signal.addEventListener("abort",()=>{t.abort()}),n.signal=t.signal}return n}function B(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),M(e.candidates[0]))throw new v(`${E(e)}`,e);return $e(e)}else if(e.promptFeedback)throw new v(`Text not available. ${E(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),M(e.candidates[0]))throw new v(`${E(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),ae(e)[0]}else if(e.promptFeedback)throw new v(`Function call not available. ${E(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),M(e.candidates[0]))throw new v(`${E(e)}`,e);return ae(e)}else if(e.promptFeedback)throw new v(`Function call not available. ${E(e)}`,e)},e}function $e(e){var n,t,i,s;let o=[];if(!((t=(n=e.candidates)===null||n===void 0?void 0:n[0].content)===null||t===void 0)&&t.parts)for(let a of(s=(i=e.candidates)===null||i===void 0?void 0:i[0].content)===null||s===void 0?void 0:s.parts)a.text&&o.push(a.text),a.executableCode&&o.push("\n```"+a.executableCode.language+`
`+a.executableCode.code+"\n```\n"),a.codeExecutionResult&&o.push("\n```\n"+a.codeExecutionResult.output+"\n```\n");return o.length>0?o.join(""):""}function ae(e){var n,t,i,s;let o=[];if(!((t=(n=e.candidates)===null||n===void 0?void 0:n[0].content)===null||t===void 0)&&t.parts)for(let a of(s=(i=e.candidates)===null||i===void 0?void 0:i[0].content)===null||s===void 0?void 0:s.parts)a.functionCall&&o.push(a.functionCall);if(o.length>0)return o}var Ge=[_.RECITATION,_.SAFETY,_.LANGUAGE];function M(e){return!!e.finishReason&&Ge.includes(e.finishReason)}function E(e){var n,t,i;let s="";if((!e.candidates||e.candidates.length===0)&&e.promptFeedback)s+="Response was blocked",!((n=e.promptFeedback)===null||n===void 0)&&n.blockReason&&(s+=` due to ${e.promptFeedback.blockReason}`),!((t=e.promptFeedback)===null||t===void 0)&&t.blockReasonMessage&&(s+=`: ${e.promptFeedback.blockReasonMessage}`);else if(!((i=e.candidates)===null||i===void 0)&&i[0]){let o=e.candidates[0];M(o)&&(s+=`Candidate was blocked due to ${o.finishReason}`,o.finishMessage&&(s+=`: ${o.finishMessage}`))}return s}function L(e){return this instanceof L?(this.v=e,this):new L(e)}function Ke(e,n,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=t.apply(e,n||[]),s,o=[];return s={},a("next"),a("throw"),a("return"),s[Symbol.asyncIterator]=function(){return this},s;function a(g){i[g]&&(s[g]=function(d){return new Promise(function(f,C){o.push([g,d,f,C])>1||r(g,d)})})}function r(g,d){try{c(i[g](d))}catch(f){y(o[0][3],f)}}function c(g){g.value instanceof L?Promise.resolve(g.value.v).then(l,p):y(o[0][2],g)}function l(g){r("next",g)}function p(g){r("throw",g)}function y(g,d){g(d),o.shift(),o.length&&r(o[0][0],o[0][1])}}var re=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function je(e){let n=e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),t=Be(n),[i,s]=t.tee();return{stream:Ve(i),response:He(s)}}async function He(e){let n=[],t=e.getReader();for(;;){let{done:i,value:s}=await t.read();if(i)return B(Ye(n));n.push(s)}}function Ve(e){return Ke(this,arguments,function*(){let t=e.getReader();for(;;){let{value:i,done:s}=yield L(t.read());if(s)break;yield yield L(B(i))}})}function Be(e){let n=e.getReader();return new ReadableStream({start(i){let s="";return o();function o(){return n.read().then(({value:a,done:r})=>{if(r){if(s.trim()){i.error(new m("Failed to parse stream"));return}i.close();return}s+=a;let c=s.match(re),l;for(;c;){try{l=JSON.parse(c[1])}catch(p){i.error(new m(`Error parsing JSON response: "${c[1]}"`));return}i.enqueue(l),s=s.substring(c[0].length),c=s.match(re)}return o()})}}})}function Ye(e){let n=e[e.length-1],t={promptFeedback:n==null?void 0:n.promptFeedback};for(let i of e){if(i.candidates)for(let s of i.candidates){let o=s.index;if(t.candidates||(t.candidates=[]),t.candidates[o]||(t.candidates[o]={index:s.index}),t.candidates[o].citationMetadata=s.citationMetadata,t.candidates[o].groundingMetadata=s.groundingMetadata,t.candidates[o].finishReason=s.finishReason,t.candidates[o].finishMessage=s.finishMessage,t.candidates[o].safetyRatings=s.safetyRatings,s.content&&s.content.parts){t.candidates[o].content||(t.candidates[o].content={role:s.content.role||"user",parts:[]});let a={};for(let r of s.content.parts)r.text&&(a.text=r.text),r.functionCall&&(a.functionCall=r.functionCall),r.executableCode&&(a.executableCode=r.executableCode),r.codeExecutionResult&&(a.codeExecutionResult=r.codeExecutionResult),Object.keys(a).length===0&&(a.text=""),t.candidates[o].content.parts.push(a)}}i.usageMetadata&&(t.usageMetadata=i.usageMetadata)}return t}async function ue(e,n,t,i){let s=await T(n,A.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(t),i);return je(s)}async function ge(e,n,t,i){let o=await(await T(n,A.GENERATE_CONTENT,e,!1,JSON.stringify(t),i)).json();return{response:B(o)}}function he(e){if(e!=null){if(typeof e=="string")return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)return e.role?e:{role:"system",parts:e.parts}}}function R(e){let n=[];if(typeof e=="string")n=[{text:e}];else for(let t of e)typeof t=="string"?n.push({text:t}):n.push(t);return qe(n)}function qe(e){let n={role:"user",parts:[]},t={role:"function",parts:[]},i=!1,s=!1;for(let o of e)"functionResponse"in o?(t.parts.push(o),s=!0):(n.parts.push(o),i=!0);if(i&&s)throw new m("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!i&&!s)throw new m("No content is provided for sending chat message.");return i?n:t}function ze(e,n){var t;let i={model:n==null?void 0:n.model,generationConfig:n==null?void 0:n.generationConfig,safetySettings:n==null?void 0:n.safetySettings,tools:n==null?void 0:n.tools,toolConfig:n==null?void 0:n.toolConfig,systemInstruction:n==null?void 0:n.systemInstruction,cachedContent:(t=n==null?void 0:n.cachedContent)===null||t===void 0?void 0:t.name,contents:[]},s=e.generateContentRequest!=null;if(e.contents){if(s)throw new w("CountTokensRequest must have one of contents or generateContentRequest, not both.");i.contents=e.contents}else if(s)i=Object.assign(Object.assign({},i),e.generateContentRequest);else{let o=R(e);i.contents=[o]}return{generateContentRequest:i}}function ce(e){let n;return e.contents?n=e:n={contents:[R(e)]},e.systemInstruction&&(n.systemInstruction=he(e.systemInstruction)),n}function Je(e){return typeof e=="string"||Array.isArray(e)?{content:R(e)}:e}var le=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],We={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function Xe(e){let n=!1;for(let t of e){let{role:i,parts:s}=t;if(!n&&i!=="user")throw new m(`First content should be with role 'user', got ${i}`);if(!Z.includes(i))throw new m(`Each item should include role field. Got ${i} but valid roles are: ${JSON.stringify(Z)}`);if(!Array.isArray(s))throw new m("Content should have 'parts' property with an array of Parts");if(s.length===0)throw new m("Each Content should have at least one part");let o={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(let r of s)for(let c of le)c in r&&(o[c]+=1);let a=We[i];for(let r of le)if(!a.includes(r)&&o[r]>0)throw new m(`Content with role '${i}' can't contain '${r}' part`);n=!0}}var de="SILENT_ERROR",V=class{constructor(n,t,i,s={}){this.model=t,this.params=i,this._requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=n,i!=null&&i.history&&(Xe(i.history),this._history=i.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(n,t={}){var i,s,o,a,r,c;await this._sendPromise;let l=R(n),p={safetySettings:(i=this.params)===null||i===void 0?void 0:i.safetySettings,generationConfig:(s=this.params)===null||s===void 0?void 0:s.generationConfig,tools:(o=this.params)===null||o===void 0?void 0:o.tools,toolConfig:(a=this.params)===null||a===void 0?void 0:a.toolConfig,systemInstruction:(r=this.params)===null||r===void 0?void 0:r.systemInstruction,cachedContent:(c=this.params)===null||c===void 0?void 0:c.cachedContent,contents:[...this._history,l]},y=Object.assign(Object.assign({},this._requestOptions),t),g;return this._sendPromise=this._sendPromise.then(()=>ge(this._apiKey,this.model,p,y)).then(d=>{var f;if(d.response.candidates&&d.response.candidates.length>0){this._history.push(l);let C=Object.assign({parts:[],role:"model"},(f=d.response.candidates)===null||f===void 0?void 0:f[0].content);this._history.push(C)}else{let C=E(d.response);C&&console.warn(`sendMessage() was unsuccessful. ${C}. Inspect response object for details.`)}g=d}),await this._sendPromise,g}async sendMessageStream(n,t={}){var i,s,o,a,r,c;await this._sendPromise;let l=R(n),p={safetySettings:(i=this.params)===null||i===void 0?void 0:i.safetySettings,generationConfig:(s=this.params)===null||s===void 0?void 0:s.generationConfig,tools:(o=this.params)===null||o===void 0?void 0:o.tools,toolConfig:(a=this.params)===null||a===void 0?void 0:a.toolConfig,systemInstruction:(r=this.params)===null||r===void 0?void 0:r.systemInstruction,cachedContent:(c=this.params)===null||c===void 0?void 0:c.cachedContent,contents:[...this._history,l]},y=Object.assign(Object.assign({},this._requestOptions),t),g=ue(this._apiKey,this.model,p,y);return this._sendPromise=this._sendPromise.then(()=>g).catch(d=>{throw new Error(de)}).then(d=>d.response).then(d=>{if(d.candidates&&d.candidates.length>0){this._history.push(l);let f=Object.assign({},d.candidates[0].content);f.role||(f.role="model"),this._history.push(f)}else{let f=E(d);f&&console.warn(`sendMessageStream() was unsuccessful. ${f}. Inspect response object for details.`)}}).catch(d=>{d.message!==de&&console.error(d)}),g}};async function Ze(e,n,t,i){return(await T(n,A.COUNT_TOKENS,e,!1,JSON.stringify(t),i)).json()}async function Qe(e,n,t,i){return(await T(n,A.EMBED_CONTENT,e,!1,JSON.stringify(t),i)).json()}async function et(e,n,t,i){let s=t.requests.map(a=>Object.assign(Object.assign({},a),{model:n}));return(await T(n,A.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:s}),i)).json()}var x=class{constructor(n,t,i={}){this.apiKey=n,this._requestOptions=i,t.model.includes("/")?this.model=t.model:this.model=`models/${t.model}`,this.generationConfig=t.generationConfig||{},this.safetySettings=t.safetySettings||[],this.tools=t.tools,this.toolConfig=t.toolConfig,this.systemInstruction=he(t.systemInstruction),this.cachedContent=t.cachedContent}async generateContent(n,t={}){var i;let s=ce(n),o=Object.assign(Object.assign({},this._requestOptions),t);return ge(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(i=this.cachedContent)===null||i===void 0?void 0:i.name},s),o)}async generateContentStream(n,t={}){var i;let s=ce(n),o=Object.assign(Object.assign({},this._requestOptions),t);return ue(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(i=this.cachedContent)===null||i===void 0?void 0:i.name},s),o)}startChat(n){var t;return new V(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(t=this.cachedContent)===null||t===void 0?void 0:t.name},n),this._requestOptions)}async countTokens(n,t={}){let i=ze(n,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),s=Object.assign(Object.assign({},this._requestOptions),t);return Ze(this.apiKey,this.model,i,s)}async embedContent(n,t={}){let i=Je(n),s=Object.assign(Object.assign({},this._requestOptions),t);return Qe(this.apiKey,this.model,i,s)}async batchEmbedContents(n,t={}){let i=Object.assign(Object.assign({},this._requestOptions),t);return et(this.apiKey,this.model,n,i)}};var k=class{constructor(n){this.apiKey=n}getGenerativeModel(n,t){if(!n.model)throw new m("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new x(this.apiKey,n,t)}getGenerativeModelFromCachedContent(n,t,i){if(!n.name)throw new w("Cached content must contain a `name` field.");if(!n.model)throw new w("Cached content must contain a `model` field.");let s=["model","systemInstruction"];for(let a of s)if(t!=null&&t[a]&&n[a]&&(t==null?void 0:t[a])!==n[a]){if(a==="model"){let r=t.model.startsWith("models/")?t.model.replace("models/",""):t.model,c=n.model.startsWith("models/")?n.model.replace("models/",""):n.model;if(r===c)continue}throw new w(`Different value for "${a}" specified in modelParams (${t[a]}) and cachedContent (${n[a]})`)}let o=Object.assign(Object.assign({},t),{model:n.model,tools:n.tools,toolConfig:n.toolConfig,systemInstruction:n.systemInstruction,cachedContent:n});return new x(this.apiKey,o,i)}};var P=class{constructor(n){this.config=n;this.genAI=new k(n.apiKey)}async generateContent(n,t){throw new Error("Method not implemented.")}async createImage(n,t){console.log("Creating image by GeminiProvider");try{let i=this.genAI.getGenerativeModel({model:"imagen-3.0-generate-002"}),s=pe(n,t),o=await i.generateContent([s]);return console.log(o.response.text()),{content:pe(n,t),status:200}}catch(i){throw new Error("Failed to create image by GeminiProvider: "+i)}}async checkConfig(){try{return await this.generateContent("test","test"),!0}catch(n){return!1}}},pe=(e,n)=>`A 16:9 anime-style technical blog cover, 
  clean minimalist design with soft gradients,
  central bold text "${e}" in modern tech font,
  The picture needs to fit the theme: "${e}"
  tech-themed elements floating in background (circuit lines, data streams, cloud servers) in flat anime style,
  ${n} icon integrated in top-right corner with subtle glow,
  color scheme: cool blues + crisp whites + slate grays,
  soft shadows and ambient lighting,
  --ar 16:9 --style anime-minimalist`;var fe=require("obsidian"),D=class{constructor(n){this.config=n}async generateContent(n,t){let i=(this.config.baseUrl||"https://api.deepseek.com")+"/v1/chat/completions";console.log("Generating content by DeepSeekProvider"),console.log("url: ",i,"token: ",this.config.apiKey);let s=await(0,fe.requestUrl)({url:i,method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.config.apiKey}`},body:JSON.stringify({model:this.config.model||"deepseek-reasoner",messages:[{role:"system",content:n},{role:"user",content:t}]})});return{content:s.json.choices[0].message.content,status:s.status}}async checkConfig(){try{return await this.generateContent("test","test"),!0}catch(n){return!1}}async createImage(n,t){throw console.log("Creating image by DeepSeekProvider"),new Error("Method not implemented.")}};var S=class{static createLLM(n,t){switch(n){case"openai":return new I(t);case"gemini":return new P(t);case"deepSeek":return new D(t);default:throw new Error(`Unknown LLM type: ${n}`)}}};var tt="You are a professional English translator...",nt={language:"Chinese",tone:"informal"},it=(e={})=>{let n={...nt,...e};return`You are a science and technology author who is proficient in Chinese and English. 
    Please help me rewrite this article in ${n.language}.
    I hope anyone can read it easily, and the tone should be ${n.tone}.
    The input file is in markdown format, so please keep the image link and citation link.
    Take care to maintain the technical details and logical structure of the original text, while taking into account the differences in expression habits between Chinese and English. In the process of transcription, please pay special attention to the following matters:
    - Linguistic accuracy: Ensure accurate translation of scientific and technical terms and avoid ambiguity.
    - Cultural differences: Adjust the expressions to make them more in line with the cultural background of the target readers.
    - Technical details: Provide necessary background information or explanations for complex technical content.
    - Structure and formatting: Maintain the logical structure of the original text and ensure that the transcribed text is well organized.
    - SEO Optimization: Consider SEO factors during the transcription process and use appropriate keywords and phrases.
    - Copyright and citation: Respect the copyright of the original article by citing the source and original author.
    - Do not process the code snippet, keep it as it is.    
    The output is in the following format
    ---
    title: {{Title is a SEO friendly Title}}
    subtitle: {{Subtitle is a short description of the article}}
    description: {{ summary of the article. No more than 200 characters}}
    date:
    lastmod:
    draft: true
    tags: 
    categories: 
    author: huizhou92
    slug: 
    image: 
    keywords: 
    long_time_url: 
    doing: true
    ---
    {{content}} 
    `};async function me(e,n){let t=S.createLLM(e.settings.llmType,b(e));return t?(await t.generateContent(tt,n)).content:(new U.Notice("LLM provider not found!"),"")}var F=class{constructor(n){this.llmProvider=n}async GenerateRewrite(n,t){let i=it(t);try{let s=await this.llmProvider.generateContent(i,n);if(s.status!==200)throw new Error(`Request failed with status: ${s.status}`);return s.content}catch(s){throw console.error("GenerateRewrite error:",s),s}}async CheckConfig(){return await this.llmProvider.checkConfig()}async CreateImage(n,t){try{let i=await this.llmProvider.createImage(n,t);if(i.status!==200)throw new Error(`Request failed with status: ${i.status}`);return i.content}catch(i){throw console.error("CreateImage error:",i),i}}};function st(e){let n="```",t=e.split(`
`);return t.length>0&&t[0].includes(n)&&t.shift(),t.length>0&&t[t.length-1].includes(n)&&t.pop(),t.join(`
`).trim()}var ot=e=>`Use ${e} Answer the question
    Returns json data in the following strict format
    {
        "description":"",
        "social":""
    }
    description: summarizes the key points of this article, requires SEO optimization, pays attention to long-tail keywords, and at the same time attracts people's curiosity.
    
    social: summarizes the main points of this article in sentences of no more than 140 characters, Mainly used for publishing on x, attracting people's curiosity at the same time.
    `;async function Y(e,n,t){let i=S.createLLM(e.settings.llmType,b(e));if(!i)return new U.Notice("LLM provider not found!"),"";let s=await i.generateContent(ot(n),t);return st(s.content)}async function ye(e){let n=S.createLLM(e.settings.llmType,b(e));return n?await n.checkConfig():(new U.Notice("LLM provider not found!"),!1)}function b(e){switch(e.settings.llmType){case"openai":return{apiKey:e.settings.opanAiApiKey,baseUrl:e.settings.baseUrl,model:e.settings.openAiModel[0]};case"gemini":return{apiKey:e.settings.geminiApiKey,baseUrl:e.settings.geminiApiUrl,model:e.settings.geminiModel[0]};case"deepSeek":return{apiKey:e.settings.deepSeekApiKey,baseUrl:e.settings.deepSeekApiUrl,model:e.settings.deepSeekModel[0]};default:return{apiKey:"",baseUrl:"",model:""}}}var $=class extends h.PluginSettingTab{constructor(t,i){super(t,i);this.plugin=i}display(){let{containerEl:t}=this;t.empty(),t.createEl("h2",{text:"Dev.to config"}),new h.Setting(t).setName("DEV Community API Keys.(https://dev.to/settings/extensions)").setDesc((0,h.sanitizeHTMLToDom)("<b>Security warning!</b><br />This will be stored unencrypted in your obsidian plugin folder. Do not use this plugin if you do not fully understand the security implications of this.")).addText(i=>i.setPlaceholder("Enter your secret").setValue(this.plugin.settings.devToApiKey).onChange(async s=>{this.plugin.settings.devToApiKey=s,await this.plugin.saveSettings()})),new h.Setting(t).setName("LLM Provider").setDesc("Select which LLM provider to use").addDropdown(i=>i.addOptions({openai:"OpenAI",gemini:"Google Gemini",deepSeek:"DeepSeek"}).setValue(this.plugin.settings.llmType).onChange(async s=>{this.plugin.settings.llmType=s,await this.plugin.saveSettings()})).addButton(i=>i.setButtonText("Check").setCta().onClick(async()=>{await ye(this.plugin)?new h.Notice("Success! Your configuration is valid."):new h.Notice("Failed! Your configuration is invalid.")})),t.createEl("h2",{text:"OpenAi config"}),new h.Setting(t).setName("Base URL(Optional)").setDesc("For 3rd party OpenAI Format endpoints only. Leave blank for other providers").addText(i=>i.setPlaceholder("https://api.example.com/v1").setValue(this.plugin.settings.baseUrl).onChange(async s=>{this.plugin.settings.baseUrl=s,await this.plugin.saveSettings()})),new h.Setting(t).setName("API Key(Required)").setDesc("API key for the 3rd party provider").addText(i=>i.setPlaceholder("sk-xxxxxxxxxxxxxxxxxxxxxxxx").setValue(this.plugin.settings.opanAiApiKey).onChange(async s=>{this.plugin.settings.opanAiApiKey=s,await this.plugin.saveSettings()})),new h.Setting(t).setName("Models (Required)").setDesc("Comma-separated list of models, default use gpt-4o-mini").addTextArea(i=>i.setPlaceholder("model1,model2,model3").setValue(this.plugin.settings.openAiModel.join(",")).onChange(async s=>{this.plugin.settings.openAiModel=s.split(",").map(o=>o.trim()),await this.plugin.saveSettings()})),new h.Setting(t).setName("Custom Prompt(Optional)").setDesc(`Custom prompt to be used for generating summaries
 <b>Default:</b> Please summarize the following article into a paragraph of no more than 150 words, highlighting the main points and making it concise and easy to understand.`).addTextArea(i=>i.setPlaceholder("Enter your custom prompt here...").setValue(this.plugin.settings.customPrompt).onChange(async s=>{this.plugin.settings.customPrompt=s,await this.plugin.saveSettings()})),t.createEl("h2",{text:"Google Gemini config"}),new h.Setting(t).setName("Gemini API Key").setDesc("").addText(i=>i.setPlaceholder("https://aistudio.google.com/app/apikey").setValue(this.plugin.settings.geminiApiKey).onChange(async s=>{this.plugin.settings.geminiApiKey=s,await this.plugin.saveSettings()})),new h.Setting(t).setName("Gemini URL").setDesc("Gemini API URL").addText(i=>i.setPlaceholder("https://generativelanguage.googleapis.com").setValue(this.plugin.settings.geminiApiUrl).onChange(async s=>{this.plugin.settings.geminiApiUrl=s})),new h.Setting(t).setName("Models").setDesc("Comma-separated list of models").addTextArea(i=>i.setPlaceholder("model1,model2,model3").setValue(this.plugin.settings.geminiModel.join(",")).onChange(async s=>{this.plugin.settings.geminiModel=s.split(",").map(o=>o.trim())})),t.createEl("h2",{text:"DeepSeek config"}),new h.Setting(t).setName("DeepSeek").setDesc("DeepSeek API Key").addText(i=>i.setPlaceholder("DeepSeek API Key").setValue(this.plugin.settings.deepSeekApiKey).onChange(async s=>{this.plugin.settings.deepSeekApiKey=s})),new h.Setting(t).setName("DeepSeek URL").setDesc("DeepSeek API URL").addText(i=>i.setPlaceholder("DeepSeek URL").setValue(this.plugin.settings.deepSeekApiUrl).onChange(async s=>{this.plugin.settings.deepSeekApiUrl=s})),new h.Setting(t).setName("Models").setDesc("Comma-separated list of models").addTextArea(i=>i.setPlaceholder("model1,model2,model3").setValue(this.plugin.settings.deepSeekModel.join(",")).onChange(async s=>{this.plugin.settings.deepSeekModel=s.split(",").map(o=>o.trim())}))}};var we={llmType:"openai",devToApiKey:"",baseUrl:"",opanAiApiKey:"",openAiModel:["gpt-4o-mini"],customPrompt:"Please summarize the following article into a paragraph of no more than 150 words, highlighting the main points and making it concise and easy to understand.",geminiApiKey:"",geminiApiUrl:"",geminiModel:["gemini-2.0-flash","gemini-1.5-flash"],deepSeekApiKey:"",deepSeekApiUrl:"",deepSeekModel:[]},Ce=e=>`
---

- [\u672C\u6587\u957F\u671F\u94FE\u63A5](${e})
- \u5982\u679C\u60A8\u89C9\u5F97\u6211\u7684\u535A\u5BA2\u5BF9\u4F60\u6709\u5E2E\u52A9\uFF0C\u8BF7\u901A\u8FC7 [RSS](https://huizhou92.com/index.xml)\u8BA2\u9605\u6211\u3002
- \u6216\u8005\u5728[X](https://x.com/@piaopiaopig)\u4E0A\u5173\u6CE8\u6211\u3002
- \u5982\u679C\u60A8\u6709[Medium](https://medium.huizhou92.com/)\u8D26\u53F7\uFF0C\u80FD\u7ED9\u6211\u4E2A\u5173\u6CE8\u561B\uFF1F\u6211\u7684\u6587\u7AE0\u7B2C\u4E00\u65F6\u95F4\u90FD\u4F1A\u53D1\u5E03\u5728Medium\u3002`,ve=e=>`
---

- [Long Time Link](${e})
- If you find my blog helpful, please subscribe to me via [RSS](https://huizhou92.com/index.xml)
- Or follow me on [X](https://x.com/@piaopiaopig)
- If you have a [Medium](https://medium.huizhou92.com/) account, follow me there. My articles will be published there as soon as possible.`;var O=require("obsidian"),G=class{constructor(n){this.app=n}getActiveFileInfo(){let n=this.app.workspace.getActiveViewOfType(O.MarkdownView);if(!n)return new O.Notice("No active markdown view"),null;let t=n.file;return t?{view:n,file:t,isZhCN:t.path.includes("zh-cn")}:(new O.Notice("No active file"),console.log("No active file"),null)}async withActiveFile(n){let t=this.getActiveFileInfo();return t?await n(t):null}};async function q(e,n){let t=this.app.workspace.getActiveViewOfType(u.MarkdownView);if(!t){new u.Notice("No active markdown view");return}t.editor.setValue(n)}async function Ee(){let e=this.app.workspace.getActiveViewOfType(u.MarkdownView);return e?e.editor.getValue():(new u.Notice("No active markdown view"),null)}async function at(e,n){let t=/^---\n([\s\S]*?)\n---/,i=`---
${(0,u.stringifyYaml)(n)}---`;return e.replace(t,i)}var K=class extends u.Plugin{async onload(){await this.loadSettings();let t=S.createLLM(this.settings.llmType,b(this)),i=new F(t);this.addSettingTab(new $(this.app,this)),this.fileUtils=new G(this.app),this.addCommand({id:"create image",name:"create image",callback:async()=>{let s=i.CreateImage("title","logo");console.log(s)}}),this.addCommand({id:"summary by ai",name:"Generate Summary",callback:()=>this.addSummany()}),this.addCommand({id:"translate by Ai",name:"translate by Ai",callback:()=>this.translateByAi()}),this.addCommand({id:"rewrite by Ai",name:"rewrite by Ai",callback:async()=>{var p;let s=this.app.workspace.getActiveViewOfType(u.MarkdownView);if(!s){new u.Notice("No active markdown view");return}if(!s.file){new u.Notice("No active file"),console.log("No active file");return}let o=s.file.path.includes("zh-cn"),a=s.editor.getValue(),r,c,l=((p=s.file.parent)==null?void 0:p.path)||"";o?(c=`${l}/${s.file.basename.replace("zh-cn","")}.md`,r=await i.GenerateRewrite(a,{language:"US English",tone:"formal"})):(c=`${l}/${s.file.basename}.zh-cn.md`,r=await i.GenerateRewrite(a,{language:"Chinese",tone:"formal"})),await this.createNewFile(c,r)}}),this.addCommand({id:"generate-slug",name:"Generate Slug",callback:async()=>{var p;let s=this.app.workspace.getActiveViewOfType(u.MarkdownView);if(!s){new u.Notice("No active markdown view");return}if(!s.file){new u.Notice("No active file"),console.log("No active file");return}let o=s.file.path.includes("zh-cn"),a=this.app.metadataCache.getFileCache(s.file),r=(p=a==null?void 0:a.frontmatter)==null?void 0:p.title;var c="";let l=await this.generateSlug(r);if(a&&a.frontmatter){let y=a.frontmatter;o?(l=encodeURIComponent(l),y.slug=l,y.long_time_url=`https://www.huizhou92.com/zh-cn/p/${l}/`,c=Ce(`https://huizhou92.com/zh-cn/p/${l}/`)):(y.slug=l,y.long_time_url=`https://www.huizhou92.com/p/${l}/`,c=ve(`https://huizhou92.com/p/${l}/`));let d=`${s.editor.getValue()}
${c}`;s.editor.setValue(d);let f=/^---\n([\s\S]*?)\n---/,C=`---
${(0,u.stringifyYaml)(y)}---`;s.editor.setValue(d.replace(f,C))}else new u.Notice("Metadata or frontmatter is null or undefined")}}),this.addCommand({id:"increase-heading-level",name:"Increase Heading Level",callback:()=>this.changeHeadingLevel(1)}),this.addCommand({id:"decrease-heading-level",name:"Decrease Heading Level",callback:()=>this.changeHeadingLevel(-1)})}onunload(){}async generateSlug(t){return t.toLowerCase().replace(/[\s]+/g,"-").replace(/[^\w\u4e00-\u9fa5\-]/g,"").replace(/-+/g,"-")}async createNewFile(t,i){try{console.log("createNewFile:",t,"content:",i),await this.app.vault.create(t,i||"")}catch(s){throw new Error("\u521B\u5EFA\u6587\u4EF6\u5931\u8D25"+s)}}async translateByAi(){var c;let t=this.app.workspace.getActiveFile();if(!t)return;let i=t.basename,s=`${t.basename}.zh-cn.md`;this.app.fileManager.renameFile(t,s);let a=`${((c=t.parent)==null?void 0:c.path)||""}/${i}`,r=await this.readLoaclFile();await this.createNewFile(a,r)}async getFileContent(){let t=await Ee.call(this);return t?t.replace(/^---\n([\s\S]*?)\n---\n/,""):""}async readLoaclFile(){let t=await this.getFileContent();return t?await me(this,t):(new u.Notice("\u6CA1\u6709\u5185\u5BB9"),"")}async addSummany(){console.log("call addSummany"),await this.fileUtils.withActiveFile(async({view:t,isZhCN:i})=>{let s=t.editor.getValue();if(!s)return;let o=await Y(this,i?"Chinese":"American English",s);if(!o){new u.Notice("No summary generated!");return}console.log("summary:",o);let a=JSON.parse(o),r=/^---\n([\s\S]*?)\n---/,c=s.match(r);if(c){let l=(0,u.parseYaml)(c[1])||{};l.description=a.description,l.social=a.social;let p=await at(s,l);await q.call(this,this.app.workspace.getActiveFile(),p)}else{let l=`---
description: ${a.description}
social:${a.social}
 ---
${s}`;await q.call(this,this.app.workspace.getActiveFile(),l)}new u.Notice("Summany Generated!")})}async changeHeadingLevel(t){let i=await Ee.call(this);if(!i)return;let o=i.split(`
`).map(a=>{var r,c,l;if(a.startsWith("#")){let p=(l=(c=(r=a.match(/^#+/))==null?void 0:r[0])==null?void 0:c.length)!=null?l:0;return t>0&&p>=6||t<0&&p<=1?a:t>0?"#"+a:a.substring(1)}return a});await q.call(this,this.app.workspace.getActiveFile(),o.join(`
`)),new u.Notice("Heading levels updated!")}async loadSettings(){this.settings=Object.assign({},we,await this.loadData())}async saveSettings(){await this.saveData(this.settings)}};
/*! Bundled license information:

@google/generative-ai/dist/index.mjs:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@google/generative-ai/dist/index.mjs:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
