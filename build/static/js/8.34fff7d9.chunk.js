(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{790:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){return e.filter(function(e){return!(0,a.default)(e)}).map(function(e,r){var a=void 0;return"function"!==typeof t||null!==(a=t(e,r))&&!a?(0,n.default)(e,r,t):a})};var a=l(r(818)),n=l(r(795));function l(e){return e&&e.__esModule?e:{default:e}}},795:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){return l.default[e.type](e,t,r)};var a,n=r(819),l=(a=n)&&a.__esModule?a:{default:a}},796:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e};t.default=function(e,t){var r=a({},(0,n.default)(e),{key:t});"string"===typeof r.style||r.style instanceof String?r.style=(0,l.default)(r.style):delete r.style;return r};var n=o(r(822)),l=o(r(825));function o(e){return e&&e.__esModule?e:{default:e}}},797:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){n.hasOwnProperty(e)||(n[e]=a.test(e));return n[e]};var a=/^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,n={}},817:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.htmlparser2=t.convertNodeToElement=t.processNodes=void 0;var a=r(790);Object.defineProperty(t,"processNodes",{enumerable:!0,get:function(){return i(a).default}});var n=r(795);Object.defineProperty(t,"convertNodeToElement",{enumerable:!0,get:function(){return i(n).default}});var l=r(82);Object.defineProperty(t,"htmlparser2",{enumerable:!0,get:function(){return i(l).default}});var o=i(r(829));function i(e){return e&&e.__esModule?e:{default:e}}t.default=o.default},818:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return"text"===e.type&&/\r?\n/.test(e.data)&&""===e.data.trim()}},819:function(e,t,r){"use strict";var a;Object.defineProperty(t,"__esModule",{value:!0});var n=r(82),l=s(r(820)),o=s(r(821)),i=s(r(827)),c=s(r(828));function s(e){return e&&e.__esModule?e:{default:e}}function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}t.default=(u(a={},n.ElementType.Text,l.default),u(a,n.ElementType.Tag,o.default),u(a,n.ElementType.Style,i.default),u(a,n.ElementType.Directive,c.default),u(a,n.ElementType.Comment,c.default),u(a,n.ElementType.Script,c.default),u(a,n.ElementType.CDATA,c.default),u(a,n.ElementType.Doctype,c.default),a)},820:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return e.data}},821:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){var c=e.name;if(!(0,i.default)(c))return null;var s=(0,l.default)(e.attribs,t),u=null;-1===o.default.indexOf(c)&&(u=(0,n.default)(e.children,r));return a.default.createElement(c,s,u)};var a=c(r(0)),n=c(r(790)),l=c(r(796)),o=c(r(826)),i=c(r(797));function c(e){return e&&e.__esModule?e:{default:e}}},822:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return Object.keys(e).filter(function(e){return(0,l.default)(e)}).reduce(function(t,r){var a=r.toLowerCase(),l=n.default[a]||a;return t[l]=i(l,e[r]),t},{})};var a=o(r(823)),n=o(r(824)),l=o(r(797));function o(e){return e&&e.__esModule?e:{default:e}}var i=function(e,t){return a.default.map(function(e){return e.toLowerCase()}).indexOf(e.toLowerCase())>=0&&(t=e),t}},823:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=["allowfullScreen","async","autoplay","capture","checked","controls","default","defer","disabled","formnovalidate","hidden","loop","multiple","muted","novalidate","open","playsinline","readonly","required","reversed","scoped","seamless","selected","itemscope"]},824:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={accept:"accept","accept-charset":"acceptCharset",accesskey:"accessKey",action:"action",allowfullscreen:"allowFullScreen",allowtransparency:"allowTransparency",alt:"alt",as:"as",async:"async",autocomplete:"autoComplete",autoplay:"autoPlay",capture:"capture",cellpadding:"cellPadding",cellspacing:"cellSpacing",charset:"charSet",challenge:"challenge",checked:"checked",cite:"cite",classid:"classID",class:"className",cols:"cols",colspan:"colSpan",content:"content",contenteditable:"contentEditable",contextmenu:"contextMenu",controls:"controls",controlsList:"controlsList",coords:"coords",crossorigin:"crossOrigin",data:"data",datetime:"dateTime",default:"default",defer:"defer",dir:"dir",disabled:"disabled",download:"download",draggable:"draggable",enctype:"encType",form:"form",formaction:"formAction",formenctype:"formEncType",formmethod:"formMethod",formnovalidate:"formNoValidate",formtarget:"formTarget",frameborder:"frameBorder",headers:"headers",height:"height",hidden:"hidden",high:"high",href:"href",hreflang:"hrefLang",for:"htmlFor","http-equiv":"httpEquiv",icon:"icon",id:"id",inputmode:"inputMode",integrity:"integrity",is:"is",keyparams:"keyParams",keytype:"keyType",kind:"kind",label:"label",lang:"lang",list:"list",loop:"loop",low:"low",manifest:"manifest",marginheight:"marginHeight",marginwidth:"marginWidth",max:"max",maxlength:"maxLength",media:"media",mediagroup:"mediaGroup",method:"method",min:"min",minlength:"minLength",multiple:"multiple",muted:"muted",name:"name",nonce:"nonce",novalidate:"noValidate",open:"open",optimum:"optimum",pattern:"pattern",placeholder:"placeholder",playsinline:"playsInline",poster:"poster",preload:"preload",profile:"profile",radiogroup:"radioGroup",readonly:"readOnly",referrerpolicy:"referrerPolicy",rel:"rel",required:"required",reversed:"reversed",role:"role",rows:"rows",rowspan:"rowSpan",sandbox:"sandbox",scope:"scope",scoped:"scoped",scrolling:"scrolling",seamless:"seamless",selected:"selected",shape:"shape",size:"size",sizes:"sizes",slot:"slot",span:"span",spellcheck:"spellCheck",src:"src",srcdoc:"srcDoc",srclang:"srcLang",srcset:"srcSet",start:"start",step:"step",style:"style",summary:"summary",tabindex:"tabIndex",target:"target",title:"title",type:"type",usemap:"useMap",value:"value",width:"width",wmode:"wmode",wrap:"wrap",about:"about",datatype:"datatype",inlist:"inlist",prefix:"prefix",property:"property",resource:"resource",typeof:"typeof",vocab:"vocab",autocapitalize:"autoCapitalize",autocorrect:"autoCorrect",autosave:"autoSave",color:"color",itemprop:"itemProp",itemscope:"itemScope",itemtype:"itemType",itemid:"itemID",itemref:"itemRef",results:"results",security:"security",unselectable:"unselectable"}},825:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],a=!0,n=!1,l=void 0;try{for(var o,i=e[Symbol.iterator]();!(a=(o=i.next()).done)&&(r.push(o.value),!t||r.length!==t);a=!0);}catch(c){n=!0,l=c}finally{try{!a&&i.return&&i.return()}finally{if(n)throw l}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(""===e)return{};return e.split(";").reduce(function(e,t){var r=t.split(/^([^:]+):/).filter(function(e,t){return t>0}).map(function(e){return e.trim().toLowerCase()}),n=a(r,2),l=n[0],o=n[1];return void 0===o?e:(l=l.replace(/^-ms-/,"ms-").replace(/-(.)/g,function(e,t){return t.toUpperCase()}),e[l]=o,e)},{})}},826:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"]},827:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=void 0;e.children.length>0&&(r=e.children[0].data);var l=(0,n.default)(e.attribs,t);return a.default.createElement("style",l,r)};var a=l(r(0)),n=l(r(796));function l(e){return e&&e.__esModule?e:{default:e}}},828:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return null}},829:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.decodeEntities,l=void 0===r||r,o=t.transform,i=t.preprocessNodes,c=(void 0===i?function(e){return e}:i)(a.default.parseDOM(e,{decodeEntities:l}));return(0,n.default)(c,o)};var a=l(r(82)),n=l(r(790));function l(e){return e&&e.__esModule?e:{default:e}}},864:function(e,t,r){"use strict";r.r(t);var a=r(0),n=r.n(a),l=r(206),o=r(43),i=r(212),c=r.n(i),s=r(13),u=r.n(s),d=r(817),f=r.n(d),p=r(798),m=(r(803),r(102)),y=r(9),v=r(6),b=r(145),g=(r(313),r(41)),h=r(10),_=r(17),E=Object(l.a)({wrapper:{padding:"0 9%"},navigator:{marginBottom:45},viewer:{display:"flex"},menu:{width:"25%"},content:{width:"calc(75% - 50px)",marginLeft:50},categoryList:{display:"block",listStyle:"none",padding:0,margin:0,"& > li:first-child > button":{borderTop:"1px solid rgb(169, 169, 169)"}},backArrow:{cursor:"pointer",backgroundColor:"transparent",borderWidth:0,display:"flex",alignItems:"center",padding:0},backIcon:{fontSize:20,marginRight:5},backText:{fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"},menuHead:{display:"flex"},menuTitle:{flex:1,fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif",fontSize:19,fontWeight:400,padding:0,marginTop:0,backgroundColor:"transparent"},menuItem:{width:"100%",color:"#000",listStyle:"none",borderBottom:"1px solid rgb(169, 169, 169)",borderLeftWidth:0,borderRightWidth:0,borderTopWidth:0,textTransform:"uppercase",backgroundColor:"transparent",margin:0,cursor:"pointer",padding:10,textAlign:"left",fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif",fontSize:14,"&:hover":{backgroundColor:"#f4f4f4"}},head:{display:"flex",marginBottom:25},share:{flex:1,fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"},date:{fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"},section:{marginTop:60,"&:first-child":{marginTop:0}},title:{fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"},description:{fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"},"@media (max-width: 600px)":{wrapper:{padding:"0 5%"},viewer:{display:"block"},menu:{display:"none"},content:{width:"100%",marginLeft:0}}});t.default=Object(o.b)(function(e){return{feeds:e.feed.feeds,products:e.product.products}},function(e){return{editFeedFilter:function(t,r){return e({type:v.o,payload:{key:t,value:r}})}}})(function(e){var t=E(),r=e.feeds,a=e.match,l=e.editFeedFilter,o=e.history,i=r?r.find(function(e){return e.id.toString()===a.params.id}):null;if(void 0==r)return n.a.createElement(b.a,null);if(!i)return null;return n.a.createElement("div",null,n.a.createElement(m.a,{title:Object(y.f)(i.sections[0].title)}),n.a.createElement("div",{className:t.wrapper},n.a.createElement("div",{className:t.navigator},n.a.createElement("button",{type:"button",className:t.backArrow,onClick:function(){return Object(y.e)("/articles",o)}},n.a.createElement("i",{className:u()("icon-circle-left",t.backIcon)}),"\xa0",n.a.createElement("b",null,n.a.createElement(_.a,{keyOfI18n:h.a.FEED_DETAIL_BACK_TO_FEED_LIST})))),n.a.createElement("div",{className:t.viewer},n.a.createElement("div",{className:t.menu},n.a.createElement("div",null,n.a.createElement("div",{className:t.menuHead},n.a.createElement("h3",{className:t.menuTitle},n.a.createElement(_.a,{keyOfI18n:h.a.FEED_CATEGORY}))),n.a.createElement("ul",{className:t.categoryList},Object(y.c)(r,function(e){return l("tag",e)}).map(function(e,r){return n.a.createElement("li",{key:r},n.a.createElement("button",{type:"button",className:t.menuItem},e.label))})))),n.a.createElement("div",{className:t.content},n.a.createElement("div",{className:t.head},n.a.createElement("div",{className:t.share},n.a.createElement("i",{className:"icon-icons8-edit"}),"\xa0",Object(g.a)(h.a.NO_AUTHORS)),n.a.createElement("div",{className:t.date},n.a.createElement("i",{className:"icon-icons8-calendar"}),"\xa0",c()(i.time).format("MMM Do YYYY"))),n.a.createElement("div",null,i.sections.map(function(e,r){return n.a.createElement("section",{key:r,className:t.section},r?n.a.createElement("h2",{className:t.title},e.title):null,n.a.createElement(p.Carousel,{showThumbs:!1},(i.sections[r].media||[]).filter(function(e){return/^(jpe?g|png|gif|bmp|mp4|qt|mov)$/i.test(e.ext)}).map(function(e,t){return n.a.createElement("div",{key:t},n.a.createElement("img",{src:e.url}))})),n.a.createElement("p",{className:t.description},f()(e.description)))}))))))})}}]);
//# sourceMappingURL=8.34fff7d9.chunk.js.map