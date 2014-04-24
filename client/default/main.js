/*! FeedHenry-App-Forms-App-Generator - v0.3.12 - 2014-04-24
* https://github.com/feedhenry/Wufoo-Template/
* Copyright (c) 2014 FeedHenry */

(function(a){function u(e,j){function f(f){return a.isArray(g.readonly)?(f=a(".dwwl",t).index(f),g.readonly[f]):g.readonly}function x(a){var f="",e;for(e in T[a])f+='<li class="dw-v" data-val="'+e+'" style="height:'+H+"px;line-height:"+H+'px;"><div class="dw-i">'+T[a][e]+"</div></li>";return f}function p(){var f=document.body,a=document.documentElement;return Math.max(f.scrollHeight,f.offsetHeight,a.clientHeight,a.scrollHeight,a.offsetHeight)}function l(f){c=a("li.dw-v",f).eq(0).index();d=a("li.dw-v",
f).eq(-1).index();y=a("ul",t).index(f);m=H;o=k}function q(f){var a=g.headerText;return a?"function"==typeof a?a.call(L,f):a.replace(/\{value\}/i,f):""}function w(){k.temp=P&&(null!==k.val&&k.val!=v.val()||!v.val().length)||null===k.values?g.parseValue(v.val()||"",k):k.values.slice(0);k.setValue(!0)}function u(f,e,g,c){K("validate",[t,e]);a(".dww ul",t).each(function(g){var x=a(this),b=a('li[data-val="'+k.temp[g]+'"]',x),d=b.index(),j=g==e||void 0===e;if(!b.hasClass("dw-v")){for(var h=b,i=0,n=0;h.prev().length&&
!h.hasClass("dw-v");)h=h.prev(),i++;for(;b.next().length&&!b.hasClass("dw-v");)b=b.next(),n++;(n<i&&n&&2!==c||!i||!h.hasClass("dw-v")||1==c)&&b.hasClass("dw-v")?d+=n:(b=h,d-=i)}if(!b.hasClass("dw-sel")||j)k.temp[g]=b.attr("data-val"),a(".dw-sel",x).removeClass("dw-sel"),b.addClass("dw-sel"),k.scroll(x,g,d,f)});k.change(g)}function W(){function f(){a(".dwc",t).each(function(){k=a(this).outerWidth(!0);e+=k;b=k>b?k:b});k=e>x?b:e;k=a(".dwwr",t).width(k+1).outerWidth();n=j.outerHeight()}if("inline"!=g.display){var e=
0,b=0,x=a(window).width(),c=window.innerHeight,d=a(window).scrollTop(),j=a(".dw",t),k,h,i,n,m,o={},F,s=void 0===g.anchor?v:g.anchor,c=c||a(window).height();if("modal"==g.display)f(),i=(x-k)/2,h=d+(c-n)/2;else if("bubble"==g.display){f();var l=s.offset(),A=a(".dw-arr",t),q=a(".dw-arrw-i",t),r=j.outerWidth();m=s.outerWidth();i=l.left-(j.outerWidth(!0)-m)/2;i=i>x-r?x-(r+20):i;i=0<=i?i:20;h=l.top-(j.outerHeight()+3);h<d||l.top>d+c?(j.removeClass("dw-bubble-top").addClass("dw-bubble-bottom"),h=l.top+s.outerHeight()+
3,F=h+j.outerHeight(!0)>d+c||l.top>d+c):j.removeClass("dw-bubble-bottom").addClass("dw-bubble-top");h=h>=d?h:d;d=l.left+m/2-(i+(r-q.outerWidth())/2);d>q.outerWidth()&&(d=q.outerWidth());A.css({left:d})}else o.width="100%","top"==g.display?h=d:"bottom"==g.display&&(h=d+c-j.outerHeight(),h=0<=h?h:0);o.top=h;o.left=i;j.css(o);a(".dwo, .dw-persp",t).height(0).height(p());F&&a(window).scrollTop(h+j.outerHeight(!0)-c)}}function K(f,e){var b;e.push(k);a.each([U,j],function(a,d){d[f]&&(b=d[f].apply(L,e))});
return b}function aa(f){var a=+f.data("pos")+1;h(f,a>d?c:a,1)}function Y(f){var a=+f.data("pos")-1;h(f,a<c?d:a,2)}var k=this,X=a.mobiscroll,L=e,v=a(L),E,Z,g=B({},J),U={},$,H,F,t,T=[],Q={},P=v.is("input"),R=!1;k.enable=function(){g.disabled=!1;P&&v.prop("disabled",!1)};k.disable=function(){g.disabled=!0;P&&v.prop("disabled",!0)};k.scroll=function(f,a,e,b,d,g){function c(){clearInterval(Q[a]);Q[a]=void 0;f.data("pos",e).closest(".dwwl").removeClass("dwa")}var x=($-e)*H,j,g=g||C;f.attr("style",(b?N+
"-transition:all "+b.toFixed(1)+"s ease-out;":"")+(S?N+"-transform:translate3d(0,"+x+"px,0);":"top:"+x+"px;"));Q[a]&&c();b&&void 0!==d?(j=0,f.closest(".dwwl").addClass("dwa"),Q[a]=setInterval(function(){j+=0.1;f.data("pos",Math.round((e-d)*Math.sin(j/b*(Math.PI/2))+d));j>=b&&(c(),g())},100),K("onAnimStart",[a,b])):(f.data("pos",e),g())};k.setValue=function(f,a,e,b){b||(k.values=k.temp.slice(0));R&&f&&u(e);a&&(F=g.formatResult(k.temp),k.val=F,P&&v.val(F).trigger("change"))};k.validate=function(f,a){u(0.2,
f,!0,a)};k.change=function(f){F=g.formatResult(k.temp);"inline"==g.display?k.setValue(!1,f):a(".dwv",t).html(q(F));f&&K("onChange",[F])};k.hide=function(f){if(!1===K("onClose",[F]))return!1;a(".dwtd").prop("disabled",!1).removeClass("dwtd");v.blur();t&&("inline"!=g.display&&g.animate&&!f?(a(".dw",t).addClass("dw-"+g.animate+" dw-out"),setTimeout(function(){t.remove();t=null},350)):(t.remove(),t=null),R=!1,a(window).unbind(".dw"))};k.changeWheel=function(f,e){if(t){var b=0,d,c,j=f.length;for(d in g.wheels)for(c in g.wheels[d]){if(-1<
a.inArray(b,f)&&(T[b]=g.wheels[d][c],a("ul",t).eq(b).html(x(b)),j--,!j)){W();u(e);return}b++}}};k.show=function(e){if(g.disabled||R)return!1;"top"==g.display&&(g.animate="slidedown");"bottom"==g.display&&(g.animate="slideup");w();K("onBeforeShow",[t]);var d=0,c,j="",m="",o="";g.animate&&!e&&(m='<div class="dw-persp">',o="</div>",j="dw-"+g.animate+" dw-in");j='<div class="'+g.theme+" dw-"+g.display+'">'+("inline"==g.display?'<div class="dw dwbg dwi"><div class="dwwr">':m+'<div class="dwo"></div><div class="dw dwbg '+
j+'"><div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div><div class="dwwr">'+(g.headerText?'<div class="dwv"></div>':""));for(e=0;e<g.wheels.length;e++){j+='<div class="dwc'+("scroller"!=g.mode?" dwpm":" dwsc")+(g.showLabel?"":" dwhl")+'"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>';for(c in g.wheels[e])T[d]=g.wheels[e][c],j+='<td><div class="dwwl dwrc dwwl'+d+'">'+("scroller"!=g.mode?'<div class="dwwb dwwbp" style="height:'+H+"px;line-height:"+
H+'px;"><span>+</span></div><div class="dwwb dwwbm" style="height:'+H+"px;line-height:"+H+'px;"><span>&ndash;</span></div>':"")+'<div class="dwl">'+c+'</div><div class="dww dwrc" style="height:'+g.rows*H+"px;min-width:"+g.width+'px;"><ul>',j+=x(d),j+='</ul><div class="dwwo"></div></div><div class="dwwol"></div></div></td>',d++;j+="</tr></table></div></div>"}j+=("inline"!=g.display?'<div class="dwbc'+(g.button3?" dwbc-p":"")+'"><span class="dwbw dwb-s"><span class="dwb">'+g.setText+"</span></span>"+
(g.button3?'<span class="dwbw dwb-n"><span class="dwb">'+g.button3Text+"</span></span>":"")+'<span class="dwbw dwb-c"><span class="dwb">'+g.cancelText+"</span></span></div>"+o:'<div class="dwcc"></div>')+"</div></div></div>";t=a(j);u();"inline"!=g.display?t.appendTo("body"):v.is("div")?v.html(t):t.insertAfter(v);R=!0;"inline"!=g.display&&(a(".dwb-s span",t).click(function(){if(k.hide()!==false){k.setValue(false,true);K("onSelect",[k.val])}return false}),a(".dwb-c span",t).click(function(){k.hide()!==
false&&K("onCancel",[k.val]);return false}),g.button3&&a(".dwb-n span",t).click(g.button3),g.scrollLock&&t.bind("touchmove",function(f){f.preventDefault()}),a("input,select").each(function(){a(this).prop("disabled")||a(this).addClass("dwtd")}),a("input,select").prop("disabled",!0),W(),a(window).bind("resize.dw",W));t.delegate(".dwwl","DOMMouseScroll mousewheel",function(e){if(!f(this)){e.preventDefault();var e=e.originalEvent,e=e.wheelDelta?e.wheelDelta/120:e.detail?-e.detail/3:0,b=a("ul",this),d=
+b.data("pos"),d=Math.round(d-e);l(b);h(b,d,e<0?1:2)}}).delegate(".dwb, .dwwb",M,function(){a(this).addClass("dwb-a")}).delegate(".dwwb",M,function(e){var d=a(this).closest(".dwwl");if(!f(d)&&!d.hasClass("dwa")){e.preventDefault();e.stopPropagation();var j=d.find("ul"),c=a(this).hasClass("dwwbp")?aa:Y;b=true;l(j);clearInterval(i);i=setInterval(function(){c(j)},g.delay);c(j)}}).delegate(".dwwl",M,function(e){e.preventDefault();if(!n&&!f(this)&&!b&&g.mode!="clickpick"){n=true;s=a("ul",this);s.closest(".dwwl").addClass("dwa");
A=+s.data("pos");l(s);I=Q[y]!==void 0;z=O(e);D=new Date;r=z;k.scroll(s,y,A)}});K("onShow",[t,F]);E.init(t,k)};k.init=function(f){E=B({defaults:{},init:C},X.themes[f.theme||g.theme]);Z=X.i18n[f.lang||g.lang];B(j,f);B(g,E.defaults,Z,j);k.settings=g;v.unbind(".dw");if(f=X.presets[g.preset])U=f.call(L,k),B(g,U,j),B(G,U.methods);$=Math.floor(g.rows/2);H=g.height;void 0!==v.data("dwro")&&(L.readOnly=V(v.data("dwro")));R&&k.hide();"inline"==g.display?k.show():(w(),P&&g.showOnFocus&&(v.data("dwro",L.readOnly),
L.readOnly=!0,v.bind("focus.dw",function(){k.show()})))};k.values=null;k.val=null;k.temp=null;k.init(j)}function E(e){for(var a in e)if(void 0!==Y[e[a]])return!0;return!1}function O(e){var a=e.originalEvent,f=e.changedTouches;return f||a&&a.changedTouches?a?a.changedTouches[0].pageY:f[0].pageY:e.pageY}function V(e){return!0===e||"true"==e}function q(e,a,f){e=e>f?f:e;return e<a?a:e}function h(e,b,f,x,h){var b=q(b,c,d),i=a("li",e).eq(b),n=y,x=x?b==h?0.1:Math.abs(0.1*(b-h)):0;o.scroll(e,n,b,x,h,function(){o.temp[n]=
i.attr("data-val");o.validate(n,f)})}function l(e,a,f){return G[a]?G[a].apply(e,Array.prototype.slice.call(f,1)):"object"===typeof a?G.init.call(e,a):e}var p={},i,C=function(){},m,c,d,o,w=(new Date).getTime(),n,b,s,y,z,r,D,A,I,Y=document.createElement("modernizr").style,S=E(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]),N=function(){var a=["Webkit","Moz","O","ms"],b;for(b in a)if(E([a[b]+"Transform"]))return"-"+a[b].toLowerCase();return""}(),B=a.extend,
M="touchstart mousedown",J={width:70,height:40,rows:3,delay:300,disabled:!1,readonly:!1,showOnFocus:!0,showLabel:!0,wheels:[],theme:"",headerText:"{value}",display:"modal",mode:"scroller",preset:"",lang:"en-US",setText:"Set",cancelText:"Cancel",scrollLock:!0,formatResult:function(a){return a.join(" ")},parseValue:function(a,b){var f=b.settings.wheels,d=a.split(" "),c=[],h=0,i,n,m;for(i=0;i<f.length;i++)for(n in f[i]){if(void 0!==f[i][n][d[h]])c.push(d[h]);else for(m in f[i][n]){c.push(m);break}h++}return c}},
G={init:function(a){void 0===a&&(a={});return this.each(function(){this.id||(w+=1,this.id="scoller"+w);p[this.id]=new u(this,a)})},enable:function(){return this.each(function(){var a=p[this.id];a&&a.enable()})},disable:function(){return this.each(function(){var a=p[this.id];a&&a.disable()})},isDisabled:function(){var a=p[this[0].id];if(a)return a.settings.disabled},option:function(a,b){return this.each(function(){var f=p[this.id];if(f){var d={};"object"===typeof a?d=a:d[a]=b;f.init(d)}})},setValue:function(a,
b,f,d){return this.each(function(){var c=p[this.id];c&&(c.temp=a,c.setValue(!0,b,f,d))})},getInst:function(){return p[this[0].id]},getValue:function(){var a=p[this[0].id];if(a)return a.values},show:function(){var a=p[this[0].id];if(a)return a.show()},hide:function(){return this.each(function(){var a=p[this.id];a&&a.hide()})},destroy:function(){return this.each(function(){var b=p[this.id];b&&(b.hide(),a(this).unbind(".dw"),delete p[this.id],a(this).is("input")&&(this.readOnly=V(a(this).data("dwro"))))})}};
a(document).bind("touchmove mousemove",function(a){n&&(a.preventDefault(),r=O(a),o.scroll(s,y,q(A+(z-r)/m,c-1,d+1)),I=!0)});a(document).bind("touchend mouseup",function(e){if(n){e.preventDefault();var j=new Date-D,e=q(A+(z-r)/m,c-1,d+1),f;f=s.offset().top;300>j?(j=(r-z)/j,j=j*j/0.0012,0>r-z&&(j=-j)):j=r-z;if(!j&&!I){f=Math.floor((r-f)/m);var x=a("li",s).eq(f);x.addClass("dw-hl");setTimeout(function(){x.removeClass("dw-hl")},200)}else f=Math.round(A-j/m);h(s,f,0,!0,Math.round(e));n=!1;s=null}b&&(clearInterval(i),
b=!1);a(".dwb-a").removeClass("dwb-a")});a.fn.mobiscroll=function(b){B(this,a.mobiscroll.shorts);return l(this,b,arguments)};a.mobiscroll=a.mobiscroll||{setDefaults:function(a){B(J,a)},presetShort:function(a){this.shorts[a]=function(b){return l(this,B(b,{preset:a}),arguments)}},shorts:{},presets:{},themes:{},i18n:{}};a.scroller=a.scroller||a.mobiscroll;a.fn.scroller=a.fn.scroller||a.fn.mobiscroll})(jQuery);(function(a){var u=a.mobiscroll,E=new Date,O={dateFormat:"mm/dd/yy",dateOrder:"mmddy",timeWheels:"hhiiA",timeFormat:"hh:ii A",startYear:E.getFullYear()-100,endYear:E.getFullYear()+1,monthNames:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),monthNamesShort:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),dayNames:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),dayNamesShort:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
shortYearCutoff:"+10",monthText:"Month",dayText:"Day",yearText:"Year",hourText:"Hours",minuteText:"Minutes",secText:"Seconds",ampmText:"&nbsp;",nowText:"Now",showNow:!1,stepHour:1,stepMinute:1,stepSecond:1,separator:" "},V=function(q){function h(a,b,d){return void 0!==n[b]?+a[n[b]]:void 0!==d?d:S[s[b]]?S[s[b]]():s[b](S)}function l(a,b){return Math.floor(a/b)*b}function p(a){var b=h(a,"h",0);return new Date(h(a,"y"),h(a,"m"),h(a,"d",1),h(a,"ap")?b+12:b,h(a,"i",0),h(a,"s",0))}var i=a(this),C={},m;if(i.is("input")){switch(i.attr("type")){case "date":m=
"yy-mm-dd";break;case "datetime":m="yy-mm-ddTHH:ii:ssZ";break;case "datetime-local":m="yy-mm-ddTHH:ii:ss";break;case "month":m="yy-mm";C.dateOrder="mmyy";break;case "time":m="HH:ii:ss"}var c=i.attr("min"),i=i.attr("max");c&&(C.minDate=u.parseDate(m,c));i&&(C.maxDate=u.parseDate(m,i))}var d=a.extend({},O,C,q.settings),o=0,C=[],w=[],n={},b,s={y:"getFullYear",m:"getMonth",d:"getDate",h:function(a){a=a.getHours();a=I&&12<=a?a-12:a;return l(a,N)},i:function(a){return l(a.getMinutes(),B)},s:function(a){return l(a.getSeconds(),
M)},ap:function(a){return A&&11<a.getHours()?1:0}},y=d.preset,z=d.dateOrder,r=d.timeWheels,D=z.match(/D/),A=r.match(/a/i),I=r.match(/h/),E="datetime"==y?d.dateFormat+d.separator+d.timeFormat:"time"==y?d.timeFormat:d.dateFormat,S=new Date,N=d.stepHour,B=d.stepMinute,M=d.stepSecond,J=d.minDate||new Date(d.startYear,0,1),G=d.maxDate||new Date(d.endYear,11,31,23,59,59);m=m||E;if(y.match(/date/i)){a.each(["y","m","d"],function(a,d){b=z.search(RegExp(d,"i"));-1<b&&w.push({o:b,v:d})});w.sort(function(a,
b){return a.o>b.o?1:-1});a.each(w,function(a,b){n[b.v]=a});c={};for(i=0;3>i;i++)if(i==n.y){o++;c[d.yearText]={};var e=J.getFullYear(),j=G.getFullYear();for(b=e;b<=j;b++)c[d.yearText][b]=z.match(/yy/i)?b:(b+"").substr(2,2)}else if(i==n.m){o++;c[d.monthText]={};for(b=0;12>b;b++)e=z.replace(/[dy]/gi,"").replace(/mm/,9>b?"0"+(b+1):b+1).replace(/m/,b),c[d.monthText][b]=e.match(/MM/)?e.replace(/MM/,'<span class="dw-mon">'+d.monthNames[b]+"</span>"):e.replace(/M/,'<span class="dw-mon">'+d.monthNamesShort[b]+
"</span>")}else if(i==n.d){o++;c[d.dayText]={};for(b=1;32>b;b++)c[d.dayText][b]=z.match(/dd/i)&&10>b?"0"+b:b}C.push(c)}if(y.match(/time/i)){w=[];a.each(["h","i","s"],function(a,b){a=r.search(RegExp(b,"i"));-1<a&&w.push({o:a,v:b})});w.sort(function(a,b){return a.o>b.o?1:-1});a.each(w,function(a,b){n[b.v]=o+a});c={};for(i=o;i<o+3;i++)if(i==n.h){o++;c[d.hourText]={};for(b=0;b<(I?12:24);b+=N)c[d.hourText][b]=I&&0==b?12:r.match(/hh/i)&&10>b?"0"+b:b}else if(i==n.i){o++;c[d.minuteText]={};for(b=0;60>b;b+=
B)c[d.minuteText][b]=r.match(/ii/)&&10>b?"0"+b:b}else if(i==n.s){o++;c[d.secText]={};for(b=0;60>b;b+=M)c[d.secText][b]=r.match(/ss/)&&10>b?"0"+b:b}A&&(n.ap=o++,i=r.match(/A/),c[d.ampmText]={"0":i?"AM":"am",1:i?"PM":"pm"});C.push(c)}q.setDate=function(a,b,d,c){for(var e in n)this.temp[n[e]]=a[s[e]]?a[s[e]]():s[e](a);this.setValue(!0,b,d,c)};q.getDate=function(a){return p(a)};return{button3Text:d.showNow?d.nowText:void 0,button3:d.showNow?function(){q.setDate(new Date,!1,0.3,!0)}:void 0,wheels:C,headerText:function(){return u.formatDate(E,
p(q.temp),d)},formatResult:function(a){return u.formatDate(m,p(a),d)},parseValue:function(a){var b=new Date,c,e=[];try{b=u.parseDate(m,a,d)}catch(h){}for(c in n)e[n[c]]=b[s[c]]?b[s[c]]():s[c](b);return e},validate:function(b){var c=q.temp,e={y:J.getFullYear(),m:0,d:1,h:0,i:0,s:0,ap:0},i={y:G.getFullYear(),m:11,d:31,h:l(I?11:23,N),i:l(59,B),s:l(59,M),ap:1},j=!0,m=!0;a.each("y,m,d,ap,h,i,s".split(","),function(o,l){if(n[l]!==void 0){var p=e[l],q=i[l],A=31,k=h(c,l),r=a("ul",b).eq(n[l]),w,v;if(l=="d"){w=
h(c,"y");v=h(c,"m");q=A=32-(new Date(w,v,32)).getDate();D&&a("li",r).each(function(){var b=a(this),c=b.data("val"),e=(new Date(w,v,c)).getDay(),c=z.replace(/[my]/gi,"").replace(/dd/,c<10?"0"+c:c).replace(/d/,c);a(".dw-i",b).html(c.match(/DD/)?c.replace(/DD/,'<span class="dw-day">'+d.dayNames[e]+"</span>"):c.replace(/D/,'<span class="dw-day">'+d.dayNamesShort[e]+"</span>"))})}j&&J&&(p=J[s[l]]?J[s[l]]():s[l](J));m&&G&&(q=G[s[l]]?G[s[l]]():s[l](G));if(l!="y"){var y=a('li[data-val="'+p+'"]',r).index(),
C=a('li[data-val="'+q+'"]',r).index();a("li",r).removeClass("dw-v").slice(y,C+1).addClass("dw-v");l=="d"&&a("li",r).removeClass("dw-h").slice(A).addClass("dw-h")}k<p&&(k=p);k>q&&(k=q);j&&(j=k==p);m&&(m=k==q);if(d.invalid&&l=="d"){var g=[];d.invalid.dates&&a.each(d.invalid.dates,function(a,b){b.getFullYear()==w&&b.getMonth()==v&&g.push(b.getDate()-1)});if(d.invalid.daysOfWeek){var I=(new Date(w,v,1)).getDay(),u;a.each(d.invalid.daysOfWeek,function(a,b){for(u=b-I;u<A;u=u+7)u>=0&&g.push(u)})}d.invalid.daysOfMonth&&
a.each(d.invalid.daysOfMonth,function(a,b){b=(b+"").split("/");b[1]?b[0]-1==v&&g.push(b[1]-1):g.push(b[0]-1)});a.each(g,function(b,c){a("li",r).eq(c).removeClass("dw-v")})}c[n[l]]=k}})},methods:{getDate:function(b){var c=a(this).mobiscroll("getInst");if(c)return c.getDate(b?c.temp:c.values)},setDate:function(b,c,d,e){void 0==c&&(c=!1);return this.each(function(){var h=a(this).mobiscroll("getInst");h&&h.setDate(b,c,d,e)})}}}};a.each(["date","time","datetime"],function(a,h){u.presets[h]=V;u.presetShort(h)});
u.formatDate=function(q,h,l){if(!h)return null;var l=a.extend({},O,l),p=function(a){for(var c=0;m+1<q.length&&q.charAt(m+1)==a;)c++,m++;return c},i=function(a,c,b){c=""+c;if(p(a))for(;c.length<b;)c="0"+c;return c},u=function(a,c,b,d){return p(a)?d[c]:b[c]},m,c="",d=!1;for(m=0;m<q.length;m++)if(d)"'"==q.charAt(m)&&!p("'")?d=!1:c+=q.charAt(m);else switch(q.charAt(m)){case "d":c+=i("d",h.getDate(),2);break;case "D":c+=u("D",h.getDay(),l.dayNamesShort,l.dayNames);break;case "o":c+=i("o",(h.getTime()-
(new Date(h.getFullYear(),0,0)).getTime())/864E5,3);break;case "m":c+=i("m",h.getMonth()+1,2);break;case "M":c+=u("M",h.getMonth(),l.monthNamesShort,l.monthNames);break;case "y":c+=p("y")?h.getFullYear():(10>h.getYear()%100?"0":"")+h.getYear()%100;break;case "h":var o=h.getHours(),c=c+i("h",12<o?o-12:0==o?12:o,2);break;case "H":c+=i("H",h.getHours(),2);break;case "i":c+=i("i",h.getMinutes(),2);break;case "s":c+=i("s",h.getSeconds(),2);break;case "a":c+=11<h.getHours()?"pm":"am";break;case "A":c+=
11<h.getHours()?"PM":"AM";break;case "'":p("'")?c+="'":d=!0;break;default:c+=q.charAt(m)}return c};u.parseDate=function(q,h,l){var p=new Date;if(!q||!h)return p;var h="object"==typeof h?h.toString():h+"",i=a.extend({},O,l),u=i.shortYearCutoff,l=p.getFullYear(),m=p.getMonth()+1,c=p.getDate(),d=-1,o=p.getHours(),p=p.getMinutes(),w=0,n=-1,b=!1,s=function(a){(a=D+1<q.length&&q.charAt(D+1)==a)&&D++;return a},y=function(a){s(a);a=h.substr(r).match(RegExp("^\\d{1,"+("@"==a?14:"!"==a?20:"y"==a?4:"o"==a?3:
2)+"}"));if(!a)return 0;r+=a[0].length;return parseInt(a[0],10)},z=function(a,b,c){a=s(a)?c:b;for(b=0;b<a.length;b++)if(h.substr(r,a[b].length).toLowerCase()==a[b].toLowerCase())return r+=a[b].length,b+1;return 0},r=0,D;for(D=0;D<q.length;D++)if(b)"'"==q.charAt(D)&&!s("'")?b=!1:r++;else switch(q.charAt(D)){case "d":c=y("d");break;case "D":z("D",i.dayNamesShort,i.dayNames);break;case "o":d=y("o");break;case "m":m=y("m");break;case "M":m=z("M",i.monthNamesShort,i.monthNames);break;case "y":l=y("y");
break;case "H":o=y("H");break;case "h":o=y("h");break;case "i":p=y("i");break;case "s":w=y("s");break;case "a":n=z("a",["am","pm"],["am","pm"])-1;break;case "A":n=z("A",["am","pm"],["am","pm"])-1;break;case "'":s("'")?r++:b=!0;break;default:r++}100>l&&(l+=(new Date).getFullYear()-(new Date).getFullYear()%100+(l<=("string"!=typeof u?u:(new Date).getFullYear()%100+parseInt(u,10))?0:-100));if(-1<d){m=1;c=d;do{i=32-(new Date(l,m-1,32)).getDate();if(c<=i)break;m++;c-=i}while(1)}o=new Date(l,m-1,c,-1==
n?o:n&&12>o?o+12:!n&&12==o?0:o,p,w);if(o.getFullYear()!=l||o.getMonth()+1!=m||o.getDate()!=c)throw"Invalid date";return o}})(jQuery);

var App = App || {};

