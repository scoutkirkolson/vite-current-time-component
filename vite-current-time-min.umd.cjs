(function(n,i){typeof exports=="object"&&typeof module<"u"?i(require("vue")):typeof define=="function"&&define.amd?define(["vue"],i):(n=typeof globalThis<"u"?globalThis:n||self,i(n.Vue))})(this,function(n){"use strict";const i=`.current-time-component{color:purple}
`,u=(o,t)=>{const e=o.__vccOpts||o;for(const[s,r]of t)e[s]=r;return e},a=["id"],p=u({__name:"CurrentTime.ce",props:{id:{type:String,default:""},timeZone:{type:String,default:"Europe/Amsterdam"}},emits:["datechange"],setup(o,{emit:t}){const e=o,s=n.ref(new Date),r=n.ref(e.timeZone);console.log("props",e);const l=n.computed(()=>s.value.toLocaleString("nl-NL",{timeZone:r.value||"Europe/Amsterdam"}));function f(c){console.log("changeTimeZone",c.detail),r.value=c.detail?.timeZone||"Europe/Amsterdam"}function h(){console.log("listenEvents",e),document.querySelector(e.id?"#"+e.id:"current-time").addEventListener("timezonechange",f)}return n.onMounted(h),setInterval(()=>{s.value=new Date,t("datechange",l)},1e3),(c,b)=>(n.openBlock(),n.createElementBlock("div",{class:"current-time-component",id:o.id},[n.renderSlot(c.$slots,"prefix"),n.createTextVNode(" "+n.toDisplayString(n.unref(l))+" ... ",1)],8,a))}},[["styles",[i]]]),d=(o,t=[])=>new CustomEvent(o,{bubbles:!1,composed:!0,cancelable:!1,detail:t.length?t.length===1?t[0]:t:self});class m extends HTMLElement{constructor(){super(),this._props=n.reactive({}),this._numberProps=[],this._def=p}setAttr(t){let e=this[t]||this.getAttribute(t);e!==void 0&&this._numberProps.includes(t)&&(e=Number(e)),console.log("prop:"+t+"="+e),this._props[t]=e}connectObserver(){return new MutationObserver(t=>{t.forEach(e=>{if(e.type==="attributes"){const s=e.attributeName;this.setAttr(s)}})})}createEventProxies(){const t=this._def.emits;t&&t.forEach(e=>{const s=`on${e[0].toUpperCase()}${e.substring(1)}`;this._props[s]=(...r)=>{this.dispatchEvent(d(e,r))}})}createApp(){const t=this;n.createApp({render(){return n.h(t._def,t._props)}}).mount(this)}connectedCallback(){Object.entries(p.props).forEach(([e,s])=>{s.type===Number&&this._numberProps.push(e),console.log(e),this.setAttr(e)}),this.createEventProxies(),this.createApp(),this.connectObserver().observe(this,{attributes:!0})}}customElements.define("current-time",m)});
//# sourceMappingURL=vite-current-time-min.umd.cjs.map
