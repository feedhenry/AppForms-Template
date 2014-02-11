/*! FeedHenry-App-Forms-App-Generator - v0.3.10 - 2014-02-11
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
    self.set($fh.forms.config.props);
    self.trigger("config:loaded");
  //   // TODO : check if there is a better way of ensuring fh.data has been monkey patched
  //   overrideFHData();
  //   //initialise config
  //   $fh.data({
  //     act: 'load',
  //     key: 'client_config'
  //   }, function (res) {
  //     try {
  //       $fh.logger.info('ConfigModel :: loaded=' + res.val);
  //       if (res && res.val !== null) {
  //         try {
  //           // overwrite config with whats in local storage. May be overwritten again by initial act, depending on local storage vs. act call time.
  //           $fh.logger.debug('ConfigModel :: loaded=' + res.val);
  //           var read =JSON.parse(res.val);
  //           self.set(read);
  //         } catch(e) {
  //           //log error, but no action
  //           $fh.logger.error('ERROR: parsing config from local storage. Using config defaults:', e);
  //         }
  //       } else {
  //         $fh.logger.warn('No config in local storage. Using config defaults');
  //       }
  //     } finally {
  //       self.trigger("config:loaded");
  //     }
  //   }, function (msg,err) {
  //     try {
  //       $fh.logger.info('ConfigModel :: error msg=' + msg, "err=" , err);
  //     } finally {
  //       self.trigger("config:loaded");
  //     }
  //   } );
  }
});

App.config = new ConfigModel();
FormModel = Backbone.Model.extend({
  idAttribute: 'Hash',
  sync: function(method,model,options){
    if (method == "read"){
      this.loadForm();
    }else{

    }
  },
  defaults: {
    "Theme": "",
    "Pages": [],
    "Rules": [],
    "active_page": null,
    "page_history": []
  },
  loadForm:function(){
    var formId=this.get("formId");
    var self=this;
    $fh.forms.getForm({
      "formId":formId
    },function(err,form){
        if (err){
          self.trigger("error",err);
        }else{
          self.coreModel=form;
          self.trigger("change:fh_full_data_loaded");
          self.set("fh_full_data_loaded",true);
          self.id=formId;
        }
    }); 
  },
  get:function(key){
      var res=Backbone.Model.prototype.get.apply(this,arguments);
      if (res && res !== ""){
        return res;
      }else if (this.coreModel){
        return this.coreModel.get(key);
      }else{
        return res;
      }
  },
  initialize: function() {
    _.bindAll(this);

    // this.initPages();

    // if model changes, re-initialise sub-collection of pages
    this.bind('change', this.reInitPages, this);
    this.on('change:page_history', function(model, history) {
      model.set('active_page', _(history).last());
    });
  },

  // load: function(cb) {
  //   if (this.get("flyweight")) {
  //     var ctor = this.model || this.collection.model;
  //     var store = this.store || this.collection.store;
  //     store._read(this.id, function(err, resp) {
  //       var model = (err ? null : new ctor(resp));
  //       cb(err, model);
  //     });
  //   } else {
  //     cb(null, this);
  //   }
  // },

  // reInitPages: function() {
  //   this.initPages();
  // },

  // initPages: function() {
  //   var pages = this.get('Pages');
  //   this.pages = new Pages(pages);
  // },

  // pushPage: function(page) {
  //   this.attributes.page_history.push(page);
  //   // manually trigger change event as we're modifying an array
  //   this.trigger('change:page_history', this, this.attributes.page_history);
  // },

  // popPage: function() {
  //   this.attributes.page_history.pop();
  //   // manually trigger change event as we're modifying an array
  //   this.trigger('change:page_history', this, this.attributes.page_history);
  // },

  // emptyPageHistory: function() {
  //   this.attributes.page_history = [];
  //   this.attributes.active_page = null;
  // },

  // toJSON: function() {
  //   var self = this;
  //   var form = Backbone.Model.prototype.toJSON.apply(this, arguments);
  //   form.Pages = self.pages.toJSON();
  //   return form;
  // },

  // getTimeout: function(millis) {
  //   var timeout = App.config.getValueOrDefault('timeout') || ($fh.legacy.fh_timeout / 1000);
  //   if (millis) {
  //     timeout = timeout * 1000;
  //   }
  //   return timeout;
  // },

  handleError: function(e, cb) {
    var type = e.msg || "unknown";
    var err = e.err;
    var msg;
    $fh.logger.debug("handleError" + Utils.truncate(e, 150));
    if (type === "error_ajaxfail") {

      msg = "Unexpected Network Error : "; // + (err ? err.error : "");
      if (!err.error || err.error.length === 0 || err.error === "\"error\"") {
        if (err.message && err.message.length !== 0) {
          msg += err.message;
        } else {
          msg += "Unknown";
        }
      } else {
        msg += "Unknown";

      }
      AlertView.showAlert({
        text: msg
      }, "error", 5000);
      return cb({
        error: msg,
        type: "network"
      }, msg);
    }

    if (type === "validation") {
      msg = "Form Validation Error : " + (err ? err : "please fix the errors");
      AlertView.showAlert({
        text: msg
      }, "error", 5000);
      return cb({
        error: msg,
        type: "validation"
      }, e.res || msg);
    }

    if (type === "offline") {
      msg = err || "You are currently offline";
      AlertView.showAlert({
        text: msg
      }, "error", 5000);
      return cb({
        error: msg,
        type: "network"
      }, msg);
    }

    if (type === "network") {
      msg = "Network Error : " + (err || JSON.stringify(e));
      AlertView.showAlert({
        text: msg
      }, "error", 5000);
      return cb({
        error: type,
        type: "network"
      });
    }

    msg = "Unknown Error : " + JSON.stringify(e);
    AlertView.showAlert({
      text: msg
    }, "error", 5000);
    return cb({
      error: msg,
      type: "unknown"
    }, msg);
  }

  // toBytes: function(len) {
  //   var size = len + " bytes";
  //   if (len > 1024) {
  //     size = (Math.floor((len / 1024) * 1000) / 1000) + " Kilo bytes";
  //   }
  //   return size;
  // },

  // /**
  //  * poll the request, function will poll for up timeout seconds every second
  //  *
  //  * @param req memo of the request
  //  * @param form_id the form id
  //  * @param res the results from the tasks
  //  * @param cb
  //  */
  // pollRemoteFormSubmissionComplete: function(req, form_id, res, cb) {
  //   var self = this;
  //   AlertView.showAlert({
  //     text: "Form Submitted to cloud"
  //   }, "success", self.getTimeout(true));
  //   $fh.logger.debug('Form Submitted to cloud: res:' + Utils.truncate(res));
  //   var timeout = this.getTimeout();
  //   var start = Math.floor(Date.now() / 1000);
  //   var complete = false;

  //   async.whilst(
  //     function check() {
  //       var end = Math.floor(Date.now() / 1000);
  //       var delta = end - start;
  //       $fh.logger.debug('pollRemoteFormSubmissionComplete check : delta < timeout=' + delta < timeout);
  //       return delta < timeout;
  //     },
  //     function process(callback) {
  //       setTimeout(function() {
  //         $fh.act({
  //             "act": "pollRemoteFormSubmissionComplete",
  //             "req": {
  //               "form_id": form_id
  //             }
  //           },
  //           function(res) {
  //             $fh.logger.debug('pollRemoteFormSubmissionComplete process : res=' + Utils.truncate(res));
  //             if ((res.Success && res.Success === 1 && (res.stat && res.stat.completedAt)) || res.err) {
  //               return callback(res);
  //             } else {
  //               return callback();
  //             }

  //           },
  //           function onError(msg, err) {
  //             $fh.logger.debug('pollRemoteFormSubmissionComplete failed : res=' + Utils.truncate(msg) + 'err=' + Utils.truncate(err));
  //             return callback();
  //           });
  //       }, 1000);
  //     },
  //     function complete(res) {
  //       $fh.logger.debug('pollRemoteFormSubmissionComplete complete : res=' + Utils.truncate(res));
  //       if (res) {
  //         if (res.Success === 1) {

  //           if (res.stat && res.stat.completedAt) {
  //             AlertView.showAlert({
  //               text: "Form Submission complete"
  //             }, "success", 5000);
  //             cb(null, res);
  //           }
  //         } else if (res.err || res.Error) {
  //           return cb({
  //             err: (res.err || res.Error)
  //           });
  //         }

  //       } else {
  //         console.log("test");
  //       }
  //     }
  //   );
  // },
  // /**
  //  * submitFormBody the form body to the cloud, if there are no file form elements then
  //  * validate form submission can be called immediately
  //  * @param req memo for the request
  //  * @param form the form
  //  * @param callback
  //  */
  // submitFormBody: function(req, form, callback) {
  //   var self = this;
  //   var data = {
  //     "act": "submitFormBody",
  //     "req": form
  //   };
  //   req.total += JSON.stringify(data).length;
  //   var timeout = self.getTimeout(true);

  //   AlertView.showAlert({
  //     text: "Form body : start ",
  //     current: req.size,
  //     total: req.total
  //   }, "success", timeout);
  //   var start = Date.now();
  //   req.to = setTimeout(function() {
  //     $fh.logger.debug("submitFormBody timeout");
  //     clearTimeout(req.to);
  //     delete req.to;
  //     req.error = {
  //       msg: "network",
  //       err: "timeout"
  //     };
  //     callback({
  //       msg: "network",
  //       err: "timeout"
  //     });

  //   }, timeout + 1000);

  //   $fh.act(data, function(res) {
  //     clearTimeout(req.to);
  //     delete req.to;

  //     var end = Date.now();
  //     $fh.logger.debug("submit res=" + Utils.truncate(res));
  //     if (res.Success && res.Success === 1) {
  //       var json = JSON.stringify(data);
  //       req.size += json.length;
  //       AlertView.showAlert({
  //         text: "Form body : complete",
  //         current: req.size,
  //         total: req.total
  //       }, "success", timeout);
  //       callback(null, {
  //         name: "submitFormBody",
  //         start: start,
  //         end: end,
  //         size: req.size
  //       });
  //     } else {
  //       callback({
  //         msg: "validation",
  //         err: "Please fix the highlighted errors",
  //         res: res
  //       });
  //     }
  //   }, function(msg, err) {
  //     clearTimeout(req.to);
  //     delete req.to;

  //     $fh.logger.debug("submitFormBody failed : msg='" + Utils.truncate(msg) + "' err='" + Utils.truncate(err, 150) + "'");
  //     callback({
  //       msg: msg,
  //       err: err
  //     });
  //   });

  // },

  // /**
  //  * submit a file chunk to the cloud
  //  * @param req memo for form sumission
  //  * @param chunk e.g. {form_id:form_id, "name":name,"value":value , "size":value.length};
  //  * @param callback
  //  */
  // submitChunk: function(req, chunk, callback) {
  //   var self = this;
  //   $fh.logger.debug("submitChunk starting form[" + chunk.form_id + "][" + chunk.name + "]");
  //   var value = chunk.value;
  //   var len = value.fileBase64.length;
  //   var timeout = self.getTimeout(true);
  //   req.current_chunk += 1;
  //   var title = "Field " + req.current_chunk + " of " + req.num_chunks;
  //   //AlertView.showAlert({text : "Chunk[field=" + chunk.name + "] started", current : req.size, total : req.total}, "success", timeout);
  //   AlertView.showAlert({
  //     text: (title + " started"),
  //     current: req.size,
  //     total: req.total
  //   }, "success", timeout);

  //   $fh.logger.debug("submitChunk starting value=" + Utils.truncate(value, 50));
  //   $fh.act({
  //     "act": "submitChunk",
  //     "retries": App.config.getValueOrDefault("max_retries"),
  //     "req": chunk
  //   }, function onSuccess(res) {
  //     $fh.logger.debug("submitChunk starting form[" + chunk.form_id + "][" + chunk.name + "] res='" + Utils.truncate(res) + "'");
  //     if (res.Success && res.Success === 1) {
  //       req.size += len;
  //       AlertView.showAlert({
  //         text: (title + " complete"),
  //         current: req.size,
  //         total: req.total
  //       }, "success", timeout);
  //       return callback(null, res);
  //     } else {
  //       return callback({
  //         err: 'unknown',
  //         msg: JSON.stringify(res)
  //       }, res);
  //     }
  //   }, function onError(msg, err) {
  //     $fh.logger.debug("submitChunk starting form[" + chunk.form_id + "][" + chunk.name + "] msg='" + Utils.truncate(msg) + "' err='" + Utils.truncate(err) + "'");
  //     return callback({
  //       msg: msg,
  //       err: err
  //     });
  //   });
  // },

  // /**
  //  * confirm with the cloud server that the form is all in place
  //  * @param req the form request memo
  //  * @param form_id the id of the form
  //  * @param callback
  //  */
  // validateFormTransmission: function(req, form_id, callback) {
  //   var self = this;
  //   var data = {
  //     "act": "validateFormTransmission",
  //     "req": {
  //       form_id: form_id
  //     }
  //   };
  //   var start = Date.now();
  //   var timeout = self.getTimeout(true);
  //   $fh.logger.debug("validateFormTransmission [" + form_id + "] started");
  //   AlertView.showAlert({
  //     text: "Form check started ",
  //     current: req.total,
  //     total: req.total
  //   }, "success", timeout);
  //   $fh.act(data, function(res) {
  //     var end = Date.now();
  //     $fh.logger.debug("submit res=" + Utils.truncate(res));
  //     if (res.Success && res.Success === 1) {
  //       AlertView.showAlert({
  //         text: "Form check complete",
  //         current: req.total,
  //         total: req.total
  //       }, "success", timeout);
  //       return callback(null, {
  //         name: "validateFormTransmission",
  //         start: start,
  //         end: end,
  //         size: req.size
  //       });
  //     } else {
  //       return callback({
  //         msg: "validation",
  //         err: "Please fix the highlighted errors",
  //         res: res
  //       });
  //     }
  //   }, function onError(msg, err) {
  //     $fh.logger.debug("validateFormTransmission [" + form_id + "] failed msg='" + Utils.truncate(msg) + "' err='" + Utils.truncate(err) + "'");
  //     return callback({
  //       msg: msg,
  //       err: err
  //     });
  //   });
  // },

  // /**
  //  * tell the cloud to submit the request to wufoo (you should have called validateFormTransmission first)
  //  * @param req the memo for the form submission
  //  * @param form_id the form id
  //  * @param callback
  //  */
  // doRemoteFormSubmission: function(req, form_id, callback) {
  //   var self = this;
  //   var data = {
  //     "act": "doRemoteFormSubmission",
  //     "req": {
  //       form_id: form_id
  //     }
  //   };
  //   var start = Date.now();
  //   $fh.logger.debug("doRemoteFormSubmission[" + form_id + "] started");
  //   AlertView.showAlert({
  //     text: "Remote form submission: started"
  //   }, "success", 5000);
  //   $fh.act(data, function(res) {
  //     var end = Date.now();
  //     $fh.logger.debug("submit res=" + Utils.truncate(res));
  //     if (res.Success && res.Success === 1) {
  //       AlertView.showAlert({
  //         text: "Remote form submission: complete"
  //       }, "success", 5000);
  //       return callback(null, {
  //         name: "doRemoteFormSubmission",
  //         start: start,
  //         end: end,
  //         size: req.total
  //       });
  //     } else {
  //       return callback({
  //         msg: "validation",
  //         err: "Please fix the highlighted errors",
  //         res: res
  //       });
  //     }
  //   }, function onError(msg, err) {
  //     $fh.logger.debug("doRemoteFormSubmission[" + form_id + "] failed msg='" + Utils.truncate(msg) + "' err='" + Utils.truncate(err) + "'");
  //     return callback({
  //       msg: msg,
  //       err: err
  //     });
  //   });
  // },

  // /**
  //  * split the current form into separate, ordered tasks that can be executed serially :
  //  * The tasks are :
  //  *   - submitFormBody (once only and bound to the req, form)
  //  *   - submitChunk (0 or more , bound to the req, chunk)
  //  *   - validateFormTransmission (once only and bound to the req, form id)
  //  *
  //  * @param req a memo object for this submission
  //  * @param form the serialized form
  //  * @return an array of tasks
  //  */
  // splitFormIntoTasks: function(req, form) {
  //   $fh.logger.debug("splitFormIntoTasks starting");
  //   var self = this;
  //   var tasks = [];
  //   var serialized_form = form.data;
  //   var form_id = req.form_id;
  //   if (App.config.getValueOrDefault("use_chunking")) {
  //     _.each(serialized_form, function chunkHandler(value, name) {
  //       if (_.isObject(value) && !_.isUndefined(value.filename)) {
  //         var str = JSON.stringify(value);
  //         var size = str.length;
  //         $fh.logger.debug("field name=" + name + ",value=" + Utils.truncate(str) + ",size=" + size);
  //         req.max = Math.max(req.max, size);
  //         req.chunks.push({
  //           name: name,
  //           size: size
  //         });
  //         req.total += size;
  //         var chunk = {
  //           form_id: form_id,
  //           "name": name,
  //           "value": value,
  //           "size": size
  //         };
  //         serialized_form[name] = {
  //           content_type: "ref",
  //           form_id: form_id,
  //           name: name
  //         };
  //         var func = async.apply(self.submitChunk, req, chunk);
  //         func.name = name;
  //         tasks.push(func);
  //       }
  //     });
  //   }
  //   req.num_chunks = req.chunks.length;
  //   req.current_chunk = 0;
  //   // NOTE : put first task at start of array
  //   tasks.unshift(async.apply(this.submitFormBody, req, form));

  //   tasks.push(async.apply(this.validateFormTransmission, req, form_id));

  //   $fh.logger.debug("splitFormIntoTasks complete tasks.length=" + tasks.length);
  //   return tasks;
  // },

  // /**
  //  * submit the current form :
  //  *
  //  * Algorithm works some thing like :
  //  *
  //  *   generate a form_id (from the form hash , form.id , device uuid)
  //  *   FOR each file element in the the form
  //  *     remove the current file element and add a reference in its place
  //  *     add a task to the list for this form element containing the form_id and element field name
  //  *   start a timer
  //  *   Submit the form keyed on the form id
  //  *   IF submission failed
  //  *     inform the user user and exit
  //  *   ELSE submission succeeded
  //  *     stop the timer and calculate KBps
  //  *     FOR each task in the list
  //  *       execute the task to submit the form element
  //  *       IF task fails
  //  *         inform the user of failure and exit
  //  *     IF !cloud.validateFormTransmission form_id
  //  *       inform the user of failure and exit
  //  *     IF !cloud.doRemoteFormSubmission form_id
  //  *       inform the user of failure and exit
  //  *     start timer
  //  *     WHILE !timer timed out
  //  *       IF cloud.pollRemoteFormSubmissionComplete form_id
  //  *         inform the user of success and exit
  //  *
  //  *     inform the user of timeout and exit (note, in this case since the submission has started, it is still possible to manual poll the request)
  //  *
  //  * @param cb callback called on completion
  //  */
  // submit: function(cb) {
  //   var self = this;
  //   $fh.env({}, function(props) {
  //     Utils.isOnline(function(online) {
  //       if (online) {
  //         var serialized_form = self.serialize();
  //         var form_hash = self.attributes.Hash;
  //         var form_id = [form_hash, props.uuid, self.id].join("/");
  //         var form = {
  //           "form_hash": form_hash,
  //           "form_id": form_id,
  //           "data": serialized_form
  //         };
  //         var req = {
  //           start: Date.now(),
  //           size: 0,
  //           total: 0,
  //           max: -1,
  //           chunks: [],
  //           form_id: form.form_id
  //         };
  //         var tasks = self.splitFormIntoTasks(req, form);
  //         async.series(tasks, function(err, results) {
  //           if (err) {
  //             return self.handleError(err, cb);
  //           }
  //           self.doRemoteFormSubmission(req, form_id, function handleResponse(err) {
  //             if (err) {
  //               return self.handleError(err, cb);
  //             }
  //             self.pollRemoteFormSubmissionComplete(req, form_id, results, cb);
  //           });
  //         });
  //       } else {
  //         self.handleError({
  //           msg: "offline",
  //           err: "Unable to submit the form : you are currently offline"
  //         }, cb);
  //       }
  //     });
  //   });
  // },

  // serialize: function() {
  //   var self = this;
  //   var serialized_form = {};
  //   self.pages.each(function(page) {
  //     $.extend(serialized_form, page.serialize());
  //   });
  //   return serialized_form;
  // }

});