App.MockForm = {
  "fh_full_data_loaded": true,
  "Name": "WuFoo Phase II",
  "Description": "This is the sample form being used for development of WuFoo Phase II. It contains all standard fields and has multiple pages and rules.",
  "RedirectMessage": "Great! Thanks for filling out my form!",
  "Url": "wufoo-phase-ii",
  "Email": "",
  "IsPublic": "1",
  "Language": "english",
  "StartDate": "2000-01-01 12:00:00",
  "EndDate": "2030-01-01 12:00:00",
  "EntryLimit": "0",
  "DateCreated": "2012-10-23 10:58:40",
  "DateUpdated": "2012-10-30 07:58:30",
  "Hash": "s7w7z7",
  "LinkFields": "https://feedhenry.wufoo.eu/api/v3/forms/s7w7z7/fields.json",
  "LinkEntries": "https://feedhenry.wufoo.eu/api/v3/forms/s7w7z7/entries.json",
  "LinkEntriesCount": "https://feedhenry.wufoo.eu/api/v3/forms/s7w7z7/entries/count.json",
  "Pages": [{
    "Title": "Standard Fields",
    "Fields": [{
      "Title": "Single Text Field - No Rules",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "text",
      "ID": "Field1"
    }, {
      "Title": "Single Text Field - Required",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "text",
      "ID": "Field238"
    }, {
      "Title": "Single Text Field - Predefined value",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "predefined value",
      "Page": "1",
      "Type": "text",
      "ID": "Field237"
    }, {
      "Title": "Single Text Field - Range 1 - 4 characters",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "text",
      "ID": "Field240"
    }, {
      "Title": "Single Text Field - skip to pg 3 if val = go",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "text",
      "ID": "Field2"
    }, {
      "Title": "Checkbox - If checked, hide Check1Input below",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "0",
      "Page": "1",
      "SubFields": [{
        "DefaultVal": "0",
        "ID": "Field449",
        "Label": "Hide Check1Input"
      }],
      "Type": "checkbox",
      "ID": "Field449",
      "Rules": [{
        "RuleId": "64",
        "Type": "Hide",
        "Setting": {
          "FieldName": "649",
          "FieldTypes": {
            "449": "checkbox"
          }
        },
        "FormId": "57",
        "MatchType": "any",
        "Conditions": [{
          "ConditionId": "64",
          "FieldName": "449",
          "Filter": "is",
          "Value": "Hide Check1Input",
          "ReportId": "57",
          "RuleId": "64"
        }],
        "condition": {
          "ConditionId": "64",
          "FieldName": "449",
          "Filter": "is",
          "Value": "Hide Check1Input",
          "ReportId": "57",
          "RuleId": "64"
        }
      }]
    }, {
      "Title": "Checkbox - If checked, show Check2Input below",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "0",
      "Page": "1",
      "SubFields": [{
        "DefaultVal": "0",
        "ID": "Field349",
        "Label": "Show Check2Input"
      }],
      "Type": "checkbox",
      "ID": "Field349",
      "Rules": [{
        "RuleId": "65",
        "Type": "Show",
        "Setting": {
          "FieldName": "650",
          "FieldTypes": {
            "349": "checkbox"
          }
        },
        "FormId": "57",
        "MatchType": "any",
        "Conditions": [{
          "ConditionId": "65",
          "FieldName": "349",
          "Filter": "is",
          "Value": "Show Check2Input",
          "ReportId": "57",
          "RuleId": "65"
        }],
        "condition": {
          "ConditionId": "65",
          "FieldName": "349",
          "Filter": "is",
          "Value": "Show Check2Input",
          "ReportId": "57",
          "RuleId": "65"
        }
      }]
    }, {
      "Title": "Check1Input - Shown initially",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "text",
      "ID": "Field649"
    }, {
      "Title": "Check2Input - Hidden initially",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "hide",
      "DefaultVal": "",
      "Page": "1",
      "Type": "text",
      "ID": "Field650"
    }, {
      "Title": "Paragraph Field",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "textarea",
      "ID": "Field4"
    }, {
      "Title": "Paragraph Field - Required",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "textarea",
      "ID": "Field239"
    }, {
      "Title": "Multi Choice Field",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Choices": [{
        "Label": "First Choice"
      }, {
        "Label": "Second Choice"
      }, {
        "Label": "Third Choice"
      }],
      "Type": "radio",
      "ID": "Field105",
      "HasOtherField": false
    }, {
      "Title": "Multi Choice Field - Required!!?!!",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Choices": [{
        "Label": "First Choice"
      }, {
        "Label": "Second Choice"
      }, {
        "Label": "Third Choice"
      }],
      "Type": "radio",
      "ID": "Field241",
      "HasOtherField": false
    }, {
      "Title": "Number field - Range 2 - 8 Value",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "number",
      "ID": "Field242"
    }, {
      "Title": "Number field - Range 1 - 3 Digits",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "number",
      "ID": "Field243"
    }, {
      "Title": "Number field - required - Hide Checkbox field below if 7",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "number",
      "ID": "Field3",
      "Rules": [{
        "RuleId": "63",
        "Type": "Hide",
        "Setting": {
          "FieldName": "5",
          "FieldTypes": {
            "3": "number"
          }
        },
        "FormId": "57",
        "MatchType": "any",
        "Conditions": [{
          "ConditionId": "63",
          "FieldName": "3",
          "Filter": "is equal to",
          "Value": "7",
          "ReportId": "57",
          "RuleId": "63"
        }],
        "condition": {
          "ConditionId": "63",
          "FieldName": "3",
          "Filter": "is equal to",
          "Value": "7",
          "ReportId": "57",
          "RuleId": "63"
        }
      }]
    }, {
      "Title": "Checkbox field - No Rules - Will hide if number field above is 7",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "0",
      "Page": "1",
      "SubFields": [{
        "DefaultVal": "0",
        "ID": "Field5",
        "Label": "First Choice"
      }, {
        "DefaultVal": "0",
        "ID": "Field6",
        "Label": "Second Choice"
      }, {
        "DefaultVal": "0",
        "ID": "Field7",
        "Label": "Third Choice"
      }],
      "Type": "checkbox",
      "ID": "Field5"
    }, {
      "Title": "Checkbox field - required",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "0",
      "Page": "1",
      "SubFields": [{
        "DefaultVal": "0",
        "ID": "Field244",
        "Label": "First Choice"
      }, {
        "DefaultVal": "0",
        "ID": "Field245",
        "Label": "Second Choice"
      }, {
        "DefaultVal": "0",
        "ID": "Field246",
        "Label": "Third Choice"
      }],
      "Type": "checkbox",
      "ID": "Field244"
    }, {
      "Title": "Dropdown Field - first empty",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Choices": [{
        "Label": ""
      }, {
        "Label": "First Choice"
      }, {
        "Label": "Second Choice"
      }, {
        "Label": "Third Choice"
      }],
      "Type": "select",
      "ID": "Field344",
      "HasOtherField": false
    }, {
      "Title": "Dropdown Field - Required",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Choices": [{
        "Label": "First Choice"
      }, {
        "Label": "Second Choice"
      }, {
        "Label": "Third Choice"
      }],
      "Type": "select",
      "ID": "Field106",
      "HasOtherField": false
    }],
    "Rules": [{
      "RuleId": "60",
      "Type": "SkipToPage",
      "Setting": {
        "Page": "3"
      },
      "FormId": "57",
      "MatchType": "any",
      "Conditions": [{
        "ConditionId": "60",
        "FieldName": "2",
        "Filter": "is",
        "Value": "go",
        "ReportId": "57",
        "RuleId": "60"
      }],
      "condition": {
        "ConditionId": "60",
        "FieldName": "2",
        "Filter": "is",
        "Value": "go",
        "ReportId": "57",
        "RuleId": "60"
      }
    }]
  }, {
    "Title": "Fancy Fields",
    "Fields": [{
      "Title": "Name",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "SubFields": [{
        "DefaultVal": "",
        "ID": "Field110",
        "Label": "First"
      }, {
        "DefaultVal": "",
        "ID": "Field111",
        "Label": "Last"
      }],
      "Type": "shortname",
      "ID": "Field110"
    }, {
      "Title": "Attach a File",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "file",
      "ID": "Field112"
    }, {
      "Title": "Address",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "SubFields": [{
        "DefaultVal": "",
        "ID": "Field113",
        "Label": "Street Address"
      }, {
        "DefaultVal": "",
        "ID": "Field114",
        "Label": "Address Line 2"
      }, {
        "DefaultVal": "",
        "ID": "Field115",
        "Label": "City"
      }, {
        "DefaultVal": "",
        "ID": "Field116",
        "Label": "State / Province / Region"
      }, {
        "DefaultVal": "",
        "ID": "Field117",
        "Label": "Postal / Zip Code"
      }, {
        "DefaultVal": "",
        "ID": "Field118",
        "Label": "Country"
      }],
      "Type": "address",
      "ID": "Field113"
    }, {
      "Title": "Date",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "date",
      "ID": "Field119"
    }, {
      "Title": "Email",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "email",
      "ID": "Field120"
    }, {
      "Title": "Time",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "time",
      "ID": "Field121"
    }, {
      "Title": "Phone Number",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "phone",
      "ID": "Field122"
    }, {
      "Title": "Website",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "url",
      "ID": "Field123"
    }, {
      "Title": "Price Field - Amount Default",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "money",
      "ID": "Field124"
    }, {
      "Title": "Price Field - Amount Euro",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "money",
      "ID": "Field235"
    }, {
      "Title": "Likert - Evaluate the following statements.",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "0",
      "Page": "2",
      "SubFields": [{
        "DefaultVal": "0",
        "ID": "Field125",
        "Label": "Statement One"
      }, {
        "DefaultVal": "0",
        "ID": "Field126",
        "Label": "Statement Two"
      }, {
        "DefaultVal": "0",
        "ID": "Field127",
        "Label": "Statement Three"
      }],
      "Choices": [{
        "Score": 1,
        "Label": "Strongly Disagree"
      }, {
        "Score": 2,
        "Label": "Disagree"
      }, {
        "Score": 3,
        "Label": "Agree"
      }, {
        "Score": 4,
        "Label": "Strongly Agree"
      }],
      "Type": "likert",
      "ID": "Field125",
      "HasOtherField": false
    }]
  }, {
    "Title": "FeedHenry Fields",
    "Fields": [{
      "Title": "fh fhgeo",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhgeo",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field228"
    }, {
      "Title": "fh fhgeoEN",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhgeoEN",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field229"
    }, {
      "Title": "fh fhcam 1/3 - Required",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhcam",
      "DefaultVal": "",
      "Page": "3",
      "Type": "file",
      "ID": "Field227",
      "SubFields": [{
        "Title": "fh fhcam 2/3 - Required",
        "Instructions": "",
        "IsRequired": "0",
        "ClassNames": "fh fhcam",
        "DefaultVal": "",
        "Page": "3",
        "Type": "file",
        "ID": "Field346"
      }, {
        "Title": "fh fhcam 3/3 - Optional",
        "Instructions": "",
        "IsRequired": "0",
        "ClassNames": "fh fhcam",
        "DefaultVal": "",
        "Page": "3",
        "Type": "file",
        "ID": "Field345"
      }]
    }, {
      "Title": "fh fhsig",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhsig",
      "DefaultVal": "",
      "Page": "3",
      "Type": "file",
      "ID": "Field230"
    }, {
      "Title": "fh fhmap",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhmap",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field231"
    }, {
      "Title": "fh fhtime",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhtime",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field232"
    }, {
      "Title": "fh fhdate",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhdate",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field233"
    }]
  }],
  "Theme": '#logo a {background-image:url(\"data:image/gif;base64,R0lGODlhHQEpAPcAAP39/v79/vz9//z+/v///vz//lpXWP/9///+/vz9/v3+/f3//f7//f/9/v7+/fz//f79/fz+/f39/fz9/VlXWP///TEtLpCOj/CWgP/+/ZCPj/fLwMfHxsbHxkxJSv/9/cbHx8bGxv38//z8/1pXV3VzdMbGx/78/o+Oj/38/v78/8bFx8fGx5GOjz47PMfHx8bFxvv+/8fGxuI6Efv9/pGPj/z8/v78/f3y72dlZoOBgvv//+dhQGhlZsjGx/W9sPOwoPbKv+x8YMfFx8fFxnZzdMjHxp2dnf38/ehiQfv+/tTU1dXU1MjGxllXV+VUMfGjkPDw8PDx8JCOjtbU1fz8/eZUMe/w8NTV1f/8/8jHx+diQOdiQfbJv+hhQY+Pj/v//tbV1e6JcO7w8J2cnPDv8epvUI+OjnVzc+Pi4p2cnbm4ubm5uaypq/nYz+/x8OdhQfXKv+Hj4+hhQPv//T87PPHw8fHx8ePh456cneLh41pWWNXV1e7x8NTV02dlZePi456dnZ2bnfbIv/bJvvbKvvnx7+Pj4u/v8ePi4dXT1OHi4/v9/5CPjvCij+t8YPvl3/Dw8fHx8MjFx4SBgrq4uNbU1PTKv/zx7+hiQKupqp6cnKyqq4KBgfji3/v9/f/8/eLj4vvx76qrqu/w8e+VgPXJv/vw7/Hv752bnP/8/vrl3YOBgfDx8e6WgNXU1bi4ubm3uPTIv6yrqvjXz9TT1e2JcOluUPrj3ayrq/v8/llWWOluUaqpqvry7tTU1O6VgPv8/+t7YfDx77q4uZGPju+Vf+Hj4vOwn/zw76yqqvnl3fXKvvjXzvKvn/v+/et7YMXFxvTJv+/v7+7v8aurqp2dnOPj4dPV1Lm5uOt8Ybq5uFpWV9bV1Kuqq/vx7uLi4fO9r/rv7/7+/GhkZuLh4vGij7i5uOHh49XU06urq/S8rqqrq5GOjvHx7+Hj4f/+//z+//z///39//79//7+/v7//v3//v3+/v7///3+//7+//3//yMfIOAtAf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkY3N0YxMTc0MDcyMDY4MTE4MDgzRUI4M0M2MkJEN0MxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM5NkE3NEU2N0RDNTExRTFBQ0FFRTVCQzUwQjI5Q0E2IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM5NkE3NEU1N0RDNTExRTFBQ0FFRTVCQzUwQjI5Q0E2IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUuMSBNYWNpbnRvc2giPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOUI2MUMwQzg5MjA2ODExOEE2REY3NTdFMjY4QjBFNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGNzdGMTE3NDA3MjA2ODExODA4M0VCODNDNjJCRDdDMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdm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\"); min-height:0;height:40px;}* html #logo a {background-image: none;filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"http://www.feedhenry.com/wp-content/themes/feedhenry/images/logo.gif\", sizingMethod=\"crop\");}html{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAADHAQMAAAANjZd0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAA////pdmf3QAAAAJ0Uk5TAB/7m8DNAAAeaUlEQVQYGQXBD0BV9aHA8e/53cPliFc5qDO0qxyRfGxZ3pUtMpQjWrnmNir3npWrm1FzW39uzhUWwg8kpbK6OV9zzeXNqLX3rLlyi5p/jkhFm9XV1R5rpgckJSU84BUPcO457/MRiB44d+wxbjl46vm5DwWzmf5FgAEkI/VF9//25MvXWYRG8rMQHPpIqasdFFZBM8qWODI3pJ4+1JEMrXdiAXYCLv95pXmjcs2iljhZdfArMB9s2z8sxgnoI9hY5qMrNgQ1UjPEfmtsAsXomLLPve+o/KMJkhE4sLffcpT5wtJcQDaZOSMW9FDR9MTTvj5Jhec+9zYHo0JOkYAAJbhQL+tjN4iHZBL8fpuMAQzyBqaXyK1/AY4rioSOwExBCvIlnduAWiFMIKsFpt7oSvA892jogF9qMW/6YrjJm82AhJNAEGyLM/J9X+gpG0CQkwpgOM/0SsXHYsa7mI3bgw/+OfHGpU9K8LIGcsaUVcgTqnCRMGJJVHwA1z/nnjhrdMBLjlS+dbKHLhNAOQ6/amKHVyc4Y0HIzZJQAQRBc/Etv3ArZPeSthlNfa5/aAMAKEZXn4dvSDHveeC7n1rSRoK3Gj40n/0LJodf68hVnbRjT7IAgl6rQrXhgd+Iv2UAq+ekJABiQO0k7MYW+cRVy2UMS3ifSYCwCqYFky4TnzhA4AYKI1DoB064dOWiXet+g6EdHagqkZQAxkLgOatHQjAq3jWAhCQoBzK9GDQ//bYMipWXZ/LxMQuXuXBwB9kS2o8Cg7eJMgDawAXeboLL1n+wYX7Bh7YqM559FnwHRe2J+4kbag1ga45ooxr6Z0gAsWcAvmT63Jf/PPf4Xf/phrHAs8HukAGhV1yAr8XjaIKXJADTZGKFDBcYf09d/m2zVVtu7tDxOiCGr6LPX/oTgIwog3Y8JABdDMgZWx9VlnzvSjqnRWzbjzIEWtn4ZVi5uywVZSQkOmVjKSMZC6D3NqWMo99onjL7zSutfdPU6Xbli+w2MalutdIpu20sAVFRaiaBrAkQ7E02cnKMf2qsNmBMwDtS4y/mGQkO/2DgbpMEMEVIGI+vAjDZqa6CaxfWNzQeo1V7pcCwfNCxAmuPhQ+dwDUCjnkAxAE7DOJcxT19JaSyVhxph6QtwxSY1RKIAvxNwAyXoAz0MnrKc+gNHdoX7b6ZsDyL7v43MEHp8e0owExpgBBAviQCYyRkG4wkZtvwlOEAoefGbYu60qVanLtNAL9+OSDK2GNLHJT1DtDsEXbeVwskDV5FbOHgUlnT/4zr8Ov9AJVjJHQLDdEFKXhZBzwtxep5fXsuRnvtP5vzN2UI9u72Go+cmAeQyE+PSsSooVbsogytwgQeRnFnu1W2H+LL1RVVHW8skrc4BKUlNsDshS89JR2RI87IGPCOBigvNwWTGjuqHZPVtgBhfoGwjyHtXgidVav0+00E1vCqV0Hxv5EA/p6oUZq8K/wYizXt5I1W6vZSSBZgAqFLO22V1JAgZ+6NNcpCuasFCyYhp9bZLjBPbw32xzlv+XR4dwIo75WhuNaomGfz9zrCK6XMhaB41LkSM4WjomUvaRlt0Xl043GvDsDr2RPx1F2IE+UzbmwS9VnvUxZBr27di1hKyvNTt4lzbdHA0Kx2mxhAa4nMeCAGCzeW4Q/QtdPEUiafM8AnkDDfOtgbsgp8SysgtQjI3pyY1HBwOWJwtb0a/KJxy/UmgmIaeoLSy6FM5MXvGHB9x7Or3Nw9UgJxx9WpQkj3cDP5twaPDVYsN+jSUzGw4YQ6eUYyNz/cr15gDA9tk+TzubXESbUoggkxi4hxrPhVjDgDR4SOCijeHno2L/QG/XBPQbDyLLgMm9ONZ5eqAs0GYZFNKPssXNSDhIHsYiNengQb/AFO+BCCDmMAt1LEHUDRyMOrnYlHfCn5wOCeaPCTxN5QUOsF8f5AMnFNFMtlxmBK6L7VCc/IhrN+azt+UUcWDFAONHsoB7NvrhKhNmap5LSsJ+jL9SKFAnAYUUb7R5rGIwN9XB4DQHZ/rXX07FDCAZ5WdZtQZ4Lf5RNKIlJIlJOmrLPabC2C62VxLbggRc6k8ZdiSicbf6xRx8jEjKWOZo1BNAfQ1nEEOTaYEhNYccCGsR81mf2ajWFR1HP5C6/h66OmYZ8euN0Wdu04pfib2/9jzjeVoS8Syn/2ZhmVcOkv5N7U8MFayy4kcolbnT/LOqhnjDUNF+8Rri5o/KSBd5BPh8zwUQkAYdmxyNpanpVM7rqRKjVYsaAm8V02Hwq/KBwTVV8QOSoK0+1YDNsAYJfMSCjXoYPNPytdr0Dc/be2b63vZud3hN0biNONk/5kip/toj+YYAFAdzTyf41OTy90sdtJeW5NyitpkC+qC5LCBMbPry7+1g6ZX+eOyZEAgPfpvrr9U21QlaufLVWx/Uzy+SnkFQ8Lj7gnrx0pm9ObMYPf+jsAgKBgS21wc1BTjxEU1s2PusVvXvW66TUNWaMixce+rx7ZN/UnckGdFa0GADj1a2zr9EZpGbKrINTpfrCme6RoyZgq+6hYgb08ocqcGTf6wXP3TjhrEZIAyz19f/B8ujF2HNW1x6pU1XxezMi78csElnK84LW2a9du+ejSFdMWJ7cSg4lWxVufuT98fcFN9c0n4zO3vrR+BLUlqSj9J1s3CtWQ1oHCunGRDzKaU07jJCJwX+zrBmPjx8abNi2+vCRxRyr4KnhlM8Gi4d5a8StirX0Q+TSm3KR97CIpk9SkJz5akClvVAzOMPFPN8+QhbUjXG+ms7PIioRehIJnlob849buXA4pG1E6za9neatrgia7qFYyYAWDoU7VS8vQs+OdQEQR9NihisNmmXKnlBcu9THE14y1w0/+I7QzZD9g7juZURyjET4162hwVdGjLSE0XWlUO3vo5/DpL5TzhyNzuS6rtXTSPTd4KpX7zhIbjMacF9BHfkZEbHEVpN8q2Pfez7aE0C6uWDGYTPO/4rqPS7wzmthMT0P7S9QVjMldSaMclhmxmx4xv2xxYv89b70l/d5xM8yWSV6FtPc+H/3OXx/8mnNbBwU0/M8YQ05zx5q52s/FWjmhl01q7Xx3vgoVefbKsY/WwdXtQ4N5hDMENa7aBluxzZB27JMgs1mYA9ULCYonZsY9BvMedrpy6x842YOfuFRaSwwJEWXE0oLEMPS4e+eZ6h2C7T960Qg+ZhyqpbQ+klyg77BOTZPnbjwSxAqwYbNXX18GETO7LSdoRdsiUM6fY5uuHKDd5KxnZzqD1445/PP91Yq2HAmuHwf2nSNUc/di3p8WFQSrN8vTv3VdL+aJVJD+YWq45FpQVjfX2bUYKF35Oim6XWugOfFbU78lIRx2Z/Wme7Qdqkvk6VeeVSTpUZ3shluVkln9hTA6+wYJCY+DtTu/34CF6EApXnK7pDnYKrN4F7X8ncEch+mn8JwW0QQ+mGl8c19jKH3GW3d5kygjeHOhUseKU7WrZ49cPFJ+jTumJ8JxvaipqeiCy1i+SCU1dqRmCvlSJ7f+7T0BzA6Nk4E1daZexh1rjuWhvPCeTeH0hqTUl4h3WVpo9PD1gmjw6GVl1R93lAsINoWWoqhrDnu/OJs/+cn0EAvv6IaxeKHXURTxuYdDJshTXOHxRxBQ9FDm5Uezwzs5uDPkJn55+ag/cPj7sISZayYKjMeXYH4O4HdP0lM36YEAcvMM7cyWRJqn9WBV0MOSywbOMqLvNuuU3RRG4p4GoCgPuD2Wlc0REy1MUUFwv+stjLrhRX4r8lyxD6lI4T+viWQfXjdpPKMSvHcNx/UIeWIPThO76wpzlyz2SsdfEJlShenDs0Jk/C88hvgfrWeMaQMYVunJCy/EECbBrcqN4kBX0Crinr9LEGZt6MeFzB7alJWblNqeVG3PLMsiq9v9ztKTNiJI/ewbwfpYeZFy/TlrwsIT+SlEgdFQze7WT2QSBiZYvyzuTVmwlK+TivIZ4sCGVW2Y+nkYCcneDZufk14tRz6RRCbFAHHt9/c/LV/7FfAPFMvqCCHKCxucBmkmQBlHOGZeU+U77zy98xzpfhPIRttHguuIABn55W3mLA8hPHv7xmoPCNtcyPv91R2R5FOhe8aDeBrgv9dd1DRPOgnwTUrR1SERiP11V82okbgpX4bER7jCo64okON0HRAfPGJ5o4szDgQGvYG8XoiMhN+7GopFMW522rRYxqJnHZyqrwa+PODNefzqdmkDSaSSuBMxPkNo58SQxPuxJCtCJ9LRgOh6vQa6JArrl2Xr5d91AEux0c2sUJKMfd19yUFVH3g29EQqle/TbwV3mWMNQPDoHjWofHUfgCY6yzgXCAfG79HsFHxwIH/Bz59ZdvarD45U7MtPKscA8oDHvn6wIkUNXaHEsfuKmkQEcF3GCG+2nHEgWfHvy8M71mQnXuUOaED2qWsh/JKfn6KGIHxh5YRrSgXQxzBtyLzKMj8TXNbq+v3QY+IBvNxOsN2dnnJwyOBfujxpCNXCZV3GxO8my+yGBtW7OC5iJgCEVp3Ldh9f1X4bqg2RsW5XyBUuKE5bpDtEYfIpsXzm+hhm7SDTAYCH01lbRO8Y0QDB+XVqzh1iDwRGYNqIZqCJtC3eqUxG/wUA9JikRxvuONwUArfQiw/UaEIzgXntgtBfQJHnv6v76bM1ISwAsoa96K3MufY56wGgxEeKEoBWz9K02bisGX2/UxXPWQdKYwAwPz7alH3mtUg6C3BXRuz+SgQS+AeJfX6KUndJs697Y+/s0TUNgLKrrRprQo/mTpCgUH8qiGgCAH9wPDp87XjhRSkuYOIaAOS+5nyf98r97PSFEBB6gr/VimEA+sAjHtJ6hZR4tqCvFQDr2Be0XnaMXMc4ijI3+HjhHIQuAWWlQaECdqX8MYjZ2OpsAFT3LQ+pTmCc9EAU6PUoYgSAmac9kEOeWJeBSHLwjYsAIG8Uuzww2bKo1iAg73PfUYUE2D89rsfAn1sbkhDESfvHARQnX8J4s1Oig4JdG7azYnsEimASoSvsLKSXoJz9ZkZVVAkEJ1+0ncZtMgiyWitBikPS9AQ6GFfLl4mbFq0ll5UR+M782UKRSPJ7WixXrPfov0R1IBGY4Ar6IBHnVlgjw9c/+q4FfQ7xkaIDxOFH5naOzvRazRTAGOMcIJis2MnQ+paGiV+icKOXZtyFXdJQCYCBaD2oWddXAmwoP3o4AwIHc/qzC96s2X8IP2kBc+6KIQ64MUB5xy4z7CEvyUEFAoqzK0Bwjbg5JiIxxnXgJdTrYNHuVvOvylo9YsOgicGgpNxAYxJqaCUI8qeq4oyoayNFQBawRhwa+ESOFML/3ibp7al2N4IuSvBz4iAwkmuq8JuMf8eg0huWfHHzMlziZsyCpPohl4e1Pp7Ww9jVXg0Wgu92BY8Ec0eNriUAmskNewIT61aTQgISnhRYgGJF53CtWQQC/2NhgWu8sApsOnPltr5JmD0XLMWB6Y5J8B0JHRk5Y+bw3CvKI4hpw59Panhi04dBKAWnFGOPKb85i+zF2kwM+OL+fqmrRdATmZpeMqX3o64YwlDKrC0y0d3vShgJDNV6vL4JlOgJCxhJ7sfjY3AyLuR9i195iGDJT33p86A7GgdwNjHWqCHp/97CBAeVyaYHotDJGHx62TgNMdiLmGAEo7P2SQDu48KTGnDdfQGgPpiHDYAKs5y+791tIbqWT6JYZFAqbAASiTGvahCkvTCgoYAGuA5Zr+r5UmsBQq239qWcNMEqEyDko2ND26yGo0CwSypqACgZGLol8WIWxL2xSCeA/79gAEnsl2xw65b2Arr1d2ENAit8W2HfKysvdCO+3fC8MAHxBuhdlm91HNhvgfKnYQlMd3w8IAZm5ML3Xk6NKUQs+8GtP071mqPKbDgwIRZULq5vBA6dOWQBf1LJrgKlrxOGhy/+JcHvpWj4XYm2vRfl80IQaZCh1jsAagDQJQDBW90QZUto2qQlpui8a9qiJPhhKHSEwMpeF0hg7SY64OgiCRCJ8WsKKONE6yZTlFZWOQphcFAjeVuwQy1ZIEsxukrlBQlwJccFS+83fb51K8JSXtX1opsYjgP8BQc9lCshvIScZk4VAPDpiACKnujWb7gS0bfXOG0qGsUSQ798d3xATXcXAuEPFaMK1ZYAo48eWEPL+Z939bSvkmJZS+/GLSDfAxDbJVmTScAcqx4DhiVAfm26Ajs0u2KMY5viQvLftH7kmX1WqMuVCRsY3wt0S6SHBwDR1NyVqKJ9+rmmPYiWVWZrb2lBsGwrqzXpA+Smkxg+1Pbia2DDcRnD8od/82HLUipFF6FUv7oR5ynVD0q6QfCtmlJsFUQbJKEgQa+bF+zCY/I83Q8JSv/Zo7KpvD7ixZSXohY+bJ4LTgx+DC5KHjBsmlJ7xfLE1ACxuT4cXXixebTgfl9w7UIJxF4T4yQgA0ghMgBHnjAjuyRbbaaKyt1wNDO/2i+nzBtOA6TEgoTpVqE2giToANgNSu2iXuaBMBTjvl7thMWqBzHcDOBQoWdSYHr1FgmCkxJ4Q0I6kbRkuF+oseA/btKNcoGmGUeA0CeOEdqUBPUzQIbkUiB0CC7KFHTYplIvNvSeUHdZmVZokdY+AHPrQ0HG9tDyn12BhRIBeDNwxKS/VHsGV4vFXu1o/Re17LGcI8skKJyceX1Qnc5yc+89tnhXPphzRkL+GPvKoOEKbMpFsXH69OZfJFMs+jzPKIQgy2c7WGkT/enbOeVsMbkkKslGXeVeBQCE0VxfFThWvo2enG9YwG9WtYjwHopj9HTkdGGnETAgrEOMmZw1s/WizGrQyJrxjKqyaSGgJdllvlBJ2kbH283flq7KkSwXFAYdQNF50cwRL3Me6FDUzhELas6n5rrYnFMHMviL54lNvmYStc2YL6NQtUlMs9/X4+Od7TypJpVNEDKyK4Lktm0hnMNJihyMnbVJixcNYYOEQ9uFo+8qc9CjwSnO7kISQlyqDz82NIkSoHDDW5V71Dslgz2qiQZwm3jNuO0lBoM9cO/IFQFck+/foeG8npKapRE2zP508Rpw933QTwQYCURpf1lw56YREbD7ut3djOv7L/nBow13vW/ZvbIXsq0e3hPv4408N57pwMmwsKle+2gjrSi7OdaJ3nYZUzVhbltS5ZGC/G+0fe6iQICBbYL/uGCCGJvb7OIGq/mwjFGtt2rQjGC1OgGwtntw9kURVcO/d4qDMODkOrHI/pADr6cdcneb4zKoeY2pWG++feUjlg8hV/7bWOPvSUShbARsiCJMIGViR2SkS50aPte5soOqaN9g8G0IHaL4iviKRtOE8sQIjglExZCRyB6XFrnD05EonR+Ut/5KqpePGYy747E8FqVcVM+g14bzQLRH9BVa7mhSkuH0FH8bQ6k7KU4tUHXbSelULVO8Dicrm6zxBywAWByIqb7xwOIaAK/jWHdYfHvxib0v/0QZat3uEPHOvHNvbU6RBAQA0Pul6HjurjsXeLCaoQ61cajl2WDSH777711qM7af/9NlvZetSd4e2JuGciUApI6K27bduVCUFskUJT98cLy6vGsoGufuH7rDW7G+vLh1xbz0OVUxHpnsAwDDcRH1U2b2rG0OmB4VPX77Cb1bLT1eqX9QBSq7itcfS9trz3nGGgCALtFKoRTmgRiplbMbIyJeE9nieeEPAgO2edtu7d43dIOSG1mkeSAA+EJsUfM19yFz6SBbtH89VhsEO9/NYcV9xyeD9YAPfXhqTcEzcxslOQBKsThTeSGRl+JIYOUvbNu67nz7yUPIt5967vRzUtRXG2P8tusn31Hv/oeiUwY/sednRXNWmoHOeQqPpX95KK9ONFaYveEmJR5e2JAQ9oWv43Mt4q1eSQkBbGVhSLDxWPBYDViKV3TqIWXnO/4fkix83H1rHtBvXR59fZXGwqoqS+Ma6DWsQRE6e8naUHP918aJr45MmZt/IDfwYqb88Oi4N47PkB+/fsSzH/W/m//nTVQrG1EucGa8UNWYfeVTcrxkZbNv5gxcFfoNhN+SJ5ZVFcjTF9Ibs3fMfcmSY6Yd9rOIO/jRNHHF4xu8EfXAmPTg3tGDKXY91fiy/uFu35rWjoQpMYnYag1SdfK4oj7UtBv/E/Grsq3assAc6XAVSerYqljlsT4hc9Um1xEhcYsJB59r1gWlYyv0h8uSvPmMGNus0zhIoCqiG8QyE6GeiyRHajeRiDzKPtzv3HMdoZhyzPpUPlQPbeKb02wVoNJbF8DDbUkDfmBGG9vrunc/zOVDfs6YB+eS4w+KninrLsAPdorwUVn4oANf+Bjw4i/xVYw/OOo3gwa84FiUE/7nEB/E3Bvc3rke8X3RnFnOANAnE6QYmzWER0IPbU9izRs0VUcMcRVKo911yKyMN9Txhzli7x/FkKPDoQoNGGi681+rZtctKn0kin95Cf9VN7ph8ABi5Zzs1dbZOdttzm0ToqssiEXAr1sk0+TTxXfapsx3b2shmJRjfNZ4nj3XOpE9qxc/ZojA7mGwXbT5feKCBUV22uzF8J3KIz8Q8Q0dBx0GhPKox7IqVxs36Y8jdUn9mfPlXJgtCmm0sz5h+qUONpco9735om8cYxdivjBbyK3Lb4oO26923od/0CFIC/z7dNr5QpYmejMMPJvHtEsODQ5NTUFOu14cH6+0NNS2jo4/+3qpMzMCviEGVdv34wrKaY8RzsufBk2DWw+FOuLgEY7AdBslvfdHUx4ptLvnnbUCUzxwdq6ZNx0a/+QzA49tSm3+A7H9rZiozWqOX3cx9bUfzLxN31nozZDWITEqKGAdB8VUJlCyFCBYJTar3g+/DTUPixuONI7Irut/rS48uuLTodp3b0r6CbHr6CGxN56te++FHMOX4O/f5fWd3BHMiUNjdt+c7n/9zth+szGa7ilT7PX5Ng+LTMBJRnmmRFXtsyYwx8w7p02d+ps5cl91iHUYIWdHYtyEJyfaGF82eSAi6jI4yYZiKygmFSdo3qWS1+K8nTSPzW5+PzBSgf4ne6xj59gCc23TLMT4/3MrlsDVDbZQLpIS3gdX42uwlBlr1wqk7wnLV7+j2RG1XwgT8bFwJDBjge2Wo9twmFMdkZagaviu9reDg40DKMyWg/tiPoFb3Pz0VgR0AEQWnHh80+I5OmTkiNGyiOm5O0/Qg5X2G5sUeE+dR8Zm7acg1FwArgtd1qAhDcjG2Xt7Id3Wz9uLpmMCPng16ZyUwi+93kZEoMwCxKmsJWI7lgFAT5fV82Q53siCjn8h/PJiHJWDMspE7SqJGLTmSfh29X2lB4zNdQ5QhVJSuD/xSXodL705GZT2C4p4pLM55f2TPUGAUBLnLGibHwlXdHjNABqhztdiTXNKCe3f4MJANI9+LTifypiyVEUKUehL8Cs2Cs497eqArVRr0mhUqoj+blo+yHuOqusWLFx/JCbtSf62uOACoOSQQ/DKxjMm5ahCS+/rQLXI7h58yoCv1k/N/ZR03ifPGoK7qkRWA1g8TrI34cxMU46jzg2EbftQ5BRIS/UHh6afe+i5EsM/TveCUFowAgQnTuJWHRqHg8tIwHt/nR8DjuGwLBgpSb35BLnb1kQWW5paIgUAymvZ+uzE9qufRjgQVsOOViM0ehlEQNCnT8hsqC5dlWFLaq8UAHBVEu/2B25/MAKA95f7G2OKi8AH/JQ90v/hgkiv/DGGUYgAQITifm/tR/k9OxSJEslySeVFSLAlalhULXxcKW6s0HloV6XVgwAARe4oCx5f8PldgAd6wwqlBrLmwALI1WlQlivPmTQ6kkoEANkiI3t4vaW9SD2A3myrblYCzvuqPr4aR2xQ3ndIyQLZJQUAkYup7t4wpNINQLzQrfOXALzsUUsqsIIr7FIYayimExcATPxsVT1ndb06bAIoUZmhC0BFIQpJJ84+m3wrXRskBQBGfyFL/zqS6xfG+mAr9xmPmJUAXrsL0NlVOnXApH9fbY9iCgDmMliXr7u0D6NDKPcfmhQBANc0UYalpb2wBu4q6JwgAEiKN3oNs5SqXCAgvHM//k4DGNNoGU4IN9hECYQcn7IyIQHljLQ7/Le9te+mwhaK5K1Qsz/PBqUh3O1KGCr88/ByuMj4Mur5wgSCpxbX7Vam351Y9bumKKQd4epZDxB/qe0Ak6ElkRtsKLYxg/XCBEI/OzpIJfVafcZyAX2HCWYhzFvHZOVkiQm9FTqhPRNOSGWmsElAS8rBKdjXN2C3AVFfABgwNU0LSLLKglrw1SJp+tcJgOx/mya+v/jnexNxB+bRNgoAwSyWiP1/Jv/okcctxIs2loiKKA4crY/i+CxhYQoCNRRcBqgh66tU7i1nXwX4Xm+cMvE7TN8TGQEM2yDwMQxF4iM5DNjgrZ9UrfywHd9SPVi4QuUXjw/8P+QuZHHBiMKxAAAAAElFTkSuQmCC\");background-color:#00000a;}#logo{background-image:#eeeeee;background-color:#444444;}#container, html.embed{background-color:url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\");}.wufoo input.text, .wufoo textarea.textarea, .wufoo input.file, .wufoo select.select{background:#DEDEDE;border:1px solid #a7a7a7;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;}.safari .wufoo select.select{font-size:#444444 !important;}.safari .wufoo input.file{background:none;border:none;}.wufoo li.focused{background-color:none;}.wufoo .instruct{background-color:#FFFFFF;}#container{border:#FFFFFF url(\"data:image/gif;base64,R0lGODlhBwACAIABAMzMzP///yH5BAEAAAEALAAAAAAHAAIAAAIFhA+hGwUAOw==\") repeat-x top #FFF7C0 #F5F5F5;}.wufoo .info, .wufoo .paging-context{border-bottom:3px solid #ffff33;}.wufoo .section h3, .wufoo .captcha, #payment .paging-context{border-top:3px solid #ffff33;}.wufoo input.text, .wufoo textarea.textarea{}.wufoo .instruct{border:5px dotted #006600;}.fixed .info{border-bottom:none;}.wufoo li.section.scrollText{border-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.wufoo .info h2{font-size:i:69;font-family:r:1;font-style:normal;font-weight:bold;color:inherit;}.wufoo .info div{font-size:#000000;font-family:normal;font-style:normal;font-weight:bold;color:inherit;}.wufoo .section h3{font-size:#444444;font-family:normal;font-style:normal;font-weight:bold;color:inherit;}.wufoo .section div{font-size:#000000;font-family:normal;font-style:normal;font-weight:bold;color:inherit;}.wufoo label.desc, .wufoo legend.desc{font-size:#444444;font-family:normal;font-style:normal;font-weight:bold;color:inherit;}.wufoo label.choice{font-size:#444444;font-family:bold;font-style:normal;font-weight:bold;color:inherit;}.wufoo input.text, .wufoo textarea.textarea, .wufoo input.file, .wufoo select.select{font-style:normal;font-weight:bold;color:inherit;font-size:#444444;}{* Custom Fonts Break Dropdown Selection in IE *}.wufoo input.text, .wufoo textarea.textarea, .wufoo input.file{ font-family:bold;}.safari .wufoo select.select{background:#DEDEDE;border:1px solid #a7a7a7;border-bottom:1px solid #c1c1c1;border-right:1px solid #c1c1c1;font-size:#444444 !important;}.wufoo li div, .wufoo li span, .wufoo li div label, .wufoo li span label{font-family:normal;color:inherit;}.safari .wufoo input.file{ font-size:#444444;font-family:normal;color:inherit;}.wufoo .instruct small{font-size:#333333;font-family:normal;font-style:normal;font-weight:bold;color:inherit;}.altInstruct small, li.leftHalf small, li.rightHalf small,li.leftThird small, li.middleThird small, li.rightThird small,.iphone small{color:inherit !important;}.wufoo input.btTxt{}.wufoo li.focused label.desc, .wufoo li.focused legend.desc,.wufoo li.focused div, .wufoo li.focused span, .wufoo li.focused div label, .wufoo li.focused span label,.safari .wufoo li.focused input.file{ color:Background color \'none\' is not a hex color value.Cannot convert hex \'none\' to RGB.Cannot convert hex \'none\' to RGB.#000000;}.confirm h2{font-family:normal;color:inherit;}a.powertiny b, a.powertiny em{color:#e6e6e6 !important;}.embed a.powertiny b, .embed a.powertiny em{color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.#1a1a1a !important;}.pgStyle1 var, .pgStyle2 var, .pgStyle2 em, .page1 .pgStyle2 var, .pgStyle1 b, .wufoo .buttons .marker{font-family:normal;color:inherit;}.pgStyle1 var, .pgStyle2 td{border:1px solid Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.pgStyle1 .done var{background:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.pgStyle1 .selected var, .pgStyle2 var, .pgStyle2 var em{background:none;color:Background color \'none\' is not a hex color value.Cannot convert hex \'none\' to RGB.Cannot convert hex \'none\' to RGB.#000000;}.pgStyle1 .selected var{border:1px solid Background color \'none\' is not a hex color value.#;}.buttons button, .buttons button:hover{color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.#000000;}.likert table{background-color:url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\");}.likert thead td, .likert thead th{background-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.likert tbody tr.alt td, .likert tbody tr.alt th{background-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.likert table, .likert th, .likert td{border-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.likert td{border-left:1px solid Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.likert caption, .likert thead td, .likert tbody th label{color:inherit;font-family:normal;}.likert tbody td label{color:Background color \'inherit\' is not a hex color value.#;font-family:normal;}.likert caption, .likert tbody th label{font-size:#444444;}.likert tbody tr:hover td, .likert tbody tr:hover th, .likert tbody tr:hover label{background-color:none;color:Background color \'none\' is not a hex color value.Cannot convert hex \'none\' to RGB.Cannot convert hex \'none\' to RGB.#000000;}.likert tbody tr:hover td{border-left:1px solid Background color \'none\' is not a hex color value.#;}.wufoo #lola{background:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.wufoo #lola tbody td{border-bottom:1px solid Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.wufoo #lola{font-family:normal;color:inherit;}.wufoo #lola tfoot th{color:Background color \'inherit\' is not a hex color value.#;}.wufoo .wfo_graph h3{font-size:#444444;font-family:normal;color:inherit;}.wfo_txt, .wfo_graph h4{color:inherit;}.wufoo .footer h4{color:inherit;}.wufoo .footer span{color:inherit;}.wfo_number{background-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;border-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.wfo_number strong, .wfo_number em{color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.#000000;}#widget, #widget body{background:url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\");}.fcNav a.show{background-color:url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\");border-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.fc table{border-left:1px solid Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.fc thead th, .fc .more th{background-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.# !important;border-right:1px solid Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.# !important;}.fc tbody td, .fc tbody th, .fc tfoot th, .fc tfoot td{background-color:url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\");border-right:1px solid Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;border-bottom:1px solid Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.fc tbody tr.alt td, .fc tbody tr.alt th, .fc tbody td.alt{background-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.fc caption, .fcNav, .fcNav a{color:inherit;}.fc tfoot, .fc thead th,.fc tbody th div, .fc tbody td.count, .fc .cards tbody td a, .fc td.percent var,.fc .timestamp span{color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.#000000;}.fc .indent .count{color:Background color \'inherit\' is not a hex color value.#;}.fc .cards tbody td a span{color:Background color \'inherit\' is not a hex color value.#;}.fc tbody tr:hover td, .fc tbody tr:hover th,.fc tfoot tr:hover td, .fc tfoot tr:hover th{background-color:none;}.fc tbody tr:hover th div, .fc tbody tr:hover td, .fc tbody tr:hover var,.fc tfoot tr:hover th div, .fc tfoot tr:hover td, .fc tfoot tr:hover var{color:Background color \'none\' is not a hex color value.Cannot convert hex \'none\' to RGB.Cannot convert hex \'none\' to RGB.#000000;}.invoice thead th, .invoice tbody th, .invoice tbody td,.invoice tfoot th,.invoice .total,.invoice tfoot .last th, .invoice tfoot .last td,.invoice tfoot th, .invoice tfoot td{border-color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.invoice thead th, .wufoo .checkNotice{background:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.#;}.invoice th, .invoice td{color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.#000000;}#ppSection, #ccSection{border-bottom:3px solid #ffff33;}#shipSection, #invoiceSection{border-top:3px solid #ffff33;}@media only screen and (max-width: 480px) {html{background-color:url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\");}a.powertiny b, a.powertin em{color:Background color \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' is not a hex color value.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.Cannot convert hex \'url(\"data:image/gif;base64,R0lGODlhEgARAKL/AKDc+FOdvGhgU4B0YjwoGQAAAAAAAAAAACwAAAAAEgARAAADWUgQQf6OASKqciBrTKvNTBhk3WAqIRRO5rk0IiERLQqPrzzSA6pPNhmrtxB2fDtTbve5ARk/XlBSnAlMgil0RcHaGhFct5UFrYBjL2YTbRGhj23y7TRHtcAEADs=\")\' to RGB.#1a1a1a !important;}}',
  "Rules": [{
    "RuleId": "62",
    "Type": "ShowMessage",
    "Setting": {
      "Message": "Success! Thanks for filling out my form!"
    },
    "FormId": "57",
    "MatchType": "any",
    "Conditions": [{
      "ConditionId": "62",
      "FieldName": "1",
      "Filter": "is",
      "Value": "",
      "ReportId": "57",
      "RuleId": "62"
    }]
  }]
};

