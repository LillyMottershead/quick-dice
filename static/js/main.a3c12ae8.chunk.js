(this.webpackJsonpquickroll=this.webpackJsonpquickroll||[]).push([[0],{19:function(e,t,n){},21:function(e,t,n){"use strict";n.r(t);var a=n(1),l=n.n(a),c=n(13),o=n.n(c),s=(n(19),n(4)),r=n(5),i=n(2),d=n(7),u=n(6),h=(n(9),n(3)),m=n(14),j=n(12),p=function(e,t){return e+t},f=/^(\d+)?d(\d+)(?:k([l-])?(\d+))?$/,g=/\s+/,b=/^(?:(?:(?:\d+)?d\d+(?:k(?:[l-])?\d+)?)|[+\-*/()]|\d+|\s+)+$/,x=/((?:\d+)?d\d+(?:k(?:[l-])?\d+)?)|([+\-*/()])|(\d+)/g,O=/\[(.*?)\]/g,v=/\{(.*?)\}/g,y=/(?:(\w+)(?:\((.*?)\))?)/g,k={add:function(e,t){var n,a=t.match(x);"+-*/".includes(a[0])||e.tokens.push("+");(n=e.tokens).push.apply(n,Object(h.a)(a))},replace:N,adv:function(e){return N(e,"d20","2d20k1")},dis:function(e){return N(e,"d20","2d20kl1")},max:function(e){return e.max=!0},tohit:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20;e.tohit=!0,e.minToCrit=t},cancrit:function(e){return e.cancrit=!0},crit:function(e){return e.crit=!0}};function w(e){this.name="RollError",this.message=e,this.stack=(new Error).stack}function C(e){return null!==e.match(f)}function S(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=e.match(f);if(!n)throw new w("Cannot parse ".concat(e," as a valid roll."));var a=+n[2],l=+n[1]||1,c=+n[4]||0,o=!n[3];if(a<2)throw new w("Less than 2 sides in ".concat(e));if(l<1)throw new w("Rolling less than 1 time in ".concat(e));if(c<0)throw new w("Cannot keep less 1 die in ".concat(e));if(c>l)throw new w("Cannot keep more die than are rolled in ".concat(e));for(var s=c?"k".concat(o?"":"l").concat(c):"",r="".concat(l,"d").concat(a).concat(s),i=[],d=0;d<l;d++)i.push({sides:a,num:t?a:Math.ceil(Math.random()*a),kept:!0});if(c<l){var u=[].concat(i);u.sort((function(e,t){return e.num-t.num})),o||u.reverse(),u.slice(0,c).forEach((function(e){return e.kept=!1}))}var h=i.filter((function(e){return e.kept})).map((function(e){return e.num})),m=h.reduce(p);return{sides:a,result:m,rolls:i,desc:"".concat(r," (").concat(i.map((function(e){return e.num})).join(", "),")")}}function N(e,t,n){-1!==e.tokens.indexOf(t)&&(e.tokens[e.tokens.indexOf(t)]=n)}function R(e){var t,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"addmaxdice",l={crit:n};l.label=Array.from(e.matchAll(O),(function(e){return e[1]}))[0]||"",e=e.replaceAll(O,"");var c=Array.from(e.matchAll(y));if((c=c.filter((function(e){return!e[0].match(b)}))).reverse(),c.forEach((function(t){e="".concat(e.slice(0,t.index)).concat(e.slice(t.index+t[0].length))})),c.reverse(),c=c.map((function(e){var t={name:e[1]};return t.params=e[2]?e[2].split(/\s*,\s*/):[],t})),!e.match(b))throw new w("Unknown command.");l.tokens=e.match(x);var o,s=Object(j.a)(c);try{for(s.s();!(o=s.n()).done;){var r=o.value;k[r.name]&&k[r.name].apply(k,[l].concat(Object(h.a)(r.params)))}}catch(f){s.e(f)}finally{s.f()}var i=l.tokens.map((function(e){return C(e)?S(e,l.max||!1):e}));l.dice=i.filter((function(e){return void 0!==e.desc})),l.dice=(t=[]).concat.apply(t,Object(h.a)(l.dice.map((function(e){return e.rolls})))),l.desc=i.map((function(e){return e.desc||e})).join(" ");var d=i.map((function(e){return e.result||e})).join(" ");if(l.result=Function("return ".concat(d,";"))(),l.tohit&&(l.crit=i.find((function(e){return 20===e.sides})).result>=l.minToCrit||l.crit),l.crit&&l.cancrit){var u=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=l.tokens.filter((function(e){return C(e)}));t=t.map((function(t){return S(t,e)})),l.critDesc=t.map((function(e){return e.desc})).join(" + "),l.critResult=t.map((function(e){return e.result})).reduce(p)};if("rolldouble"===a)u();else if("doubledice"===a){var m=i.filter((function(e){return"object"===typeof e}));l.critDesc=m.map((function(e){return e.desc})).join(" + "),l.critResult=m.map((function(e){return e.result})).reduce(p)}else"addmaxdice"===a&&u(!0);l.fullString="".concat(l.desc," = ").concat(l.result),l.critString="CRIT: ".concat(l.critDesc," = ").concat(l.critResult)}else l.fullString="".concat(l.desc," = ").concat(l.result);return l}function A(e,t){var n=Array.from(t.matchAll(y));n=n.map((function(e){var t={name:e[1]};return t.params=e[2]?e[2].split(/\s*,\s*/):[],t}));var a,l=Object(j.a)(n);try{for(l.s();!(a=l.n()).done;){var c=a.value;if("attack"===c.name){e[0]=e[0].concat(" tohit");var o=c.params;0===o.length&&(o=Object(h.a)(new Array(e.length).keys()).slice(1)),o.forEach((function(t){return e[t]=e[t].concat(" cancrit")}))}else{if(!Object.keys(k).includes(c.name))throw new w("Unrecognized argument ".concat(c.name));var s=k[c.name],r=void 0;c.params.length===s.length-1?r=0:(r=+c.params[c.params.length-1]-1,c.params=c.params.slice(0,c.params.length)),c="".concat(c.name,"(").concat(c.params.join(","),")"),e[r]=e[r].concat(" ",c)}}}catch(i){l.e(i)}finally{l.f()}}function I(e){var t=JSON.parse(localStorage.aliases);if(e.length<1)throw new w("Missing target alias to delete.");var n=e[0];if(!t[n])throw new w("Alias ".concat(n," does not exist."));return delete t[n],localStorage.setItem("aliases",JSON.stringify(t)),{message:"Removed ".concat(n," from list of aliases."),alias:n}}w.prototype=new Error;var J=function(e,t){if(""===e)throw new w("Empty command.");var n=e.split(g),a=n[0];return n=n.slice(1),"alias"===a?function(e){var t=JSON.parse(localStorage.aliases);function n(){var e=JSON.parse(localStorage.aliases);return 0===Object.keys(e).length?{message:"No aliases."}:{message:"Aliases: ".concat(Object.keys(e).join(", "))}}if(e.length<1)return n();var a=e[0];if(e=e.slice(1),"delete"===a)return I(e);if("list"===a)return n();if(e.length<1){if(!t[a])throw new w("Alias ".concat(a," does not exist."));return{message:"".concat(a,": ").concat(t[a].rolls.join(", "))}}var l=e.join(" ");return t[a]={rolls:Array.from(l.matchAll(v),(function(e){return e[1]}))},l=l.replaceAll(v,""),A(t[a].rolls,l),localStorage.setItem("aliases",JSON.stringify(t)),{message:"Added ".concat(a," to aliases."),alias:a}}(n):"delete"===a?I(n):JSON.parse(localStorage.aliases)[a]?function(e,t,n){var a=JSON.parse(localStorage.aliases)[e].rolls;A(a=a.concat(Array.from(t.matchAll(v),(function(e){return e[1]}))),t=t.replaceAll(v,""));var l=!1;return a=a.map((function(e){var t=R(e,l,n=n);return l=t.crit||l,t})),{message:"Calling ".concat(e,":"),rolls:a}}(a,Array.from(n).join(" "),t):{message:"Rolling ".concat(e,":"),rolls:[R(e,t=t)]}},F=n(0);function L(e){return Object(F.jsxs)("form",{style:{margin:"10px"},children:[Object(F.jsx)("input",{className:"panel input-text",type:"text",ref:e.textInputRef,autoFocus:!0,name:"rollCommand",value:e.rollCommand,placeholder:"Command",onChange:e.onRollFormChange}),Object(F.jsx)("input",{className:"panel input-text",type:"text",style:{width:"30px"},name:"times",value:e.times,placeholder:"#",onChange:e.onRollFormChange}),Object(F.jsx)("input",{className:"panel input",type:"submit",value:">",onClick:e.onSubmit})]})}function T(e){return Object(F.jsxs)("div",{className:"h-container call",onClick:e.handleClose,style:{position:"relative",padding:"1em"},children:[e.rolls,Object(F.jsx)("span",{className:"close-button",children:Object(F.jsx)(U,{color:"red"})})]})}function K(e){var t=e.roll.result+(e.roll.critResult||0),n=e.roll.label||"",a=e.roll.fullString||"",l=e.roll.critString||"",c=e.roll.dice.map((function(e,t){return Object(F.jsx)(E,{die:e},"rollImage#".concat(t,"}"))}));return Object(F.jsxs)("div",{className:"panel flex-child tooltip",style:{background:"",margin:"-1px",marginBottom:"0px"},children:[c,Object(F.jsxs)("p",{children:[t," ",Object(F.jsxs)("span",{style:{fontSize:".75em"},children:[" ",n," "]})]}),Object(F.jsxs)("span",{className:"tooltiptext",children:[a," ",Object(F.jsx)("br",{})," ",l]})]})}function E(e){var t="/quick-dice",n=e.die.kept?"dice/":"gray_dice/",a=e.die.sides,l=e.die.num;return t="".concat(t,"/").concat(n,"d").concat(a,"_").concat(l,".svg"),Object(F.jsx)("img",{src:t,alt:"".concat(l," (d").concat(a,")"),height:"50px"})}function D(e){var t=Object.keys(e.aliases);return t.sort(),t=t.map((function(t,n){return Object(F.jsx)(P,{aliasName:t,handleCommand:e.handleCommand},"alias#".concat(n))})),Object(F.jsxs)("div",{className:"panel flex-child aliases",children:[Object(F.jsx)("label",{className:"h2",children:" Aliases "}),Object(F.jsx)("div",{children:t})]})}function P(e){return Object(F.jsxs)("div",{style:{margin:"5px",padding:"5px",border:"1px #6b6c75 solid",textAlign:"left",position:"relative"},children:[Object(F.jsx)("div",{style:{width:"90%",cursor:"pointer"},onClick:function(){return e.handleCommand(e.aliasName,1)},children:e.aliasName}),Object(F.jsx)("span",{style:{position:"absolute",right:"5px",top:"5px",cursor:"pointer"},onClick:function(){return e.handleCommand("alias delete ".concat(e.aliasName),1)},children:Object(F.jsx)(U,{})})]})}function U(e){var t=e.color||"#95969e";return Object(F.jsxs)("svg",{width:"10",height:"10",children:[Object(F.jsx)("line",{x1:"0",y1:"0",x2:"10",y2:"10",style:{stroke:t,strokeWidth:2}}),Object(F.jsx)("line",{x1:"0",y1:"10",x2:"10",y2:"0",style:{stroke:t,strokeWidth:2}})]})}function q(e){return Object(F.jsxs)("div",{className:"panel log",children:[Object(F.jsxs)("h2",{children:["Log",Object(F.jsx)("button",{className:"panel input",onClick:e.onLogClear,children:"Clear"})]}),Object(F.jsx)("div",{className:"inner-log",children:e.log})]})}var M=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).state={rollCommand:"",times:"",output:{calls:[],currKey:0},aliases:JSON.parse(localStorage.aliases||"{ }"),log:{components:[],currKey:0}},a.textInputRef=l.a.createRef(),a.onRollFormChange=a.onRollFormChange.bind(Object(i.a)(a)),a.onLogClear=a.onLogClear.bind(Object(i.a)(a)),a.hideCall=a.hideCall.bind(Object(i.a)(a)),a.handleCommand=a.handleCommand.bind(Object(i.a)(a)),a.onSubmit=a.onSubmit.bind(Object(i.a)(a)),a}return Object(r.a)(n,[{key:"onRollFormChange",value:function(e){var t=e.target,n=t.value,a=t.name;this.setState(Object(m.a)({},a,n))}},{key:"onLogClear",value:function(e){e.preventDefault(),this.setState({log:{components:[],currKey:0}})}},{key:"hideCall",value:function(e){this.setState((function(t){return t.output.calls[e]=null,{output:t.output}})),1===this.state.output.calls.filter((function(e){return null!==e})).length&&this.setState({output:{calls:[],currKey:0}}),this.textInputRef.current.focus()}},{key:"handleCommand",value:function(e,t){var n=this;var a=Object(h.a)(new Array(t).keys()).map((function(t,a){return function(e,t,n,a,l){function c(e,t){e.components.length>100&&e.components.pop(),e.components.unshift(Object(F.jsxs)("p",{children:[" ",t," "]},"log#".concat(e.currKey++))),e.currKey%=101}var o;try{o=J(e,a),c(n,o.message),o.rolls?(o.rolls.forEach((function(e){var t;t=e.critString?"".concat(e.fullString,", ").concat(e.critString,", ").concat(e.result," ").concat(e.label):"".concat(e.fullString," ").concat(e.label),c(n,t)})),o=o.rolls.map((function(e,t){return Object(F.jsx)(K,{roll:e},"roll#".concat(t))}))):o=Object(F.jsxs)("div",{className:"panel flex-child",children:[" ",o.message," "]})}catch(s){c(n,s.message),o=Object(F.jsxs)("div",{className:"panel flex-child",children:[" ",s.message," "]})}return Object(F.jsx)(T,{rolls:o,handleClose:function(){return l(t)}},"call#".concat(t))}(e,n.state.output.currKey+a,n.state.log,n.props.settings.critRule,n.hideCall)}));this.setState((function(e){return{output:{calls:[].concat(Object(h.a)(e.output.calls),Object(h.a)(a)),currKey:e.output.currKey+a.length},aliases:JSON.parse(localStorage.aliases||"{ }"),log:e.log}})),this.textInputRef.current.focus()}},{key:"onSubmit",value:function(e){e.preventDefault(),"clear"===this.state.rollCommand?this.setState({output:{calls:[],currKey:0}}):"clear log"===this.state.rollCommand?this.onLogClear(e):""!==this.state.rollCommand&&this.handleCommand(this.state.rollCommand,+this.state.times||1),""!==this.state.rollCommand&&this.setState({rollCommand:"",times:""}),this.textInputRef.current.focus()}},{key:"render",value:function(){return this.props.show?Object(F.jsxs)("div",{className:"h-container",children:[Object(F.jsx)(D,{aliases:this.state.aliases,handleUpload:this.handleUpload,handleCommand:this.handleCommand}),Object(F.jsxs)("div",{className:"v-container flex-fill",style:{width:"600px"},children:[Object(F.jsx)(L,{rollCommand:this.state.rollCommand,times:this.state.times,onRollFormChange:this.onRollFormChange,onSubmit:this.onSubmit,textInputRef:this.textInputRef}),Object(F.jsx)("div",{className:"flex-fill",style:{margin:"1em"},children:Object(F.jsx)("div",{className:"h-container",style:{alignItems:"center",height:"45vh",overflow:"auto"},children:this.state.output.calls.filter((function(e){return null!==e})).reverse()})}),Object(F.jsx)("div",{className:"h-container",children:Object(F.jsx)(q,{log:this.state.log.components,onLogClear:this.onLogClear})})]})]}):null}}]),n}(l.a.Component);function z(e){return Object(F.jsxs)("label",{className:"input-radio-container",children:[Object(F.jsx)("input",{type:"radio",name:e.name,value:e.value,onChange:e.onChange,checked:e.checked}),Object(F.jsx)("span",{className:"input-radio-check"}),e.content]})}var B=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(s.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){if(!this.props.show)return null;function e(e,t,n){return Object(F.jsx)(z,{name:"critRule",value:e,onChange:n.onSettingsChange,content:t,checked:n.settings.critRule===e})}return Object(F.jsx)("div",{children:Object(F.jsxs)("div",{className:"panel",style:{textAlign:"left"},children:[Object(F.jsx)("h2",{style:{textAlign:"center"},children:" Settings "}),Object(F.jsx)("h3",{children:" Crit Rule "}),Object(F.jsx)("i",{style:{fontSize:".75em"},children:"Note that this only applies to future rolls."}),Object(F.jsxs)("form",{style:{paddingTop:".75em"},children:[e("rolldouble","Roll double the number of dice.",this.props),Object(F.jsx)("br",{}),e("doubledice","Roll the dice normally and double them.",this.props),Object(F.jsx)("br",{}),e("addmaxdice","Roll the dice normally and add the maximum possible dice roll on top.",this.props),Object(F.jsx)("br",{})]})]})})}}]),n}(l.a.Component);function Q(e){return Object(F.jsxs)("section",{className:"textheavy",children:[Object(F.jsx)("h3",{children:"Quick Start"}),Object(F.jsxs)("p",{children:["Hello, welcome to QuickRoll! Most functionallity is available through the command line at the top of the Roller page. Try typing ",Object(F.jsx)("code",{children:"d20"}),"! Now try making the roll more complicated with ",Object(F.jsx)("code",{children:"2d10+d4+7"}),". If you wanted to make that roll three more times, you can type ",Object(F.jsx)("code",{children:"3"})," in the adjacent text input. And if you want to clear the rolls that you currently see, type ",Object(F.jsx)("code",{children:"clear"}),", or you can directly click on the rolls that you want to have removed."]}),Object(F.jsxs)("p",{children:["If you wanted to have advantage or disadvantage, you have two options. You could use the dice notation itself, as in ",Object(F.jsx)("code",{children:"2d20k1"})," for advantage(",Object(F.jsx)("code",{children:"k1"})," means to keep the 1st highest dice roll), or ",Object(F.jsx)("code",{children:"2d20kl1"})," for disadvantage (the ",Object(F.jsx)("code",{children:"l"})," tells the keep notation to only keep the lowest). An alternative way would be to use the ",Object(F.jsx)("code",{children:"adv"})," and ",Object(F.jsx)("code",{children:"dis"})," keywords: ",Object(F.jsx)("code",{children:"d20 adv"}),". Another useful keyword you can use on pure rolls would be ",Object(F.jsx)("code",{children:"max"}),", which maxes the output of all dice rolls."]}),Object(F.jsxs)("p",{children:["The last major thing you can do with these pure rolls is label them. If you wanted to note the kind of damage or the source, you can create one with square brackets: ",Object(F.jsx)("code",{children:"6d6 [fire]"}),"."]}),Object(F.jsx)("p",{children:"If you want to save a particular roll so that you can use it numerous times later, you can create an alias with"}),Object(F.jsx)("center",{children:Object(F.jsx)("code",{children:"alias <name> {roll 1} {roll 2} {roll 3} ..."})}),Object(F.jsxs)("p",{children:["Note, alias names cannot contain white space. For example ",Object(F.jsx)("code",{children:"alias fireball {8d6 [fire]}"}),". To use the alias simply enter ",Object(F.jsx)("code",{children:"fireball"}),", or click on it in the list of aliases. Another example might be"]}),Object(F.jsx)("center",{children:Object(F.jsx)("code",{children:"alias shortsword {d20 [to hit]} {d6 [slashing]}"})}),Object(F.jsxs)("p",{children:["Like pure rolls, it is easy to give this attack alias advantage or disadvantage with ",Object(F.jsx)("code",{children:"shortsword dis"}),". This will assume that the d20 to hit roll is the first roll. You can also add an additional roll to a single use of the alias by doing ",Object(F.jsx)("code",{children:"shortsword {d4+1 [poison]}"}),"."]}),Object(F.jsxs)("p",{children:["QuickRoll also has crit handling (you can pick which crit damage rule you prefer in the settings page). In order to do so, however, you need to indicate which rolls of an alias are the 'to hit' rolls, and which rolls are eligible for crit damage. Using the shortsword example from before, this can be done in two ways. You can use ",Object(F.jsx)("code",{children:"tohit"})," and ",Object(F.jsx)("code",{children:"cancrit"})," on individual rolls:"]}),Object(F.jsx)("center",{children:Object(F.jsx)("code",{children:"alias shortsword {d20 [to hit] tohit} {d6 [slashing] cancrit}"})}),Object(F.jsxs)("p",{children:["or as a shorthand, you can use the alias specific ",Object(F.jsx)("code",{children:"attack"})," keyword. This keyword assumes that the first roll is the to hit roll, and all following are crit damage."]}),Object(F.jsx)("center",{children:Object(F.jsx)("code",{children:"alias shortsword {d20 [to hit]} {d6 [slashing]} attack"})}),Object(F.jsx)("p",{children:"Now, whenever the to hit roll is 20, crit damage will be automatically calculated! If you want to see the math, you can always mouseover the individual rolls for a helpful tooltip. With these rules, most rolls in DnD will be easy to make, and when necessary, store and use repeatedly using the alias system. Good luck!"})]})}var W=function(e){return e.show?Object(F.jsx)("div",{className:"panel",style:{textAlign:"left"},children:Object(F.jsx)(Q,{})}):null},Y=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(s.a)(this,n),a=t.call(this,e),localStorage.aliases||localStorage.setItem("aliases",JSON.stringify({})),localStorage.settings||localStorage.setItem("settings",JSON.stringify({critRule:"rolldouble"})),a.state={page:"roller",settings:JSON.parse(localStorage.settings)},a.onPageClick=a.onPageClick.bind(Object(i.a)(a)),a.onSettingsChange=a.onSettingsChange.bind(Object(i.a)(a)),a}return Object(r.a)(n,[{key:"onPageClick",value:function(e){this.setState({page:e.target.name})}},{key:"onSettingsChange",value:function(e){var t=this.state.settings;t[e.target.name]=e.target.value,this.setState({settings:t}),localStorage.setItem("settings",JSON.stringify(t))}},{key:"render",value:function(){var e=this;var t=["roller","settings","help"].map((function(t){return n=t,a=e.onPageClick,l=t===e.state.page,Object(F.jsx)("button",{className:l?"page-button-active":"page-button",name:n,onClick:a,active:!0,children:"".concat(n.charAt(0).toUpperCase()).concat(n.slice(1))});var n,a,l}));return Object(F.jsxs)("div",{children:[Object(F.jsx)("h1",{style:{padding:"10px"},children:" quickroll "}),Object(F.jsx)("span",{style:{padding:"10px"},children:t}),Object(F.jsx)(M,{show:"roller"===this.state.page,settings:this.state.settings}),Object(F.jsx)(B,{show:"settings"===this.state.page,settings:this.state.settings,onSettingsChange:this.onSettingsChange}),Object(F.jsx)(W,{show:"help"===this.state.page})]})}}]),n}(l.a.Component),$=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,22)).then((function(t){var n=t.getCLS,a=t.getFID,l=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),a(e),l(e),c(e),o(e)}))};o.a.render(Object(F.jsx)(l.a.StrictMode,{children:Object(F.jsx)(Y,{})}),document.getElementById("root")),$()},9:function(e,t,n){}},[[21,1,2]]]);
//# sourceMappingURL=main.a3c12ae8.chunk.js.map