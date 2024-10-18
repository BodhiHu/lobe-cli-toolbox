"use strict";var pe=Object.defineProperty;var i=(t,e)=>pe(t,"name",{value:e,configurable:!0});var f=require("react/jsx-runtime"),g=require("@lobehub/cli-ui"),F=require("commander"),fe=require("update-notifier"),de=require("conf"),ge=require("cosmiconfig"),C=require("@inkjs/ui"),M=require("react"),u=require("chalk"),me=require("dotenv"),h=require("lodash-es"),p=require("consola"),m=require("node:path"),b=require("ink"),_=require("p-map"),he=require("langchain/text_splitter"),K=require("gpt-tokenizer"),V=require("remark-frontmatter"),G=require("remark-gfm"),ye=require("remark-parse"),ke=require("remark-stringify"),z=require("unified"),Q=require("unist-util-visit"),we=require("just-diff"),ve=require("@langchain/openai"),W=require("@langchain/core/prompts"),y=require("node:fs"),Se=require("json-stable-stringify"),Y=require("glob"),xe=require("node:process"),X=require("gray-matter");function be(t){var e=Object.create(null);return t&&Object.keys(t).forEach(function(n){if(n!=="default"){var o=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,o.get?o:{enumerable:!0,get:i(function(){return t[n]},"get")})}}),e.default=t,Object.freeze(e)}i(be,"_interopNamespaceDefault");var Te=be(xe),Oe="@lobehub/i18n-cli",Ce="1.19.1",je="Lobe i18n is a CLI tool that automate translate your i18n localization with AI",Ne=["ai","i18n","openai","gpt","langchain"],Fe="https://github.comlobehub/lobe-cli-toolbox/tree/master/packages/lobe-i18n",Me={url:"https://github.com/lobehub/lobe-cli-toolbox/issues/new"},Le={type:"git",url:"https://github.com/lobehub/lobe-cli-toolbox.git"},Ie="MIT",Ae="LobeHub <i@lobehub.com>",Ee=!1,$e="module",qe={"@":"./src"},Pe={require:{types:"./dist/index.d.cts",default:"./dist/index.cjs"},import:{types:"./dist/index.d.mts",default:"./dist/index.mjs"}},Re="./dist/index.cjs",Je="./dist/index.mjs",De="./dist/index.d.cts",Ue={"lobe-i18n":"dist/cli.js"},Be=["dist"],_e={build:"npm run type-check && pkgroll --minify -p tsconfig.prod.json --env.NODE_ENV=production && npm run shebang",dev:"pkgroll -p tsconfig.prod.json --env.NODE_ENV=development --watch",link:"npm run build && npm link -f",shebang:"lobe-shebang -t ./dist/cli.js",start:"node ./dist/cli.js",test:"vitest --passWithNoTests","test:coverage":"vitest run --coverage --passWithNoTests","type-check":"tsc --noEmit"},Ke={"@inkjs/ui":"^1.0.0","@langchain/core":"^0.2.20","@langchain/openai":"^0.2.5","@lobehub/cli-ui":"1.10.0",chalk:"^5.3.0",commander:"^12.1.0",conf:"^12.0.0",consola:"^3.2.3",cosmiconfig:"^9.0.0",dotenv:"^16.4.5","fast-deep-equal":"^3.1.3",glob:"^10.4.5","gpt-tokenizer":"^2.2.1","gray-matter":"^4.0.3",ink:"^4.4.1","json-stable-stringify":"^1.1.1","just-diff":"^6.0.2",langchain:"^0.2.12","lodash-es":"^4.17.21","p-map":"^7.0.2",pangu:"^4.0.7",react:"^18.3.1","remark-frontmatter":"^4.0.1","remark-gfm":"^3.0.1","remark-parse":"^10.0.2","remark-stringify":"^10.0.3",swr:"^2.2.5",unified:"^11.0.5","unist-util-visit":"^5.0.0","update-notifier":"^7.2.0",zustand:"^4.5.4"},Ve={"@types/json-stable-stringify":"^1.0.36"},Ge={ink:">=4",react:">=18"},ze={node:">=18"},Qe={access:"public",registry:"https://registry.npmjs.org/"},A={name:Oe,version:Ce,description:je,keywords:Ne,homepage:Fe,bugs:Me,repository:Le,license:Ie,author:Ae,sideEffects:Ee,type:$e,imports:qe,exports:Pe,main:Re,module:Je,types:De,bin:Ue,files:Be,scripts:_e,dependencies:Ke,devDependencies:Ve,peerDependencies:Ge,engines:ze,publishConfig:Qe},j=(t=>(t.MDAST="mdast",t.STRING="string",t))(j||{});const E=i(t=>`.${t}.md`,"getDefaultExtension"),We={"gpt-3.5-turbo":16385,"gpt-3.5-turbo-0125":16385,"gpt-3.5-turbo-1106":16385,"gpt-3.5-turbo-16k":16385,"gpt-4":8192,"gpt-4-0613":8192,"gpt-4-32k":32768,"gpt-4-0125-preview":128e3,"gpt-4-vision-preview":128e3,"gpt-4-turbo":128e3,"gpt-4-turbo-vision":128e3,"gpt-4-turbo-preview":128e3,"gpt-4-1106-vision-preview":128e3,"gpt-4-1106-preview":128e3,"gpt-4o-2024-05-13":128e3,"gpt-4o-mini":16385},H="gpt-4o-mini",Ye={concurrency:5,markdown:{entry:[],mode:j.STRING,outputExtensions:E},modelName:H,temperature:0},x=i((t,e)=>{t[e]||g.alert.error(`Can't find ${u.bold.yellow("outputLocales")} in config`)},"checkOptionKeys"),Z={apiBaseUrl:{default:"",type:"string"},openaiToken:{default:"",type:"string"}},$=new de({projectName:"lobe-i18n",schema:Z});class Xe{static{i(this,"ExplorerConfig")}explorer;customConfig;constructor(){this.explorer=ge.cosmiconfigSync("i18n")}loadCustomConfig(e){this.customConfig=e}getConfigFile(){return this.customConfig?this.explorer.load(this.customConfig)?.config:this.explorer.search()?.config}}const q=new Xe;me.config();const P=i(t=>$.get(t),"getConfig"),He=i(t=>Z[t].default,"getDefulatConfig"),Ze=i((t,e)=>$.set(t,e),"setConfig"),et=i(()=>process.env.OPENAI_API_KEY||P("openaiToken"),"getOpenAIApiKey"),tt=i(()=>process.env.OPENAI_PROXY_URL||P("apiBaseUrl"),"getOpenAIProxyUrl"),R=i(()=>{const t=q.getConfigFile();return t?h.merge(Ye,t):g.alert.error(`Can't find ${u.bold.yellow("config")}`,!0)},"getConfigFile"),nt=i(()=>{const t=R();return x(t,"entry"),x(t,"entryLocale"),x(t,"output"),x(t,"outputLocales"),t},"getLocaleConfig"),ot=i(()=>{const t=R();if(!t.markdown)return g.alert.error(`Can't find ${u.bold.yellow("config.markdown")}`,!0);const e=h.merge(t?.markdown||{},{entryLocale:t?.markdown?.entryLocale||t.entryLocale,outputLocales:t?.markdown?.outputLocales||t.outputLocales});return x(e,"entry"),x(e,"entryLocale"),x(e,"outputLocales"),e},"getMarkdownConfigFile");var k={getConfig:P,getConfigFile:R,getDefulatConfig:He,getLocaleConfig:nt,getMarkdownConfigFile:ot,getOpenAIApiKey:et,getOpenAIProxyUrl:tt,setConfig:Ze};const rt=i(()=>{const t=$.store;return{get:k.getConfig,getDefault:k.getDefulatConfig,set:k.setConfig,store:t}},"useConfStore"),st=M.memo(()=>{const[t,e]=M.useState(),{store:n,set:o,getDefault:r}=rt(),a=i((c,l)=>{o(c,l),e("")},"setConfig"),s=M.useMemo(()=>[{children:f.jsx(C.TextInput,{defaultValue:n.openaiToken,onSubmit:i(c=>a("openaiToken",c),"onSubmit"),placeholder:"Input OpenAI token..."}),defaultValue:r("openaiToken"),key:"openaiToken",label:"OpenAI token",showValue:!1,value:n.openaiToken},{children:f.jsx(C.TextInput,{defaultValue:n.apiBaseUrl,onSubmit:i(c=>a("apiBaseUrl",c),"onSubmit"),placeholder:"Set openAI API proxy, default value: https://api.openai.com/v1/..."}),defaultValue:r("apiBaseUrl"),desc:"OpenAI API proxy, default value: https://api.openai.com/v1/",key:"apiBaseUrl",label:"OpenAI API proxy",showValue:!1,value:n.apiBaseUrl}],[n]);return f.jsx(g.ConfigPanel,{active:t,items:s,logo:"\u{1F92F}",setActive:e,title:"Lobe I18N Config"})}),L=M.memo(({hide:t,filename:e,to:n,from:o,progress:r,maxStep:a,step:s,isLoading:c,needToken:l})=>{const d=g.useTheme();return t?null:f.jsxs(g.SplitView,{flexDirection:"column",children:[f.jsx(b.Text,{backgroundColor:d.colorBgLayout,color:d.colorText,children:` \u{1F4DD} ${e} `}),f.jsxs(b.Text,{color:d.colorTextDescription,children:["- from ",f.jsx(b.Text,{bold:!0,color:d.colorInfo,children:o})," to ",f.jsx(b.Text,{bold:!0,color:d.colorInfo,children:n}),f.jsx(b.Text,{color:d.colorTextDescription,children:` [Tokens: ${l}]`})]}),c?f.jsxs(b.Box,{children:[f.jsx(C.Spinner,{label:` ${r}% [${s}/${a} chunks] `}),f.jsx(C.ProgressBar,{value:r})]}):f.jsx(C.StatusMessage,{variant:"success",children:"Success"})]})}),it=3,I=2,ee=2,w=i(t=>K.encode(t).length,"calcToken"),N=i(t=>K.encode(String(t)).length,"calcEncodedKeyToken"),te=i(t=>N(t)+it,"calcPrimitiveValueToken"),ne=i((t,e=0)=>h.sumBy(Object.entries(t),([n,o])=>N(n)+I+(h.isPlainObject(o)?ne(o,e+1):te(o)))+ee+e,"calcJsonToken"),at=new Set([`
`,`\r
`,"[!NOTE]","[!IMPORTANT]","[!WARNING]","[!CAUTION]","\\[!NOTE]","\\[!IMPORTANT]","\\[!WARNING]","\\[!CAUTION]","\\[!NOTE]\\","\\[!IMPORTANT]\\","\\[!WARNING]\\","\\[!CAUTION]\\"]),ct=i(t=>at.has(t)?!0:/^[\s\p{P}\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}]*$/u.test(t.replaceAll(" ","")),"checkMdString"),oe=i(async t=>z.unified().use(ye).use(G).use(V).parse(t.trim()),"convertMarkdownToMdast"),lt=i((t,e)=>{const n={};let o=0;return Q.visit(t,e||"text",r=>{n[o]=r.value,o++}),n},"convertMdastToMdastObj"),ut=i(t=>{const e={};for(const[n,o]of Object.entries(t))ct(o)||(e[Number(n)]=o);return e},"pickMdastObj"),pt=i(({mdast:t,entry:e,target:n},o)=>{const r={...e,...n};let a=0;return Q.visit(t,o||"text",s=>{s.value=r[a],a++}),t},"mergeMdastObj"),J=i(async t=>z.unified().use(ke,{bullet:"-",emphasis:"*",fences:!0,listItemIndent:1,rule:"-",strong:"*",tightDefinitions:!0}).use(V).use(G).stringify(t),"convertMdastToMarkdown"),D=i((t,e)=>{const n=we.diff(e,t),o=n.filter(c=>c.op==="add"),r=n.filter(c=>c.op==="remove"),a=h.cloneDeep(e),s={};for(const c of r)h.unset(a,c.path);for(const c of o)h.set(s,c.path,c.value);return{add:o,entry:s,remove:r,target:a}},"diff"),ft=i((t,e)=>h.reduce(Object.entries(t),(n,[o,r])=>{let[a,s]=n.pop()||[{},ee];const c=h.isPlainObject(r)?ne(r,1):te(r);return s+N(o)+I+c<=e?(a[o]=r,s+=N(o)+I+c,n.push([a,s])):n.push([a,s],[{[o]:r},N(o)+I+c]),n},[]).map(([n])=>n),"splitJSONtoSmallChunks"),re=i((t,e)=>{let n=(We[t.modelName||H]-w(e))/3;return n||(n=128e3),t.splitToken&&(n=t.splitToken),n=Math.floor(n),console.info("INFO: splitToken =",n),n},"getSplitToken"),dt=i((t,e,n,o)=>{const r=D(e,n).entry,a=re(t,o);return ft(r,a)},"splitJsonToChunks");let gt=class{static{i(this,"TranslateMarkdown")}mdast;entry={};config;check;definition;constructor(e){this.config=e,this.check=["text","yaml",e?.markdown?.translateCode&&"code"].filter(Boolean)}async genTarget(e){return this.mdast=await oe(e),this.entry=lt(this.mdast,this.check),ut(this.entry)}async genMarkdownByMdast(e){if(!e)return;const n=pt({entry:this.entry,mdast:this.mdast,target:e},this.check);return J(n)}async clearMarkdownString(e){const n=[],o=await oe(e);return o.children=o.children.map(r=>r.type==="definition"?(n.push(r),!1):r).filter(Boolean),{content:await J(o),definition:await J({children:n,type:"root"})}}async genSplitMarkdown(e,n){this.definition="";const{content:o,definition:r}=await this.clearMarkdownString(e);return this.definition=r,await he.RecursiveCharacterTextSplitter.fromLanguage("markdown",{chunkOverlap:0,chunkSize:re(this.config,n),lengthFunction:i(s=>w(s),"lengthFunction")}).splitText(o)}async genMarkdownByString(e){return[...e,this.definition].join(`

`)}};const mt=i(t=>{let e={};for(const n of t)e=h.merge(e,n);return e},"mergeJsonFromChunks"),se="",ht=i((t=se)=>W.ChatPromptTemplate.fromMessages([["system",["You are a translation expert.","Translate the i18n JSON file from {from} to {to}",t&&`Here are some reference to help with better translation.  ---${t}---`,"Keep the keys the same as the original file and make sure the output remains a valid i18n JSON file."].filter(Boolean).join(`
`)],["human",["{json}"].join(`
`)]]),"promptJsonTranslate"),yt=i((t=se)=>W.ChatPromptTemplate.fromMessages([["system",["You are a translation expert.","Translate the markdown from {from} to {to}.",t&&`Here are some reference to help with better translation.  ---${t}---`].filter(Boolean).join(`
`)],["human","{text}"]]),"promptStringTranslate"),kt=i(t=>{const e=i(n=>{switch(n){case"human":return"user";case"system":case"function":case"tool":return n;case"ai":case"generic":case"remove":default:return"assistant"}},"typeToRole");return t.map(n=>({role:e(n._getType()),content:n.content}))},"lcMsgs_2_oaiMsgs");let wt=class{static{i(this,"TranslateLocale")}model;config;openAIProxyUrl;openAIApiKey;isJsonMode;promptJson;promptString;constructor(e,n,o){this.config=e,this.openAIProxyUrl=o,this.openAIApiKey=n,console.info("INFO: i18n config =",this.config),this.model=new ve.ChatOpenAI({configuration:{baseURL:o},maxConcurrency:e.concurrency,maxRetries:4,modelName:e.modelName,openAIApiKey:n,temperature:e.temperature,topP:e.topP}),this.promptJson=ht(e.reference),this.promptString=yt(e.reference),this.isJsonMode=!!this.config?.experimental?.jsonMode}async runByString({from:e,to:n,text:o,leftRetries:r=void 0}){let a="",s=null;try{const c=await this.promptString.formatMessages({from:e||this.config.entryLocale,text:o,to:n});let l="";const d=kt(c),v=new Date().getTime();if(a=await(await fetch(`${this.openAIProxyUrl}/chat/completions`,{method:"POST",headers:{Authorization:`Bearer ${this.openAIApiKey}`,"Content-Type":"application/json"},body:JSON.stringify({messages:d,model:this.config.modelName,stream:!1,temperature:0,max_tokens:this.config.splitToken})})).text(),s=JSON.parse(a),l=s?.choices?.[0]?.message?.content,!l)throw console.info("ERROR: invalid reponse, resData =",s),new Error("invalid reponse");return console.info(`INFO: took ${(new Date().getTime()-v)/1e3} seconds`),l}catch(c){if(console.error("ERROR: error caught ----------------------------------:",c),console.error(`  => full response text =
`,a),console.error("-------------------------------------------------------"),r===void 0&&(r=5),r>0)return console.info("INFO: will retry in 90 seconds..."),console.info("INFO: tick =",new Date().toUTCString()),await new Promise((d,v)=>{setTimeout(()=>{d(0)},90*1e3)}),console.info("INFO: 90 seconds reached, tick =",new Date().toUTCString()),this.runByString({from:e,to:n,text:o,leftRetries:r-1});console.error("ERROR: reached max retries, abort."),this.handleError(c)}}async runByJson({from:e,to:n,json:o}){try{const r=await this.promptJson.formatMessages({from:e||this.config.entryLocale,json:JSON.stringify(o),to:n}),a=await this.model.invoke(r,this.isJsonMode?{response_format:{type:"json_object"}}:void 0),s=this.isJsonMode?a.content:a.text;return s||this.handleError(),JSON.parse(s)}catch(r){this.handleError(r)}}handleError(e){g.alert.error(`Translate failed, ${e||"please check your network or try again..."}`,!0),console.error("ERROR:",e)}};class ie{static{i(this,"I18n")}config;step=0;maxStep=1;translateLocaleService;translateMarkdownService;constructor({openAIApiKey:e,openAIProxyUrl:n,config:o}){this.config=o,this.translateLocaleService=new wt(o,e,n),this.translateMarkdownService=new gt(o)}async translateMarkdown(e){return e.mode===j.STRING?this.translateMarkdownByString(e):this.translateMarkdownByMdast(e)}async translateMarkdownByString({md:e,to:n,onProgress:o,from:r}){const a=await this.translateLocaleService.promptString.formatMessages({from:r,text:"",to:n});console.info(`
INFO: translate markdown from ${r}: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
`+e.substring(0,100),`
...
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
`);const s=await this.translateMarkdownService.genSplitMarkdown(e,JSON.stringify(a));if(this.maxStep=s.length,this.step=0,s.length===0)return;const c=s.length*w(JSON.stringify(a))+w(JSON.stringify(s));o?.({isLoading:!0,maxStep:this.maxStep,needToken:c,progress:0,step:0}),console.info(`INFO: splitted into ${s.length} chunks based on splitToken
`);const l=await _(s,async v=>{o?.({isLoading:this.step<this.maxStep,maxStep:this.maxStep,needToken:c,progress:this.step<this.maxStep?Math.floor(this.step/this.maxStep*100):100,step:this.step});const S=await this.translateLocaleService.runByString({from:r,text:v,to:n});return this.step<this.maxStep&&this.step++,console.info(`
--> translated to ${n}++++++++++++++++++++++++++++++++++++++++++++++
`+S.substring(0,100),`
...
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
`),S},{concurrency:this.config?.concurrency});return o?.({isLoading:!1,maxStep:this.maxStep,needToken:c,progress:100,step:this.maxStep}),{result:await this.translateMarkdownService.genMarkdownByString(l),tokenUsage:c+w(JSON.stringify(l))}}async translateMarkdownByMdast({md:e,...n}){const o=await this.translateMarkdownService.genTarget(e),r=await this.translate({...n,entry:o,target:{}});if(!r?.result)return;const a=await this.translateMarkdownService.genMarkdownByMdast(r);if(a)return{result:a,tokenUsage:r.tokenUsage}}async translate({entry:e,target:n,to:o,onProgress:r,from:a}){const s=await this.translateLocaleService.promptJson.formatMessages({from:a,json:{},to:o}),c=dt(this.config,e,n,JSON.stringify(s));if(this.maxStep=c.length,this.step=0,c.length===0)return;const l=c.length*w(JSON.stringify(s))+w(JSON.stringify(c));r?.({isLoading:!0,maxStep:this.maxStep,needToken:l,progress:0,step:0});const d=await _(c,async S=>{r?.({isLoading:this.step<this.maxStep,maxStep:this.maxStep,needToken:l,progress:this.step<this.maxStep?Math.floor(this.step/this.maxStep*100):100,step:this.step});const ue=await this.translateLocaleService.runByJson({from:a,json:S,to:o});return this.step<this.maxStep&&this.step++,ue},{concurrency:this.config?.concurrency});return r?.({isLoading:!1,maxStep:this.maxStep,needToken:l,progress:100,step:this.maxStep}),{result:await h.merge(n,mt(d)),tokenUsage:l+w(JSON.stringify(d))}}}const U=i(t=>{const e=y.readFileSync(t,"utf8");return JSON.parse(e)},"readJSON"),T=i((t,e)=>{const n=Se(e,{space:"  "});y.writeFileSync(t,n,"utf8")},"writeJSON"),vt=i(t=>y.readFileSync(t,"utf8"),"readMarkdown"),St=i((t,e)=>{y.writeFileSync(t,e,"utf8")},"writeMarkdown"),xt=i(t=>{for(const e of t.outputLocales){const n=m.resolve(t.output,`${e}.json`);y.existsSync(n)||T(n,{})}},"checkLocales"),bt=i((t,e)=>{for(const n of t.outputLocales){const o=m.resolve(t.output,n);y.existsSync(o)||y.mkdirSync(o)}for(const n of t.outputLocales)for(const o of e){const r=m.resolve(t.output,n,o);try{const a=m.dirname(r);y.mkdirSync(a,{recursive:!0})}catch{}y.existsSync(r)||T(r,{})}},"checkLocaleFolders"),Tt=i(t=>{try{const e=m.resolve("./",t.entry);return y.existsSync(e)||g.alert.error(`Can't find ${u.bold.yellow(t.entry)} in dir`,!0),U(e)}catch{Te.exit(1)}},"getEntryFile"),Ot=i(t=>{const e=t.entry.replaceAll("*","").replaceAll("*.json",""),n=Y.globSync(m.join(e,"**/*.json").replaceAll("\\","/"),{nodir:!0}),o={};for(const r of n)o[m.relative(e,r)]=U(r);if(Object.keys(o).length===0){g.alert.error(`Can't find .json files in ${u.bold.yellow(e)}`,!0);return}return o},"getEntryFolderFiles"),ae=i(t=>{const e=U(t);return e||(T(t,{}),{})},"getLocaleObj"),B=i((t,e)=>{try{if(t===e)return!0;if(typeof t!=typeof e)return!1;if(typeof t=="object"&&typeof e=="object"){const n=Object.keys(t),o=Object.keys(e);if(n.length!==o.length)return!1;for(const r of n)if(!o.includes(r)||!B(t[r],e[r]))return!1}return typeof t==typeof e}catch{return!1}},"isEqualJsonKeys");class Ct{static{i(this,"TranslateLocale")}config;query=[];i18n;constructor(){this.config=k.getLocaleConfig(),this.i18n=new ie({config:this.config,openAIApiKey:k.getOpenAIApiKey(),openAIProxyUrl:k.getOpenAIProxyUrl()})}async start(){p.consola.start("Lobe I18N is analyzing your project... \u{1F92F}\u{1F30F}\u{1F50D}"),!this.config.entry.includes(".json")||this.config.entry.includes("*")?this.genFolderQuery():this.genFlatQuery(),this.query.length>0?await this.runQuery():p.consola.success("No content requiring translation was found."),p.consola.success("All i18n tasks have been completed\uFF01")}async runQuery(){p.consola.info(`Current model setting: ${u.cyan(this.config.modelName)} (temperature: ${u.cyan(this.config.temperature)}) ${this.config.experimental?.jsonMode?u.red(" [JSON Mode]"):""}}`);let e=0;for(const n of this.query){const o={filename:n.filename,from:n.from||this.config.entryLocale,to:n.to},{rerender:r,clear:a}=g.render(f.jsx(L,{hide:!0,isLoading:!0,maxStep:1,progress:0,step:0,...o})),s=await this.i18n.translate({...n,onProgress:i(l=>{l.maxStep>0?r(f.jsx(L,{...l,...o})):a()},"onProgress")});a();const c=m.relative(".",n.filename);s?.result&&Object.keys(s.result).length>0?(T(n.filename,s.result),e+=s.tokenUsage,p.consola.success(u.yellow(c),u.gray(`[Token usage: ${s.tokenUsage}]`))):p.consola.warn("No translation result was found:",u.yellow(c))}e>0&&p.consola.info("Total token usage:",u.cyan(e))}genFolderQuery(){const e=this.config,n=Ot(e),o=Object.keys(n);p.consola.info(`Running in ${u.bold.cyan("\u{1F4C2} Folder Mode")} and has found ${u.bold.cyan(o.length)} files.`),bt(e,o);for(const r of e.outputLocales)for(const a of o){p.consola.info(`${u.cyan(r)}${u.gray(" - ")}${u.yellow(a)}`);const s=m.resolve(e.output,r,a),c=n[a],l=D(c,ae(s)).target;T(s,l),!B(c,l)&&this.query.push({entry:c,filename:s,from:e.entryLocale,target:l,to:r})}}genFlatQuery(){const e=this.config,n=Tt(e);p.consola.start(`Running in ${u.bold.cyan("\u{1F4C4} Flat Mode")}, and translating ${u.bold.cyan(e.outputLocales.join("/"))} locales..`),xt(e);for(const o of e.outputLocales){const r=m.resolve(e.output,o)+".json",a=n,s=D(a,ae(r)).target;T(r,s),!B(a,s)&&this.query.push({entry:a,filename:r,from:e.entryLocale,target:s,to:o})}}}const ce=i((t,e)=>t.map(n=>n.includes("*")||n.includes(e)?n:m.join(n,`**/*${e}`).replaceAll("\\","/")),"matchInputPattern");class le{static{i(this,"TranslateMarkdown")}config;markdownConfig;query=[];i18n;constructor(){this.markdownConfig=k.getMarkdownConfigFile();const e=k.getConfigFile();this.config={...e,entryLocale:e.entryLocale||this.markdownConfig.entryLocale,markdown:this.markdownConfig,outputLocales:e.outputLocales||this.markdownConfig.outputLocales},this.i18n=new ie({config:this.config,openAIApiKey:k.getOpenAIApiKey(),openAIProxyUrl:k.getOpenAIProxyUrl()})}async start(){p.consola.start("Lobe I18N is analyzing your markdown... \u{1F92F}\u{1F30F}\u{1F50D}");const e=this.markdownConfig.entry;(!e||e.length===0)&&g.alert.error("No markdown entry was found.",!0);let n=Y.globSync(ce(e,".md"),{ignore:this.markdownConfig.exclude?ce(this.markdownConfig.exclude||[],".md"):void 0,nodir:!0});this.markdownConfig.entryExtension&&(n=n.filter(o=>o.includes(this.markdownConfig.entryExtension||".md"))),(!n||n.length===0)&&g.alert.error("No markdown entry was found.",!0),this.genFilesQuery(n),this.query.length>0?await this.runQuery():p.consola.success("No content requiring translation was found."),p.consola.success("All i18n tasks have been completed\uFF01")}async runQuery(){p.consola.info(`Current model setting: ${u.cyan(this.config.modelName)} (temperature: ${u.cyan(this.config.temperature)}) ${this.config.experimental?.jsonMode?u.red(" [JSON Mode]"):""}}`);let e=0;for(const n of this.query){const o={filename:n.filename,from:n.from||this.markdownConfig.entryLocale||this.config.entryLocale,to:n.to},{rerender:r,clear:a}=g.render(f.jsx(L,{hide:!0,isLoading:!0,maxStep:1,progress:0,step:0,...o})),s=await this.i18n.translateMarkdown({...n,onProgress:i(l=>{l.maxStep>0?r(f.jsx(L,{...l,...o})):a()},"onProgress")});a();const c=m.relative(".",n.filename);if(s?.result&&Object.keys(s.result).length>0){let l=s.result;this.markdownConfig.includeMatter||(l=X.stringify(s.result,n.matter)),St(n.filename,l),e+=s.tokenUsage,p.consola.success(u.yellow(c),u.gray(`[Token usage: ${s.tokenUsage}]`))}else p.consola.warn("No translation result was found:",u.yellow(c))}e>0&&p.consola.info("Total token usage:",u.cyan(e))}genFilesQuery(e,n){const o=this.markdownConfig;n||p.consola.start(`Running in ${u.bold.cyan(`\u{1F4C4} ${e.length} Markdown`)}, and translating to ${u.bold.cyan(o?.outputLocales?.join("/"))} locales..`);for(const r of e)try{const a=vt(r);for(const s of o.outputLocales||[]){const c=this.getTargetExtension(s,r,a),l=this.getTargetFilename(r,c);if(y.existsSync(l))continue;const d=this.getMode(r,a),{data:v,content:S}=X(a);p.consola.info(`\u{1F4C4} To ${s}: ${u.yellow(l)}`),this.query.push({filename:l,from:o.entryLocale,matter:v,md:this.markdownConfig.includeMatter?a:S,mode:d,to:s})}}catch{g.alert.error(`${r} not found`,!0)}}getTargetExtension(e,n,o){return this.markdownConfig.outputExtensions?.(e,{fileContent:o,filePath:n,getDefaultExtension:E})||E(e)}getTargetFilename(e,n){if(this.markdownConfig.entryExtension)return m.resolve(".",e.replace(this.markdownConfig.entryExtension||".md",n));if(this.markdownConfig.entryLocale&&e.includes(`.${this.markdownConfig.entryLocale}.`))return[e.split(`.${this.markdownConfig.entryLocale}.`)[0],n].join("");{const o=e.split(".");return o.pop(),[o.join("."),n].join("")}}getMode(e,n){const o=this.markdownConfig.mode;return o?h.isString(o)?o:o({fileContent:n,filePath:e})||j.STRING:j.STRING}}const jt=fe({pkg:A,shouldNotifyInNpmScript:!0});jt.notify({isGlobal:!0});const O=new F.Command;O.name("lobe-i18n").description(A.description).version(A.version).addOption(new F.Option("-o, --option","Setup lobe-i18n preferences")).addOption(new F.Option("-c, --config <string>","Specify the configuration file")).addOption(new F.Option("-m, --with-md","Run i18n translation and markdown translation simultaneously")),O.command("locale",{isDefault:!0}).action(async()=>{const t=O.opts();t.option?g.render(f.jsx(st,{})):(t.config&&q.loadCustomConfig(t.config),await new Ct().start(),t.withMd&&await new le().start())}),O.command("md").action(async()=>{const t=O.opts();t.config&&q.loadCustomConfig(t.config),await new le().start()}),O.parse();