App.MockSimplerMultiPageForm = {
  "fh_full_data_loaded": true,
  "Name": "Simple Multi Page Form",
  "Description": "This is my form. Please fill it out. It's awesome!",
  "RedirectMessage": "Great! Thanks for filling out my form!",
  "Url": "test-form",
  "Email": "",
  "IsPublic": "1",
  "Language": "english",
  "StartDate": "2000-01-01 12:00:00",
  "EndDate": "2030-01-01 12:00:00",
  "EntryLimit": "0",
  "DateCreated": "2012-10-22 09:43:15",
  "DateUpdated": "2012-10-30 09:53:10",
  "Hash": "z7x3p9",
  "LinkFields": "https://mnairn.wufoo.com/api/v3/forms/z7x3p9/fields.json",
  "LinkEntries": "https://mnairn.wufoo.com/api/v3/forms/z7x3p9/entries.json",
  "LinkEntriesCount": "https://mnairn.wufoo.com/api/v3/forms/z7x3p9/entries/count.json",
  "PaginationType": "tab",
  "NoPageTitles": false,
  "Pages": [{
    "Title": "Page asdasdasdasdasdasdasdasdasdasdasdas 1",
    "Fields": [{
      "Title": "fh fhgeo",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhgeo",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field228"
    }, {
      "Title": "fh fhgeoEN",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhgeoEN",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field229"
    }, {
      "Title": "fh fhcam 1/3 - Required",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhcam",
      "DefaultVal": "",
      "Page": "3",
      "Type": "file",
      "ID": "Field227",
      "SubFields": [{
        "Title": "fh fhcam 2/3 - Required",
        "Instructions": "",
        "IsRequired": "0",
        "ClassNames": "fh fhcam",
        "DefaultVal": "",
        "Page": "3",
        "Type": "file",
        "ID": "Field346"
      }, {
        "Title": "fh fhcam 3/3 - Optional",
        "Instructions": "",
        "IsRequired": "0",
        "ClassNames": "fh fhcam",
        "DefaultVal": "",
        "Page": "3",
        "Type": "file",
        "ID": "Field345"
      }]
    }, {
      "Title": "fh fhsig",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhsig",
      "DefaultVal": "",
      "Page": "3",
      "Type": "file",
      "ID": "Field230"
    }, {
      "Title": "fh fhmap",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhmap",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field231"
    }, {
      "Title": "fh fhtime",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhtime",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field232"
    }, {
      "Title": "fh fhdate",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "fh fhdate",
      "DefaultVal": "",
      "Page": "3",
      "Type": "text",
      "ID": "Field233"
    }, {
      "Title": "Test Field 1",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "text",
      "ID": "Field1",
      "Rules": [{
        "RuleId": "1",
        "Type": "Hide",
        "Setting": {
          "FieldName": "8",
          "FieldTypes": {
            "1": "text"
          }
        },
        "FormId": "1",
        "MatchType": "any",
        "Conditions": [{
          "ConditionId": "1",
          "FieldName": "1",
          "Filter": "is",
          "Value": "Mike",
          "ReportId": "1",
          "RuleId": "1"
        }],
        "condition": {
          "ConditionId": "1",
          "FieldName": "1",
          "Filter": "is",
          "Value": "Mike",
          "ReportId": "1",
          "RuleId": "1"
        }
      }]
    }, {
      "Title": "Test Field 2",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "1",
      "Type": "text",
      "ID": "Field8"
    }],
    "Rules": [{
      "RuleId": "2",
      "Type": "SkipToPage",
      "Setting": {
        "Page": "3"
      },
      "FormId": "1",
      "MatchType": "any",
      "Conditions": [{
        "ConditionId": "2",
        "FieldName": "1",
        "Filter": "is",
        "Value": "Mike",
        "ReportId": "1",
        "RuleId": "2"
      }],
      "condition": {
        "ConditionId": "2",
        "FieldName": "1",
        "Filter": "is",
        "Value": "Mike",
        "ReportId": "1",
        "RuleId": "2"
      }
    }]
  }, {
    "Title": "Page 2",
    "Fields": [{
      "Title": "Select a Choice",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Choices": [{
        "Label": "First Choice"
      }, {
        "Label": "Second Choice"
      }, {
        "Label": "Third Choice"
      }],
      "Type": "radio",
      "ID": "Field2",
      "HasOtherField": false
    }]
  }, {
    "Title": "Page 3",
    "Fields": [{
      "Title": "Select a Choice",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "3",
      "Choices": [{
        "Label": ""
      }, {
        "Label": "First Choice"
      }, {
        "Label": "Second Choice"
      }, {
        "Label": "Third Choice"
      }],
      "Type": "select",
      "ID": "Field9",
      "HasOtherField": false
    }]
  }],
  "Theme": "#logo a {background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAoCAMAAACVZWnNAAAAllBMVEX///////8AAAA7OzuZmZnt7e0AAAAODg4dHR15eXkAAAC6urrc3NxZWVkAAAAAAABKSkoAAAAAAACJiYkAAACpqakAAAAsLCwAAADLy8sAAABpaWkAAAD///8AAADZ2dn8/Pz7+/sAAAD+/v56enr9/f3q6uqpqakAAADq6upra2tbW1v8/Pw9PT0AAAAeHh4tLS09PT3gXOGyAAAALnRSTlMA5YD57+e//fzyQOzo9TAg9xDv8K/tj/rP6t/0n/Jw+fT2YPP99Pj7UPf9/vX9/PlC0wAAAZ1JREFUeF7d1ddyozAYQGFAlSIguPe0reU4ef+XW3ZsDfYsKHCbc//Nz8CPFH22qiz5V1ZNluVyi2+7LKfQTAMilXmez3YC0NlY+jAHK1XsU9LC/HmvtQ4+Q7ZvAOwivq/l13QVGAng/NQu5bxuyn67BgAZ9yW9XvfiZWeD+nuPrQBgFg+VcinpwUcA6ng4MYwTAFMEcBHGpB4EHrwcwEYFcQEw711nwMXhalg/RH1pWHyAJfOov6pBfYALdDQQ9gaoPFe5Ey6/06YZxKKz0oD5f+MEI/CCrmIqtgBwPgNuIt4Ap29w+gqYUbgxHs/g/PjE+8vLO6DGvDDNptvDty+/eT0cWsxmzKc6knbvix9P/Dw8noHbJUmGcIVRfgL8em2nn4BVh1cMn4B7dvElBwB/3u6OhxwdOHQbpB+NBWpzO1hZQud3xlWnZqNkuohVTbefNfMo1DPUqsVi58XK+bnC/46DlVtMWsS18NgJv+zeBnpIgNoh8uu6yFYWMwtLb0NVyRYAK4QwrGRa20l3XZlobtPHavLlfikro8/VX9MgQxYUruF/AAAAAElFTkSuQmCC\"); min-height:0;height:40px;}* html #logo a {background-image: none;filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\"/images/themes/logos/panda.png\", sizingMethod=\"crop\");}html{background-image:url(\"data:image/gif;base64,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\");background-color:#eeeeee;}#logo{background-image:url(\"data:image/png;base64,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\");background-color:#dedede;}#container, html.embed{background-color:#f0fff0;}.wufoo input.text, .wufoo textarea.textarea, .wufoo input.file, .wufoo select.select{background:#ffffcc;border:1px solid #bfbf99;border-bottom:1px solid #dedeb1;border-right:1px solid #dedeb1;}.safari .wufoo select.select{font-size:100% !important;}.safari .wufoo input.file{background:none;border:none;}.wufoo li.focused{background-color:#ffcc33;}.wufoo .instruct{background-color:#f5f5f5;}#container{border:1px solid #CCCCCC;}.wufoo .info, .wufoo .paging-context{border-bottom:1px dotted #CCCCCC;}.wufoo .section h3, .wufoo .captcha, #payment .paging-context{border-top:1px dotted #CCCCCC;}.wufoo input.text, .wufoo textarea.textarea{}.wufoo .instruct{border:1px solid #E6E6E6;}.fixed .info{border-bottom:none;}.wufoo li.section.scrollText{border-color:#d1ded1;}.wufoo .info h2{font-size:160%;font-family:inherit;font-style:normal;font-weight:normal;color:#000000;}.wufoo .info div{font-size:95%;font-family:inherit;font-style:normal;font-weight:normal;color:#444444;}.wufoo .section h3{font-size:110%;font-family:inherit;font-style:normal;font-weight:normal;color:#000000;}.wufoo .section div{font-size:85%;font-family:inherit;font-style:normal;font-weight:normal;color:#444444;}.wufoo label.desc, .wufoo legend.desc{font-size:95%;font-family:inherit;font-style:normal;font-weight:bold;color:#444444;}.wufoo label.choice{font-size:100%;font-family:inherit;font-style:normal;font-weight:normal;color:#444444;}.wufoo input.text, .wufoo textarea.textarea, .wufoo input.file, .wufoo select.select{font-style:normal;font-weight:normal;color:#333333;font-size:100%;}{* Custom Fonts Break Dropdown Selection in IE *}.wufoo input.text, .wufoo textarea.textarea, .wufoo input.file{ font-family:inherit;}.wufoo li div, .wufoo li span, .wufoo li div label, .wufoo li span label{font-family:inherit;color:#444444;}.safari .wufoo input.file{ font-size:100%;font-family:inherit;color:#444444;}.wufoo .instruct small{font-size:80%;font-family:inherit;font-style:normal;font-weight:normal;color:#444444;}.altInstruct small, li.leftHalf small, li.rightHalf small,li.leftThird small, li.middleThird small, li.rightThird small,.iphone small{color:#444444 !important;}.wufoo input.btTxt{}.wufoo li.focused label.desc, .wufoo li.focused legend.desc,.wufoo li.focused div, .wufoo li.focused span, .wufoo li.focused div label, .wufoo li.focused span label,.safari .wufoo li.focused input.file{ color:#000000;}.confirm h2{font-family:inherit;color:#444444;}a.powertiny b, a.powertiny em{color:#1a1a1a !important;}.embed a.powertiny b, .embed a.powertiny em{color:#1a1a1a !important;}.pgStyle1 var, .pgStyle2 var, .pgStyle2 em, .page1 .pgStyle2 var, .pgStyle1 b, .wufoo .buttons .marker{font-family:inherit;color:#444444;}.pgStyle1 var, .pgStyle2 td{border:1px solid #c0ccc0;}.pgStyle1 .done var{background:#c0ccc0;}.pgStyle1 .selected var, .pgStyle2 var, .pgStyle2 var em{background:#ffcc33;color:#000000;}.pgStyle1 .selected var{border:1px solid #e6b82e;}.buttons button, .buttons button:hover{color:#000000;}.likert table{background-color:#f0fff0;}.likert thead td, .likert thead th{background-color:#d8e6d8;}.likert tbody tr.alt td, .likert tbody tr.alt th{background-color:#e6f5e6;}.likert table, .likert th, .likert td{border-color:#d1ded1;}.likert td{border-left:1px solid #c0ccc0;}.likert caption, .likert thead td, .likert tbody th label{color:#444444;font-family:inherit;}.likert tbody td label{color:#575757;font-family:inherit;}.likert caption, .likert tbody th label{font-size:95%;}.likert tbody tr:hover td, .likert tbody tr:hover th, .likert tbody tr:hover label{background-color:#ffcc33;color:#000000;}.likert tbody tr:hover td{border-left:1px solid #cca329;}.wufoo #lola{background:#d8e6d8;}.wufoo #lola tbody td{border-bottom:1px solid #c0ccc0;}.wufoo #lola{font-family:inherit;color:#444444;}.wufoo #lola tfoot th{color:#696969;}.wufoo .wfo_graph h3{font-size:95%;font-family:inherit;color:#444444;}.wfo_txt, .wfo_graph h4{color:#444444;}.wufoo .footer h4{color:#000000;}.wufoo .footer span{color:#444444;}.wfo_number{background-color:#e6f5e6;border-color:#d1ded1;}.wfo_number strong, .wfo_number em{color:#000000;}#widget, #widget body{background:#f0fff0;}.fcNav a.show{background-color:#f0fff0;border-color:#c0ccc0;}.fc table{border-left:1px solid #d1ded1;}.fc thead th, .fc .more th{background-color:#d1ded1 !important;border-right:1px solid #c0ccc0 !important;}.fc tbody td, .fc tbody th, .fc tfoot th, .fc tfoot td{background-color:#f0fff0;border-right:1px solid #c0ccc0;border-bottom:1px solid #d1ded1;}.fc tbody tr.alt td, .fc tbody tr.alt th, .fc tbody td.alt{background-color:#e6f5e6;}.fc caption, .fcNav, .fcNav a{color:#444444;}.fc tfoot, .fc thead th,.fc tbody th div, .fc tbody td.count, .fc .cards tbody td a, .fc td.percent var,.fc .timestamp span{color:#000000;}.fc .indent .count{color:#4b4b4b;}.fc .cards tbody td a span{color:#7d7d7d;}.fc tbody tr:hover td, .fc tbody tr:hover th,.fc tfoot tr:hover td, .fc tfoot tr:hover th{background-color:#ffcc33;}.fc tbody tr:hover th div, .fc tbody tr:hover td, .fc tbody tr:hover var,.fc tfoot tr:hover th div, .fc tfoot tr:hover td, .fc tfoot tr:hover var{color:#000000;}.invoice thead th, .invoice tbody th, .invoice tbody td,.invoice tfoot th,.invoice .total,.invoice tfoot .last th, .invoice tfoot .last td,.invoice tfoot th, .invoice tfoot td{border-color:#d1ded1;}.invoice thead th, .wufoo .checkNotice{background:#e6f5e6;}.invoice th, .invoice td{color:#000000;}#ppSection, #ccSection{border-bottom:1px dotted #CCCCCC;}#shipSection, #invoiceSection{border-top:1px dotted #CCCCCC;}@media only screen and (max-width: 480px) {html{background-color:#f0fff0;}a.powertiny b, a.powertin em{color:#1a1a1a !important;}}",
  "Rules": []
};

