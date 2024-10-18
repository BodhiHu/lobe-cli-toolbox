#!/usr/bin/env node
var xe=Object.defineProperty;var a=(t,e)=>xe(t,"name",{value:e,configurable:!0});var be=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);import{jsx as m,jsxs as L}from"react/jsx-runtime";import{alert as g,ConfigPanel as Te,useTheme as ve,SplitView as Oe,render as I}from"@lobehub/cli-ui";import{Command as Ce,Option as j}from"commander";import Ne from"update-notifier";import Me from"conf";import{cosmiconfigSync as Fe}from"cosmiconfig";import{TextInput as V,Spinner as Le,ProgressBar as Ie,StatusMessage as je}from"@inkjs/ui";import{memo as Q,useState as Ae,useMemo as Ee}from"react";import u from"chalk";import $e from"dotenv";import{merge as N,sumBy as Je,isPlainObject as z,cloneDeep as Re,unset as Pe,set as De,reduce as Ue,isString as Be}from"lodash-es";import{consola as p}from"consola";import{resolve as w,dirname as _e,join as W,relative as A}from"node:path";import{Text as T,Box as Ke}from"ink";import Y from"p-map";import{RecursiveCharacterTextSplitter as qe}from"langchain/text_splitter";import{encode as X}from"gpt-tokenizer";import H from"remark-frontmatter";import Z from"remark-gfm";import Ge from"remark-parse";import Ve from"remark-stringify";import{unified as ee}from"unified";import{visit as te}from"unist-util-visit";import{diff as Qe}from"just-diff";import{ChatOpenAI as ze}from"@langchain/openai";import{ChatPromptTemplate as ne}from"@langchain/core/prompts";import{writeFileSync as oe,readFileSync as re,existsSync as v,mkdirSync as se}from"node:fs";import We from"json-stable-stringify";import{globSync as ie}from"glob";import*as Ye from"node:process";import ae from"gray-matter";var Ht=be((q,G)=>{var Xe="@lobehub/i18n-cli",He="1.19.1",Ze="Lobe i18n is a CLI tool that automate translate your i18n localization with AI",et=["ai","i18n","openai","gpt","langchain"],tt="https://github.comlobehub/lobe-cli-toolbox/tree/master/packages/lobe-i18n",nt={url:"https://github.com/lobehub/lobe-cli-toolbox/issues/new"},ot={type:"git",url:"https://github.com/lobehub/lobe-cli-toolbox.git"},rt="MIT",st="LobeHub <i@lobehub.com>",it=!1,at="module",ct={"@":"./src"},q={require:{types:"./dist/index.d.cts",default:"./dist/index.cjs"},import:{types:"./dist/index.d.mts",default:"./dist/index.mjs"}},lt="./dist/index.cjs",G="./dist/index.mjs",ut="./dist/index.d.cts",pt={"lobe-i18n":"dist/cli.js"},ft=["dist"],mt={build:"npm run type-check && pkgroll --minify -p tsconfig.prod.json --env.NODE_ENV=production && npm run shebang",dev:"pkgroll -p tsconfig.prod.json --env.NODE_ENV=development --watch",link:"npm run build && npm link -f",shebang:"lobe-shebang -t ./dist/cli.js",start:"node ./dist/cli.js",test:"vitest --passWithNoTests","test:coverage":"vitest run --coverage --passWithNoTests","type-check":"tsc --noEmit"},dt={"@inkjs/ui":"^1.0.0","@langchain/core":"^0.2.20","@langchain/openai":"^0.2.5","@lobehub/cli-ui":"1.10.0",chalk:"^5.3.0",commander:"^12.1.0",conf:"^12.0.0",consola:"^3.2.3",cosmiconfig:"^9.0.0",dotenv:"^16.4.5","fast-deep-equal":"^3.1.3",glob:"^10.4.5","gpt-tokenizer":"^2.2.1","gray-matter":"^4.0.3",ink:"^4.4.1","json-stable-stringify":"^1.1.1","just-diff":"^6.0.2",langchain:"^0.2.12","lodash-es":"^4.17.21","p-map":"^7.0.2",pangu:"^4.0.7",react:"^18.3.1","remark-frontmatter":"^4.0.1","remark-gfm":"^3.0.1","remark-parse":"^10.0.2","remark-stringify":"^10.0.3",swr:"^2.2.5",unified:"^11.0.5","unist-util-visit":"^5.0.0","update-notifier":"^7.2.0",zustand:"^4.5.4"},gt={"@types/json-stable-stringify":"^1.0.36"},ht={ink:">=4",react:">=18"},yt={node:">=18"},kt={access:"public",registry:"https://registry.npmjs.org/"},E={name:Xe,version:He,description:Ze,keywords:et,homepage:tt,bugs:nt,repository:ot,license:rt,author:st,sideEffects:it,type:at,imports:ct,exports:q,main:lt,module:G,types:ut,bin:pt,files:ft,scripts:mt,dependencies:dt,devDependencies:gt,peerDependencies:ht,engines:yt,publishConfig:kt},O=(t=>(t.MDAST="mdast",t.STRING="string",t))(O||{});const $=a(t=>`.${t}.md`,"getDefaultExtension"),wt={"gpt-3.5-turbo":16385,"gpt-3.5-turbo-0125":16385,"gpt-3.5-turbo-1106":16385,"gpt-3.5-turbo-16k":16385,"gpt-4":8192,"gpt-4-0613":8192,"gpt-4-32k":32768,"gpt-4-0125-preview":128e3,"gpt-4-vision-preview":128e3,"gpt-4-turbo":128e3,"gpt-4-turbo-vision":128e3,"gpt-4-turbo-preview":128e3,"gpt-4-1106-vision-preview":128e3,"gpt-4-1106-preview":128e3,"gpt-4o-2024-05-13":128e3,"gpt-4o-mini":16385},ce="gpt-4o-mini",St={concurrency:5,markdown:{entry:[],mode:O.STRING,outputExtensions:$},modelName:ce,temperature:0},S=a((t,e)=>{t[e]||g.error(`Can't find ${u.bold.yellow("outputLocales")} in config`)},"checkOptionKeys"),le={apiBaseUrl:{default:"",type:"string"},openaiToken:{default:"",type:"string"}},J=new Me({projectName:"lobe-i18n",schema:le});class xt{static{a(this,"ExplorerConfig")}explorer;customConfig;constructor(){this.explorer=Fe("i18n")}loadCustomConfig(e){this.customConfig=e}getConfigFile(){return this.customConfig?this.explorer.load(this.customConfig)?.config:this.explorer.search()?.config}}const R=new xt;$e.config();const P=a(t=>J.get(t),"getConfig"),bt=a(t=>le[t].default,"getDefulatConfig"),Tt=a((t,e)=>J.set(t,e),"setConfig"),vt=a(()=>process.env.OPENAI_API_KEY||P("openaiToken"),"getOpenAIApiKey"),Ot=a(()=>process.env.OPENAI_PROXY_URL||P("apiBaseUrl"),"getOpenAIProxyUrl"),D=a(()=>{const t=R.getConfigFile();return t?N(St,t):g.error(`Can't find ${u.bold.yellow("config")}`,!0)},"getConfigFile"),Ct=a(()=>{const t=D();return S(t,"entry"),S(t,"entryLocale"),S(t,"output"),S(t,"outputLocales"),t},"getLocaleConfig"),Nt=a(()=>{const t=D();if(!t.markdown)return g.error(`Can't find ${u.bold.yellow("config.markdown")}`,!0);const e=N(t?.markdown||{},{entryLocale:t?.markdown?.entryLocale||t.entryLocale,outputLocales:t?.markdown?.outputLocales||t.outputLocales});return S(e,"entry"),S(e,"entryLocale"),S(e,"outputLocales"),e},"getMarkdownConfigFile");var d={getConfig:P,getConfigFile:D,getDefulatConfig:bt,getLocaleConfig:Ct,getMarkdownConfigFile:Nt,getOpenAIApiKey:vt,getOpenAIProxyUrl:Ot,setConfig:Tt};const Mt=a(()=>{const t=J.store;return{get:d.getConfig,getDefault:d.getDefulatConfig,set:d.setConfig,store:t}},"useConfStore"),Ft=Q(()=>{const[t,e]=Ae(),{store:n,set:o,getDefault:r}=Mt(),i=a((c,l)=>{o(c,l),e("")},"setConfig"),s=Ee(()=>[{children:m(V,{defaultValue:n.openaiToken,onSubmit:a(c=>i("openaiToken",c),"onSubmit"),placeholder:"Input OpenAI token..."}),defaultValue:r("openaiToken"),key:"openaiToken",label:"OpenAI token",showValue:!1,value:n.openaiToken},{children:m(V,{defaultValue:n.apiBaseUrl,onSubmit:a(c=>i("apiBaseUrl",c),"onSubmit"),placeholder:"Set openAI API proxy, default value: https://api.openai.com/v1/..."}),defaultValue:r("apiBaseUrl"),desc:"OpenAI API proxy, default value: https://api.openai.com/v1/",key:"apiBaseUrl",label:"OpenAI API proxy",showValue:!1,value:n.apiBaseUrl}],[n]);return m(Te,{active:t,items:s,logo:"\u{1F92F}",setActive:e,title:"Lobe I18N Config"})}),M=Q(({hide:t,filename:e,to:n,from:o,progress:r,maxStep:i,step:s,isLoading:c,needToken:l})=>{const f=ve();return t?null:L(Oe,{flexDirection:"column",children:[m(T,{backgroundColor:f.colorBgLayout,color:f.colorText,children:` \u{1F4DD} ${e} `}),L(T,{color:f.colorTextDescription,children:["- from ",m(T,{bold:!0,color:f.colorInfo,children:o})," to ",m(T,{bold:!0,color:f.colorInfo,children:n}),m(T,{color:f.colorTextDescription,children:` [Tokens: ${l}]`})]}),c?L(Ke,{children:[m(Le,{label:` ${r}% [${s}/${i} chunks] `}),m(Ie,{value:r})]}):m(je,{variant:"success",children:"Success"})]})}),Lt=3,F=2,ue=2,h=a(t=>X(t).length,"calcToken"),C=a(t=>X(String(t)).length,"calcEncodedKeyToken"),pe=a(t=>C(t)+Lt,"calcPrimitiveValueToken"),fe=a((t,e=0)=>Je(Object.entries(t),([n,o])=>C(n)+F+(z(o)?fe(o,e+1):pe(o)))+ue+e,"calcJsonToken"),It=new Set([`
`,`\r
`,"[!NOTE]","[!IMPORTANT]","[!WARNING]","[!CAUTION]","\\[!NOTE]","\\[!IMPORTANT]","\\[!WARNING]","\\[!CAUTION]","\\[!NOTE]\\","\\[!IMPORTANT]\\","\\[!WARNING]\\","\\[!CAUTION]\\"]),jt=a(t=>It.has(t)?!0:/^[\s\p{P}\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}]*$/u.test(t.replaceAll(" ","")),"checkMdString"),me=a(async t=>ee().use(Ge).use(Z).use(H).parse(t.trim()),"convertMarkdownToMdast"),At=a((t,e)=>{const n={};let o=0;return te(t,e||"text",r=>{n[o]=r.value,o++}),n},"convertMdastToMdastObj"),Et=a(t=>{const e={};for(const[n,o]of Object.entries(t))jt(o)||(e[Number(n)]=o);return e},"pickMdastObj"),$t=a(({mdast:t,entry:e,target:n},o)=>{const r={...e,...n};let i=0;return te(t,o||"text",s=>{s.value=r[i],i++}),t},"mergeMdastObj"),U=a(async t=>ee().use(Ve,{bullet:"-",emphasis:"*",fences:!0,listItemIndent:1,rule:"-",strong:"*",tightDefinitions:!0}).use(H).use(Z).stringify(t),"convertMdastToMarkdown"),B=a((t,e)=>{const n=Qe(e,t),o=n.filter(c=>c.op==="add"),r=n.filter(c=>c.op==="remove"),i=Re(e),s={};for(const c of r)Pe(i,c.path);for(const c of o)De(s,c.path,c.value);return{add:o,entry:s,remove:r,target:i}},"diff"),Jt=a((t,e)=>Ue(Object.entries(t),(n,[o,r])=>{let[i,s]=n.pop()||[{},ue];const c=z(r)?fe(r,1):pe(r);return s+C(o)+F+c<=e?(i[o]=r,s+=C(o)+F+c,n.push([i,s])):n.push([i,s],[{[o]:r},C(o)+F+c]),n},[]).map(([n])=>n),"splitJSONtoSmallChunks"),de=a((t,e)=>{let n=(wt[t.modelName||ce]-h(e))/3;return n||(n=128e3),t.splitToken&&(n=t.splitToken),n=Math.floor(n),console.info("INFO: splitToken =",n),n},"getSplitToken"),Rt=a((t,e,n,o)=>{const r=B(e,n).entry,i=de(t,o);return Jt(r,i)},"splitJsonToChunks");let Pt=class{static{a(this,"TranslateMarkdown")}mdast;entry={};config;check;definition;constructor(e){this.config=e,this.check=["text","yaml",e?.markdown?.translateCode&&"code"].filter(Boolean)}async genTarget(e){return this.mdast=await me(e),this.entry=At(this.mdast,this.check),Et(this.entry)}async genMarkdownByMdast(e){if(!e)return;const n=$t({entry:this.entry,mdast:this.mdast,target:e},this.check);return U(n)}async clearMarkdownString(e){const n=[],o=await me(e);return o.children=o.children.map(r=>r.type==="definition"?(n.push(r),!1):r).filter(Boolean),{content:await U(o),definition:await U({children:n,type:"root"})}}async genSplitMarkdown(e,n){this.definition="";const{content:o,definition:r}=await this.clearMarkdownString(e);return this.definition=r,await qe.fromLanguage("markdown",{chunkOverlap:0,chunkSize:de(this.config,n),lengthFunction:a(s=>h(s),"lengthFunction")}).splitText(o)}async genMarkdownByString(e){return[...e,this.definition].join(`

`)}};const Dt=a(t=>{let e={};for(const n of t)e=N(e,n);return e},"mergeJsonFromChunks"),ge="",Ut=a((t=ge)=>ne.fromMessages([["system",["You are a translation expert.","Translate the i18n JSON file from {from} to {to}",t&&`Here are some reference to help with better translation.  ---${t}---`,"Keep the keys the same as the original file and make sure the output remains a valid i18n JSON file."].filter(Boolean).join(`
`)],["human",["{json}"].join(`
`)]]),"promptJsonTranslate"),Bt=a((t=ge)=>ne.fromMessages([["system",["You are a translation expert.","Translate the markdown from {from} to {to}.",t&&`Here are some reference to help with better translation.  ---${t}---`].filter(Boolean).join(`
`)],["human","{text}"]]),"promptStringTranslate"),_t=a(t=>{const e=a(n=>{switch(n){case"human":return"user";case"system":case"function":case"tool":return n;case"ai":case"generic":case"remove":default:return"assistant"}},"typeToRole");return t.map(n=>({role:e(n._getType()),content:n.content}))},"lcMsgs_2_oaiMsgs");let Kt=class{static{a(this,"TranslateLocale")}model;config;openAIProxyUrl;openAIApiKey;isJsonMode;promptJson;promptString;constructor(e,n,o){this.config=e,this.openAIProxyUrl=o,this.openAIApiKey=n,console.info("INFO: i18n config =",this.config),this.model=new ze({configuration:{baseURL:o},maxConcurrency:e.concurrency,maxRetries:4,modelName:e.modelName,openAIApiKey:n,temperature:e.temperature,topP:e.topP}),this.promptJson=Ut(e.reference),this.promptString=Bt(e.reference),this.isJsonMode=!!this.config?.experimental?.jsonMode}async runByString({from:e,to:n,text:o,leftRetries:r=void 0}){let i="",s=null;try{const c=await this.promptString.formatMessages({from:e||this.config.entryLocale,text:o,to:n});let l="";const f=_t(c),y=new Date().getTime();if(i=await(await fetch(`${this.openAIProxyUrl}/chat/completions`,{method:"POST",headers:{Authorization:`Bearer ${this.openAIApiKey}`,"Content-Type":"application/json"},body:JSON.stringify({messages:f,model:this.config.modelName,stream:!1,temperature:0,max_tokens:this.config.splitToken})})).text(),s=JSON.parse(i),l=s?.choices?.[0]?.message?.content,!l)throw console.info("ERROR: invalid reponse, resData =",s),new Error("invalid reponse");return console.info(`INFO: took ${(new Date().getTime()-y)/1e3} seconds`),l}catch(c){if(console.error("ERROR: error caught ----------------------------------:",c),console.error(`  => full response text =
`,i),console.error("-------------------------------------------------------"),r===void 0&&(r=5),r>0)return console.info("INFO: will retry in 90 seconds..."),console.info("INFO: tick =",new Date().toUTCString()),await new Promise((f,y)=>{setTimeout(()=>{f(0)},90*1e3)}),console.info("INFO: 90 seconds reached, tick =",new Date().toUTCString()),this.runByString({from:e,to:n,text:o,leftRetries:r-1});console.error("ERROR: reached max retries, abort."),this.handleError(c)}}async runByJson({from:e,to:n,json:o}){try{const r=await this.promptJson.formatMessages({from:e||this.config.entryLocale,json:JSON.stringify(o),to:n}),i=await this.model.invoke(r,this.isJsonMode?{response_format:{type:"json_object"}}:void 0),s=this.isJsonMode?i.content:i.text;return s||this.handleError(),JSON.parse(s)}catch(r){this.handleError(r)}}handleError(e){g.error(`Translate failed, ${e||"please check your network or try again..."}`,!0),console.error("ERROR:",e)}};class he{static{a(this,"I18n")}config;step=0;maxStep=1;translateLocaleService;translateMarkdownService;constructor({openAIApiKey:e,openAIProxyUrl:n,config:o}){this.config=o,this.translateLocaleService=new Kt(o,e,n),this.translateMarkdownService=new Pt(o)}async translateMarkdown(e){return e.mode===O.STRING?this.translateMarkdownByString(e):this.translateMarkdownByMdast(e)}async translateMarkdownByString({md:e,to:n,onProgress:o,from:r}){const i=await this.translateLocaleService.promptString.formatMessages({from:r,text:"",to:n});console.info(`
INFO: translate markdown from ${r}: >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
`+e.substring(0,100),`
...
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
`);const s=await this.translateMarkdownService.genSplitMarkdown(e,JSON.stringify(i));if(this.maxStep=s.length,this.step=0,s.length===0)return;const c=s.length*h(JSON.stringify(i))+h(JSON.stringify(s));o?.({isLoading:!0,maxStep:this.maxStep,needToken:c,progress:0,step:0}),console.info(`INFO: splitted into ${s.length} chunks based on splitToken
`);const l=await Y(s,async y=>{o?.({isLoading:this.step<this.maxStep,maxStep:this.maxStep,needToken:c,progress:this.step<this.maxStep?Math.floor(this.step/this.maxStep*100):100,step:this.step});const k=await this.translateLocaleService.runByString({from:r,text:y,to:n});return this.step<this.maxStep&&this.step++,console.info(`
--> translated to ${n}++++++++++++++++++++++++++++++++++++++++++++++
`+k.substring(0,100),`
...
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
`),k},{concurrency:this.config?.concurrency});return o?.({isLoading:!1,maxStep:this.maxStep,needToken:c,progress:100,step:this.maxStep}),{result:await this.translateMarkdownService.genMarkdownByString(l),tokenUsage:c+h(JSON.stringify(l))}}async translateMarkdownByMdast({md:e,...n}){const o=await this.translateMarkdownService.genTarget(e),r=await this.translate({...n,entry:o,target:{}});if(!r?.result)return;const i=await this.translateMarkdownService.genMarkdownByMdast(r);if(i)return{result:i,tokenUsage:r.tokenUsage}}async translate({entry:e,target:n,to:o,onProgress:r,from:i}){const s=await this.translateLocaleService.promptJson.formatMessages({from:i,json:{},to:o}),c=Rt(this.config,e,n,JSON.stringify(s));if(this.maxStep=c.length,this.step=0,c.length===0)return;const l=c.length*h(JSON.stringify(s))+h(JSON.stringify(c));r?.({isLoading:!0,maxStep:this.maxStep,needToken:l,progress:0,step:0});const f=await Y(c,async k=>{r?.({isLoading:this.step<this.maxStep,maxStep:this.maxStep,needToken:l,progress:this.step<this.maxStep?Math.floor(this.step/this.maxStep*100):100,step:this.step});const Se=await this.translateLocaleService.runByJson({from:i,json:k,to:o});return this.step<this.maxStep&&this.step++,Se},{concurrency:this.config?.concurrency});return r?.({isLoading:!1,maxStep:this.maxStep,needToken:l,progress:100,step:this.maxStep}),{result:await N(n,Dt(f)),tokenUsage:l+h(JSON.stringify(f))}}}const _=a(t=>{const e=re(t,"utf8");return JSON.parse(e)},"readJSON"),x=a((t,e)=>{const n=We(e,{space:"  "});oe(t,n,"utf8")},"writeJSON"),qt=a(t=>re(t,"utf8"),"readMarkdown"),Gt=a((t,e)=>{oe(t,e,"utf8")},"writeMarkdown"),Vt=a(t=>{for(const e of t.outputLocales){const n=w(t.output,`${e}.json`);v(n)||x(n,{})}},"checkLocales"),Qt=a((t,e)=>{for(const n of t.outputLocales){const o=w(t.output,n);v(o)||se(o)}for(const n of t.outputLocales)for(const o of e){const r=w(t.output,n,o);try{const i=_e(r);se(i,{recursive:!0})}catch{}v(r)||x(r,{})}},"checkLocaleFolders"),zt=a(t=>{try{const e=w("./",t.entry);return v(e)||g.error(`Can't find ${u.bold.yellow(t.entry)} in dir`,!0),_(e)}catch{Ye.exit(1)}},"getEntryFile"),Wt=a(t=>{const e=t.entry.replaceAll("*","").replaceAll("*.json",""),n=ie(W(e,"**/*.json").replaceAll("\\","/"),{nodir:!0}),o={};for(const r of n)o[A(e,r)]=_(r);if(Object.keys(o).length===0){g.error(`Can't find .json files in ${u.bold.yellow(e)}`,!0);return}return o},"getEntryFolderFiles"),ye=a(t=>{const e=_(t);return e||(x(t,{}),{})},"getLocaleObj"),K=a((t,e)=>{try{if(t===e)return!0;if(typeof t!=typeof e)return!1;if(typeof t=="object"&&typeof e=="object"){const n=Object.keys(t),o=Object.keys(e);if(n.length!==o.length)return!1;for(const r of n)if(!o.includes(r)||!K(t[r],e[r]))return!1}return typeof t==typeof e}catch{return!1}},"isEqualJsonKeys");class Yt{static{a(this,"TranslateLocale")}config;query=[];i18n;constructor(){this.config=d.getLocaleConfig(),this.i18n=new he({config:this.config,openAIApiKey:d.getOpenAIApiKey(),openAIProxyUrl:d.getOpenAIProxyUrl()})}async start(){p.start("Lobe I18N is analyzing your project... \u{1F92F}\u{1F30F}\u{1F50D}"),!this.config.entry.includes(".json")||this.config.entry.includes("*")?this.genFolderQuery():this.genFlatQuery(),this.query.length>0?await this.runQuery():p.success("No content requiring translation was found."),p.success("All i18n tasks have been completed\uFF01")}async runQuery(){p.info(`Current model setting: ${u.cyan(this.config.modelName)} (temperature: ${u.cyan(this.config.temperature)}) ${this.config.experimental?.jsonMode?u.red(" [JSON Mode]"):""}}`);let e=0;for(const n of this.query){const o={filename:n.filename,from:n.from||this.config.entryLocale,to:n.to},{rerender:r,clear:i}=I(m(M,{hide:!0,isLoading:!0,maxStep:1,progress:0,step:0,...o})),s=await this.i18n.translate({...n,onProgress:a(l=>{l.maxStep>0?r(m(M,{...l,...o})):i()},"onProgress")});i();const c=A(".",n.filename);s?.result&&Object.keys(s.result).length>0?(x(n.filename,s.result),e+=s.tokenUsage,p.success(u.yellow(c),u.gray(`[Token usage: ${s.tokenUsage}]`))):p.warn("No translation result was found:",u.yellow(c))}e>0&&p.info("Total token usage:",u.cyan(e))}genFolderQuery(){const e=this.config,n=Wt(e),o=Object.keys(n);p.info(`Running in ${u.bold.cyan("\u{1F4C2} Folder Mode")} and has found ${u.bold.cyan(o.length)} files.`),Qt(e,o);for(const r of e.outputLocales)for(const i of o){p.info(`${u.cyan(r)}${u.gray(" - ")}${u.yellow(i)}`);const s=w(e.output,r,i),c=n[i],l=B(c,ye(s)).target;x(s,l),!K(c,l)&&this.query.push({entry:c,filename:s,from:e.entryLocale,target:l,to:r})}}genFlatQuery(){const e=this.config,n=zt(e);p.start(`Running in ${u.bold.cyan("\u{1F4C4} Flat Mode")}, and translating ${u.bold.cyan(e.outputLocales.join("/"))} locales..`),Vt(e);for(const o of e.outputLocales){const r=w(e.output,o)+".json",i=n,s=B(i,ye(r)).target;x(r,s),!K(i,s)&&this.query.push({entry:i,filename:r,from:e.entryLocale,target:s,to:o})}}}const ke=a((t,e)=>t.map(n=>n.includes("*")||n.includes(e)?n:W(n,`**/*${e}`).replaceAll("\\","/")),"matchInputPattern");class we{static{a(this,"TranslateMarkdown")}config;markdownConfig;query=[];i18n;constructor(){this.markdownConfig=d.getMarkdownConfigFile();const e=d.getConfigFile();this.config={...e,entryLocale:e.entryLocale||this.markdownConfig.entryLocale,markdown:this.markdownConfig,outputLocales:e.outputLocales||this.markdownConfig.outputLocales},this.i18n=new he({config:this.config,openAIApiKey:d.getOpenAIApiKey(),openAIProxyUrl:d.getOpenAIProxyUrl()})}async start(){p.start("Lobe I18N is analyzing your markdown... \u{1F92F}\u{1F30F}\u{1F50D}");const e=this.markdownConfig.entry;(!e||e.length===0)&&g.error("No markdown entry was found.",!0);let n=ie(ke(e,".md"),{ignore:this.markdownConfig.exclude?ke(this.markdownConfig.exclude||[],".md"):void 0,nodir:!0});this.markdownConfig.entryExtension&&(n=n.filter(o=>o.includes(this.markdownConfig.entryExtension||".md"))),(!n||n.length===0)&&g.error("No markdown entry was found.",!0),this.genFilesQuery(n),this.query.length>0?await this.runQuery():p.success("No content requiring translation was found."),p.success("All i18n tasks have been completed\uFF01")}async runQuery(){p.info(`Current model setting: ${u.cyan(this.config.modelName)} (temperature: ${u.cyan(this.config.temperature)}) ${this.config.experimental?.jsonMode?u.red(" [JSON Mode]"):""}}`);let e=0;for(const n of this.query){const o={filename:n.filename,from:n.from||this.markdownConfig.entryLocale||this.config.entryLocale,to:n.to},{rerender:r,clear:i}=I(m(M,{hide:!0,isLoading:!0,maxStep:1,progress:0,step:0,...o})),s=await this.i18n.translateMarkdown({...n,onProgress:a(l=>{l.maxStep>0?r(m(M,{...l,...o})):i()},"onProgress")});i();const c=A(".",n.filename);if(s?.result&&Object.keys(s.result).length>0){let l=s.result;this.markdownConfig.includeMatter||(l=ae.stringify(s.result,n.matter)),Gt(n.filename,l),e+=s.tokenUsage,p.success(u.yellow(c),u.gray(`[Token usage: ${s.tokenUsage}]`))}else p.warn("No translation result was found:",u.yellow(c))}e>0&&p.info("Total token usage:",u.cyan(e))}genFilesQuery(e,n){const o=this.markdownConfig;n||p.start(`Running in ${u.bold.cyan(`\u{1F4C4} ${e.length} Markdown`)}, and translating to ${u.bold.cyan(o?.outputLocales?.join("/"))} locales..`);for(const r of e)try{const i=qt(r);for(const s of o.outputLocales||[]){const c=this.getTargetExtension(s,r,i),l=this.getTargetFilename(r,c);if(v(l))continue;const f=this.getMode(r,i),{data:y,content:k}=ae(i);p.info(`\u{1F4C4} To ${s}: ${u.yellow(l)}`),this.query.push({filename:l,from:o.entryLocale,matter:y,md:this.markdownConfig.includeMatter?i:k,mode:f,to:s})}}catch{g.error(`${r} not found`,!0)}}getTargetExtension(e,n,o){return this.markdownConfig.outputExtensions?.(e,{fileContent:o,filePath:n,getDefaultExtension:$})||$(e)}getTargetFilename(e,n){if(this.markdownConfig.entryExtension)return w(".",e.replace(this.markdownConfig.entryExtension||".md",n));if(this.markdownConfig.entryLocale&&e.includes(`.${this.markdownConfig.entryLocale}.`))return[e.split(`.${this.markdownConfig.entryLocale}.`)[0],n].join("");{const o=e.split(".");return o.pop(),[o.join("."),n].join("")}}getMode(e,n){const o=this.markdownConfig.mode;return o?Be(o)?o:o({fileContent:n,filePath:e})||O.STRING:O.STRING}}const Xt=Ne({pkg:E,shouldNotifyInNpmScript:!0});Xt.notify({isGlobal:!0});const b=new Ce;b.name("lobe-i18n").description(E.description).version(E.version).addOption(new j("-o, --option","Setup lobe-i18n preferences")).addOption(new j("-c, --config <string>","Specify the configuration file")).addOption(new j("-m, --with-md","Run i18n translation and markdown translation simultaneously")),b.command("locale",{isDefault:!0}).action(async()=>{const t=b.opts();t.option?I(m(Ft,{})):(t.config&&R.loadCustomConfig(t.config),await new Yt().start(),t.withMd&&await new we().start())}),b.command("md").action(async()=>{const t=b.opts();t.config&&R.loadCustomConfig(t.config),await new we().start()}),b.parse()});export default Ht();