FormsCollection = Backbone.Collection.extend({
  model: FormModel,
  sync: function(method, collection, options) {
    var self = this;
    if (method == "read") {
      $fh.forms.getForms({
        fromRemote:true
      }, function(err, formList) {
        if (err) {
          self.trigger("error", err.getMessage());
          options.error(err);
        } else {
          var count=formList.size();
          var formIdArr=[];
          for (var i=0;i<formList.size();i++){
            var formId=formList.getFormIdByIndex(i);
            formIdArr.push({formId:formId});
          }
          options.success(formIdArr);
        }
      });
    }
  }
});

App.collections.forms = new FormsCollection();
SubmissionModel = Backbone.Model.extend({
    sync: function(method, model, options) {
        var self = this;
        if (method == "read") {
            this.loadSubmission(this.submissionMeta, function(err, sub) {});
        } else if (method == "delete") {
            this.coreModel.clearLocal(function() {});
        } else {

        }

    },
    loadSubmission: function(submissionMeta, cb) {
        var self = this;
        $fh.forms.getSubmissions({}, function(err, subList) {
            subList.getSubmissionByMeta(submissionMeta, function(err, submission) {
                if (err) {
                    self.trigger("error", err);
                } else {
                    self.coreModel = submission;
                    self.id = submission.getLocalId();
                }
                self.initModel();
                self.trigger("change");
                cb(err, submission);
            });
        });
    },
    initModel: function() {
        var coreModel = this.coreModel;
        var self = this;
        coreModel.on("inprogress", function(ut) {
            self.refreshAllCollections();
            AlertView.showAlert({
                "text": "Form submission started."
            }, "success", 5000);
            ut.on("progress", function(progress) {

                AlertView.showAlert({
                    "text": "Progress",
                    "current": progress.uploaded,
                    "total": progress.totalSize
                }, "success", 5000);
            });
        });
        coreModel.on("submitted", function(err) {
            if (!err) {
                AlertView.showAlert({
                    "text": "Form submission submitted."
                }, "success", 5000);
            } else {
                AlertView.showAlert({
                    "text": "Failed:" + err
                }, "success", 5000);
            }
            self.refreshAllCollections();
        });
        coreModel.on("submit", function() {
            self.refreshAllCollections();
        });
    },
    refreshAllCollections: function() {
        refreshSubmissionCollections();
    },
    get: function(key) {
        var res = Backbone.Model.prototype.get.apply(this, arguments);
        if (res && res !== "") {
            return res;
        } else if (this.coreModel) {
            return this.coreModel.get(key);
        } else {
            return res;
        }
    },
    initialize: function(submissionMeta, options) {

        var self = this;
        this.submissionMeta = submissionMeta;
        this.loadSubmission(submissionMeta, function(err, sub) {});
    }
});
SubmissionCollection = Backbone.Collection.extend({
    model: SubmissionModel,
    status: null,
    initialize: function() {
        Backbone.Collection.prototype.initialize.apply(this, arguments);
    },
    getSubmissionList: function(cb) {
        var self = this;
        $fh.forms.getSubmissions({}, function(err, subList) {
            console.log(self.status);
            if (err) {
                console.log(err);
                cb(err);
            } else {
                var status = self.status;
                var submissions = subList.getSubmissions();
                if (status) {
                    submissions = subList.findByStatus(status);
                }
                self.coreModel = subList;
                cb(null, submissions);
            }
        });
    },
    sync: function(method, collection, options) {
        if (method == "read") {
            this.getSubmissionList(function(err, submissions) {
                if (err) {
                    options.error(err);
                } else {
                    options.success(submissions);
                }

            });
        }
    }
});