App.MockSimpleSinglePageForm = {
  "fh_full_data_loaded": true,
  "Name": "Single Page Form",
  "Description": "Simple single page form",
  "RedirectMessage": "Great! Thanks for filling out my form!",
  "Url": "single-page-form",
  "Email": "",
  "IsPublic": "1",
  "Language": "english",
  "StartDate": "2000-01-01 12:00:00",
  "EndDate": "2030-01-01 12:00:00",
  "EntryLimit": "0",
  "DateCreated": "2012-11-01 02:54:19",
  "DateUpdated": "2012-11-01 02:54:19",
  "Hash": "m7x3q1",
  "LinkFields": "https://mnairn.wufoo.com/api/v3/forms/m7x3q1/fields.json",
  "LinkEntries": "https://mnairn.wufoo.com/api/v3/forms/m7x3q1/entries.json",
  "LinkEntriesCount": "https://mnairn.wufoo.com/api/v3/forms/m7x3q1/entries/count.json",
  "PaginationType": "tab",
  "NoPageTitles": false,
  "Pages": [{
    "Fields": [{
      "Title": "Likert - Evaluate the following statements.",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "0",
      "Page": "2",
      "SubFields": [{
        "DefaultVal": "0",
        "ID": "Field125",
        "Label": "Statement One"
      }, {
        "DefaultVal": "0",
        "ID": "Field126",
        "Label": "Statement Two"
      }, {
        "DefaultVal": "0",
        "ID": "Field127",
        "Label": "Statement Three"
      }],
      "Choices": [{
        "Score": 1,
        "Label": "Strongly Disagree"
      }, {
        "Score": 2,
        "Label": "Disagree"
      }, {
        "Score": 3,
        "Label": "Agree"
      }, {
        "Score": 4,
        "Label": "Strongly Agree"
      }],
      "Type": "likert",
      "ID": "Field125",
      "HasOtherField": false
    }, {
      "Title": "Name",
      "Instructions": "",
      "IsRequired": "1",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "SubFields": [{
        "DefaultVal": "",
        "ID": "Field110",
        "Label": "First"
      }, {
        "DefaultVal": "",
        "ID": "Field111",
        "Label": "Last"
      }],
      "Type": "shortname",
      "ID": "Field110"
    }, {
      "Title": "Address",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "SubFields": [{
        "DefaultVal": "",
        "ID": "Field113",
        "Label": "Street Address"
      }, {
        "DefaultVal": "",
        "ID": "Field114",
        "Label": "Address Line 2"
      }, {
        "DefaultVal": "",
        "ID": "Field115",
        "Label": "City"
      }, {
        "DefaultVal": "",
        "ID": "Field116",
        "Label": "State / Province / Region"
      }, {
        "DefaultVal": "",
        "ID": "Field117",
        "Label": "Postal / Zip Code"
      }, {
        "DefaultVal": "",
        "ID": "Field118",
        "Label": "Country"
      }],
      "Type": "address",
      "ID": "Field113"
    }, {
      "Title": "Date",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "date",
      "ID": "Field119"
    }, {
      "Title": "Email",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "email",
      "ID": "Field120"
    }, {
      "Title": "Time",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "time",
      "ID": "Field121"
    }, {
      "Title": "Phone Number",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "phone",
      "ID": "Field122"
    }, {
      "Title": "Website",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "url",
      "ID": "Field123"
    }, {
      "Title": "Price Field - Amount Default",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "money",
      "ID": "Field124"
    }, {
      "Title": "Price Field - Amount Euro",
      "Instructions": "",
      "IsRequired": "0",
      "ClassNames": "",
      "DefaultVal": "",
      "Page": "2",
      "Type": "money",
      "ID": "Field235"
    }]
  }],
  "Theme": "",
  "Rules": []
};


ConfigModel = Backbone.Model.extend({
  initialize: function () {
    this.on('change', function () {
      $fh.logger.info('ConfigModel :: change=' + JSON.stringify(this.attributes));
      $fh.data({
        act: 'save',
        key: 'client_config',
        val: JSON.stringify(this.attributes)
      }, function () {
        // saved ok
      }, function (msg, err) {
        $fh.logger.error('ERROR: saving client_config to local storage :: ', msg);
      });
    });
  },
  getValueOrDefault: function (key) {
    try {
      var value= (this.attributes.hasOwnProperty(key)  ? this.get(key) : this.get('defaults')[key]) ;
      return value;
    } catch(e) {
      return null;
    }
  },
  loadConfig: function () {
    var self = this;
    // TODO : check if there is a better way of ensuring fh.data has been monkey patched
    overrideFHData();
    //initialise config
    $fh.data({
      act: 'load',
      key: 'client_config'
    }, function (res) {
      try {
        $fh.logger.info('ConfigModel :: loaded=' + res.val);
        if (res && res.val !== null) {
          try {
            // overwrite config with whats in local storage. May be overwritten again by initial act, depending on local storage vs. act call time.
            $fh.logger.debug('ConfigModel :: loaded=' + res.val);
            var read =JSON.parse(res.val);
            self.set(read);
          } catch(e) {
            //log error, but no action
            $fh.logger.error('ERROR: parsing config from local storage. Using config defaults:', e);
          }
        } else {
          $fh.logger.warn('No config in local storage. Using config defaults');
        }
      } finally {
        self.trigger("config:loaded");
      }
    }, function (msg,err) {
      try {
        $fh.logger.info('ConfigModel :: error msg=' + msg, "err=" , err);
      } finally {
        self.trigger("config:loaded");
      }
    } );
  }
});

App.config = new ConfigModel();
// field model
FieldModel = Backbone.Model.extend({
  defaults: {
    "Rules":  []
  },
  
  // Determine field type from special classes
  getType: function() {
    var type = this.attributes.Type;
    var cnames =  _.reject(this.attributes.ClassNames.split(" "),function (val){return val == "fhid";});
    if(cnames.length == 1 && cnames[0] == "fh") {
      cnames = [];

    }
    if (cnames.length) {
      var special_type = cnames;
      if (special_type.length > 1 && special_type[1].indexOf('fh') === 0) {
        type = special_type[1];
      }
      // special case for fhcam with subfields
      if ('fhcam' === type && this.attributes.SubFields && this.attributes.SubFields.length) {
        type = 'fhcamGroup';
      }
    }
    return type;
  },

  getNonFhClasses: function () {
    // return all classnames that don't start with fh
    return this.attributes && this.attributes.ClassNames ? this.attributes.ClassNames.replace(/\bfh.*?\s/g, '') : '';
  },

  isIdField: function () {
    return _.find(this.attributes.ClassNames.split(" "),function (val){return val === "fhid";});
  },

  //Returns the serialised field value, ready for submission to wuffoo
  serialize: function() {
    return this.attributes.Value;
  }
});

// fields collection
var Fields = Backbone.Collection.extend({
  model: FieldModel
});
PageModel = Backbone.Model.extend({
  defaults: {
    "Title": "",
    "Fields": [],
    "Rules": []
  },

  initialize: function () {
    var fields = this.get('Fields');
    this.fields = new Fields(fields);
  },

  toJSON: function () {
    var self = this;
    var page = Backbone.Model.prototype.toJSON.apply(this, arguments);
    page.Fields = self.fields.toJSON();
    return page;
  },

  serialize: function() {
    var self = this;
    var serialized_page = {};
    self.fields.each(function (field) {
      $.extend(serialized_page, field.serialize());
    });
    return serialized_page;
  }
});

// pages collection
var Pages = Backbone.Collection.extend({
  model: PageModel
});
FormModel = Backbone.Model.extend({
  idAttribute: 'Hash',
  sync: FHBackboneDataActSyncFn,
  defaults: {
    "Theme": "",
    "Pages": [],
    "Rules": [],
    "active_page": null,
    "page_history": []
  },

  initialize: function () {
    _.bindAll(this);

    this.initPages();

    // if model changes, re-initialise sub-collection of pages
    this.bind('change', this.reInitPages, this);
    this.on('change:page_history', function (model, history) {
      model.set('active_page', _(history).last());
    });
  },

  load: function (cb) {
    if(this.get("flyweight")){
      var ctor = this.model|| this.collection.model;
      var store = this.store || this.collection.store;
      store._read(this.id,function(err,resp){
        var model =(err ? null :  new ctor(resp));
        cb(err,model);
      });
    } else {
      cb(null,this);
    }
  },

  reInitPages: function () {
    this.initPages();
  },

  initPages: function () {
    var pages = this.get('Pages');
    this.pages = new Pages(pages);
  },

  pushPage: function (page) {
    this.attributes.page_history.push(page);
    // manually trigger change event as we're modifying an array
    this.trigger('change:page_history', this, this.attributes.page_history);
  },

  popPage: function () {
    this.attributes.page_history.pop();
    // manually trigger change event as we're modifying an array
    this.trigger('change:page_history', this, this.attributes.page_history);
  },

  emptyPageHistory: function () {
    this.attributes.page_history = [];
    this.attributes.active_page = null;
  },

  toJSON: function () {
    var self = this;
    var form = Backbone.Model.prototype.toJSON.apply(this, arguments);
    form.Pages = self.pages.toJSON();
    return form;
  },

  getTimeout:function (millis) {
    var timeout = App.config.getValueOrDefault('timeout') || ($fh.fh_timeout / 1000);
    if(millis) {
      timeout = timeout *1000;
    }
    return timeout;
  },

  handleError: function(e, cb) {
    var type = e.msg  || "unknown";
    var err = e.err;
    var msg;
    $fh.logger.debug("handleError" + Utils.truncate(e,150));
    if(type  === "error_ajaxfail") {

      msg = "Unexpected Network Error : ";// + (err ? err.error : "");
      if(!err.error  || err.error.length === 0 || err.error === "\"error\"") {
        if(err.message && err.message.length !== 0) {
          msg += err.message;
        } else {
          msg += "Unknown";
        }
      } else {
        msg += "Unknown";

      }
      AlertView.showAlert({text : msg}, "error", 5000);
      return cb({error:msg, type:"network"}, msg);
    }

    if(type  === "validation") {
      msg = "Form Validation Error : " + (err ? err : "please fix the errors");
      AlertView.showAlert({text : msg}, "error", 5000);
      return cb({error:msg, type:"validation"}, e.res || msg);
    }

    if(type  === "offline") {
      msg = err || "You are currently offline";
      AlertView.showAlert({text : msg}, "error", 5000);
      return cb({error:msg, type:"network"},msg);
    }

    if(type === "network") {
      msg = "Network Error : " + (err || JSON.stringify(e));
      AlertView.showAlert({text : msg}, "error", 5000);
      return cb({error:type, type:"network"});
    }

    msg = "Unknown Error : " + JSON.stringify(e);
    AlertView.showAlert({text : msg}, "error", 5000);
    return cb({error:msg, type:"unknown"}, msg);
  },

  toBytes: function(len){
    var size = len +" bytes";
    if(len > 1024) {
      size = (Math.floor((len/ 1024) * 1000) / 1000) +" Kilo bytes";
    }
    return size;
  },

  /**
   * poll the request, function will poll for up timeout seconds every second
   *
   * @param req memo of the request
   * @param form_id the form id
   * @param res the results from the tasks
   * @param cb
   */
  pollRemoteFormSubmissionComplete: function(req,form_id,res, cb) {
    var self = this;
    AlertView.showAlert({text : "Form Submitted to cloud"}, "success", self.getTimeout(true) );
    $fh.logger.debug('Form Submitted to cloud: res:' + Utils.truncate(res));
    var timeout  = this.getTimeout();
    var start = Math.floor(Date.now() / 1000);
    var complete = false;

    async.whilst(
      function check() {
        var end = Math.floor(Date.now() / 1000);
        var delta = end -start ;
        $fh.logger.debug('pollRemoteFormSubmissionComplete check : delta < timeout=' + delta < timeout);
        return delta < timeout ;
      },
      function process(callback) {
        setTimeout(function () {
          $fh.act({"act":"pollRemoteFormSubmissionComplete","req":{"form_id":form_id}},
                  function (res) {
                    $fh.logger.debug('pollRemoteFormSubmissionComplete process : res=' + Utils.truncate(res) );
                    if ((res.Success && res.Success === 1 && (res.stat && res.stat.completedAt)) || res.err){
                      return callback(res);
                    } else {
                      return callback();
                    }

                  },
                  function onError(msg, err) {
                    $fh.logger.debug('pollRemoteFormSubmissionComplete failed : res=' + Utils.truncate(msg) +'err=' + Utils.truncate(err) );
                    return callback();
                  });
        }, 1000);
      },
      function complete(res) {
        $fh.logger.debug('pollRemoteFormSubmissionComplete complete : res=' + Utils.truncate(res));
        if(res) {
          if (res.Success === 1){

            if(res.stat && res.stat.completedAt){
              AlertView.showAlert({text:"Form Submission complete"}, "success", 5000);
              cb(null, res);
            }
          } else if(res.err  || res.Error) {
            return cb({err: (res.err|| res.Error)});
          }

        } else {
          console.log("test");
        }
      }
    );
  },
  /**
   * submitFormBody the form body to the cloud, if there are no file form elements then
   * validate form submission can be called immediately
   * @param req memo for the request
   * @param form the form
   * @param callback
   */
  submitFormBody: function(req,form, callback) {
    var self = this;
    var data = {"act":"submitFormBody","req":form};
    req.total += JSON.stringify(data).length;
    var timeout = self.getTimeout(true);

    AlertView.showAlert({ text : "Form body : start ", current : req.size, total : req.total}, "success", timeout );
    var start = Date.now();
    req.to = setTimeout(function () {
      $fh.logger.debug("submitFormBody timeout");
      clearTimeout(req.to);
      delete req.to;
      req.error = {msg : "network",err:"timeout"};
      callback({msg : "network",err:"timeout"});

    }, timeout + 1000);

    $fh.act(data, function (res) {
      clearTimeout(req.to);
      delete req.to;

      var end = Date.now();
      $fh.logger.debug("submit res=" + Utils.truncate(res));
      if (res.Success && res.Success === 1) {
        var json = JSON.stringify(data);
        req.size += json.length;
        AlertView.showAlert({ text : "Form body : complete", current : req.size, total : req.total}, "success", timeout);
        callback(null,{name : "submitFormBody", start : start, end : end, size: req.size});
      } else {
        callback({msg:"validation", err:"Please fix the highlighted errors",res:res});
      }
    }, function (msg, err) {
      clearTimeout(req.to);
      delete req.to;

      $fh.logger.debug("submitFormBody failed : msg='"  + Utils.truncate(msg) +"' err='" + Utils.truncate(err,150)+ "'");
      callback({msg : msg,err:err});
    });

  },

  /**
   * submit a file chunk to the cloud
   * @param req memo for form sumission
   * @param chunk e.g. {form_id:form_id, "name":name,"value":value , "size":value.length};
   * @param callback
   */
  submitChunk: function(req,chunk, callback) {
    var self = this;
    $fh.logger.debug("submitChunk starting form[" +chunk.form_id + "][" + chunk.name+ "]");
    var value = chunk.value;
    var len =  value.fileBase64.length;
    var timeout = self.getTimeout(true) ;
    req.current_chunk += 1;
    var title = "Field " + req.current_chunk+  " of "+ req.num_chunks;
    //AlertView.showAlert({text : "Chunk[field=" + chunk.name + "] started", current : req.size, total : req.total}, "success", timeout);
    AlertView.showAlert({text : (title + " started"), current : req.size, total : req.total}, "success", timeout);

    $fh.logger.debug("submitChunk starting value="  + Utils.truncate(value,50));
    $fh.act({
      "act":"submitChunk",
      "retries" : App.config.getValueOrDefault("max_retries"),
      "req": chunk
    }, function onSuccess(res) {
      $fh.logger.debug("submitChunk starting form[" +chunk.form_id + "][" + chunk.name+ "] res='" + Utils.truncate(res ) + "'");
      if (res.Success && res.Success === 1) {
        req.size += len;
        AlertView.showAlert({text : (title + " complete"), current : req.size, total : req.total}, "success", timeout);
        return callback(null, res);
      } else {
        return callback({err:'unknown' , msg: JSON.stringify(res)}, res);
      }
    }, function onError(msg, err) {
      $fh.logger.debug("submitChunk starting form[" +chunk.form_id + "][" + chunk.name+ "] msg='"  + Utils.truncate(msg) +"' err='" + Utils.truncate(err)+ "'");
      return callback({msg : msg,err:err});
    });
  },

  /**
   * confirm with the cloud server that the form is all in place
   * @param req the form request memo
   * @param form_id the id of the form
   * @param callback
   */
  validateFormTransmission: function(req,form_id, callback) {
    var self = this;
    var data = {"act":"validateFormTransmission","req":{form_id:form_id}};
    var start = Date.now();
    var timeout = self.getTimeout(true);
    $fh.logger.debug("validateFormTransmission [" +form_id + "] started");
    AlertView.showAlert({text : "Form check started " ,current :req.total , total : req.total}, "success", timeout );
    $fh.act(data, function (res) {
      var end = Date.now();
      $fh.logger.debug("submit res="+ Utils.truncate(res));
      if (res.Success && res.Success === 1) {
        AlertView.showAlert({text : "Form check complete" ,current :req.total , total : req.total}, "success", timeout );
        return callback(null,{name : "validateFormTransmission", start : start, end : end, size : req.size});
      } else {
        return callback({msg:"validation", err: "Please fix the highlighted errors",res:res});
      }
    }, function onError(msg, err) {
      $fh.logger.debug("validateFormTransmission [" +form_id + "] failed msg='"  + Utils.truncate(msg) +"' err='" + Utils.truncate(err)+ "'");
      return callback({msg : msg,err:err});
    });
  },

  /**
   * tell the cloud to submit the request to wufoo (you should have called validateFormTransmission first)
   * @param req the memo for the form submission
   * @param form_id the form id
   * @param callback
   */
  doRemoteFormSubmission: function(req,form_id, callback) {
    var self = this;
    var data = {"act":"doRemoteFormSubmission","req":{form_id:form_id}};
    var start = Date.now();
    $fh.logger.debug("doRemoteFormSubmission[" +form_id + "] started");
    AlertView.showAlert({text : "Remote form submission: started"}, "success", 5000);
    $fh.act(data, function (res) {
      var end = Date.now();
      $fh.logger.debug("submit res=" + Utils.truncate(res));
      if (res.Success && res.Success === 1) {
        AlertView.showAlert({text : "Remote form submission: complete"}, "success", 5000);
        return callback(null,{name : "doRemoteFormSubmission", start : start, end : end, size: req.total});
      } else {
        return callback({msg:"validation", err:"Please fix the highlighted errors",res:res});
      }
    }, function onError(msg, err) {
      $fh.logger.debug("doRemoteFormSubmission[" +form_id + "] failed msg='"  + Utils.truncate(msg) +"' err='" + Utils.truncate(err)+ "'");
      return callback({msg : msg,err:err});
    });
  },

  /**
   * split the current form into separate, ordered tasks that can be executed serially :
   * The tasks are :
   *   - submitFormBody (once only and bound to the req, form)
   *   - submitChunk (0 or more , bound to the req, chunk)
   *   - validateFormTransmission (once only and bound to the req, form id)
   *
   * @param req a memo object for this submission
   * @param form the serialized form
   * @return an array of tasks
   */
  splitFormIntoTasks: function(req,form) {
    $fh.logger.debug("splitFormIntoTasks starting");
    var self = this;
    var tasks  = [];
    var serialized_form = form.data;
    var form_id = req.form_id;
    if(App.config.getValueOrDefault("use_chunking")) {
      _.each(serialized_form, function chunkHandler(value,name){
        if (_.isObject(value) && !_.isUndefined(value.filename)) {
          var str = JSON.stringify(value);
          var size = str.length;
          $fh.logger.debug("field name=" + name + ",value=" + Utils.truncate(str) + ",size=" + size);
          req.max = Math.max(req.max, size);
          req.chunks.push({name:name, size:size});
          req.total += size;
          var chunk = {form_id:form_id, "name":name,"value":value , "size":size};
          serialized_form[name] = {content_type:"ref", form_id:form_id, name:name};
          var func = async.apply(self.submitChunk, req,chunk);
          func.name = name;
          tasks.push(func);
        }
      });
    }
    req.num_chunks = req.chunks.length;
    req.current_chunk = 0;
    // NOTE : put first task at start of array
    tasks.unshift(async.apply(this.submitFormBody, req,form));

    tasks.push(async.apply(this.validateFormTransmission, req,form_id));

    $fh.logger.debug("splitFormIntoTasks complete tasks.length=" + tasks.length);
    return tasks;
  },

  /**
   * submit the current form :
   *
   * Algorithm works some thing like :
   *
   *   generate a form_id (from the form hash , form.id , device uuid)
   *   FOR each file element in the the form
   *     remove the current file element and add a reference in its place
   *     add a task to the list for this form element containing the form_id and element field name
   *   start a timer
   *   Submit the form keyed on the form id
   *   IF submission failed
   *     inform the user user and exit
   *   ELSE submission succeeded
   *     stop the timer and calculate KBps
   *     FOR each task in the list
   *       execute the task to submit the form element
   *       IF task fails
   *         inform the user of failure and exit
   *     IF !cloud.validateFormTransmission form_id
   *       inform the user of failure and exit
   *     IF !cloud.doRemoteFormSubmission form_id
   *       inform the user of failure and exit
   *     start timer
   *     WHILE !timer timed out
   *       IF cloud.pollRemoteFormSubmissionComplete form_id
   *         inform the user of success and exit
   *
   *     inform the user of timeout and exit (note, in this case since the submission has started, it is still possible to manual poll the request)
   *
   * @param cb callback called on completion
   */
  submit: function(cb) {
    var self = this;
    $fh.env({}, function(props) {
      Utils.isOnline(function(online) {
        if (online) {
          var serialized_form = self.serialize();
          var form_hash = self.attributes.Hash;
          var form_id = [form_hash,props.uuid,self.id].join("/");
          var form = {
            "form_hash":form_hash,
            "form_id":form_id,
            "data":serialized_form
          };
          var req = {start : Date.now(),
            size : 0,
            total: 0,
            max :-1,
            chunks : [],
            form_id:form.form_id
          };
          var tasks = self.splitFormIntoTasks(req,form);
          async.series(tasks,function(err, results){
            if (err) {return self.handleError(err,cb);}
            self.doRemoteFormSubmission(req,form_id, function handleResponse(err){
              if (err) {return self.handleError(err,cb);}
              self.pollRemoteFormSubmissionComplete(req,form_id,results, cb);
            });
          });
        } else {
          self.handleError({msg: "offline", err:"Unable to submit the form : you are currently offline"},cb);
        }
      });
    });
  },

  serialize: function() {
    var self = this;
    var serialized_form = {};
    self.pages.each(function (page) {
      $.extend(serialized_form, page.serialize());
    });
    return serialized_form;
  }

});

FormsCollection = Backbone.Collection.extend({
  model: FormModel,
  // form collection will only fetch minimum form details to populate models. Models will be fetched individually as full detail is required
  store: new FHBackboneDataActSync('forms', 'getForms', 'getForm', 'Hash', 'DateUpdated'),
  sync: FHBackboneDataActSyncFn,

  initialize: function () {
    this.store.on('error', function () {});
  }
});

App.collections.forms = new FormsCollection();

SentModel = FormModel.extend({
  idAttribute: 'id',
  sync: FHBackboneDataActSyncFn,

  reInitPages: function() {
    // Do Nothing
  }
});

SentCollection = Backbone.Collection.extend({
  model: SentModel,
  store: new FHBackboneIndexedDataActSync("sent"),
  sync: FHBackboneDataActSyncFn,

  initialize: function() {
    this.on('add', this.checkSize);
  },

  checkSize: function() {
    var maxSize = (App.config.attributes.hasOwnProperty('sent_save_max') ?  App.config.get('sent_save_max') : App.config.get('defaults')['sent_save_max']);
    if (this.length > maxSize) {
      var toDelete = this.models.slice(0, this.models.length - maxSize);
      _(toDelete).forEach(function(model) {
        model.destroy();
      });
    }
  },

  create: function(attributes, options) {
    attributes.submittedAt = new Date().getTime();
    return Backbone.Collection.prototype.create.call(this, attributes, options);
  }
});
DraftModel = FormModel.extend({
  idAttribute: 'id',
  sync: FHBackboneDataActSyncFn,

  reInitPages: function () {
    // Do Nothing
  }

});


DraftsCollection = Backbone.Collection.extend({
  model: DraftModel,
  store: new FHBackboneIndexedDataActSync("drafts"),
  sync: FHBackboneDataActSyncFn,
  create: function(attributes, options) {
    $fh.logger.debug(attributes);
    attributes.savedAt = new Date().getTime();
    return Backbone.Collection.prototype.create.call(this, attributes, options);
  }
});

App.collections.drafts = new DraftsCollection();
PendingModel = FormModel.extend({
  idAttribute: 'id',
  sync: FHBackboneDataActSyncFn,

  reInitPages: function() {
    // Do Nothing
  }
});

PendingWaitingCollection = Backbone.Collection.extend({
  model: PendingModel,
  store: new FHBackboneIndexedDataActSync("pending-waiting"),
  sync: FHBackboneDataActSyncFn,
  create: function(attributes, options) {
    attributes.savedAt = new Date().getTime();
    return Backbone.Collection.prototype.create.call(this, attributes, options);
  }
});


PendingReviewCollection = Backbone.Collection.extend({
  model: PendingModel,
  store: new FHBackboneIndexedDataActSync("pending-review"),
  sync: FHBackboneDataActSyncFn,
  create: function(attributes, options) {
    attributes.submittedAt = new Date().getTime();
    return Backbone.Collection.prototype.create.call(this, attributes, options);
  }
});


PendingSubmittingCollection = Backbone.Collection.extend({
  model: PendingModel,
  store: new FHBackboneIndexedDataActSync("pending-submitting"),
  sync: FHBackboneDataActSyncFn,

  initialize: function() {
    this.on('reset', function(collection, options) {
      $fh.logger.debug("reset called on: " + this.store.name);

      if(collection.models.length) {
        var models = [];
        var copy = function(model,callback){
          model.load(function (err,actual){
            var json = actual.toJSON();
            delete json.error;
            App.collections.pending_waiting.create(json, {success : function onSuccess(){
              models.push(model);
              callback(null,model);
            },error : function onError(err){
              callback(err);
            }});

          });
        };

        async.map(collection.models, copy, function(err, results){
          _(models).forEach(function(model) {
            $fh.logger.debug("pending on reset destroy");
            model.destroy();
          });
        });

      }
    });
  },
  create: function(attributes, options,callback) {
    attributes.savedAt = new Date().getTime();
    $fh.logger.debug("pending.create : attributes.Pages" + attributes.Pages.length);
    var model = Backbone.Collection.prototype.create.call(this, attributes, options);

    $fh.logger.debug("pending.create : model.get(Pages)=" + model.get("Pages").length);

    if(callback == null) {
      callback = function (){};
    }
    $fh.logger.debug("pending create : before submit");
    model.submit(function(err, res) {
      $fh.logger.debug("pending create : after submit err=" , err);
      $fh.logger.debug("pending create : after submit res=" , err);
      $fh.logger.debug("pending.create : after submit model.get(Pages)=" + model.get("Pages").length);
      var modelJson = model.toJSON();
      delete modelJson.error;

      var option = {
        success : function onSuccess(nextModel, resp){
          $fh.logger.debug("pending create : options.onSuccess");
          $fh.logger.debug("pending create success destroy");

          $fh.logger.debug("pending create success         next ="+ nextModel.id);
          $fh.logger.debug("pending create success destroy model="+ model.id);
          model.destroy();
          callback(err,res);
        },
        error : function onError(ferr){
          $fh.logger.debug("pending create : options.onError=" + ferr);
          $fh.logger.debug("pending create error destroy");
          model.destroy();
          callback(err,res);
        }
      };
      if (err) {
        // add error to model json
        modelJson.error = {
          "type": err.type || err.error,
          "details": res
        };
        $fh.logger.debug('Form submission: error :: ' , err, " :: ", res);

        if (/\b(offline|network)\b/.test(err.type)) {
          // error with act call (usually connectivity error) or offline. move to waiting to be resubmitted manually
          $fh.logger.debug("pending_waiting create modelJson="+ modelJson.id );
          App.collections.pending_waiting.create(modelJson,option);
        } else {
          // move to review as the form cannot be resubmitted without being modified
          $fh.logger.debug("pending_review create modelJson="+ modelJson.id);
          App.collections.pending_review.create(modelJson,option);
        }
      } else {
        $fh.logger.debug('Form submission: success :: ' ,res);
        try {
          modelJson.Entry = {EntryId:res.stat.res.EntryId, EntryLink :res.stat.res.EntryLink};
        } catch(e) {
          $fh.logger.warn("Error accessing EntryId", e);
        }
        App.collections.sent.create(modelJson,option);
      }
    });


    return model;
  }
});

App.collections.pending_submitting = new PendingSubmittingCollection();
App.collections.sent = new SentCollection();
App.collections.pending_review = new PendingReviewCollection();
App.collections.pending_waiting = new PendingWaitingCollection();

LoadingView = Backbone.View.extend({
  id: 'loading',
  className: 'hidden',

  templates: {
    spinner: '<div id="loading_overlay"></div><div class="loading_container"><div class="loading_spinner"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div>    </div>    <div class="message"></div>    <div class="progress"><div class="bar"></div></div>  </div>'
  },

  initialize: function(model) {
    var self = this;

    this.percent = 0;
    _.bindAll(this, 'destroyView');

    this.$el.html(this.templates.spinner);

    $('body').append(this.$el);

    if (model != null) {
      this.model = model;
      // bind to model change and error events if model not fully loaded yet
      if (!this.model.get('fh_full_data_loaded')) {
        this.model.bind('change:fh_full_data_loaded', self.modelLoaded, self);
        this.model.bind('error', self.modelLoadError, self);
      } else {
        // async behaviour
        setTimeout(function () {
          self.modelLoaded(this.model);
        }, 0);
      }
    }
  },

  modelLoaded: function(a, b, c) {
    var self = this;
    this.model.set('fh_error_loading', false);
    this.updateMessage("Form synced");
    this.updateProgress(100);
    setTimeout(function() {
      self.hide();
    }, 1000);
  },

  modelLoadError: function(model, b, c) {
    var self = this;
    this.model.set('fh_error_loading', true);
    this.updateMessage("Error syncing form");
    this.updateProgress(100);
    setTimeout(function() {
      self.hide();
    }, 1000);
  },

  addError: function() {
    this.$el.addClass('error');
  },

  removeError: function() {
    this.$el.removeClass('error');
  },

  show: function(message,progress) {
    this.reset();

    this.updateMessage(message);
    if (!_.isNumber(progress)) {
      progress =50;
    }
    this.updateProgress(progress); // halfway straight away. only a single step process

    this.$el.show();
  },

  updateMessage: function(message) {
    $('.loading_container .message', this.el).html(message);
  },

  updateProgress: function(progress) {
    $('.loading_container .progress .bar', this.el).css('width', progress + '%');
  },

  reset: function() {
    this.removeError();
    this.updateProgress(1);
    this.updateMessage('');
    this.percent = 0;
    this.formsCounter = -1;
    this.totalCounter = 0;
  },

  hide: function() {
    this.$el.fadeOut(this.destroyView);
  },

  destroyView: function() {
    //COMPLETELY UNBIND THE VIEW
    this.undelegateEvents();

    $(this.el).removeData().unbind();

    if (this.model != null) {
      this.model.off(null, null, this);
    }

    //Remove view from DOM
    this.remove();
    Backbone.View.prototype.remove.call(this);
  }
});
LoadingCollectionView = LoadingView.extend({

  initialize: function() {
    var self = this;
    this.formsCounter = -1;
    this.totalCounter = 0;

    LoadingView.prototype.initialize.call(this);

    App.collections.forms.bind('reset', this.formFetch, this);

    App.collections.forms.on('error', function(collection, msg, options) {
      if (collection instanceof Backbone.Collection) {
        self.updateProgress(100);
        self.updateMessage("<p>Your forms couldn't be synced.</p> <p>Please try again later<p>");
        self.addError();

        setTimeout(function() {
          self.hide();
          self.removeError();
        }, 2000);
      }
    }, this);
  },

  formFetch: function(collection, options) {
    var self = this;

    // Ignore initial reset
    if (App.collections.forms.models.length > 0) {
      self.updateLoadedCount();

      _(App.collections.forms.models).forEach(function(model) {
        if (!model.get('fh_full_data_loaded')) {
          model.bind('change:fh_full_data_loaded', self.modelLoaded, self);
          model.bind('error', self.modelLoadError, self);
        } else {
          // async behaviour
          setTimeout(function () {
            self.modelLoaded(model);
          }, 0);
        }
      });
    } else {
      this.checkTotal();
    }
  },

  updateLoadedCount: function() {
    this.formsCounter += 1;
    this.updateMessage("Form list loaded. Loading forms. Loaded " + this.formsCounter + " of " + App.collections.forms.models.length);
  },

  modelLoaded: function(a, b, c) {
    this.percent += 100 / App.collections.forms.length;
    this.updateLoadedCount();
    this.totalCounter += 1;
    this.updateProgress(this.percent);
    this.checkTotal();
  },

  modelLoadError: function(model, b, c) {
    model.set('fh_error_loading', true);
    this.percent += 100 / App.collections.forms.length;
    $fh.logger.debug(' !! error loading model. ID: ' + model.id + this.percent);
    this.totalCounter += 1;
    this.updateProgress(this.percent);
    this.checkTotal();
  },

  checkTotal: function() {
    var self = this;
    $fh.logger.debug('checkTotal ', this.totalCounter, '/', App.collections.forms.length);
    // Check total loaded to see if we should hide
    if (this.totalCounter >= App.collections.forms.length) {
      this.updateMessage("Form sync complete");
      setTimeout(function() {
        self.hide();
      }, 1000);
    }
  },

  destroyView: function () {
    var self = this;
    App.collections.forms.forEach(function(model) {
      model.off(null, null, self);
    });
    App.collections.forms.off(null, null, this);


    LoadingView.prototype.destroyView.call(self);
  }
});
ShowFormButtonView = Backbone.View.extend({
  events: {
    'click button.show.fetched': 'show',
    'click button.show.fetch_error': 'fetch'
  },

  templates: {
    form_button: '<li><button class="show button-block <%= enabledClass %> <%= dataClass %>"><%= name %><div class="loading"></div></button></li>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'unrender', 'show', 'fetch');

    this.model.bind('change', this.render);
    this.model.bind('remove', this.unrender);
  },

  render: function() {
    var html;

    var fullyLoaded = this.model.get('fh_full_data_loaded');
    var errorLoading = this.model.get('fh_error_loading');
    var enabled = fullyLoaded || !errorLoading;
    html = _.template(this.templates.form_button, {
      name: this.model.get("Name"),
      enabledClass: enabled ? 'button-main' : '',
      dataClass: errorLoading ? 'fetch_error' : fullyLoaded ? 'fetched' : 'fetching'
    });

    this.$el.html(html);
    this.$el.find('button').not('.fh_full_data_loaded');

    return this;
  },

  unrender: function() {
    $(this.el).remove();
  },

  show: function() {
    var draft = new DraftModel(this.model.toJSON());
    App.views.form = new DraftView({
      model: draft
    });
    App.views.form.render();
  },

  fetch: function () {
    // show loading view
    var loadingView = new LoadingView(this.model);
    loadingView.show('Syncing form');
    this.model.fetch();
  }
});
FormListView = Backbone.View.extend({
  el: $('#fh_wufoo_form_list'),

  events: {
    'click .settings': 'showSettings',
    'click button.reload': 'reload'
  },

  templates: {
    list: '<ul class="form_list"></ul>',
    header: '<h2>Your Forms</h2><h4>Choose a form from the list below</h4>',
    error: '<li><button class="reload button-block <%= enabledClass %> <%= dataClass %>"><%= name %><div class="loading"></div></button></li>',
    footer: '<a class="about" href="#fh_wufoo_banner"><img src="img/info.png"></a><a class="settings hidden"><img src="img/settings.png"></a>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'appendForm');
    this.views = [];

    App.collections.forms.bind('reset', function (collection, options) {
      if (options == null || !options.noFetch) {
        $fh.logger.debug('reset forms collection');
        App.collections.forms.each(function (form) {
          form.fetch();
        });
      }
    });
    App.collections.forms.bind('add remove reset error', this.render, this);
  },

  reload: function() {
    var loadingView = new LoadingCollectionView();
    loadingView.show("Attempting to reload forms");
    App.router.reload();
  },

  show: function () {
    App.views.header.markActive('.fh_wufoo_home');
    $(this.el).show();
  },

  hide: function () {
    $(this.el).hide();
  },

  renderErrorHandler: function(msg) {
    try {
      if(msg == null || msg.match("error_ajaxfail")) {
        msg = "An unexpected error occurred.";
      }
    } catch(e) {
      msg = "An unexpected error occurred.";
    }
    var html = _.template(this.templates.error, {
      name: msg + "<br/>Please Retry Later",
      enabledClass: 'button-negative',
      dataClass: 'fetched'
    });
    $('ul', this.el).append(html);

  },

  render: function() {
    // Empty our existing view
    $(this.el).empty();

    // Add list
    $(this.el).append(this.templates.list);

    if(App.collections.forms.models.length) {
      // Add header
      $('ul', this.el).append(this.templates.header);
      _(App.collections.forms.models).forEach(function(form) {this.appendForm(form);}, this);
    } else {
      this.renderErrorHandler(arguments[1]);
    }
    this.$el.append(this.templates.footer);
  },

  appendForm: function(form) {
    var view = new ShowFormButtonView({model: form});
    this.views.push(view);
    $('ul', this.el).append(view.render().el);
  },

  showSettings: function () {
    App.views.header.showSettings();
  },

  showAbout: function () {
    App.views.header.showAbout();
  }
});
SentListView = Backbone.View.extend({
  el: $('#fh_wufoo_sent'),

  events: {
    'click button.dismiss-all': 'dismissAll',
    "change #sentSaveMax": "saveMaxSelected"
  },

  templates: {
    sent_list: '<ul class="list inset sent_list"></ul>',
    sent_header: '<li class="list-divider">Sent Submissions</li>',
    dismiss_all: '<li><button class="dismiss-all button button-main button-block">Dismiss All</button></li>',
    save_max: '<li><label for="sentSaveMax" class="sentSaveMaxLabel">Number of sent items to keep</label><select id="sentSaveMax"><option value="5">5</option><option value="10">10</option><option value="15">15</option><option value="20">20</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select></li>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'appendSentForm', 'changed');

    App.collections.sent.bind('add remove reset', this.changed, this);

    this.render();
  },

  saveMaxSelected: function() {
    var saveMax = parseInt($('#sentSaveMax', this.el).val(), 10);
    if (_.isNumber(saveMax)) {
      App.config.set(_.extend({}, App.config.attributes, {
        "sent_save_max": saveMax
      }));
      App.collections.sent.checkSize();
    }
  },

  show: function() {
    App.views.header.markActive('.fh_wufoo_sent');
    this.populate();
    $(this.el).show();
  },

  populate: function() {
    // Re-render save
    var maxSize = App.config.getValueOrDefault('sent_save_max');
    $('#sentSaveMax', this.el).val(maxSize);
  },

  hide: function() {
    $(this.el).hide();
  },

  dismissAll: function(e) {
    e.stopPropagation();

    var confirmDismiss = confirm("Are you sure you want to dismiss all submissions?");
    if (confirmDismiss) {
      var all = [];

      _(App.collections.sent.models).forEach(function(model) {
        all.push(model);
      });

      _(all).forEach(function(model) {
        model.destroy();
      });
    }

    return false;
  },

  changed: function() {
    var self = this;

    // Empty our existing view
    $(this.el).empty();

    // Add lists
    $(this.el).append(this.templates.sent_list);
    $('.sent_list', this.el).append(this.templates.sent_header);

    _(App.collections.sent.models).each(function(form) {
      self.appendSentForm(form);
    }, this);

    $('.sent_list', this.el).append(this.templates.dismiss_all);
    $('.sent_list', this.el).append(this.templates.save_max);

    this.populate();
  },

  appendSentForm: function(form) {
    var view = new PendingSubmittedItemView({
      model: form
    });
    $('.sent_list', this.el).append(view.render().el);
  }
});
DraftListView = Backbone.View.extend({
  el: $('#fh_wufoo_drafts'),

  templates: {
    draft_list: '<ul class="list inset draft_list"></ul>',
    draft_header: '<li class="list-divider">Draft Submissions</li>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'appendDraftForm', 'changed');

    App.collections.drafts.bind('add remove reset', this.changed, this);

    this.render();
  },

  show: function() {
    App.views.header.markActive('.fh_wufoo_drafts');
    $(this.el).show();
  },

  hide: function() {
    $(this.el).hide();
  },

  changed: function() {
    var self = this;

    // Empty our existing view
    $(this.el).empty();

    // Add lists
    $(this.el).append(this.templates.draft_list);
    $('.draft_list', this.el).append(this.templates.draft_header);

    _(App.collections.drafts.models).each(function(form) {
      self.appendDraftForm(form);
    }, this);
  },

  appendDraftForm: function(form) {
    var view = new DraftItemView({
      model: form
    });
    $('.draft_list', this.el).append(view.render().el);
  }
});
SettingsView = Backbone.View.extend({
  el: $('#fh_wufoo_settings'),

  events: {
    "toggle .toggle": "settingChanged",
    "click a.button-positive": "save",
    "click a.button-negative": "cancel"
  },

  templates: {
    "form": '<form><div class="input-group"></div></form>',
//    "list": '<ul class="list"><form><div class="input-group"></div></form></ul>',
//    "toggle": '<li><label><%= list_item %><div class="toggle <%= toggle_class %>"><div class="toggle-handle"></div></div></li>',
    "toggle": '<div class="input-row"><label><%= list_item %></label><div class="toggle <%= toggle_class %>" data-key="<%= key %>"><div class="toggle-handle"></div></div></div>',
    "input": '<div class="input-row"><label><%= list_item %></label><input type="<%= type %>" value="<%= value %>" data-key="<%= key %>"></div>',
    "other": '<div class="input-row"><label><%= list_item %></label><input readonly type="text" value="<%= value %>"></div>',
    "footer": '<a class="button-negative">Cancel</a><a class="button-positive">Save & Apply</a>'
  },

  initialize: function() {
  },

  render: function () {
    var purtyKey = function (key) {
      // replace '_' with ' ' and capitalise each word
      return _.map(key.split('_'), function (part) {
        return part.charAt(0).toUpperCase() + part.substring(1).toLowerCase();
      }).join(' ');
    };

    this.$el.empty();

    this.$el.append(this.templates.form);

    var div = this.$el.find('.input-group');

    var processed = {};
    var config = App.config.attributes;
    var keys = _.union(_.keys(config) , _.keys(config.defaults));
    _.each(keys, function (key){
      if('defaults' !== key && 'white_list' !== key && 'force_cloud_config_updates' !== key) {
        var val = (config.hasOwnProperty(key) ? config[key] : config.defaults[key]);
        var el;
        if ('boolean' === typeof val) {
          // special toggle field
          el = _.template(this.templates.toggle, {
            "list_item": purtyKey(key),
            "key": key,
            "toggle_class": val ? "active": ""
          });
        } else if ('number' === typeof val || 'string' === typeof val) {
          // plain input field
          el = _.template(this.templates.input, {
            "list_item": purtyKey(key),
            "key": key,
            "value": val,
            "type": 'number' === typeof val ? 'number' : 'text'
          });
        } else {
          // readonly field showing stringifed value
          el = _.template(this.templates.other, {
            "list_item": purtyKey(key),
            "value": JSON.stringify(val)
          });
        }
        div.append(el);
      }
    },this);
    div.append(this.templates.footer);
  },

  settingChanged: function () {
    // won't be doing anything with settings unless save is pressed
  },

  save: function () {
    var config = {};

    // get settings values from form, building up config object
    this.$el.find('input:not([readonly])').each(function () {
      var jqEl = $(this);
      var key = jqEl.data('key');
      var val = jqEl.val();
      if (jqEl.is('[type=number]')) {
        val = parseInt(val, 10);
      }
      config[key] = val;
    });

    this.$el.find('.toggle').each(function () {
      var jqEl = $(this);
      var key = jqEl.data('key');
      var val = jqEl.hasClass('active');
      config[key] = val;
    });

    // update config
    App.config.set(_.extend({}, App.config.attributes, config));

    // back to home screen
    App.views.header.showHome();
  },

  cancel: function () {
    App.views.header.showHome();
  },

  show: function() {
    App.views.header.hideAll();
    this.render();
    this.$el.show();
  },

  hide: function() {
    this.$el.hide();
  }
});
AboutView = Backbone.View.extend({
  el: $('#fh_wufoo_banner'),

  initialize: function(props) {
    this.$el.find("ul li.device").html("<span>Device</span>:<span>" + props.uuid + "</span>");
  }
});
ItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'pending_submission',
  events: {
    'click button.delete-item': 'delete',
    'click button.submit-item': 'submit',
    'click': 'show'
  },

  templates: {
    item_failed: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Submitted At: <br/><%= timestamp %></span><br/><span class="pending_review_type <%= error_type %>"><%= error_message %></span><button class="button button-negative delete-item first_button">Delete</button><button class="button button-positive submit-item second_button">Retry</button><span class="chevron"></span>',
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts"><%= timestamp %></span><button class="button button-negative delete-item first_button">Delete</button><button class="button button-positive submit-item second_button">Submit</button><span class="chevron"></span>'
  },

  errorTypes: {
    "validation": "Validation Error. Please review for details.",
    "offline": "Offline during submission. Ok to resubmit",
    "network": "Network issue during submission. Ok to resubmit",
    "timeout": "Form Submission timeout. Please try again later",
    "defaults": "Unknown Error. Please review for details"
  },

  initialize: function() {
    _.bindAll(this, 'render', 'unrender', 'show', 'delete', 'submit');
    this.model.bind('change', this.render);
    this.model.bind('remove', this.unrender);
  },

  renderId: function() {
    if(this.model.get("Entry")&&this.model.get("Entry").EntryId) {
      return "App Forms Id : " + this.model.get("Entry").EntryId;
    }
    if(this.model.idValue) {
      return this.model.idValue;
    }
    if(this.model.id) {
      return this.model.id.split(/-/)[0];
    }
    return "new";
  },

  render: function() {
    var time = new moment(this.model.get('savedAt')).format('HH:mm:ss DD/MM/YYYY');
    var error = this.model.get('error');
    var template = this.templates.item;
    if(error && this.templates.item_failed) {
      template = this.templates.item_failed;
    }
    var item = _.template(template, {
      name: this.model.get('Name'),
      id: this.renderId(),
      timestamp: time,
      error_type: (error && error.type ) ? error.type : null,
      error_message: (error && error.type && this.errorTypes[error.type]) ? this.errorTypes[error.type] : this.errorTypes.defaults
    });

    $(this.el).html(item);
    return this;
  },

  "delete": function(e) {
    e.stopPropagation();

    var confirmDelete = confirm("Are you sure you want to delete this submission?");
    if (confirmDelete) {
      this.model.destroy();
    }

    return false;
  },

  submit: function() {
    var model = this.model;
    model.load(function (err,actual ){
      var json = actual.toJSON();
      model.destroy();
      App.collections.pending_submitting.create(json);
    });

    return false;
  },

  unrender: function() {
    $(this.el).remove();
  },

  show: function() {
    this.model.load(function (err,actual ){
      var draft = new DraftModel(actual.toJSON());
      App.views.form = new DraftView({model: draft});
      App.views.form.render();
    });
  }
});
DraftItemView = ItemView.extend({

  templates: {
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts"><%= timestamp %></span><button class="button button-negative delete-item second_button">Delete</button><span class="chevron"></span>'
  },

  show: function() {
    this.model.load(function (err,actual ){
      App.views.form = new DraftView({model: new DraftModel(actual.toJSON()) , silent:true});
      App.views.form.render();
    });
  }
});
PendingReviewItemView = ItemView.extend({
  templates: {
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Submitted At: <br/><%= timestamp %></span><br/><span class="pending_review_type"><%= error_type %></span><button class="button button-negative delete-item first_button">Delete</button><button class="button button-positive submit-item second_button">Retry</button><span class="chevron"></span>'
  },
  errorTypes: {
    "validation": "Validation Error. Please review for details.",
    "offline": "Offline during submission. Ok to resubmit",
    "network": "Network issue during submission. Ok to resubmit",
    "timeout": "Form Submission timeout. Please try again later",
    "defaults": "Unknown Error. Please review for details"
  },

  render: function() {
    var time = new moment(this.model.get('submittedAt')).format('HH:mm:ss DD/MM/YYYY');
    var error = this.model.get('error');
    var item = _.template(this.templates.item, {
      name: this.model.get('Name'),
      id: this.renderId(),
      timestamp: time,
      error_type: (error && error.type && this.errorTypes[error.type]) ? this.errorTypes[error.type] : this.errorTypes.defaults
    });

    $(this.el).html(item);
    return this;
  }
});
PendingSubmittingItemView = ItemView.extend({
  templates: {
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Saved: <%= timestamp %></span>'
  },
  //Added submit button for test only, remove after

  render: function() {
    var time = new moment(this.model.get('savedAt')).format('HH:mm:ss DD/MM/YYYY');
    var item = _.template(this.templates.item, {
      name: this.model.get('Name'),
      id: this.renderId(),
      timestamp: time
    });

    $(this.el).html(item);
    return this;
  },

  show: function() {
    //TODO: Impl?
    $fh.logger.debug('show for submitting not implemented');
  }
});
PendingSubmittedItemView = ItemView.extend({
  templates: {
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Submitted: <br/><%= timestamp %></span><button class="button button-main delete-item second_button">Dismiss</button><span class="chevron"></span>'
  },

  render: function() {
    var time = new moment(this.model.get('submittedAt')).format('HH:mm:ss DD/MM/YYYY');
    var item = _.template(this.templates.item, {
      name: this.model.get('Name'),
      id: this.renderId(),
      timestamp: time
    });

    $(this.el).html(item);
    return this;
  } ,

  show: function() {
    this.model.load(function (err,actual ){
      App.views.form = new SentView({model: new DraftModel(actual.toJSON())});
      App.views.form.render();
    });

  }

});
PendingListView = Backbone.View.extend({
  el: $('#fh_wufoo_pending'),

  events: {
    'click button.submit-all': 'submitAll'
  },

  templates: {
    pending_waiting_list: '<ul class="list inset pending_waiting_list"></ul>',
    pending_waiting_header: '<li class="list-divider">Forms Awaiting Submission</li>',
    pending_waiting_submitall: '<li><button class="submit-all button button-positive button-block">Submit All Awaiting Forms</button></li>',
    pending_submitting_list: '<ul class="list inset pending_submitting_list"></ul>',
    pending_submitting_header: '<li class="list-divider">Forms currently being submitted<div class="loading hidden"></div></li>',
    pending_review_list: '<ul class="list inset pending_review_list"></ul>',
    pending_review_header: '<li class="list-divider">These submissions need to be reviewed</li>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'changed');

    App.collections.pending_submitting.bind('add remove reset', this.changed, this);
    App.collections.pending_review.bind('add remove reset', this.changed, this);
    App.collections.pending_waiting.bind('add remove reset', this.changed, this);

    this.render();
  },

  scrollToTop: function() {
    window.scrollTo(0, 0);
  },

  submitAll: function() {
    var self = this;
    this.scrollToTop();
    var loadingView = new LoadingCollectionView();
    loadingView.show("Submitting Pending Forms");
    var c = 1;
    var tasks = _.collect(App.collections.pending_waiting.models,function (model) {
      return function (callback){

        loadingView.updateProgress(c * 100 / tasks.length);
        loadingView.updateMessage("Starting " + c + " of "  + tasks.length);
        model.load(function (err,actual){
          var json = actual.toJSON();
          loadingView.updateMessage("Starting " + c + " of "  + tasks.length);
          $fh.logger.debug("pending_list submitAll destroy model="+ model.id );
          model.destroy();

          return App.collections.pending_submitting.create(json,{},function (err){
            loadingView.updateMessage("Starting " + c + " of "  + tasks.length + "<br/> err " + JSON.stringify(err));
            c += 1;
            loadingView.updateProgress(c * 100 / tasks.length);
            if(!err) {
              loadingView.updateMessage("Completed " + c + " of "  + tasks.length);
              //If create is in charge of adding items to pending_waiting on submit failure, id's will have to be removed
              // to make sure it is re-created and not removed below by model.destroy.
            } else {
              loadingView.updateMessage("Submitting " + c + " failed");
            }

            callback.apply(self,arguments);
          });
        });
      };
    });    // Kick things off by fetching when all stores are initialised

    async.series(tasks, function (){
      loadingView.hide();
    });
    return false;
  },

  show: function() {
    App.views.header.markActive('.fh_wufoo_pending');
    $(this.el).show();
  },

  hide: function() {
    $(this.el).hide();
  },

  changed: function() {
    var self = this;

    // Empty our existing view
    $(this.el).empty();

    // Add lists
    $(this.el).append(this.templates.pending_waiting_list);
    $('.pending_waiting_list', this.el).append(this.templates.pending_waiting_header);

    $(this.el).append(this.templates.pending_submitting_list);
    $('.pending_submitting_list', this.el).append(this.templates.pending_submitting_header);

    $(this.el).append(this.templates.pending_review_list);
    $('.pending_review_list', this.el).append(this.templates.pending_review_header);

    _(App.collections.pending_waiting.models).each(function(form) {
      self.appendWaitingForm(form);
    }, this);

    if (App.collections.pending_waiting.length > 0) {
      $('.pending_waiting_list', this.el).append(this.templates.pending_waiting_submitall);
    }

    if (App.collections.pending_submitting.length > 0) {
      $('.loading', this.el).show();
    } else {
      $('.loading', this.el).hide();
    }

    _(App.collections.pending_submitting.models).each(function(form) {
      self.appendSubmittingForm(form);
    }, this);

    _(App.collections.pending_review.models).each(function(form) {
      self.appendReviewForm(form);
    }, this);
  },

  appendWaitingForm: function(form) {
    var view = new ItemView({
      model: form
    });
    $('.pending_waiting_list', this.el).append(view.render().el);
  },

  appendSubmittingForm: function(form) {
    var view = new PendingSubmittingItemView({
      model: form
    });
    $('.pending_submitting_list', this.el).append(view.render().el);
  },

  appendReviewForm: function(form) {
    var view = new PendingReviewItemView({
      model: form
    });
    $('.pending_review_list', this.el).append(view.render().el);
  }
});
HeaderView = Backbone.View.extend({
  el: '#fh_wufoo_header',

  events: {
    'click li.fh_wufoo_home': 'showHome',
    'click li.fh_wufoo_drafts': 'showDrafts',
    'click li.fh_wufoo_pending': 'showPending',
    'click li.fh_wufoo_sent': 'showSent'
  },
  
  templates: {
    list: '<ul class="segmented-controller"></ul>',
    forms_button: '<li class="fh_wufoo_home"><a href="#">Forms</a></li>',
    drafts_button: '<li class="fh_wufoo_drafts"><a href="#">Drafts<span class="count"></span></a></li>',
    pending_button: '<li class="fh_wufoo_pending"><a href="#">Pending<span class="count"></span></a></li>',
    sent_button: '<li class="fh_wufoo_sent"><a href="#">Sent<span class="count"></span></a></li>'
  },

  initialize: function() {
    this.undelegateEvents();
    _.bindAll(this, 'render', 'advise', 'adviseAll', 'showHome', 'showDrafts', 'showPending', 'updateCounts');

    App.collections.drafts.bind('add remove reset', this.updateCounts, this);
    App.collections.pending_submitting.bind('add remove reset', this.updateCounts, this);
    App.collections.pending_review.bind('add remove reset', this.updateCounts, this);
    App.collections.pending_waiting.bind('add remove reset', this.updateCounts, this);
    App.collections.sent.bind('add remove reset', this.updateCounts, this);

    var self = this;
    this.adviseAll();
    this.render();
  },

  render: function() {
    $fh.logger.debug('render headerView');
    $(this.el).empty();

    var list = $(_.template(this.templates.list, {}));
    list.append(this.templates.forms_button);
    list.append(this.templates.drafts_button);
    list.append(this.templates.pending_button);
    list.append(this.templates.sent_button);

    $(this.el).append(list);
    $(this.el).show();
  },
  adviseAll: function() {
    this.showHome = this.advise(this.showHome);
    this.showDrafts= this.advise(this.showDrafts);
    this.showPending= this.advise(this.showPending);
    this.showSent= this.advise(this.showSent);
  },
  advise: function(func) {
    var self = this;
    return function() {
      var skip = false;
      var args = arguments;
      if(args.length && args[0] === true) {
        skip = true;
      }
      var proceed = function(clear){
        try {
          return func.call(self,args);
        } finally {
          if(clear && App.views.form){
            App.views.form.clearFieldChanged();
          }
        }
      };
      if(skip || App.views.form == null|| (App.views.form && !App.views.form.hasFieldChanged())) {
        return proceed();
      } else {
        var confirmDelete = confirm('It looks like you have unsaved data -- if you leave before submitting your changes will be lost. Continue?');
        if (confirmDelete) {
          return proceed(true);
        } else {
          return false;
        }
      }
    };
  },

  showHome: function() {
    this.hideAll();
    App.views.form_list.show();
    return false;
  },

  showDrafts: function() {
    this.hideAll();


    App.views.drafts_list.show();
    return false;
  },

  showPending: function() {
    this.hideAll();
    App.views.pending_list.show();
    return false;
  },

  showSent: function() {
    this.hideAll();
    App.views.sent_list.show();
    return false;
  },

  showSettings: function () {
    this.hideAll();
    App.views.settings.show();
  },

  showAbout: function () {
//    if(App.views.about) {
//      App.views.about.show();
//    }
  },

  hideAll: function() {
    window.scrollTo(0, 0);
    App.views.form_list.hide();
    App.views.drafts_list.hide();
    App.views.pending_list.hide();
    App.views.sent_list.hide();
    App.views.settings.hide();
    if (_.isObject(App.views.form)) {
      App.views.form.hide();
      //App.views.form = null;
    }
  },

  markActive: function(tab_class) {
    $('li', this.el).removeClass('active');
    $(tab_class, this.el).addClass('active');
  },

  updateCounts: function() {
    // TODO: DRY
    var drafts_count = App.collections.drafts.length;
    if (drafts_count > 0) {
      $('.fh_wufoo_drafts .count', this.el).text(drafts_count).css('display', 'inline-block');
    } else {
      $('.fh_wufoo_drafts .count', this.el).hide();
    }

    var pending_count = App.collections.pending_submitting.length + App.collections.pending_review.length + App.collections.pending_waiting.length;

    if (pending_count > 0) {
      $('.fh_wufoo_pending .count', this.el).text(pending_count).css('display', 'inline-block');
    } else {
      $('.fh_wufoo_pending .count', this.el).hide();
    }

    var sent_count = App.collections.sent.length;
    if (sent_count > 0) {
      $('.fh_wufoo_sent .count', this.el).text(sent_count).css('display', 'inline-block');
    } else {
      $('.fh_wufoo_sent .count', this.el).hide();
    }
  }
});
AlertView = Backbone.View.extend({
  options:{el: $("#fh_wufoo_alerts_area")},

  templates: {
    alert: '<div class="fh_wufoo_alert <%= type %>"><%= message %></div>',
    bar: '<div class="fh_wufoo_alert <%= type %>"><span class="small"><%= message %></span><progress max="100" value="<%= value %>"><strong><%= message %></strong></progress></div>',
    ios_bar: '<div class="fh_wufoo_alert <%= type %>"><span class="small"><%= message %></span><div class="progress_bar_container" ><div class="progress_bar complete" style="width:<%=value%>%%"></div></div></div>'
  },

  initialize: function() {
  },

  render: function(opts) {
    var self=this;
    var template = this.templates.alert;
    var value;
    var type = opts.type;
    var o = opts.o;
    var message = o.text || '';
    if(null != o.current ) {
      value  = Math.floor((o.current * 100)/ o.total);
      template = Utils.isIOS() ? this.templates.ios_bar : this.templates.bar;
    }

    this.$el.html(_.template(template, {message:message,value:value,type:type}));
    this.$el.show();
    clearTimeout(this.to);
    this.to = setTimeout(function() {
      self.$el.slideUp(function() {
        $(self.$el).empty();
      });
    }, opts.timeout || 10000);
    return this;
  }
});
var alertView = new AlertView();//{o:o, type:type, timeout:timeout});