SentModel = SubmissionModel.extend({
});

SentCollection = SubmissionCollection.extend({
  status:"submitted",
  model: SentModel
});
PendingModel = SubmissionModel.extend({

});

PendingWaitingCollection = SubmissionCollection.extend({
  status: "pending"
});
PendingSubmittingCollection = SubmissionCollection.extend({
  status: "inprogress"
});

PendingReviewCollection = SubmissionCollection.extend({
  status: "error"
});

DraftModel = SubmissionModel.extend({
});

DraftsCollection = SubmissionCollection.extend({
  model: DraftModel,
  status:"draft"
});


App.collections.drafts = new DraftsCollection();
App.collections.pending_submitting = new PendingSubmittingCollection();
App.collections.sent = new SentCollection();
App.collections.pending_review = new PendingReviewCollection();
App.collections.pending_waiting = new PendingWaitingCollection();

function refreshSubmissionCollections() {

    App.collections.drafts.fetch();
    App.collections.sent.fetch();
    App.collections.pending_submitting.fetch();
    App.collections.pending_waiting.fetch();
    App.collections.pending_review.fetch();
}
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
    form_button: '<li><button class="show button-block <%= enabledClass %> <%= dataClass %> fh_appform_button_navigation"><%= name %><div class="loading"></div></button></li>'
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
      name: this.model.get("name"),
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
    App.views.header.hideAll();
    App.views.form=new FormView({
      "parentEl":$("#fh_wufoo_content"),
      "form":this.model.coreModel,
      "autoShow":true
    });
   
  },

  fetch: function() {
    // show loading view
    var loadingView = new LoadingView(this.model);
    loadingView.show('Syncing form');
    this.model.fetch();
  }
});
$fh.ready({}, function() {
    FormView = $fh.forms.backbone.FormView.extend({
        initialize: function(params) {
            $fh.forms.backbone.FormView.prototype.initialize.apply(this, arguments);
            var self = this;

            this.loadForm(params, function() {
                self.submission.on("savedraft", function(submission) {
                    App.views.header.showDrafts(true);
                    App.views.form = null;
                    refreshSubmissionCollections();
                });
                self.submission.on("submit", function() {
                    App.views.header.showPending(true);
                    App.views.form = null;
                    refreshSubmissionCollections();
                });
                self.submission.on("progress", function(progress){
                  console.log("PROGRESS", progress, this);
                });
                self.submission.on("submitted", function(){
                  console.log("SUBMITTED", this);
                });
                self.submission.on("error", function(errorMessage){
                  console.log("ERROR", errorMessage);
                });
                self.submission.on("inprogress", function(uploadTask){
                  console.log("READY FOR UPLOAD ", this, uploadTask);
                });
                self.trigger("loaded");
                if (params.autoShow) {
                    self.el.show();
                }
                self.render();
            });
        }
    });
});