AlertView.showAlert = function(o, type, timeout) {
  $fh.logger.debug("showAlert " ,o);
  alertView.render({o:o, type:type, timeout:timeout});
};
FieldView = Backbone.View.extend({

  className: 'field_container',
  templates: {
    instructions: '<p class="instruct"><%= instructions %></p>'
  },

  events: {
    "change": "contentChanged"
  },

  // TODO: cache the input element lookup?
  initialize: function() {
    _.bindAll(this, 'dumpContent', 'clearError');

    var nonFhClasses = this.model.getNonFhClasses();
    if (nonFhClasses) {
      this.$el.addClass(nonFhClasses);
    }

    this.on('visible', function () {
      //$fh.logger.debug('field visible');
    });

    if(!this.model.serialize() && !_.isEmpty(this.defaultValue())) {
      this.model.set({
        Value: this.defaultValue()
      });
    }

    if (this.model.get('IsRequired') === '1') {
      this.$el.addClass('required');
    }

    // only call render once. model will never update
    this.render();
  },

  dumpContent: function() {
    $fh.logger.debug("Value changed :: " + JSON.stringify(this.value()));
  },

  getTopView: function(){
    var view = this.options.parentView;
    var parent;
    do {
      parent = view.options.parentView;
      if(parent) {
        view = parent;
      }
    }while(parent);
    return view;
  },

  contentChanged: function(e) {
    this.dumpContent();
    this.getTopView().trigger('change:field');
    this.model.set({
      Value: this.value()
    });
  },

  render: function() {
    // construct field html
    this.$el.append(_.template(this.template.join(''), {
      "id": this.model.get('ID'),
      "title": this.model.get('Title'),
      "defaultVal": this.model.get('DefaultVal') || ''
    }));

    var instructions = this.model.get('Instructions');

    if (instructions && instructions !== '') {
      $('label:first', this.el).after(_.template(this.templates.instructions, {
        instructions: this.model.get('Instructions')
      }));
    }

    // add to dom
    this.options.parentEl.append(this.$el);
    this.show();

    // force the element to be initially hidden
    if (this.$el.hasClass("hide")) {
      this.hide(true);
    }
  },

  addRules: function() {
    this.addValidationRules();
    this.addSpecialRules();
  },

  isRequired: function() {
    return this.model.get('IsRequired') === '1';
  },

  addValidationRules: function() {
    if (this.model.get('IsRequired') === '1') {
      this.$el.find('#' + this.model.get('ID')).rules('add', {
        "required": true
      });
    }
  },

  addSpecialRules: function() {
    var self = this;

    var rules = {
      'Show': function(rulePasses, params) {
        var fieldId = 'Field' + params.Setting.FieldName;
        if (rulePasses) {
          App.views.form.showField(fieldId);
        } else {
          App.views.form.hideField(fieldId);
        }
      },
      'Hide': function(rulePasses, params) {
        var fieldId = 'Field' + params.Setting.FieldName;
        if (rulePasses) {
          App.views.form.hideField(fieldId);
        } else {
          App.views.form.showField(fieldId);
        }
      }
    };

    // also apply any special rules
    _(this.model.get('Rules') || []).each(function(rule) {
      var ruleConfig = _.clone(rule);
      ruleConfig.pageView = self.options.parentView;
      ruleConfig.fn = rules[rule.Type];
      self.$el.find('#' + self.model.get('ID')).wufoo_rules('add', ruleConfig);
    });
  },

  removeRules: function() {
    this.$el.find('#' + this.model.get('ID')).rules('remove');
  },

  // force a hide , defaults to false
  hide: function(force) {
    if (force || this.$el.is(':visible')) {
      this.$el.hide();
      // remove rules too
      this.removeRules();
    }
  },

  addButton: function(input, extension_type, label) {
    var self = this;
    var button = $('<button>');
    button.addClass('special_button');
    button.addClass(extension_type);
    button.text(' ' + label);
    var img = $('<img>');
    img.attr('src', './img/' + extension_type + '.png');
    img.css('height', '28px');
    img.css('width', '28px');
    button.prepend(img);

    button.click(function(e) {
      self.action(this);
      e.preventDefault();
      return false;
    });

    input.append(button);
    return button;
  },

  show: function() {
    if (!this.$el.is(':visible')) {
      this.$el.show();
      // add rules too
      this.addRules();
      //set the form value from model
      this.value(this.model.serialize());
    }
  },

  defaultValue: function() {
    var defaultValue = {};
    defaultValue[this.model.get('ID')] = this.model.get('DefaultVal');
    return defaultValue;
  },

  // Gets or Set the value for this field
  // value should always be the serialized form value i.e {Field1 : "Test"}
  // field with sub fields - {{Field1 : "First Name"}, {Field2 : "Second Name"}}
  // More complex fields such as files may have value overridden
  // file - {Field2 : {filebase64 : "sssss", filename : "test.txt", content_type : "text/plain"}}
  value: function(value) {
    if (value && !_.isEmpty(value)) {
      $.each(value, function(id, val) {
        $("#" + id).val(val);
      });
    }
    value = {};
    this.$el.find('input, select, textarea').each(function() {
      value[$(this).attr('id')] = $(this).val();
    });
    return value;
  } ,

  // TODO horrible hack
  clearError: function(){
    this.$el.find("label[class=error]").remove();
    this.$el.removeClass("error");
    this.$el.find(".error").removeClass("error");
  }

});
FieldTextView = FieldView.extend({
  template: ['<label class="desc" for="<%= id %>"><%= title %></label>', '<input class="field text medium" maxlength="255" id="<%= id %>" name="<%= id %>" type="text" value="<%= defaultVal %>">']
});
FieldNumberView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="number">'],

  addValidationRules: function () {
    // call super
    FieldView.prototype.addValidationRules.call(this);

    // make sure value is a number
    this.$el.find('#' + this.model.get('ID')).rules("add", {
      "number": true
    });
  }
});
FieldDateView = FieldView.extend({
  template:['<label for="<%= id %>"><%= title %></label>', '<input id="<%= id %>" name="<%= id %>" type="date">'],

  // TODO: do we need validation? how is this inputted by user?


  defaultValue: function() {
    var defaultValue = {};
    if(this.model.get('DefaultVal')) {
      var val = new moment(this.model.get('DefaultVal'), 'MM/DD/YYYY');
      defaultValue[this.model.get('ID')] = val.format('YYYYMMDD');
    }
    return defaultValue;
  },

  value: function(value) {
    if (value && !_.isEmpty(value)) {
      $.each(value, function(id, val) {
        if (val && !_.isEmpty(val)) {
          $("#" + id).val(new moment(val, "YYYYMMDD").format('YYYY-MM-DD'));
        }
      });
    }
    var val = $('#' + this.model.get('ID')).val();
    value = {};
    if(val !== "") {
      value[this.model.get('ID')] = new moment(val).format('YYYYMMDD');
    }
    return value;
  }
});
FieldTextareaView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<textarea id="<%= id %>" name="<%= id %>" ></textarea>']
});
FieldRadioView = FieldView.extend({
  templates: {
    hidden_field: '<input id="radio<%= id %>" type="hidden" value="" data-type="radio">',
    title: '<label><%= title %></label>',
    choice: '<input id="<%= id %>_<%= iteration %>" name="<%= id %>" type="radio" class="field radio" value="<%= value %>" tabindex="<%= iteration %>"><label class="choice" for="<%= id %>_<%= iteration %>"><%= choice %></label><br/>'
  },

  render: function() {
    var self = this;

    var title = _.template(this.templates.title, {
      "title": this.model.get('Title')
    });
    this.$el.append(title);

    var hidden_field = _.template(this.templates.hidden_field, {
      "id": this.model.get('ID')
    });
    this.$el.append(hidden_field);

    var choices = this.model.get('Choices');
    $.each(choices, function(i, choice) {
      var choice_field = $(_.template(self.templates.choice, {
        "id": self.model.get('ID'),
        "iteration": i,
        "choice": choice.Label,
        "value": choice.Label
      }));
      if (i === 0) {
        choice_field.attr('checked', 'checked');
      }
      self.$el.append(choice_field);
    });

    // add to dom
    this.options.parentEl.append(this.$el);
    this.show();
    // ensure that the field has a value, otherwise
    // submission will fail on a required radio with the default field as the first field
    this.model.set({Value: this.value()});
  },

  addValidationRules: function () {
    // first radio is always initially checked, so no need to do 'required' validation on this field
  },

  value:function (value) {
    var self = this;
    if (value) {
      $.each(value, function (id, val) {
        $("input[value='" + val + "']").attr("checked", "checked");
      });
    }
    value = {};
    this.$el.find('input[type="radio"]:checked').each(function() {
      value[self.model.get('ID')] = $(this).val();
    });
    return value;
  }
});
FieldCheckboxView = FieldView.extend({
  templates: {
    title: '<label><%= title %></label>',
    choice: '<input id="<%= id %>" name="<%= mainId %>[]" type="checkbox" class="field checkbox" value="<%= value %>" tabindex="<%= iteration %>"><label class="choice" for="<%= id %>"><%= choice %></label><br/>'
  },

  render: function() {
    var self = this;

    var title = _.template(this.templates.title, {
      "title": this.model.get('Title')
    });
    this.$el.append(title);

    var subfields = this.model.get('SubFields');
    $.each(subfields, function(i, subfield) {
      var choice_field = $(_.template(self.templates.choice, {
        "id": subfield.ID,
        "mainId": self.model.get('ID'),
        "iteration": i,
        "choice": subfield.Label,
        "value": subfield.Label
      }));
      self.$el.append(choice_field);
    });

    // add to dom
    this.options.parentEl.append(this.$el);
    this.show();
  },

  addValidationRules: function () {
    if (this.model.get('IsRequired') === '1') {
      // special required rule for checkbox fields
      this.$el.find('[name="' + this.model.get('ID') + '[]"]').first().rules('add', {
        "required": true,
        "minlength": 1,
        messages: {
          required: "Please choose at least 1"
         }
      });
    }
  },

  defaultValue:function () {
    var defaultValue = {};
    var subfields = this.model.get('SubFields');
    $.each(subfields, function(i, subfield) {
      if(subfield.DefaultVal && subfield.DefaultVal == 1) {
        defaultValue[subfield.ID] = subfield.Label;
      }
    });
    return defaultValue;
  },

  value:function (value) {
    if (value) {
      $.each(value, function (id, val) {
        $("input[value='" + val + "']").attr("checked", "checked");
      });
    }
    value = {};
    this.$el.find('input[type="checkbox"]:checked').each(function() {
      value[$(this).attr('id')] = $(this).val();
    });
    return value;
  }
});

FieldSelectView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<select id="<%= id %>" name="<%= id %>"><option>Test</option></select>'],

  templates: {
    label: '<label><%= title %></label>',
    select: '<select id="<%= id %>" name="<%= id %>"></select>',
    option: '<option value="<%= value %>"><%= value %></option>'
  },

  render: function() {
    var self = this;

    var label = _.template(this.templates.label, {
      "title": this.model.get('Title')
    });
    this.$el.append(label);

    var select = _.template(this.templates.select, {
      "id": this.model.get('ID')
    });
    this.$el.append(select);

    var choices = this.model.get('Choices');    

    $.each(choices, function(i, choice) {
      var option = $(_.template(self.templates.option, {
        "value": choice.Label
      }));
      $('select', self.el).append(option);
    });

    // add to dom
    this.options.parentEl.append(this.$el);

    this.show();
  }
  
});
FieldFileView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="file">'],


  dumpContent: function() {
    var tmp = "<empty>";
    if(this.fileData) {
      var size = this.fileData.fileBase64.length +" bytes";
      if(this.fileData.fileBase64.length > 1024) {
        size = (Math.floor((this.fileData.fileBase64.length/ 1024) * 1000) / 1000) +" Kilo bytes";
      }
      tmp = {content_type : this.fileData.content_type,filename : this.fileData.filename , size: size };
    }
    $fh.logger.debug("Value changed :: " + JSON.stringify(tmp));
  },

  contentChanged: function(e) {
    var self = this;
    self.fileData = {};
    var changeimg = function(str){
      if(typeof str === "object") {
        str = str.target.result; // file reader
      }
      self.fileData.fileBase64 = str;
      self.dumpContent();
      self.model.set({Value: self.value()});
    };

    var file, fileObj = this.$el.find('input')[0];
    if (fileObj && fileObj.files) { // webkit/ie
      file = fileObj.files[0];
      self.fileData.filename = file.name;
      self.fileData.content_type = file.type;
      var fr = new FileReader();
      fr.onloadend = changeimg;
      fr.readAsDataURL(file);
    } else {
      file = fileObj.value; // firefox
      changeimg(file);
    }
  },

  value: function(value) {
    if (value) {
      //How can you update the file element to show the current file selected
      this.fileData = value[this.model.get('ID')];
    }
    value = {};
    if(this.fileData) {
      value[this.model.get('ID')] = this.fileData;
    }
    return value;
  }
});
FieldEmailView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="email">'],

  addValidationRules: function () {
    // call super
    FieldView.prototype.addValidationRules.call(this);

    // email validation
    this.$el.find('#' + this.model.get('ID')).rules('add', {
      "email": true
    });
  }
});
FieldTimeView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="time">']

//  'Field117' => '08:30:31',
// TODO: do we need validation? how is this inputted by user?

});
// We only capture this as text
// NOTE: validate plugin has a 'phoneUS' type. Could use this if needed
FieldPhoneView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="tel">']
});
FieldShortnameView = FieldView.extend({
  templates: {
    title: '<label><%= title %></label>',
    input: '<span class="fancy_name"><input id="<%= id %>" name="<%= id %>" type="text" class="field text"/><label for="<%= id %>"><%= label %></label></span>'
  },

  render: function() {
    var self = this;

    this.$el.addClass('shortname');
    var title = _.template(this.templates.title, {
      "title": this.model.get('Title')
    });
    this.$el.append(title);

    var subfields = this.model.get('SubFields');
    $.each(subfields, function(i, subfield) {
      var choice_field = $(_.template(self.templates.input, {
        "id": subfield.ID,
        "label": subfield.Label,
        "value": subfield.DefaultVal
      }));

      self.$el.append(choice_field);
    });

    var br = $('<br>').css('clear', 'left');
    self.$el.append(br);

    // add to dom
    this.options.parentEl.append(this.$el);
    this.show();
  },

  addValidationRules: function () {
    if (this.model.get('IsRequired') === '1') {
      this.$el.find('input').each(function () {
        $(this).rules('add', {
          "required": true
        });
      });
    }
  }
});

FieldAddressView = FieldView.extend({
  templates: {
    title: '<label><%= title %></label>',
    input: '<span class="fancy_name"><label for="<%= id %>"><%= label %></label><input id="<%= id %>" name="<%= id %>" type="text" class="field text <%= classes %>" value="<%= value %>"/></span>',
    countries_select: '<span class="fancy_name"><label for="<%= id %>">Country</label><select id="<%= id %>" name="<%= id %>"></select></span>',
    countries_option: '<option><%= value %></option>'
  },

  // TODO: allow for default country specified in wufoo form builder?
  countries: ["", "United States", "United Kingdom", "Ireland", "----", "Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia, Plurinational State of", "Bonaire, Saint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Côte D'ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and Mcdonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, the Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension and Tristan Da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French Part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch Part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.S.", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"],

  render: function() {
    var self = this;

    var title = _.template(this.templates.title, {
      "title": this.model.get('Title')
    });
    this.$el.addClass('address');
    this.$el.append(title);

    // TODO: Fancy country
    var subfields = this.model.get('SubFields');
    $.each(subfields, function(i, subfield) {
      var formattedLabel = subfield.Label.toLowerCase().replace(/\s|\//g, '');
      if (subfield.Label === 'Country') {
        var select = $(_.template(self.templates.countries_select, {
          "id": subfield.ID,
          "classes": formattedLabel
        }));

        // Build countries list
        $.each(self.countries, function(i, country) {
          var option = $(_.template(self.templates.countries_option, {
            "value": country
          }));
          $('select', select).append(option);
        });

        self.$el.append(select);
      } else {
        var choice_field = $(_.template(self.templates.input, {
          "id": subfield.ID,
          "label": subfield.Label,
          "classes": (['streetaddress', 'city', 'postalzipcode'].indexOf(formattedLabel) < 0 ? 'validate_ignore ' : ' ') + formattedLabel,
          "value": subfield.DefaultVal
        }));

        self.$el.append(choice_field);
      }
    });

    var br = $('<br>').css('clear', 'left');
    self.$el.append(br);

    // add to dom
    this.options.parentEl.append(this.$el);
    this.show();
  },

  defaultValue:function () {
    var defaultValue = {};
    var subfields = this.model.get('SubFields');
    $.each(subfields, function(i, subfield) {
      if(subfield.DefaultVal) {
        defaultValue[subfield.ID] = subfield.DefaultVal;
      }
    });
    return defaultValue;
  },

  addValidationRules: function () {
    if (this.isRequired()) {
      var message = 'Please fill in the highlighted fields.';
      // street
      this.$el.find('.streetaddress, .city, .postalzipcode, select').each(function (index) { // have to do each as validate plugin runs for first item in selector only
        $(this).rules('add', {
          required: true
        });
      });
    }
  }

});
FieldUrlView = FieldView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="url">'],

  addValidationRules: function () {
    // call super
    FieldView.prototype.addValidationRules.call(this);

    // url validation
    this.$el.find('#' + this.model.get('ID')).rules('add', {
      "url": true
    });
  }
});
// TODO: Wufoo forms page splits this up into subfields, but the API doesn't seem to. Investigate whether we can just post a single field.

FieldMoneyView = FieldNumberView.extend({
  template: ['<label for="<%= id %>"><%= title %></label>','<input id="<%= id %>" name="<%= id %>" type="number">']
});
$.validator.addMethod('likert_group_required', function (value, element, params) {
  return $(element).closest('.field_container').find('select option:selected:empty').length < 1;
}, 'Please select an option for all questions.');

FieldLikertView = FieldView.extend({
  templates: {
    title: '<label><%= title %></label>',
    subfield_container: '<div class="likert_subfield"></div>',
    select_label: '<label for="<%= id %>" class="font-normal"><%= label %></label>',
    select: '<select id="<%= id %>" name="<%= id %>" class="<%= classes %>"></select>',
    option: '<option value="<%= value %>"><%= label %></option>'
  },

  render: function() {
    var self = this;

    var title = _.template(this.templates.title, {
      "title": this.model.get('Title')
    });
    this.$el.append(title);

    var subfields = this.model.get('SubFields');
    var choices = this.model.get('Choices');

    $.each(subfields, function(i, subfield) {
      var subfield_container = $(_.template(self.templates.subfield_container, {}));
      
      var select_label = $(_.template(self.templates.select_label, {
        id: subfield.ID,
        label: subfield.Label
      }));
      var select = $(_.template(self.templates.select, {
        id: subfield.ID,
        classes: i > 0 ? 'validate_ignore': ''
      }));

      // Add options
      $.each(choices, function(i, choice) {
        var option;
        // Default blank
        if (i === 0) {
          option = $(_.template(self.templates.option, {
            label: '',
            value: ''
          }));
          select.append(option);
        }
        option = $(_.template(self.templates.option, {
          label: choice.Label,
          value: choice.Score
        }));
        select.append(option);
      });

      // Add select
      subfield_container.append(select_label);
      subfield_container.append(select);
      self.$el.append(subfield_container);
    });

    // add to dom
    this.options.parentEl.append(this.$el);

    this.show();
  },

  addValidationRules: function () {
    if (this.isRequired()) {
      this.$el.find('#' + this.model.get('ID')).rules('add', {
        "likert_group_required": true
      });
    }
  }

});

FieldGeoView = FieldView.extend({
  extension_type: 'fhgeo',

  templates: {
    input: '<label for="<%= id %>"><%= title %></label><input id="<%= id %>" name="<%= id %>" type="text" disabled>'
  },
  initialize: function() {
    FieldView.prototype.initialize.call(this);
    this.on('visible',this.clearError);
  },

  render: function() {
    // construct field html
    this.$el.append(_.template(this.templates.input, {
      "id": this.model.get('ID'),
      "title": this.model.get('Title')
    }));

    // Add button
    this.addButton(this.$el, this.extension_type, 'Capture Location (Lat/Lon)');

    // add to dom
    this.options.parentEl.append(this.$el);
    this.show();
  },

  contentChanged: function(e) {
    FieldView.prototype.contentChanged.apply(this,arguments);
    this.clearError();
  },

  action: function(el) {
    var self = this;
    var ds = new moment().format('YYYY-MM-DD');
    var input = $('input', this.$el);

    navigator.geolocation.getCurrentPosition(function(res) {
      var location = '(' + res.coords.latitude + ', ' + res.coords.longitude + ')';
      input.val(location);
      self.contentChanged();
    }, function(msg, err) {
      input.attr('placeholder','Location could not be determined');
    });
    input.blur();
  }
});
FieldGeoENView = FieldView.extend({
  extension_type: 'fhgeoen',

  templates: {
    input: '<label for="<%= id %>"><%= title %></label><input id="<%= id %>" name="<%= id %>" type="text" disabled>'
  },

  initialize: function() {
    FieldView.prototype.initialize.call(this);
    this.on('visible',this.clearError);
  },

  render: function() {
    // construct field html
    this.$el.append(_.template(this.templates.input, {
      "id": this.model.get('ID'),
      "title": this.model.get('Title')
    }));

    // Add button
    this.addButton(this.$el, this.extension_type, 'Capture Location (E/N)');

    // add to dom
    this.options.parentEl.append(this.$el);
    this.show();
  },

  action: function(el) {
    var self = this;
    var ds = new moment().format('YYYY-MM-DD');
    var input = $('input', this.$el);

    navigator.geolocation.getCurrentPosition(function(res) {
      var en_location = self.convertLocation(res);
      var location = '(' + en_location.easting + ', ' + en_location.northing + ')';
      input.val(location);
      self.contentChanged();
    }, function(msg, err) {
      input.attr('placeholder','Location could not be determined');
    });
    input.blur();
  },

  convertLocation: function(location) {
    var lat = location.coords.latitude;
    var lon = location.coords.longitude;
    var params = {
      lat: function() {
        return lat;
      },
      lon: function() {
        return lon;
      }
    };
    return OsGridRef.latLongToOsGrid(params);
  },

  contentChanged: function(e) {
    FieldView.prototype.contentChanged.apply(this,arguments);
    this.clearError();
  }

});
FieldCameraView = FieldView.extend({
  events: {
    'click button.remove': "removeThumb",
    'click button.fhcam': "addFromCamera",
    'click button.fhcam_lib': "addFromLibrary"
  },

  template: ['<label for="<%= id %>"><%= title %></label>', '<input id="<%= id %>" name="<%= id %>" type="hidden">', '<div class="upload"><p>Please choose a picture</p>', '</div>', '<div class="uploaded"><p>Picture chosen</p>', '<img class="imageThumb" width="100%">', '</div>'],

  initialize: function() {
    FieldView.prototype.initialize.call(this);
    //Make sure 'this' is bound for setImageData, was incorrect on device!
    _.bindAll(this, 'setImageData', 'imageSelected');
    this.on('visible',this.clearError);
  },

  render: function() {
    // construct field html
    this.$el.append(_.template(this.template.join(''), {
      "id": this.model.get('ID'),
      "title": this.model.get('Title')
    }));

    this.addButton(this.$el, 'fhcam', 'Capture Photo from Camera');
    this.addButton(this.$el, 'fhcam_lib', 'Choose Photo from Library');
    this.addButton(this.$el, 'remove', 'Remove Photo', 'uploaded');

    this.setImageData(null, true);

    // add to dom hidden
    this.$el.hide();
    this.options.parentEl.append(this.$el);

    this.show();
  },

  contentChanged: function(e) {
    FieldView.prototype.contentChanged.apply(this,arguments);
    this.clearError();
  },

  addButton: function(input, img_file, label, classes, action) {
    var self = this;
    var button = $('<button>');
    button.addClass('special_button');
    button.addClass(img_file);
    button.text(' ' + label);
    var img = $('<img>');
    img.attr('src', './img/' + img_file + '.png');
    img.css('height', '28px');
    img.css('width', '28px');
    button.prepend(img);

    if (typeof action !== 'undefined') {
      button.click(function(e) {
        action();
        e.preventDefault();
        return false;
      });
    }

    if (classes) {
      button.addClass(classes);
    }

    input.append(button);
    return button;
  },

  getOrder: function() {
    return this.options.order;
  },

  setImageData: function(imageData, dontCallContentChanged) {
    var target = this.$el.find('#' + this.model.get('ID'));

    if (imageData) {
      $fh.logger.debug('setting imageData:', imageData.length);
      // prepend dataUri if not already there
      var dataUri = imageData;
      if (!/\bdata\:image\/.+?\;base64,/.test(dataUri)) {
        dataUri = 'data:image/jpeg;base64,' + imageData;
      }
      target.val(dataUri);
      this.$el.find('.imageThumb').attr('src', dataUri);
      this.$el.find('.upload').hide();
      this.$el.find('.uploaded').show();
      this.fileData = {};
      this.fileData.fileBase64 = dataUri;
      this.fileData.filename = "photo";
      this.fileData.content_type = "image/jpeg";
    } else {
      target.val(null);
      this.$el.find('.imageThumb').removeAttr('src');
      this.$el.find('.upload').show();
      this.$el.find('.uploaded').hide();
      delete this.fileData;
    }

    // manually call contentChanged as 'change' event doesn't get triggered when we manipulate fields programatically
    if (!dontCallContentChanged) {
      this.contentChanged();
    }
  },

  dumpContent: function() {
    FieldFileView.prototype.dumpContent.call(this);
  },

  hasImageData: function() {
    return this.$el.find('#' + this.model.get('ID')).val().length > 0;
  },

  getImageData: function() {
    return this.$el.find('#' + this.model.get('ID')).val();
  },

  removeThumb: function(e) {
    e.preventDefault();
    $fh.logger.debug('removeThumb');

    this.setImageData(null);
    this.trigger('imageRemoved'); // trigger events used by grouped camera fields NOTE: don't move to setImageData fn, could result in infinite event callback triggering as group camera field may call into setImageData()
  },

  addFromCamera: function(e) {
    e.preventDefault();
    this.addImage();
  },

  addFromLibrary: function(e) {
    e.preventDefault();
    this.addImage(true);
  },

  imageSelected: function(imageData) {
    this.setImageData(imageData);
    this.trigger('imageAdded'); // trigger events used by grouped camera fields
  },

  parseCssClassCameraOptions: function() {
    var options = {
      targetHeight: null,
      targetWidth: null,
      quality: null
    };

    var classNames = this.model.get('ClassNames'),
      parts, val;
    if (classNames !== '') {
      var classes = classNames.split(' ');
      _(classes).forEach(function(className) {
        if (className.indexOf("fhdimensions") != -1) {
          parts = className.split('=');
          val = parts[1].split('x');

          // Retry
          if (val.length == 2) {
            // Validity check
            if (val[0] < 10000 && val[1] < 10000) {
              options.targetWidth = val[0];
              options.targetHeight = val[1];
            } else {
              $fh.logger.error('Invalid camera resolution, using defaults');
            }
          }
        } else if (className.indexOf("fhcompression") != -1) {
          parts = className.split('=');
          val = parts[1].split('%');

          options.quality = val[0];
        }
      });
    }

    return options;
  },

  addImage: function(fromLibrary) {
    // TODO: move this to cloud config, synced to client on startup
    var camOptions = {
      quality: App.config.getValueOrDefault('cam_quality'),
      targetWidth: App.config.getValueOrDefault('cam_targetWidth'),
      targetHeight: App.config.getValueOrDefault('cam_targetHeight')
    };

    var options = this.parseCssClassCameraOptions();
    // Merge
    camOptions = _.defaults(options, camOptions);

    if(camOptions.destinationType !== Camera.DestinationType.DATA_URL){
      camOptions.destinationType = Camera.DestinationType.DATA_URL;
    }

    if (typeof navigator.camera === 'undefined') {
      this.imageSelected(this.sampleImage());
    } else {
      if (fromLibrary) {
        camOptions.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
      }
      // turn off refetch on resume from pic taking, necessary as pic/cam sends app in background
      App.resumeFetchAllowed = false;
      navigator.camera.getPicture(this.imageSelected, function(err) {
        alert('Camera Error: ' + err);
      }, camOptions);
    }
  },

  show: function() {
    // only perform check once
    if (this.options.initHidden) {
      this.options.initHidden = false;
    } else {
      FieldView.prototype.show.call(this);
    }
  },

  value: function(value) {
    if (value && !_.isEmpty(value) && value[this.model.get('ID')] && value[this.model.get('ID')].fileBase64) {
      this.setImageData(value[this.model.get('ID')].fileBase64.replace(/^data:([^,]*,|)/, ""), true);
    }
    value = {};
    if (this.fileData) {
      value[this.model.get('ID')] = this.fileData;
    }
    return value;
  },

  sampleImages: ['/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAAAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgTWFjaW50b3NoIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVEMzgyQjRCMTU1MjExRTJBNzNDQzMyMEE5ODI5OEU0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVEMzgyQjRDMTU1MjExRTJBNzNDQzMyMEE5ODI5OEU0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUQzODJCNDkxNTUyMTFFMkE3M0NDMzIwQTk4Mjk4RTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUQzODJCNEExNTUyMTFFMkE3M0NDMzIwQTk4Mjk4RTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAbGhopHSlBJiZBQi8vL0JHPz4+P0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHAR0pKTQmND8oKD9HPzU/R0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0f/wAARCAAyADIDASIAAhEBAxEB/8QATQABAQAAAAAAAAAAAAAAAAAAAAQBAQEBAAAAAAAAAAAAAAAAAAAEBRABAAAAAAAAAAAAAAAAAAAAABEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AiASt8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k=', 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAALklEQVQYV2NkwAT/oUKMyFIoHKAETBFIDU6FIEUgSaJMBJk0MhQihx2W8IcIAQBhewsKNsLKIgAAAABJRU5ErkJggg==', 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAYUlEQVQYV2NkQAJlM1X/g7hd6bdBFCOyHCNIEigBppElkNkgeYIKYBrwKoQ6A+wEuDtwOQHmLLgbQbqQ3YnubhSfwRTj9DUu3+J0I7oGkPVwXwMZKOEHdCdcPdQJILczAAACnDmkK8T25gAAAABJRU5ErkJggg=='],

  sampleImage: function() {
    window.sampleImageNum = (window.sampleImageNum += 1) % this.sampleImages.length;
    return this.sampleImages[window.sampleImageNum];
  }

});
window.sampleImageNum = -1;
FieldCameraGroupView = FieldCameraView.extend({
  initialize: function() {
    FieldCameraView.prototype.initialize.call(this);
    //Make sure 'this' is bound for setImageData, was incorrect on device!
    // pass visible event down to all fields
    var parent = this;
    this.on('visible', function () {
      $fh.logger.debug('group visible');
      var subviews = this.subviews;
      _(subviews).forEach(function (fieldView) {
        // this group is a camera view and contains itself
        // we've already triggered visible on the group, so skip
        if(parent !== fieldView){
          fieldView.trigger('visible');
        }
      });
    });
  },

  render: function () {
    var self = this;
    // this view subclasses camera view, so render it for first camera item
    FieldCameraView.prototype.render.call(this);
    this.options.order = 0;

    this.subviews = [this]; // this is the first field i.e. this extends FieldCameraView
    this.bind('imageAdded imageRemoved', this.updateFields, this);

    // initialilse subsequent camera views from subfields
    var subFields = this.model.get('SubFields');
    _(subFields).forEach(function (subField, index) {
      var subview = new FieldCameraView({
        parentEl: self.options.parentEl,
        parentView: self.options.parentView,
        model: new FieldModel(subField),
        order: index + 1,
        initHidden: subField.IsRequired === '1' ? false: true // hide camera fields initially if they're not required
      });
      // bind event handler for whenever image is added/remove from field
      subview.bind('imageAdded imageRemoved', self.updateFields, self); // purposely pass in self here as subviews need to be iterated over no matter which field changed
      self.subviews.push(subview);
    });
    //ToDo subviews should probably be added in initialize?
    this.value(this.model.serialize());

    // if restoring from a draft, may need to show some additional fields
    this._optimiseVisibleFields();
  },

  updateFields: function () {
    this._fillBlanks();
    this._optimiseVisibleFields();
  },

  _fillBlanks: function () {
    var groups = this._getGroupedFields();

    // move any optional filled fields into empty required field spots
    // NOTE: could move all filled fields here,
    //       but not necessary as required fields that are filled is what we want (and are always visible anyways).
    //       Only thing is, may have a blank required above a filled required. minor UI preference
    _(groups.optFilled).forEach(function (optField, index) {
      // get next empty field
      var nextEmptyField = groups.empty[0];
      // if field exists & is before the field we're trying to move, move it. Otherwise, do nothing
      if (nextEmptyField && (nextEmptyField.getOrder() < optField.getOrder())) {
        // remove entry from empty list as we'll be filling it here
        groups.empty.shift();
        // move image data to reqField
        nextEmptyField.setImageData(optField.getImageData(), true);
        // empty image data from optField
        optField.setImageData(null, false);
        groups.empty.push(optField); // field is now empty, add to end of empty list
      }
    });
  },

  _optimiseVisibleFields: function () {
    // get groups again as they may have changed above (optional filled moved to req filled)
    var groups = this._getGroupedFields();

    // all fields image data in order. See how many optional fields we should show, if any
    var amountToShow = groups.reqFilled.length >= groups.req.length ? Math.min(groups.opt.length, Math.max(0, groups.optFilled.length + 1)) : 0;
    _(groups.opt).forEach(function (optField, index) {
      if (index < amountToShow) {
        optField.show();
      } else {
        optField.hide();
      }
    });
    this.contentChanged(); //Call contentChanged so all image data is set on the group model
  },

    // group fields based on required status and whether or not image data is filled
  _getGroupedFields: function () {
    var groups = {
      req: [], // required fields
      reqEmpty: [], // required empty fields
      reqFilled: [], // required filled fields
      opt: [], // optional fields
      optEmpty: [], // optional empty fields
      optFilled: [], // optional filled fields
      empty: [] // empty fields
    };

    _(this.subviews).forEach(function (subview, index) {
      if (subview.isRequired()) { // required field
        groups.req.push(subview);
        if (subview.hasImageData()) { // filled in
          groups.reqFilled.push(subview);
        } else { // empty
          groups.reqEmpty.push(subview);
          groups.empty.push(subview);
        }
      } else { // optional field
        groups.opt.push(subview);
        if (subview.hasImageData()) { // filled in
          groups.optFilled.push(subview);
        } else { // empty
          groups.optEmpty.push(subview);
          groups.empty.push(subview);
        }
      }
    });
    return groups;
  },

  value: function(value) {
    if (value && !_.isEmpty(value)) {
      _(this.subviews).forEach(function (subview, index) {
        //subview might be the group, so we call value on FieldCameraView
        FieldCameraView.prototype.value.call(subview, value);
      });
    }
    value = {};
    _(this.subviews).forEach(function (subview, index) {
      $.extend(value, FieldCameraView.prototype.value.call(subview));
    });
    return value;
  }
});
FieldSignatureView = FieldView.extend({
  extension_type: 'fhsig',

  templates: {
    input: '<label for="<%= id %>"><%= title %></label><img class="sigImage"/><input id="<%= id %>" name="<%= id %>" type="hidden">',
    signaturePad: ['<div class="sigPad">', '<ul class="sigNav">', '<button class="clearButton">Clear</button><button class="cap_sig_done_btn">Done</button>', '</ul>', '<div class="sig sigWrapper">', '<canvas class="pad" width="<%= canvasWidth %>" height="<%= canvasHeight %>"></canvas>', '</div>', '</div>']
  },

  initialize: function() {
    FieldView.prototype.initialize.call(this);
    this.on('visible',this.clearError);
  },

  dumpContent: function() {
    FieldFileView.prototype.dumpContent.call(this);
  },

  render: function() {
    var self = this;
    this.$el.append(_.template(this.templates.input, {
      "id": this.model.get('ID'),
      "title": this.model.get('Title')
    }));

    // Add button
    var button = this.addButton(this.$el, this.extension_type, 'Capture Signature');

    // add to dom
    this.options.parentEl.append(this.$el);
    $fh.logger.debug("render html=" + this.$el.html());
    this.show();
  },

  contentChanged: function(e) {
    FieldView.prototype.contentChanged.apply(this,arguments);
    this.clearError();
  },

  // TODO horrible hack
  clearError: function(){
    var id = this.model.get('ID');
    var val = this.model.get("Value");
    if(val && val.hasOwnProperty(id) && !this.isEmptyImage(val[id].fileBase64)) {
      FieldView.prototype.clearError.call(this);
    }
  },

  action: function(el, e) {
    $('input', this.$el);
    this.showSignatureCapture();
  },

  showSignatureCapture: function() {
    var self = this;
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    var canvasHeight = winHeight - 70;
    var canvasWidth = winWidth - 2;
    var lineTop = canvasHeight - 20;

    this.$el.append(_.template(this.templates.signaturePad.join(''), {
      "canvasHeight": canvasHeight,
      "canvasWidth": canvasWidth
    }));
    $fh.logger.debug("showSignatureCapture html=" + this.$el.html());

    var signaturePad = $('.sigPad', this.$el);
    signaturePad.css({
      position: 'fixed',
      'z-index': 9999,
      'width': winWidth + 'px',
      'height': winHeight + 'px',
      top: '0px',
      left: '0px',
      'background-color': '#fff'
    });

    var navHeight = $('.sigNav', this.$el).outerHeight();
    $('.sigPad', this.$el).css({
      width: '100%',
      height: winHeight + 'px'
    });
    $('.sigWrapper', this.$el).css({
      height: (winHeight - navHeight - 20) + "px"
    });
    sigPad = $('.sigPad', this.$el).signaturePad({
      drawOnly: true,
      lineTop: lineTop
    });

    $(this.$el).data('sigpadInited', true);
    // Bind capture
    $('.cap_sig_done_btn', this.$el).unbind('click').bind('click', function(e) {
      var loadingView = new LoadingView();
      loadingView.show("generating signature");
      e.preventDefault();
      var sig = sigPad.getSignature(); // get the default image type
      if(sig && sig.length) {
        var sigData = sigPad.getSignatureImage();
        self.dbgImage("signature field sig[default]=" ,sigData);
        if(self.isEmptyImage(sigData)) {
          sigData = sigPad.getSignatureImage("image/png");
          self.dbgImage("signature field sig[image/png]=" ,sigData);
        }
        if(self.isEmptyImage(sigData)) {
          sigData = sigPad.getSignatureImage("image/jpeg");
          self.dbgImage("signature field sig[image/jpeg]=" ,sigData);
        }
        if(self.isEmptyImage(sigData)) {
          sigData = self.toJpg();
          self.dbgImage("signature field sig[encoded jpg]=" ,sigData);
        }
        if(self.isEmptyImage(sigData)) {
          sigData = self.toBmp();
          self.dbgImage("signature field sigencoded bmp]=" ,sigData);
        }

        var img = $('.sigImage', self.$el)[0];
        img.src = sigData;
        $('input', self.$el).val(sigData);

        self.fileData = {};
        self.fileData.fileBase64 = sigData;
        var parts = self.splitImage(sigData);
        self.fileData.content_type = parts[0];
        self.fileData.filename = "signature." +  parts[1];
      }
      $('.sigPad', self.$el).hide();
      loadingView.hide();
      self.contentChanged();
    });
  },



  value: function(value) {
    if (value && !_.isEmpty(value)) {
      this.fileData = value[this.model.get('ID')];
      $('.sigImage', this.$el).attr('src', this.fileData.fileBase64);
      $('input', this.$el).val(this.fileData.fileBase64);
    }
    value = {};
    if(this.fileData) {
      value[this.model.get('ID')] = this.fileData;
    }
    $fh.logger.debug("value html=" + this.$el.html());
    return value;
  },
  dbgImage: function(msg,image) {
    console.log(msg + (image ? (image.substring(0,image.indexOf(",")) + "[len=" + image.length +"]") : " empty"));
  },
  toJpg: function(image) {
    image= _.extend({}, image||{}, {quality : 100, width : 248, height : 100});
    var cnvs = $('.sigPad', self.$el).find('canvas')[0];

    var canvas = this.scaleCanvas(cnvs, image.width, image.height);
    var myEncoder = new JPEGEncoder(image.quality);
    return myEncoder.encode(canvas.getContext("2d").getImageData(0, 0, image.width, image.height));
  },

  toBmp: function(image) {
    image= _.extend({}, image||{}, {quality : 100, width : 248, height : 100});
    var sigData;
    var cnvs = $('.sigPad', self.$el).find('canvas')[0];

    var oScaledCanvas = this.scaleCanvas(cnvs, image.width, image.height);
    var oData = this.readCanvasData(oScaledCanvas);
    var strImgData = this.createBMP(oData);

    sigData = this.makeDataURI(strImgData, "image/bmp");
    return sigData;
  },

  // bitMap handling code
  readCanvasData: function(canvas) {
    var iWidth = parseInt(canvas.width,10);
    var iHeight = parseInt(canvas.height,10);
    return canvas.getContext("2d").getImageData(0, 0, iWidth, iHeight);
  },

  encodeData: function(data) {
    var strData = "";
    if (typeof data == "string") {
      strData = data;
    } else {
      var aData = data;
      for ( var i = 0; i < aData.length; i++) {
        strData += String.fromCharCode(aData[i]);
      }
    }
    return btoa(strData);
  },

  createBMP: function(oData) {
    var aHeader = [];

    var iWidth = oData.width;
    var iHeight = oData.height;

    aHeader.push(0x42); // magic 1
    aHeader.push(0x4D);

    var iFileSize = iWidth * iHeight * 3 + 54; // total header size = 54
    // bytes
    aHeader.push(iFileSize % 256);
    iFileSize = Math.floor(iFileSize / 256);
    aHeader.push(iFileSize % 256);
    iFileSize = Math.floor(iFileSize / 256);
    aHeader.push(iFileSize % 256);
    iFileSize = Math.floor(iFileSize / 256);
    aHeader.push(iFileSize % 256);

    aHeader.push(0); // reserved
    aHeader.push(0);
    aHeader.push(0); // reserved
    aHeader.push(0);

    aHeader.push(54); // dataoffset
    aHeader.push(0);
    aHeader.push(0);
    aHeader.push(0);

    var aInfoHeader = [];
    aInfoHeader.push(40); // info header size
    aInfoHeader.push(0);
    aInfoHeader.push(0);
    aInfoHeader.push(0);

    var iImageWidth = iWidth;
    aInfoHeader.push(iImageWidth % 256);
    iImageWidth = Math.floor(iImageWidth / 256);
    aInfoHeader.push(iImageWidth % 256);
    iImageWidth = Math.floor(iImageWidth / 256);
    aInfoHeader.push(iImageWidth % 256);
    iImageWidth = Math.floor(iImageWidth / 256);
    aInfoHeader.push(iImageWidth % 256);

    var iImageHeight = iHeight;
    aInfoHeader.push(iImageHeight % 256);
    iImageHeight = Math.floor(iImageHeight / 256);
    aInfoHeader.push(iImageHeight % 256);
    iImageHeight = Math.floor(iImageHeight / 256);
    aInfoHeader.push(iImageHeight % 256);
    iImageHeight = Math.floor(iImageHeight / 256);
    aInfoHeader.push(iImageHeight % 256);

    aInfoHeader.push(1); // num of planes
    aInfoHeader.push(0);

    aInfoHeader.push(24); // num of bits per pixel
    aInfoHeader.push(0);

    aInfoHeader.push(0); // compression = none
    aInfoHeader.push(0);
    aInfoHeader.push(0);
    aInfoHeader.push(0);

    var iDataSize = iWidth * iHeight * 3;
    aInfoHeader.push(iDataSize % 256);
    iDataSize = Math.floor(iDataSize / 256);
    aInfoHeader.push(iDataSize % 256);
    iDataSize = Math.floor(iDataSize / 256);
    aInfoHeader.push(iDataSize % 256);
    iDataSize = Math.floor(iDataSize / 256);
    aInfoHeader.push(iDataSize % 256);

    for ( var i = 0; i < 16; i++) {
      aInfoHeader.push(0); // these bytes not used
    }

    var iPadding = (4 - ((iWidth * 3) % 4)) % 4;

    var aImgData = oData.data;

    var strPixelData = "";
    var y = iHeight;
    do {
      var iOffsetY = iWidth * (y - 1) * 4;
      var strPixelRow = "";
      for ( var x = 0; x < iWidth; x++) {
        var iOffsetX = 4 * x;

        strPixelRow += String.fromCharCode(aImgData[iOffsetY + iOffsetX + 2]);
        strPixelRow += String.fromCharCode(aImgData[iOffsetY + iOffsetX + 1]);
        strPixelRow += String.fromCharCode(aImgData[iOffsetY + iOffsetX]);
      }
      for ( var c = 0; c < iPadding; c++) {
        strPixelRow += String.fromCharCode(0);
      }
      strPixelData += strPixelRow;
    } while (--y);

    var strEncoded = this.encodeData(aHeader.concat(aInfoHeader)) + this.encodeData(strPixelData);

    return strEncoded;
  },
  makeDataURI: function(strData, strMime) {
    return "data:" + strMime + ";base64," + strData;
  },
  scaleCanvas: function(canvas, iWidth, iHeight) {
    if (iWidth && iHeight) {
      var oSaveCanvas = document.createElement("canvas");
      oSaveCanvas.width = iWidth;
      oSaveCanvas.height = iHeight;
      oSaveCanvas.style.width = iWidth + "px";
      oSaveCanvas.style.height = iHeight + "px";

      var oSaveCtx = oSaveCanvas.getContext("2d");

      oSaveCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, iWidth, iHeight);
      return oSaveCanvas;
    }
    return canvas;
  },
  isEmptyImage: function(image) {
    return image === null || image === "" || image === "data:,";
  },
  splitImage: function(image) {
    var PREFIX = "data:";
    var ENCODING = ";base64,";
    var start = image.indexOf(PREFIX);
    var content_type = "image/bmp";
    var ext = "bmp";
    if(start >= 0) {
      var end = image.indexOf(ENCODING,start) + 1;
      content_type = image.substring(start,end-1);
      ext = content_type.split("/")[1];
    }
    return [content_type,ext];
  }

});
FieldMapView = FieldView.extend({
  extension_type: 'fhmap',

  templates: {
    label: '<label for="<%= id %>"><%= title %></label>',
    mapArea: '<div class="fh_map_canvas"></div>'
  },

  mapSettings: {
    mapWidth: '100%',
    mapHeight: '300px',
    defaultZoom: 16,
    location: {
      lon: -5.80078125,
      lat: 53.12040528310657
    }
  },

  currentLocation: null,

  parseCssOptions: function() {
    var options = {
      defaultZoom: null
    };

    var classNames = this.model.get('ClassNames'),
      parts, val;
    if (classNames !== '') {
      var classes = classNames.split(' ');
      _(classes).forEach(function(className) {
        if (className.indexOf("fhzoom") != -1) {
          parts = className.split('=');
          val = parseInt(parts[1], 10);

          if (_.isNumber(val)) {
            options.defaultZoom = val;
          }
        }
      });
    }

    return options;
  },

  initialize: function() {
    var self = this;
    FieldView.prototype.initialize.call(this);
    this.on('visible', function() {
      self.show();
    });
  },

  render: function() {
    var self = this;

    // Add label
    this.$el.append(_.template(this.templates.label, {
      "id": this.model.get('ID'),
      "title": this.model.get('Title')
    }));

    // Add map canvas
    this.$el.append(_.template(this.templates.mapArea, {}));

    $('.fh_map_canvas', this.el).css({
      width: self.mapSettings.mapWidth,
      height: self.mapSettings.mapHeight
    });

    // add to dom
    this.options.parentEl.append(this.$el);
  },

  show: function() {
    FieldView.prototype.show.call(this);
    this.renderMap();
  },

  renderMap: function() {
    var self = this;
    var mapCanvas = $('.fh_map_canvas', this.el);
    var options = this.parseCssOptions();

    // Merge
    this.mapSettings = _.defaults(options, this.mapSettings);

    navigator.geolocation.getCurrentPosition(function(geoRes) {
      // Override with geo, otherwise use defaults
      var location ={lat:geoRes.coords.latitude,lon:geoRes.coords.longitude};

      var matches;
      if (self.currentLocation && (matches = self.currentLocation.match(/\((.+),(.+)\)/))) {
        location= {lat:matches[1], lon:matches[2]};
      }

      self.mapSettings = _.defaults({
        location: location
      }, self.mapSettings);

      $fh.map({
        target: mapCanvas[0],
        lon: self.mapSettings.location.lon,
        lat: self.mapSettings.location.lat,
        zoom: self.mapSettings.defaultZoom
      }, function(res) {
        self.map = res.map;
        var marker = new google.maps.Marker({
          position: self.map.getCenter(),
          map: self.map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          title: "Drag this to set position"
        });
        self.currentLocation = marker.getPosition().toString();

        google.maps.event.addListener(marker, "dragend", function() {
          self.currentLocation = marker.getPosition().toString();
          self.contentChanged();
        });
      }, function(err) {
        $fh.logger.debug(err);
      });
    });
  },

  mapResize: function() {
    if (this.map != null) {
      $fh.logger.debug('mapResize');
      // trigger resize event
      google.maps.event.trigger(this.map, 'resize');
      // recenter map
      this.map.setCenter(new google.maps.LatLng(this.mapSettings.location.lat, this.mapSettings.location.lon));
    }
  },

  addValidationRules: function() {
    // You can't have a required map, since there's no input. Also there's always a default location set.
  },

  value: function(value) {
    if (value && !_.isEmpty(value) && value[this.model.get('ID')]) {
      var val = value[this.model.get('ID')];
      if (/\((.+),(.+)\)/.test(val)) {
        this.currentLocation = val;
      }
    }
    value = {};
    value[this.model.get('ID')] = this.currentLocation;
    return value;
  }
});
FieldCustomTimeView = FieldView.extend({
  extension_type: 'fhtime',

  templates: {
    input: '<label for="<%= id %>"><%= title %></label><input id="<%= id %>" name="<%= id %>" type="time">'
  },

  render: function() {
    // construct field html
    this.$el.append(_.template(this.templates.input, {
      "id": this.model.get('ID'),
      "title": this.model.get('Title')
    }));

    // Add button
    this.addButton(this.$el, this.extension_type, 'Capture Time');

    // add to dom
    this.options.parentEl.append(this.$el);
    this.show();
  },

  action: function(el) {
    var m = new moment();
    $('input', this.$el).val(m.format('HH:mm:ss')).blur();
    if($('input', this.$el).val() === "") {
      $('input', this.$el).val(m.format('HH:mm:00')).blur();
    }
    this.contentChanged();
  }
});