var FormListView = Backbone.View.extend({
  el: $('#fh_wufoo_form_list'),

  events: {
    'click .settings': 'showSettings',
    'click button.reload': 'reload'
  },

  templates: {
    list: '<ul class="form_list"></ul>',
    header: '<div class="fh_appform_title">Your Forms</div><div class="fh_appform_description">Choose a form from the list below</div>',
    error: '<li><button class="reload button-block <%= enabledClass %> <%= dataClass %>"><%= name %><div class="loading"></div></button></li>',
    footer: '<a class="about fh_appform_title" href="#fh_wufoo_banner"><i class="fa fa-info-circle"></i></a><a class="settings hidden"></a><br style="clear:both;">'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'appendForm');
    this.views = [];

    App.collections.forms.bind('reset', function(collection, options) {
      if (options == null || !options.noFetch) {
        $fh.logger.debug('reset forms collection');
        App.collections.forms.each(function(form) {
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

  show: function() {
    App.views.header.markActive('.fh_wufoo_home');
    $(this.el).show();
  },

  hide: function() {
    $(this.el).hide();
  },

  renderErrorHandler: function(msg) {
    try {
      if (msg == null || msg.match("error_ajaxfail")) {
        msg = "An unexpected error occurred.";
      }
    } catch (e) {
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

    if (App.collections.forms.models.length) {
      // Add header
      $('ul', this.el).append(this.templates.header);
      _(App.collections.forms.models).forEach(function(form) {
        this.appendForm(form);
      }, this);
    } else if(App.collections.forms.models.length === 0){
      this.renderErrorHandler("No forms exist for this app.");
    } else {
      this.renderErrorHandler(arguments[1]);
    }
    this.$el.append(this.templates.footer);
  },

  appendForm: function(form) {
    var view = new ShowFormButtonView({
      model: form
    });
    this.views.push(view);
    $('ul', this.el).append(view.render().el);
  },

  showSettings: function() {
    App.views.header.showSettings();
  },

  showAbout: function() {
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
    sent_list: '<ul class="fh_appform_field_area list inset sent_list"></ul>',
    sent_header: '<li class="list-divider fh_appform_field_title">Sent Submissions</li>',
    dismiss_all: '<li><button class="fh_appform_button_cancel dismiss-all button button-main button-block">Dismiss All</button></li>',
    save_max: '<li><label for="sentSaveMax" class="fh_appform_field_title">Number of sent items to keep</label><select class="fh_appform_field_input" id="sentSaveMax"><option value="5">5</option><option value="10">10</option><option value="15">15</option><option value="20">20</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select></li>'
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
    draft_list: '<ul class="fh_appform_field_area list inset draft_list"></ul>',
    draft_header: '<li class="list-divider"><div class="fh_appform_field_title">Draft Submissions</div></li>'
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
ItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'fh_appform_field_input pending_submission',
  events: {
    'click button.delete-item': 'delete',
    'click button.submit-item': 'submit',
    'click': 'show'
  },

  templates: {
    item_failed: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Submitted At: <br/><%= timestamp %></span><br/><span class="pending_review_type fh_appform_error <%= error_type %>"><%= error_message %></span><button class="button fh_appform_button_cancel button-negative delete-item first_button">Delete</button><button class="button fh_appform_button_action button-positive submit-item second_button">Retry</button><span class="chevron"></span>',
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts"><%= timestamp %></span><button class="button fh_appform_button_cancel button-negative delete-item first_button">Delete</button><button class="button fh_appform_button_action button-positive submit-item second_button">Submit</button><span class="chevron"></span>'
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
    if (this.model.get("Entry") && this.model.get("Entry").EntryId) {
      return "App Forms Id : " + this.model.get("Entry").EntryId;
    }
    if (this.model.idValue) {
      return this.model.idValue;
    }
    if (this.model.id) {
      return this.model.id.split(/-/)[0];
    }
    return "new";
  },

  render: function() {
    var time = new moment(this.model.get('savedAt')).format('HH:mm:ss DD/MM/YYYY');
    var error = this.model.get('error');
    var template = this.templates.item;
    if (error && this.templates.item_failed) {
      template = this.templates.item_failed;
    }
    var item = _.template(template, {
      name: this.model.get('formName'),
      id: this.getIdText(),
      timestamp: this.getItemTime(),
      error_type: (error && error.type) ? error.type : null,
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
    model.coreModel.upload(function() {});
    // model.load(function (err,actual ){
    //   var json = actual.toJSON();
    //   model.destroy();
    //   App.collections.pending_submitting.create(json);
    // });

    return false;
  },

  unrender: function() {
    $(this.el).remove();
  },

  show: function() {
    
    this.model.load(function(err, actual) {
      var draft = new DraftModel(actual.toJSON());
      App.views.form = new DraftView({
        model: draft
      });
      App.views.form.render();
    });
  }
});
DraftItemView = ItemView.extend({

  templates: {
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts"><%= timestamp %></span><button class="fh_appform_button_cancel button button-negative delete-item second_button">Delete</button><span class="chevron"></span>'
  },

  show: function() {
    App.views.header.hideAll();
    var submission=this.model.coreModel;
    App.views.form=new FormView({
      "parentEl":$("#fh_wufoo_content"),
      "formId":submission.get("formId"),
      "autoShow":true,
      "submission":submission
    });
    // this.model.load(function (err,actual ){
    //   App.views.form = new DraftView({model: new DraftModel(actual.toJSON()) , silent:true});
    //   App.views.form.render();
    // });
  },
  getItemTime:function(){
    return "Saved: "+this.model.get("saveDate");
  },
  getIdText:function(){
    return "FormId: "+this.model.get("formId");
  }
});
PendingReviewItemView = ItemView.extend({
  templates: {
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Submitted At: <br/><%= timestamp %></span><br/><span class="pending_review_type"><%= error_type %></span><button class="button button-negative fh_appform_button_cancel delete-item first_button">Delete</button><button class="button button-positive submit-item second_button">Retry</button><span class="chevron"></span>'
  },
  errorTypes: {
    "validation": "Validation Error. Please review for details.",
    "offline": "Offline during submission. Ok to resubmit",
    "network": "Network issue during submission. Ok to resubmit",
    "timeout": "Form Submission timeout. Please try again later",
    "defaults": "Unknown Error. Please review for details"
  },
  getIdText: function() {
    return "FormId: " + this.model.get("formId");
  },
  getItemTime: function() {
    return "Submit: " + this.model.get("submitDate");
  },
  show: function() {
    App.views.header.hideAll();
    var submission = this.model.coreModel;
    App.views.form = new FormView({
      "parentEl": $("#fh_wufoo_content"),
      "formId": submission.get("formId"),
      "autoShow": true,
      "submission": submission
    });
  },
  render: function() {
    var time = new moment(this.model.get('submitDate')).format('HH:mm:ss DD/MM/YYYY');
    var error = this.model.get('error');
    var item = _.template(this.templates.item, {
      name: this.model.get('formName'),
      id: this.renderId(),
      timestamp: time,
      error_type: (error && error.type && this.errorTypes[error.type]) ? this.errorTypes[error.type] : this.errorTypes.defaults
    });
    $(this.el).html(item);
    return this;
  }
});
PendingWaitingView = ItemView.extend({
  getIdText:function(){
    return "FormId: "+this.model.get("formId");
  },
  getItemTime:function(){
    return "Submit: "+this.model.get("submitDate");
  },
  show: function() {
    // this.model.load(function (err,actual ){
    //   App.views.form = new SentView({model: new DraftModel(actual.toJSON())});
    //   App.views.form.render();
    // });
   App.views.header.hideAll();
    var submission=this.model.coreModel;
    App.views.form=new FormView({
      "parentEl":$("#fh_wufoo_content"),
      "formId":submission.get("formId"),
      "autoShow":true,
      "submission":submission
    });
    App.views.form.readOnly();
  }

});
PendingSubmittingItemView = ItemView.extend({
  templates: {
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Saved: <%= timestamp %></span>'
  },
  //Added submit button for test only, remove after

  render: function() {
    var time = new moment(this.model.get('uploadStartDate') || new Date()).format('HH:mm:ss DD/MM/YYYY');
    var item = _.template(this.templates.item, {
      name: this.model.get('formName'),
      id: this.model.get("formId"),
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
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Submitted: <br/><%= timestamp %></span><button class="button button-main fh_appform_button_cancel delete-item second_button">Dismiss</button><span class="chevron"></span>'
  },

  render: function() {
    var time = new moment(this.model.get('submittedDate')).format('HH:mm:ss DD/MM/YYYY');
    var item = _.template(this.templates.item, {
      name: this.model.get('formName'),
      id: this.model.get("formId"),
      timestamp: time
    });

    $(this.el).html(item);
    return this;
  } ,

  show: function() {
    App.views.header.hideAll();
    var submission=this.model.coreModel;
    App.views.form=new FormView({
      "parentEl":$("#fh_wufoo_content"),
      "formId":submission.get("formId"),
      "autoShow":true,
      "submission":submission
    });
    App.views.form.readOnly();

  }

});
PendingListView = Backbone.View.extend({
  el: $('#fh_wufoo_pending'),

  events: {
    'click button.submit-all': 'submitAll'
  },

  templates: {
    pending_waiting_list: '<ul class="fh_appform_field_area list inset pending_waiting_list"></ul>',
    pending_waiting_header: '<li class="list-divider"><div class="fh_appform_field_title">Forms Awaiting Submission</div></li>',
    pending_waiting_submitall: '<li><button class="fh_appform_button_action submit-all button button-positive button-block">Submit All Awaiting Forms</button></li>',
    pending_submitting_list: '<ul class="fh_appform_field_area list inset pending_submitting_list"></ul>',
    pending_submitting_header: '<li class="list-divider"><div class="fh_appform_field_title">Forms currently being submitted</div><div class="loading hidden"></div></li>',
    pending_review_list: '<ul class="fh_appform_field_area list inset pending_review_list"></ul>',
    pending_review_header: '<li class="list-divider"><div class="fh_appform_field_title">These submissions need to be reviewed</div></li>'
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
        model.coreModel.upload(function(){});
        model.coreModel.on("submitted",function(err){
          if (!err){
            loadingView.updateMessage("Completed " + c + " of "  + tasks.length);
          }else{
            loadingView.updateMessage("Submitting " + c + " failed");
          }
          callback(null);
        });
        // model.load(function (err,actual){
        //   var json = actual.toJSON();
        //   loadingView.updateMessage("Starting " + c + " of "  + tasks.length);
        //   $fh.logger.debug("pending_list submitAll destroy model="+ model.id );
        //   model.destroy();

        //   return App.collections.pending_submitting.create(json,{},function (err){
        //     loadingView.updateMessage("Starting " + c + " of "  + tasks.length + "<br/> err " + JSON.stringify(err));
        //     c += 1;
        //     loadingView.updateProgress(c * 100 / tasks.length);
        //     if(!err) {
        //       loadingView.updateMessage("Completed " + c + " of "  + tasks.length);
        //       //If create is in charge of adding items to pending_waiting on submit failure, id's will have to be removed
        //       // to make sure it is re-created and not removed below by model.destroy.
        //     } else {
        //       loadingView.updateMessage("Submitting " + c + " failed");
        //     }

        //     callback.apply(self,arguments);
        //   });
        // });
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
    // debugger;
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
    var view = new PendingWaitingView({
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
    list: '<ul class="segmented-controller fh_appform_navigation"></ul>',
    forms_button: '<li class="fh_wufoo_home"><a class="" href="#">Forms</a></li>',
    drafts_button: '<li class="fh_wufoo_drafts"><a class="" href="#">Drafts<span class="count"></span></a></li>',
    pending_button: '<li class="fh_wufoo_pending"><a class="" href="#">Pending<span class="count"></span></a></li>',
    sent_button: '<li class="fh_wufoo_sent"><a class="" href="#">Sent<span class="count"></span></a></li>'
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
            App.views.form=null;
          }
        }
      };
      if(skip || App.views.form == null || App.views.form.readonly) {
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
  hideAll: function() {
    window.scrollTo(0, 0);
    App.views.form_list.hide();
    App.views.drafts_list.hide();
    App.views.pending_list.hide();
    App.views.sent_list.hide();
    // App.views.settings.hide();
    if (_.isObject(App.views.form)) {
      App.views.form.el.hide();
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

  initialize: function() {
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
    _(App.collections).forEach(function(collection) {
      collection.on('error', function(collection, msg, options) {
        $fh.logger.error('collection error:\"' + msg + '\"');
      });
    });
    var self=this;
    $fh.ready({}, function() {
      $fh.init({}, function() {
        /**** LOCAL DEV USAGE *****/
//        $fh.cloud_props.hosts.debugCloudUrl="http://127.0.0.1:3001";
//        $fh.app_props.host="http://127.0.0.1:3001";
        $fh.forms.init({}, function() {
          $fh.forms.getTheme({"fromRemote" : false, "css" : true}, function(err, themeCSS){

            if($('#fh_appform_style').length > 0){
              $('#fh_appform_style').html(themeCSS);
            } else {
              $('head').append('<style id="fh_appform_style">' + themeCSS + '</style>');
            }
            if(err) console.error(err);
            self.onReady();
          });
        });
      });
    });
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
    $('#fh_wufoo_banner .list li').each(function(i, e) {
      $fh.logger.info(" = " + $(e).text());
      banner = true;
    });
    if (!banner) {
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
      // App.collections.forms.store.force(); // do a clear to force a fetch
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

  fetchCollections: function(msg, to) {
    this.loadingView.show(msg);
    // this.fetchTo = setTimeout(this.fetchTimeout,_.isNumber(to) ? to : 20000);
    App.collections.forms.fetch();

    refreshSubmissionCollections();
  },

  fetchTimeout: function() {
    clearTimeout(this.fetchTo);
    this.fetchTo = null;
    this.loadingView.hide();
    App.resumeFetchAllowed = false;
    this.fullyLoaded = true;
    this.onResume();
  },

  onPropsRead: function(props) {
    this.props = props;
    // App.views.about = new AboutView(props);
  },

  onTimeoutChanged: function() {
    var timeout = App.config.getValueOrDefault("timeout");
    if (_.isNumber(timeout)) {
      $fh.ready({}, function() {
        $fh.logger.debug("Setting timeout to " + timeout + " seconds");
        $fh.legacy.fh_timeout = timeout * 1000;
      });
    }
  },

  onLoggerChanged: function() {
    var logger = App.config.getValueOrDefault("logger");
    $('#logger').toggle(logger);
  },

  onRetriesChanged: function() {
    var max_retries = App.config.getValueOrDefault("max_retries");
    //TODO add retry control for formsdk.
    // $fh.retry.toggle(max_retries > 1);
  },

  onDebugModeChanged: function() {
    var debug_mode = App.config.getValueOrDefault("debug_mode");
    $('#debug_mode').toggle(debug_mode);
  },

  onWhitelistChanged: function() {
    var white_list = App.config.getValueOrDefault("white_list") || [];
    var listed = _.find(white_list, function(m) {
      return this.props.uuid.match(Utils.toRegExp(m));
    }, this);
    // on start up the setting icon may not be rendered yet
    setTimeout(function() {
      $('a.settings').toggle( !! listed);
    }, 500);
  },

  onDefaultsChanged: function() {
    this.onLoggerChanged();
    this.onTimeoutChanged();
    this.onWhitelistChanged();
  }
});

App.router = new App.Router();
Backbone.history.start();