FieldCustomDateView = FieldView.extend({
  extension_type: 'fhdate',

  templates: {
    input: '<label for="<%= id %>"><%= title %></label><input id="<%= id %>" name="<%= id %>" type="fhdate">'
  },
  initialize: function() {
    FieldView.prototype.initialize.call(this);
    this.default_date_format = "DD-MM-YYYY";
    this.on('visible',this.clearError);
  },

  render: function() {
    // construct field html
    this.$el.append(_.template(this.templates.input, {
      "id": this.model.get('ID'),
      "title": this.model.get('Title')
    }));

    // Add button
    this.addButton(this.$el, this.extension_type, 'Capture Date');

    // add to dom
    this.options.parentEl.append(this.$el);
    this.$el.find('input[type="fhdate"]').mobiscroll().date({theme:'android',display:'bottom',dateOrder : "ddmmyy"});
    this.show();
  },

  value: function(value) {
    if (value && !_.isEmpty(value)) {
      $.each(value, function(id, val) {
        if (val && !_.isEmpty(val)) {
          var formated = new moment(val, this.default_date_format).format("YYYY-MM-DD");
          $("#" + id).val(formated);
        }
      });
    }
    var val = $('#' + this.model.get('ID')).val();

    value = {};
    if(val !== "") {
      value[this.model.get('ID')] = new moment(val).format(this.default_date_format);
    }
    return value;
  },

  action: function(el) {
    var ds = new moment().format('YYYY-MM-DD');
    $('input', this.$el).val(ds).blur();
    this.contentChanged();
  },

  contentChanged: function(e) {
    FieldView.prototype.contentChanged.apply(this,arguments);
    this.clearError();
  }

});
StepsView = Backbone.View.extend({
  className: 'fh_steps clearfix',

  templates: {
    table: '<div class="progress_wrapper"><table class="progress_steps" cellspacing="0"><tr></tr></table></div>',
    step: '<td><span class="number_container"><div class="number"><%= step_num %></div></span><span class="page_title"><%= step_name %></span></td>'
  },

  initialize: function() {
    var self = this;

    _.bindAll(this, 'render');
    this.model.on('change:active_page', function(model, page) {
      self.activePageChange.call(self, model, page);
    });
    this.render();
  },

  render: function() {
    var self = this;
    var table = $(self.templates.table);

    var width = 100 / this.model.pages.length;

    this.model.pages.each(function(page, index) {
      var item = $(_.template(self.templates.step, {
        step_name: page.get('Title'),
        step_num: index + 1
      }));
      item.css('width', width + '%');
      $('tr:first', table).append(item);
    });

    this.$el.append(table);
    $('#logo', this.options.parentEl).after(self.$el);
  },

  activePageChange: function(model, pageIndex) {
    this.$el.find('td').removeClass('active');
    this.$el.find('td:eq(' + pageIndex + ')').addClass('active');
  }

});
ActionBarView = Backbone.View.extend({
  className: 'fh_action_bar',

  events: {
    'click button': 'buttonHandler'
  },

  initialize: function() {
    var self = this;

    this.model.on('change:active_page', function (model, page) {
      self.activePageChange.call(self, model, page);
    });
    this.render();
  },

  render: function() {
    this.$el.html('<button class="saveDraft hidden button button-main">Save Draft</button><button class="previous hidden button">Previous</button><button class="next hidden button">Next</button><button class="submit hidden button button-positive">Submit</button>');
    this.options.parentEl.append(this.$el);
  },

  activePageChange: function (model, pageIndex) {
    // show/hide previous/next/submit buttons accordingly
    this.$el.find('button').addClass('hidden').removeClass('two_button, three_button');

    var numPages = model.pages.length;
    if (numPages < 2) {
      // single-page. show submit button
      this.$el.find('.submit').removeClass('hidden').addClass('two_button');
      this.$el.find('.saveDraft').removeClass('hidden').addClass('two_button');
    } else if (pageIndex === 0) {
      // multi-page, first page. show next button
      this.$el.find('.next').removeClass('hidden').addClass('two_button');
      this.$el.find('.saveDraft').removeClass('hidden').addClass('two_button');
    } else if (pageIndex === (numPages - 1)) {
      // multi-page, last page. show submit button and previous
      this.$el.find('.submit').removeClass('hidden').addClass('three_button');
      this.$el.find('.previous').removeClass('hidden').addClass('three_button');
      this.$el.find('.saveDraft').removeClass('hidden').addClass('three_button');
    } else {
      // multi-page, in-between page. show next & previous
      this.$el.find('.next').removeClass('hidden').addClass('three_button');
      this.$el.find('.previous').removeClass('hidden').addClass('three_button');
      this.$el.find('.saveDraft').removeClass('hidden').addClass('three_button');
    }
  },

  // delegate events to form depending on button class
  buttonHandler: function (e) {
    var el = $(e.target);
    if (el.hasClass('previous')) {
      this.options.parentView.previousPage();
    } else if (el.hasClass('next')) {
      this.options.parentView.nextPage();
    } else if (el.hasClass('saveDraft')) {
      this.options.parentView.saveDraft();
    } else {
      this.options.parentView.submit();
    }
    this.scrollToTop();
  },

  scrollToTop: function() {
    window.scrollTo(0, 0);
  }
});
PageView = Backbone.View.extend({

  viewMap: {
    "text": FieldTextView,
    "number": FieldNumberView,
    "date": FieldDateView,
    "eurodate": FieldDateView,
    "textarea": FieldTextareaView,
    "radio": FieldRadioView,
    "checkbox": FieldCheckboxView,
    "select": FieldSelectView,
    "file": FieldFileView,
    "email": FieldEmailView,
    "time": FieldTimeView,
    "phone": FieldPhoneView,
    "europhone": FieldPhoneView,
    "shortname": FieldShortnameView,
    "address": FieldAddressView,
    "url": FieldUrlView,
    "money": FieldMoneyView,
    "likert": FieldLikertView,
    "fhgeo": FieldGeoView,
    "fhgeoEN": FieldGeoENView,
    "fhgeoen": FieldGeoENView,
    "fhcam": FieldCameraView,
    "fhcamGroup": FieldCameraGroupView,
    "fhsig": FieldSignatureView,
    "fhmap": FieldMapView,
    "fhtime": FieldCustomTimeView,
    "fhdate": FieldCustomDateView
  },

  initialize: function() {
    var self = this;
    _.bindAll(this, 'render');
    this.fieldViews = {};

    // pass visible event down to all fields
    this.on('visible', function () {
      $fh.logger.debug('page visible');
      _(self.fieldViews).forEach(function (fieldView) {
        fieldView.trigger('visible');
      });
    });
    this.render();
  },

  render: function() {
    var self = this;

    // all pages hidden initially
    this.$el.empty().addClass('page hidden');
    // add to parent before init fields so validation can work
    this.options.parentEl.append(this.$el);

    this.model.fields.each(function (field, index) {
      var fieldType = field.getType();
      if (self.viewMap[fieldType]) {
        self.fieldViews[field.get('ID')] = new self.viewMap[fieldType]({
          parentEl: self.$el,
          parentView: self,
          model: field
        });
      } else {
        $fh.logger.warn('FIELD NOT SUPPORTED:' + fieldType);
      }
    });
  },

  show: function () {
    var self = this;

    this.$el.removeClass('hidden');
    // see if we need to apply any validation errors got back from wufoo i.e. rules that we haven't implemented or cannot implement
    var error = this.options.parentView.model.get('error');
    if (error && error.details && error.details.FieldErrors) {
      // filter out elements only visible on this page
      var validateErrors = {};
      _(error.details.FieldErrors).forEach(function (fieldError) {
        var fieldEl = self.$('[name="' + fieldError.ID + '"],[name="' + fieldError.ID + '[]"]');
        if (fieldEl.length) {
          validateErrors[fieldEl.attr('name')] = fieldError.ErrorText;
        }
      });
      if (!_.isEmpty(validateErrors)) {
        this.options.parentEl.validate().showErrors(validateErrors);
      }
    }

    this.trigger('visible');
  },

  hide: function () {
    this.$el.addClass('hidden');
  },

  showField: function (id) {
    // show field if it's on this page
    if (this.fieldViews[id]) {
      this.fieldViews[id].show();
    }
  },

  hideField: function (id) {
    // hide field if it's on this page
    if (this.fieldViews[id]) {
      this.fieldViews[id].hide();
    }
  },

  isValid: function () {
    // only validate form inputs on this page that are visible or type=hidden, or have validate_ignore class
    var validateEls = this.$el.find('input,select,option,textarea').not('.validate_ignore,[type!="hidden"]:hidden');
    return validateEls.length ? validateEls.valid() : true;
  },

  checkRules: function () {
    var self = this;
    var result = {};

    var rules = {
      SkipToPage: function (rulePasses, params) {
        var pageToSkipTo = params.Setting.Page;
        if (rulePasses) {
          result.skipToPage = pageToSkipTo;
        }
      }
    };

    // iterate over page rules, if any, calling relevant rule function
    _(this.model.get('Rules') || []).forEach(function (rule, index) {
      // get element that rule condition is based on
      var jqEl = self.$el.find('#Field' + rule.condition.FieldName + ',' + '#radioField' + rule.condition.FieldName);
      rule.fn = rules[rule.Type];
      if(jqEl.data("type") === 'radio') {
        var rEl = self.$el.find('#Field' + rule.condition.FieldName + '_' + index);
        rEl.wufoo_rules('exec', rule);
      } else {
        jqEl.wufoo_rules('exec', rule);
      }
    });

    return result;
  }

});
DraftView = Backbone.View.extend({
  el: $('#fh_wufoo_content'),

  templates: {
    heading: '<header class="info"><h2 class="form_title"><%= form_title %></h2></header>',
    logo: '<h1 id="logo"><a href="#">App Form</a></h1>',
    action_bar: '<div class="fh_action_bar"><button class="previous">Previous Page</button><button class="next">Next Page</button><button class="submit">Submit Form</button></div>'
  },

  initialize: function() {
    var self = this;

    _.bindAll(this, 'render');
    this.model.on('change:active_page', function(model, page) {
      self.activePageChange.call(self, model, page);
    });

    this.on('visible', function () {
      //$fh.logger.debug('draft visible');
    });

    this.pages = [];
    this.on('change:field', this.notifyFieldChanged, this);

  },

  notifyFieldChanged: function () {
    this.fieldChanged = true;
  },

  hasFieldChanged: function () {
    return this.fieldChanged;
  },

  clearFieldChanged: function () {
    this.fieldChanged = false;
  },
  renderId: function() {
    if(this.model.get("Entry")&&this.model.get("Entry").EntryId) {
      return "App Forms Id : " + this.model.get("Entry").EntryId;
    }
    if(this.model.idValue) {
      return this.model.idValue;
    }
    if(this.model.id) {
      return this.model.id.split(/-/)[0];
    }
    return "new";
  },

  render: function() {
    var self = this;
    App.views.header.hideAll();

    this.$el.empty();

    // add custom theme, if any
    var theme = this.model.get('Theme');
    if (theme != null && theme !== '') {
      self.theme = $('<style>', {
        "type": "text/css",
        "charset": "utf-8",
        "text": theme
      });
      $('body link').last().after(self.theme);
    }

    var form = $('<form>').addClass('wufoo');

    // Add form logo
    var logo = _.template(this.templates.logo, {});
    form.append(logo);

    // Add form heading
    var heading = _.template(this.templates.heading, {
      "form_title": this.model.get('Name') + "(" + this.renderId() + ")"
    });
    form.append(heading);

    // need to call validate before adding rules one by one. Alternative to adding all rules at once
    this.$el.append(form);
    var specialFieldsClassRegex = new RegExp('\\s(address|shortname)\\s');
    form.validate({
      highlight: function(element, errorClass, validClass) {
        var el = $(element);
        el.addClass(errorClass).removeClass(validClass);

        var container = el.closest('.field_container');
        container.addClass(errorClass).removeClass(validClass);
      },
      unhighlight: function(element, errorClass, validClass) {
        var el = $(element);
        el.addClass(validClass).removeClass(errorClass);

        var container = el.closest('.field_container');
        // for address group of fields, only remove error class if there are no other error elements inside
        if (!(' ' + container.attr('class') + ' ').match(specialFieldsClassRegex) || container.find('input.error,select.error').length === 0) {
          container.addClass(validClass).removeClass(errorClass);
        }
      },
      errorPlacement: function(error, element) {
        var el = $(element);
        var container = el.closest('.field_container');
        if ( !! (' ' + container.attr('class') + ' ').match(specialFieldsClassRegex)) { // append after element
          element.after(error);
        } else {
          error.appendTo(container);
        }
      }
    });

    this.model.pages.each(function(page, index) {
      self.pages.push(new PageView({
        parentEl: form,
        // pass in form for adding sub views
        parentView: self,
        model: page
      }));
    });

    // add action bar view
    self.action_bar = new ActionBarView({
      parentEl: this.$el,
      parentView: self,
      model: this.model
    });

    // Show steps view?
    if (this.model.pages.length > 1) {
      self.steps = new StepsView({
        parentEl: this.$el,
        parentView: self,
        model: this.model
      });
    }

    // set active page to be the first one
    this.model.pushPage(0);

    this.$el.show();
    this.trigger('visible');
  },

  unrender: function() {
    // remove custom css, if any
    if (this.theme) {
      this.theme.remove();
    }
    this.model.emptyPageHistory();
    this.$el.hide();
  },

  hide: function() {
    this.unrender();
  },

  previousPage: function() {
    // go to previous page in history
    this.model.popPage();
  },

  nextPage: function() {
    // validate current page first
    var currentPage = this.model.get('active_page');
    var nextPage = currentPage;
    var currentPageView = this.pages[currentPage];
    if (currentPageView.isValid()) {
      // check page rules
      var pageRules = currentPageView.checkRules();
      if (pageRules.skipToPage != null) {
        nextPage = parseInt(pageRules.skipToPage, 10) - 1;
      } else {
        nextPage = currentPage + 1;
      }
      nextPage = Math.min(this.pages.length - 1, nextPage); // make sure we don't go past the last page.
      $fh.logger.debug('next page ', currentPage, '=>', nextPage);
      // only change page if page is different
      if (nextPage !== currentPage) {
        this.model.pushPage(nextPage);
      }
    } else {
      this.focusValidation();
    }
  },

  submit: function() {
    // validate last page before submitting
    var currentPage = this.model.get('active_page');
    var currentPageView = this.pages[currentPage];
    if (currentPageView.isValid()) {
      this.savePending();
    } else {
      this.focusValidation();
    }
    this.clearFieldChanged();
  },

  focusValidation: function() {
    var first_container = this.$el.find('.field_container.error:first');
    var offset = first_container.offset().top - parseInt($('html').css('paddingTop'), 10);

    $('html, body').animate({
      scrollTop: offset
    }, 500, function() {
      $('input,select,textarea', first_container).focus();
    });
  },

  saveDraft: function() {
    var id = this.model.id;
    _(App.collections).forEach(function(collection) {
      var matched_model = collection.get(id);
      if (matched_model) {
        matched_model.destroy();
      }
    });

    this.clearFieldChanged();
    this.model.load(function (err,actual){
      var clone = actual.toJSON();
      delete clone.error;
      App.collections.drafts.create(clone);
      App.views.header.showDrafts();
    });
  },

  savePending: function() {
    var id = this.model.id;
    _(App.collections).forEach(function(collection) {
      var matched_model = collection.get(id);
      if (matched_model) {
        matched_model.destroy();
      }
    });

    this.clearFieldChanged();

    this.model.load(function (err,actual){
      var clone = actual.toJSON();
      delete clone.error;
      App.collections.pending_submitting.create(clone);
      App.views.header.showPending();
    });
  },

  showAlert: function(message, type, timeout) {
    alert("type ::" + type + " :: message :: " + message);
  },

  activePageChange: function(model, pageIndex) {
    // active page changed, show/hide pages accordingly
    _(this.pages).forEach(function(page, index) {
      if (index === pageIndex) {
        page.show();
      } else {
        page.hide();
      }
    });

  },

  showField: function(id) {
    // call hideField on all pages as field should exist in one
    _(this.pages).forEach(function(page, index) {
      page.showField(id);
    });
  },

  hideField: function(id) {
    // call hideField on all pages as field should exist in one
    _(this.pages).forEach(function(page, index) {
      page.hideField(id);
    });
  }
});
/**
 * SentView is required so that the sent items does not get cleared when drafts of sent items are created or
 * when sent items are resubmitted
 *
 * @type {*}
 */
SentView = DraftView.extend({

  hasFieldChanged: function () {
    return false;
  },

  /**
   * clone the current sent item but remove the id so that a
   * new draft instance is created
   */
  saveDraft: function() {
    this.model.load(function (err,actual){
      var clone = actual.toJSON();
      delete clone.id;
      delete clone.Entry;
      delete clone.error;
      App.collections.drafts.create(clone);
      App.views.header.showDrafts();
    });
  },

  /**
   * clone the current sent item but remove the id so that a
   * new pending instance is created
   */
  savePending: function() {
    this.model.load(function (err,actual){
      var clone = actual.toJSON();
      delete clone.id;
      delete clone.error;
      App.collections.pending_submitting.create(clone);
      App.views.header.showPending();
    });
  }

});
App.Router = Backbone.Router.extend({

  /*

  Known unsupported rules/validation
  - text ranges i.e. 'Range' option e.g. input text/words must be between 1 & 4 long (rules n/a via api or rules json)
  - number ranges i.e. 'Range' option e.g. number value/digits must be between 2 & 8 (rules n/a via api or rules json)
  - matchtype all for rule builder config i.e. Operatior AND to specify multiple conditions before a rule is triggered (TODO)
  - form rules i.e. show message/send email/redirect to website depending on field condition/s (no plans to implement this)
  - file field/ submission size limits i.e. http://help.wufoo.com/app/answers/detail/a_id/5751#file
  - other field size limits e.g. text field 255 character limit

  NOTES:
  - despite all validation rules not being supported, a fallback is in place to highlight validation errors passed back
    from a bad submit to wufoo. Although these errors show which fields are in an error state, they cannot be
    programatically validated on the client, and would required another submit of the form.
  - money field type is n/a via api e.g. $ or €
  - various form settings have not been considered for addition e.g. Captcha 'Limit Activity' option
  - to do a lot of the items above it would probably be necessary to 'read' the FORM_JSON global from
    the form builder page i.e. https://<company>.wufoo.com/build/<form_name>/ (this info n/a from api)

  */

  routes: {
    "form_list": "form_list",
    "*path": "form_list" // Default route
  },

  initialize: function () {
    _.bindAll(this);
  },

  form_list: function() {

    $fh.logger.debug('route: form_list');
    this.loadingView = new LoadingCollectionView();
    this.loadingView.show("App Starting");

    App.views.form_list = new FormListView();
    App.views.drafts_list = new DraftListView();
    App.views.pending_list = new PendingListView();
    App.views.sent_list = new SentListView();
    App.views.settings = new SettingsView();
    App.views.header = new HeaderView();
    App.views.header.showHome();

    // store error handling
    _(App.collections).forEach(function (collection) {
      collection.on('error', function (collection, msg , options) {
        $fh.logger.error('collection error:\"' + msg + '\"');
      });
      collection.store.on('error', function (msg) {
        $fh.logger.error('collection store error: msg=\"' + msg + '\"');
      });
    });

    $fh.ready({},this.onReady);
  },

  onReady: function() {
    this.loadingView.show("App Ready, Loading form list");

    $fh.env(this.onPropsRead);
    App.config.on('config:loaded', this.onConfigLoaded);
    App.config.loadConfig();

    // by default, allow fetching on resume event.
    // Can be set to false when taking a pic so refetch doesn't happen on resume from that
    App.resumeFetchAllowed = true;
    document.addEventListener("resume", this.onResume, false);
    var banner = false;
    $fh.logger.info("    Starting : " + new moment().format('HH:mm:ss DD/MM/YYYY'));
    $fh.logger.info(" ======================================================");
    $('#fh_wufoo_banner .list li').each(function(i , e) {
      $fh.logger.info(" = " + $(e).text());
      banner = true;
    } );
    if(!banner) {
      $fh.logger.info(" = Dev Mode ");
    }

    $fh.logger.info(" ======================================================");
  },

  // run App.router.onResume() to test this in browser
  onResume: function() {
    // only trigger resync of forms if NOT resuming after taking a photo
    if (App.resumeFetchAllowed) {
      $fh.logger.debug('resume fetch in background');
      // Re-fetch on resume
      // NOTE: was originally showing loading view and progress while resyncing after resume.
      //       Not any more. We'll let it happen in background so UI isn't blocking
      // var loadingView = new LoadingCollectionView();
      // loadingView.show("Loading form list");
      App.collections.forms.store.force(); // do a clear to force a fetch
      App.collections.forms.fetch();
    } else {
      $fh.logger.debug('resume fetch blocked. resetting resume fetch flag');
      // reset flag to true for next time
      App.resumeFetchAllowed = true;
    }
  },

  pending: function() {
    $fh.logger.debug('route: pending');
  },

  onConfigLoaded: function() {
    this.loadingView.show("Config Loaded , fetching forms");
    // to enable debug mode: App.config.set('debug_mode', true);

    App.config.on('change:debug_mode', this.onDebugModeChanged);
    App.config.on('change:white_list', this.onWhitelistChanged);
    App.config.on('change:logger', this.onLoggerChanged);
    App.config.on('change:max_retries', this.onRetriesChanged);
    App.config.on('change:defaults', this.onDefaultsChanged);
    App.config.on('change:timeout', this.onTimeoutChanged);

    this.fetchCollections("Config Loaded , fetching forms");
  },

  reload: function() {
    App.collections.forms.reset();
    this.fetchCollections("reloading forms");
  },

  fetchCollections: function(msg,to) {
    this.loadingView.show(msg);
    this.fetchTo = setTimeout(this.fetchTimeout,_.isNumber(to) ? to : 20000);

    App.collections.forms.fetch();
    App.collections.drafts.fetch();
    App.collections.sent.fetch();
    App.collections.pending_submitting.fetch();
    App.collections.pending_waiting.fetch();
    App.collections.pending_review.fetch();
  },

  fetchTimeout: function() {
    clearTimeout(this.fetchTo);
    this.fetchTo= null;
    this.loadingView.hide();
    App.resumeFetchAllowed = false;
    this.fullyLoaded = true;
    this.onResume();
  },

  onPropsRead: function(props) {
    this.props = props;
    App.views.about = new AboutView(props);
  },

  onTimeoutChanged: function() {
    var timeout= App.config.getValueOrDefault("timeout");
    if (_.isNumber(timeout)) {
      $fh.ready({}, function(){
        $fh.logger.debug("Setting timeout to " + timeout + " seconds");
        $fh.fh_timeout=timeout * 1000;
      });
    }
  },

  onLoggerChanged: function() {
    var logger = App.config.getValueOrDefault("logger");
    $('#logger').toggle(logger);
  },

  onRetriesChanged: function() {
    var max_retries = App.config.getValueOrDefault("max_retries");
    $fh.retry.toggle(max_retries > 1);
  },

  onDebugModeChanged: function() {
    var debug_mode = App.config.getValueOrDefault("debug_mode");
    $('#debug_mode').toggle(debug_mode);
  },

  onWhitelistChanged: function() {
    var white_list = App.config.getValueOrDefault("white_list") || [];
    var listed = _.find(white_list, function(m){ return this.props.uuid.match(Utils.toRegExp(m)); },this);
    // on start up the setting icon may not be rendered yet
    setTimeout(function (){$('a.settings').toggle(!!listed);},500);
  },

  onDefaultsChanged: function() {
    this.onLoggerChanged();
    this.onTimeoutChanged();
    this.onWhitelistChanged();
  }
});

App.router = new App.Router();
Backbone.history.start();