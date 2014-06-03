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
          self.trigger("error", self, err);
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

    // if model changes, re-initialise sub-collection of pages
    this.bind('change', this.reInitPages, this);
    this.on('change:page_history', function(model, history) {
      model.set('active_page', _(history).last());
    });
  },

  handleError: function(e, cb) {
    var type = e.msg || "unknown";
    var err = e.err;
    var msg;
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
          self.trigger("error", err);
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
                  self.trigger("error", self, err);
              } else {
                  self.coreModel = submission;
                  self.id = submission.getLocalId();
              }

              self.coreModel.clearEvents();
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
        coreModel.on("submitted", function(submissionId) {
          AlertView.showAlert({
            "text": "Form submission submitted."
          }, "success", 5000);
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
            console.log("$fh.forms.getSubmissions", self.status);
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
    if(this.percent > 100) this.percent = 100;
    this.updateLoadedCount();
    this.totalCounter += 1;
    this.updateProgress(this.percent);
    this.checkTotal();
  },

  modelLoadError: function(model, b, c) {
    model.set('fh_error_loading', true);
    this.percent += 100 / App.collections.forms.length;
    if(this.percent > 100) this.percent = 100;
    this.totalCounter += 1;
    this.updateProgress(this.percent);
    this.checkTotal();
  },

  checkTotal: function() {
    var self = this;
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
    form_button: '<li><button class="show button-block <%= enabledClass %> <%= dataClass %> fh_appform_button_action"><%= name %><div class="loading"></div></button></li>'
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
      "parentEl":$("#fh_appform_content"),
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

            if (params.form) {
                params.formId = params.form.getFormId();
            }

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

                self.submission.on("progress", function(progress) {
                    console.log("PROGRESS", progress, this);
                });
                self.submission.on("submitted", function() {
                    console.log("SUBMITTED", this);
                });
                self.submission.on("error", function(errorMessage) {
                    console.log("ERROR", errorMessage);
                });
                self.submission.on("inprogress", function(uploadTask) {
                    console.log("READY FOR UPLOAD ", this, uploadTask);
                });
                self.trigger("loaded");
                if (params.autoShow) {
                    self.$el.show();
                }
                self.render();
            });
        }
    });
});

var FormListView = Backbone.View.extend({
  el: $('#fh_appform_form_list'),

  events: {
    'click .settings': 'showSettings',
    'click button.reload': 'reload',
    'click #refresh_forms_list': 'reload'
  },

  templates: {
    list: '<ul class="form_list"></ul>',
    header: '<div class="fh_appform_form_title">Your Forms</div><div class="fh_appform_form_description">Choose a form from the list below</div>',
    error: '<li><button class="reload button-block <%= enabledClass %> <%= dataClass %>"><%= name %><div class="loading"></div></button></li>',
    footer: '<a class="about fh_appform_form_title" href="#fh_appform_banner"><i class="fa fa-info-circle"></i></a><a class="settings fh_appform_field_instructions"><i class="fa fa-cogs"></i></a><br style="clear:both;">',
    refreshForms: '<div id="refresh_forms_list" class="fh_appform_form_title" style="text-align: right;margin-right:20px;font-size:30px;"><i class="fa fa-cloud-download fa-4"></i></div>',
    appformLogo: '<div class="fh_appform_logo_container"><div class="fh_appform_logo"></div></div>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'appendForm');
    this.views = [];

    App.collections.forms.bind('reset', function(collection, options) {
      if (options == null || !options.noFetch) {
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
    App.views.header.markActive('.fh_appform_home');
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
      enabledClass: 'fh_appform_button_cancel',
      dataClass: 'fetched'
    });
    $('ul', this.el).append(html);

  },

  render: function() {
    // Empty our existing view
    $(this.el).empty();
    $(this.el).append(this.templates.appformLogo);
    $(this.el).append(this.templates.refreshForms);

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
  el: $('#fh_appform_sent'),

  events: {
    'click button.dismiss-all': 'dismissAll',
    "change #sentSaveMax": "saveMaxSelected"
  },

  templates: {
    sent_list: '<ul class="fh_appform_field_area list inset sent_list"></ul>',
    sent_header: '<li class="list-divider fh_appform_field_title">Sent Submissions</li>',
    dismiss_all: '<li><button class="fh_appform_button_cancel dismiss-all button button-main button-block">Dismiss All</button></li>',
    save_max: '<li><label for="sentSaveMax" class="fh_appform_field_title">Number of sent items to keep</label><select class="fh_appform_field_input" id="sentSaveMax"><%= options%></select></li>',
    save_max_option: '<option value="<%= value%>"><%= value%></option>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'appendSentForm', 'changed');

    App.collections.sent.bind('add remove reset', this.changed, this);

    this.render();
  },

  saveMaxSelected: function() {
    var saveMax = parseInt($('#sentSaveMax', this.el).val(), 10);
    if (_.isNumber(saveMax)) {
      if(saveMax < $fh.forms.config.get("sent_save_max") && saveMax > $fh.forms.config.get("sent_save_min")){
        $fh.forms.config.set("max_sent_saved", saveMax);
        $fh.forms.config.saveConfig();
      }
    }
  },

  show: function() {
    App.views.header.markActive('.fh_appform_sent');
    this.populate();
    $(this.el).show();
  },

  populate: function() {
    // Re-render save
    var maxSize = $fh.forms.config.get("max_sent_saved") ? $fh.forms.config.get("max_sent_saved") : $fh.forms.config.get("sent_save_min");
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

    var interval = $fh.forms.config.get("sent_save_max") - $fh.forms.config.get("sent_save_min");

    var currentVal = $fh.forms.config.get("max_sent_saved") ? $fh.forms.config.get("max_sent_saved") : $fh.forms.config.get("sent_save_min");
    var steps = 10;
    var stepSize = Math.floor(interval / steps);
    var optionsString = "";

    //max and min are the same.
    if(interval > 0){

      optionsString += _.template(this.templates.save_max_option, {"value": $fh.forms.config.get("sent_save_min")});

      for(var step = 2; step <= steps; step++){
        var currentStep = (step * stepSize) + $fh.forms.config.get("sent_save_min");
        var nextStep = (step + 1) * stepSize;

        if(currentVal > currentStep && currentVal < nextStep){
          optionsString += _.template(this.templates.save_max_option, {"value": currentStep});
          optionsString += _.template(this.templates.save_max_option, {"value": currentVal});
        } else {
          optionsString += _.template(this.templates.save_max_option, {"value": currentStep});
        }
      }
    } else {
      optionsString += _.template(this.templates.save_max_option, {"value": $fh.forms.config.get("sent_save_max")});
    }

    $('.sent_list', this.el).append(this.templates.dismiss_all);
    $('.sent_list', this.el).append(_.template(this.templates.save_max, {"options": optionsString}));

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
  el: $('#fh_appform_drafts'),

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
    App.views.header.markActive('.fh_appform_drafts');
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
$(function() {
  SettingsView = $fh.forms.backbone.ConfigView.extend({
    el: $('#fh_appform_settings'),
    events:{
      "click #cancelBtn":"cancel",
      "click #saveBtn":"save"
    },
    buttons:"<div style='margin: 20px 20px 20px 20px;'><button class='fh_appform_button_cancel' style='width:45%;margin-right:25px;' type='button' id='cancelBtn'>Cancel</button><button class='fh_appform_button_action' style='width:45%;'  type='button' id='saveBtn'>Save</button></div>",
    render:function(){
      SettingsView.__super__.render.apply(this);
      if($fh.forms.config.editAllowed()){
        this.$el.append(this.buttons);  
      }
      
      return this;
    },
    show: function() {
      App.views.header.hideAll();
      this.render();
      this.$el.show();
    },

    hide: function() {
      this.$el.hide();
    },
    save:function(){
      SettingsView.__super__.save.call(this,function(){
        App.views.header.showHome();  
      });
      
    },
    cancel:function(){
      App.views.header.showHome();
    }
  });
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
    item_failed: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Submitted At: <br/><%= timestamp %></span><br/><span class="pending_review_type fh_appform_error <%= error_type %>"><%= error_message %></span><button class="button fh_appform_button_cancel button-negative delete-item first_button">Delete</button><button class="button fh_appform_button_action button-positive submit-item second_button">Retry</button>',
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts"><%= timestamp %></span><button class="button fh_appform_button_cancel button-negative delete-item first_button">Delete</button><button class="button fh_appform_button_action button-positive submit-item second_button">Submit</button>'
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
    var self = this;
    e.stopPropagation();


    var confirmDelete = confirm("Are you sure you want to delete this submission?");
    if (confirmDelete) {
      self.model.loadSubmission(self.model.submissionMeta, function(err){
        if(err){
          $fh.forms.log.e("Error Loading Submission: ", err);
        } else {
          self.model.coreModel.clearLocal(function(err){
            if(err) console.error("Error clearing local: ", err);
            self.model.destroy();
            return false;
          });
        }
      });
    }
  },
  submit: function(e) {
    var self = this;
    var model = self.model;
    e.stopPropagation();

    self.model.loadSubmission(self.model.submissionMeta, function(err){
      if(err){
        $fh.forms.log.e("Error Loading Submission: ", err);
      } else {
        model.coreModel.upload(function(err) {
          if(err){
            $fh.forms.log.e("Error Calling Upload Submission: ", err);
          }
          return false;
        });
      }
    });
  },

  unrender: function() {
    $(this.el).remove();
  },

  show: function() {
    if(this.model.load){
      this.model.load(function(err, actual) {
        var draft = new DraftModel(actual.toJSON());
        App.views.form = new DraftView({
          model: draft
        });
        App.views.form.render();
      });
    }
  }
});
DraftItemView = ItemView.extend({

  templates: {
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts"><%= timestamp %></span><button class="fh_appform_button_cancel button button-negative delete-item second_button">Delete</button>'
  },

  show: function() {
    var self = this;
    App.views.header.hideAll();

    self.model.loadSubmission(self.model.submissionMeta, function(err){
      if(err){
        $fh.forms.log.e("Error loading submission ", err);
      }
      var submission=self.model.coreModel;
      App.views.form=new FormView({
        "parentEl":$("#fh_appform_content"),
        "formId":submission.get("formId"),
        "autoShow":true,
        "submission":submission
      });
    });
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
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Submitted At: <br/><%= timestamp %></span><br/><span class="pending_review_type"><%= error_type %></span><button class="button button-negative fh_appform_button_cancel delete-item first_button">Delete</button><button class="button button-positive submit-item fh_appform_button_action second_button">Retry</button>'
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
    var self = this;
    App.views.header.hideAll();

    self.model.loadSubmission(self.model.submissionMeta, function(err){
      if(err){
        $fh.forms.log.e("Error loading submission ", err);
      }
      var submission = self.model.coreModel;
      App.views.form = new FormView({
        "parentEl": $("#fh_appform_content"),
        "formId": submission.get("formId"),
        "autoShow": true,
        "submission": submission
      });
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
    var self = this;
    App.views.header.hideAll();

    self.model.loadSubmission(self.model.submissionMeta, function(err){
      if(err){
        $fh.forms.log.e("Error loading submission ", err);
      }

      var submission=self.model.coreModel;
      App.views.form=new FormView({
        "parentEl":$("#fh_appform_content"),
        "formId":submission.get("formId"),
        "autoShow":true,
        "submission":submission
      });
      App.views.form.readOnly();
    });
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
  }
});
PendingSubmittedItemView = ItemView.extend({
  templates: {
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Submitted: <br/><%= timestamp %></span><button class="button button-main fh_appform_button_cancel delete-item second_button">Dismiss</button>'
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
    var self = this;
    App.views.header.hideAll();

    self.model.loadSubmission(self.model.submissionMeta, function(err){
      if(err){
        $fh.forms.log.e("Error loading submission ", err);
      }
      var submission=self.model.coreModel;
      App.views.form=new FormView({
        "parentEl":$("#fh_appform_content"),
        "formId":submission.get("formId"),
        "autoShow":true,
        "submission":submission
      });
      App.views.form.readOnly();
    });
  }

});
PendingListView = Backbone.View.extend({
  el: $('#fh_appform_pending'),

  events: {
    'click button.submit-all': 'submitAll'
  },

  templates: {
    pending_waiting_list: '<ul class="fh_appform_field_area list inset pending_waiting_list"></ul>',
    pending_waiting_header: '<li class="list-divider"><div class="fh_appform_field_title">Forms Awaiting Submission</div></li>',
    pending_waiting_submitall: '<li><button class="fh_appform_button_action submit-all button button-positive button-block">Submit All Awaiting Forms</button></li>',
    pending_submitting_list: '<ul class="fh_appform_field_area list inset pending_submitting_list"></ul>',
    pending_submitting_header: '<li class="list-divider"><div class="fh_appform_field_title">Forms currently being submitted</div></li>',
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
      };
    });    // Kick things off by fetching when all stores are initialised

    async.series(tasks, function (){
      loadingView.hide();
    });
    return false;
  },

  show: function() {
    App.views.header.markActive('.fh_appform_pending');
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
    el: '#fh_appform_header',

    events: {
        'click div.fh_appform_home': 'showHome',
        'click div.fh_appform_drafts': 'showDrafts',
        'click div.fh_appform_pending': 'showPending',
        'click div.fh_appform_sent': 'showSent'
    },

    templates: {
        list: '<div class="navigation_list"></div>',
        forms_button: '<div class="fh_appform_home nav_item"><a class="" href="#">Forms</a></li>',
        drafts_button: '<div class="fh_appform_drafts nav_item"><a class="" href="#">Drafts<span class="count"></span></a></div>',
        pending_button: '<div class="fh_appform_pending nav_item"><a class="" href="#">Pending<span class="count"></span></a></div>',
        sent_button: '<div class="fh_appform_sent nav_item_last"><a class="" href="#">Sent<span class="count"></span></a></div>'
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
        this.showDrafts = this.advise(this.showDrafts);
        this.showPending = this.advise(this.showPending);
        this.showSent = this.advise(this.showSent);
    },
    advise: function(func) {
        var self = this;
        return function() {
            var skip = false;
            var args = arguments;
            if (args.length && args[0] === true) {
                skip = true;
            }
            var proceed = function(clear) {
                try {
                    return func.call(self, args);
                } finally {
                    if (clear && App.views.form) {
                        App.views.form = null;
                    }
                }
            };
            if (skip || App.views.form == null || App.views.form.readonly) {
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

    showSettings: function() {
        this.hideAll();
        App.views.settings.show();
    },
    hideAll: function() {
        window.scrollTo(0, 0);
        App.views.form_list.hide();
        App.views.drafts_list.hide();
        App.views.pending_list.hide();
        App.views.sent_list.hide();
        App.views.settings.hide();
        if (_.isObject(App.views.form)) {
            App.views.form.$el.hide();
        }
    },

    markActive: function(tab_class) {
        var self = this;
        self.$el.find('.navigation_list a').removeClass('fh_appform_button_default_active');
        self.$el.find('.navigation_list a').addClass('fh_appform_button_default');
        self.$el.find(tab_class + " a").addClass('fh_appform_button_default_active');
    },

    updateCounts: function() {
        // TODO: DRY
        var drafts_count = App.collections.drafts.length;
        if (drafts_count > 0) {
            $('.fh_appform_drafts .count', this.el).text(drafts_count).css('display', 'inline-block');
        } else {
            $('.fh_appform_drafts .count', this.el).hide();
        }

        var pending_count = App.collections.pending_submitting.length + App.collections.pending_review.length + App.collections.pending_waiting.length;

        if (pending_count > 0) {
            $('.fh_appform_pending .count', this.el).text(pending_count).css('display', 'inline-block');
        } else {
            $('.fh_appform_pending .count', this.el).hide();
        }

        var sent_count = App.collections.sent.length;
        if (sent_count > 0) {
            $('.fh_appform_sent .count', this.el).text(sent_count).css('display', 'inline-block');
        } else {
            $('.fh_appform_sent .count', this.el).hide();
        }
    }
});
AlertView = Backbone.View.extend({
  options:{el: $("#fh_appform_alerts_area")},

  templates: {
    alert: '<div class="fh_appform_alert <%= type %>"><%= message %></div>',
    bar: '<div class="fh_appform_alert <%= type %>"><span class="small"><%= message %></span><progress max="100" value="<%= value %>"><strong><%= message %></strong></progress></div>',
    ios_bar: '<div class="fh_appform_alert <%= type %>"><span class="small"><%= message %></span><div class="progress_bar_container" ><div class="progress_bar complete" style="width:<%=value%>%%"></div></div></div>'
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
      template = this.templates.bar;
    }
    $(self.$el).find('.fh_appform_alert').remove();
    this.$el.append(_.template(template, {message:message,value:value,type:type}));
    this.$el.show();
    clearTimeout(this.to);
    this.to = setTimeout(function() {
//      self.$el.slideUp(function() {
//
//      });
      $(self.$el).find('.fh_appform_alert').remove();
    }, opts.timeout || 10000);
    return this;
  }
});
var alertView = new AlertView();//{o:o, type:type, timeout:timeout});

AlertView.showAlert = function(o, type, timeout) {
  alertView.render({o:o, type:type, timeout:timeout});
};
App.Router = Backbone.Router.extend({
    routes: {
        "form_list": "form_list",
        "*path": "form_list" // Default route
    },

    initialize: function() {
        _.bindAll(this);
    },

    form_list: function() {
        var self = this;
        var initRetryLimit = 20;
        var initRetryAttempts = 0;
        self.loadingView = new LoadingCollectionView();
        self.loadingView.show("App Starting");
        self.deviceReady = false;
        self.initReady = false;

        function startForms() {

            $fh.forms.init({}, function() {
                $fh.forms.getTheme({
                    "fromRemote": false,
                    "css": true
                }, function(err, themeCSS) {
                    App.views.form_list = new FormListView();
                    App.views.drafts_list = new DraftListView();
                    App.views.pending_list = new PendingListView();
                    App.views.sent_list = new SentListView();
                    App.views.settings = new SettingsView();
                    App.views.header = new HeaderView();
                    App.views.header.showHome();

                    $fh.forms.config.mbaasOnline(function(){
                      $fh.forms.log.d("Device online");
                      $('.fh_appform_alert_offline').hide();
                    });

                    $fh.forms.config.mbaasOffline(function(){
                      $fh.forms.log.d("Device offline");
                      $('.fh_appform_alert_offline').show();
                    });


                    if ($('#fh_appform_style').length > 0) {
                        $('#fh_appform_style').html(themeCSS);
                    } else {
                        $('head').append('<style id="fh_appform_style">' + themeCSS + '</style>');
                    }
                    if (err) console.error(err);
                    self.onReady();
                });
            });
        }

        $fh.ready({}, function() {



            if (window.PhoneGap || window.cordova) {
                document.addEventListener("deviceready", function() {
                    self.deviceReady = true;
                }, false);
                document.addEventListener("backbutton", function(){
                    $fh.forms.log.d("Back Button Clicked");
                    if(App.views.form && typeof(App.views.form.backEvent) === 'function'){
                        if(App.views.form.backEvent() === false){//Clicked back while on the first page. Should go home
                            App.views.header.showHome();
                        }
                    } else {
                        App.views.header.showHome();
                    }
                }, false);
            } else {
                self.deviceReady = true;
            }
            $fh.on('fhinit', function(err, cloudProps) {
                console.log("fhinit called");
                if (err) {
                    console.error("Error on fhinit", err);
                }

                self.initReady = true;
            });
            var deviceReadyInterval = setInterval(function() {
                if (self.deviceReady === true && self.initReady === true) {
                    startForms();
                    clearInterval(deviceReadyInterval);
                } else {
                    if(initRetryAttempts > initRetryLimit){
                        console.error("Forms Not Ready Yet. Retry Attempts Exceeded");

                        if(self.deviceReady === true){
                            console.error("Forms Not Ready Yet. Device Ready. Starting in offline mode.");
                            startForms();
                            clearInterval(deviceReadyInterval);
                        } else {
                            console.error("Forms Device Not Ready. Trying again.");
                            initRetryAttempts = 0;
                        }
                    } else {
                        initRetryAttempts += 1;   
                    }
                }
            }, 500);
        });
    },
    onReady: function() {
        this.loadingView.show("App Ready, Loading form list");

        $fh.env(this.onPropsRead);

        // by default, allow fetching on resume event.
        // Can be set to false when taking a pic so refetch doesn't happen on resume from that
        App.resumeFetchAllowed = true;
        document.addEventListener("resume", this.onResume, false);
        var banner = false;
        $('#fh_appform_banner .list li').each(function(i, e) {
            banner = true;
        });
        this.onConfigLoaded();
    },

    // run App.router.onResume() to test this in browser
    onResume: function() {
        // only trigger resync of forms if NOT resuming after taking a photo
        if (App.resumeFetchAllowed) {
            App.collections.forms.fetch();
        } else {
            // reset flag to true for next time
            App.resumeFetchAllowed = true;
        }
    },
    onConfigLoaded: function() {
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
    onPropsRead: function(props) {
        this.props = props;
    }
});

App.router = new App.Router();
Backbone.history.start();
!function(a,b){function c(a){var b=ob[a]={};return $.each(a.split(bb),function(a,c){b[c]=!0}),b}function d(a,c,d){if(d===b&&1===a.nodeType){var e="data-"+c.replace(qb,"-$1").toLowerCase();if(d=a.getAttribute(e),"string"==typeof d){try{d="true"===d?!0:"false"===d?!1:"null"===d?null:+d+""===d?+d:pb.test(d)?$.parseJSON(d):d}catch(f){}$.data(a,c,d)}else d=b}return d}function e(a){var b;for(b in a)if(("data"!==b||!$.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function f(){return!1}function g(){return!0}function h(a){return!a||!a.parentNode||11===a.parentNode.nodeType}function i(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}function j(a,b,c){if(b=b||0,$.isFunction(b))return $.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return $.grep(a,function(a){return a===b===c});if("string"==typeof b){var d=$.grep(a,function(a){return 1===a.nodeType});if(Kb.test(b))return $.filter(b,d,!c);b=$.filter(b,d)}return $.grep(a,function(a){return $.inArray(a,b)>=0===c})}function k(a){var b=Nb.split("|"),c=a.createDocumentFragment();if(c.createElement)for(;b.length;)c.createElement(b.pop());return c}function l(a,b){return a.getElementsByTagName(b)[0]||a.appendChild(a.ownerDocument.createElement(b))}function m(a,b){if(1===b.nodeType&&$.hasData(a)){var c,d,e,f=$._data(a),g=$._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)$.event.add(b,c,h[c][d])}g.data&&(g.data=$.extend({},g.data))}}function n(a,b){var c;1===b.nodeType&&(b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),$.support.html5Clone&&a.innerHTML&&!$.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&Xb.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.selected=a.defaultSelected:"input"===c||"textarea"===c?b.defaultValue=a.defaultValue:"script"===c&&b.text!==a.text&&(b.text=a.text),b.removeAttribute($.expando))}function o(a){return"undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName("*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll("*"):[]}function p(a){Xb.test(a.type)&&(a.defaultChecked=a.checked)}function q(a,b){if(b in a)return b;for(var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=rc.length;e--;)if(b=rc[e]+c,b in a)return b;return d}function r(a,b){return a=b||a,"none"===$.css(a,"display")||!$.contains(a.ownerDocument,a)}function s(a,b){for(var c,d,e=[],f=0,g=a.length;g>f;f++)c=a[f],c.style&&(e[f]=$._data(c,"olddisplay"),b?(e[f]||"none"!==c.style.display||(c.style.display=""),""===c.style.display&&r(c)&&(e[f]=$._data(c,"olddisplay",w(c.nodeName)))):(d=cc(c,"display"),e[f]||"none"===d||$._data(c,"olddisplay",d)));for(f=0;g>f;f++)c=a[f],c.style&&(b&&"none"!==c.style.display&&""!==c.style.display||(c.style.display=b?e[f]||"":"none"));return a}function t(a,b,c){var d=kc.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function u(a,b,c,d){for(var e=c===(d?"border":"content")?4:"width"===b?1:0,f=0;4>e;e+=2)"margin"===c&&(f+=$.css(a,c+qc[e],!0)),d?("content"===c&&(f-=parseFloat(cc(a,"padding"+qc[e]))||0),"margin"!==c&&(f-=parseFloat(cc(a,"border"+qc[e]+"Width"))||0)):(f+=parseFloat(cc(a,"padding"+qc[e]))||0,"padding"!==c&&(f+=parseFloat(cc(a,"border"+qc[e]+"Width"))||0));return f}function v(a,b,c){var d="width"===b?a.offsetWidth:a.offsetHeight,e=!0,f=$.support.boxSizing&&"border-box"===$.css(a,"boxSizing");if(0>=d||null==d){if(d=cc(a,b),(0>d||null==d)&&(d=a.style[b]),lc.test(d))return d;e=f&&($.support.boxSizingReliable||d===a.style[b]),d=parseFloat(d)||0}return d+u(a,b,c||(f?"border":"content"),e)+"px"}function w(a){if(nc[a])return nc[a];var b=$("<"+a+">").appendTo(P.body),c=b.css("display");return b.remove(),("none"===c||""===c)&&(dc=P.body.appendChild(dc||$.extend(P.createElement("iframe"),{frameBorder:0,width:0,height:0})),ec&&dc.createElement||(ec=(dc.contentWindow||dc.contentDocument).document,ec.write("<!doctype html><html><body>"),ec.close()),b=ec.body.appendChild(ec.createElement(a)),c=cc(b,"display"),P.body.removeChild(dc)),nc[a]=c,c}function x(a,b,c,d){var e;if($.isArray(b))$.each(b,function(b,e){c||uc.test(a)?d(a,e):x(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==$.type(b))d(a,b);else for(e in b)x(a+"["+e+"]",b[e],c,d)}function y(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e,f,g=b.toLowerCase().split(bb),h=0,i=g.length;if($.isFunction(c))for(;i>h;h++)d=g[h],f=/^\+/.test(d),f&&(d=d.substr(1)||"*"),e=a[d]=a[d]||[],e[f?"unshift":"push"](c)}}function z(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;for(var h,i=a[f],j=0,k=i?i.length:0,l=a===Kc;k>j&&(l||!h);j++)h=i[j](c,d,e),"string"==typeof h&&(!l||g[h]?h=b:(c.dataTypes.unshift(h),h=z(a,c,d,e,h,g)));return!l&&h||g["*"]||(h=z(a,c,d,e,"*",g)),h}function A(a,c){var d,e,f=$.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((f[d]?a:e||(e={}))[d]=c[d]);e&&$.extend(!0,a,e)}function B(a,c,d){var e,f,g,h,i=a.contents,j=a.dataTypes,k=a.responseFields;for(f in k)f in d&&(c[k[f]]=d[f]);for(;"*"===j[0];)j.shift(),e===b&&(e=a.mimeType||c.getResponseHeader("content-type"));if(e)for(f in i)if(i[f]&&i[f].test(e)){j.unshift(f);break}if(j[0]in d)g=j[0];else{for(f in d){if(!j[0]||a.converters[f+" "+j[0]]){g=f;break}h||(h=f)}g=g||h}return g?(g!==j[0]&&j.unshift(g),d[g]):void 0}function C(a,b){var c,d,e,f,g=a.dataTypes.slice(),h=g[0],i={},j=0;if(a.dataFilter&&(b=a.dataFilter(b,a.dataType)),g[1])for(c in a.converters)i[c.toLowerCase()]=a.converters[c];for(;e=g[++j];)if("*"!==e){if("*"!==h&&h!==e){if(c=i[h+" "+e]||i["* "+e],!c)for(d in i)if(f=d.split(" "),f[1]===e&&(c=i[h+" "+f[0]]||i["* "+f[0]])){c===!0?c=i[d]:i[d]!==!0&&(e=f[0],g.splice(j--,0,e));break}if(c!==!0)if(c&&a["throws"])b=c(b);else try{b=c(b)}catch(k){return{state:"parsererror",error:c?k:"No conversion from "+h+" to "+e}}}h=e}return{state:"success",data:b}}function D(){try{return new a.XMLHttpRequest}catch(b){}}function E(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function F(){return setTimeout(function(){Vc=b},0),Vc=$.now()}function G(a,b){$.each(b,function(b,c){for(var d=(_c[b]||[]).concat(_c["*"]),e=0,f=d.length;f>e;e++)if(d[e].call(a,b,c))return})}function H(a,b,c){var d,e=0,f=$c.length,g=$.Deferred().always(function(){delete h.elem}),h=function(){for(var b=Vc||F(),c=Math.max(0,i.startTime+i.duration-b),d=1-(c/i.duration||0),e=0,f=i.tweens.length;f>e;e++)i.tweens[e].run(d);return g.notifyWith(a,[i,d,c]),1>d&&f?c:(g.resolveWith(a,[i]),!1)},i=g.promise({elem:a,props:$.extend({},b),opts:$.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Vc||F(),duration:c.duration,tweens:[],createTween:function(b,c){var d=$.Tween(a,i.opts,b,c,i.opts.specialEasing[b]||i.opts.easing);return i.tweens.push(d),d},stop:function(b){for(var c=0,d=b?i.tweens.length:0;d>c;c++)i.tweens[c].run(1);return b?g.resolveWith(a,[i,b]):g.rejectWith(a,[i,b]),this}}),j=i.props;for(I(j,i.opts.specialEasing);f>e;e++)if(d=$c[e].call(i,a,j,i.opts))return d;return G(i,j),$.isFunction(i.opts.start)&&i.opts.start.call(a,i),$.fx.timer($.extend(h,{anim:i,queue:i.opts.queue,elem:a})),i.progress(i.opts.progress).done(i.opts.done,i.opts.complete).fail(i.opts.fail).always(i.opts.always)}function I(a,b){var c,d,e,f,g;for(c in a)if(d=$.camelCase(c),e=b[d],f=a[c],$.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=$.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function J(a,b,c){var d,e,f,g,h,i,j,k,l=this,m=a.style,n={},o=[],p=a.nodeType&&r(a);c.queue||(j=$._queueHooks(a,"fx"),null==j.unqueued&&(j.unqueued=0,k=j.empty.fire,j.empty.fire=function(){j.unqueued||k()}),j.unqueued++,l.always(function(){l.always(function(){j.unqueued--,$.queue(a,"fx").length||j.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],"inline"===$.css(a,"display")&&"none"===$.css(a,"float")&&($.support.inlineBlockNeedsLayout&&"inline"!==w(a.nodeName)?m.zoom=1:m.display="inline-block")),c.overflow&&(m.overflow="hidden",$.support.shrinkWrapBlocks||l.done(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b)if(f=b[d],Xc.exec(f)){if(delete b[d],f===(p?"hide":"show"))continue;o.push(d)}if(g=o.length)for(h=$._data(a,"fxshow")||$._data(a,"fxshow",{}),p?$(a).show():l.done(function(){$(a).hide()}),l.done(function(){var b;$.removeData(a,"fxshow",!0);for(b in n)$.style(a,b,n[b])}),d=0;g>d;d++)e=o[d],i=l.createTween(e,p?h[e]:0),n[e]=h[e]||$.style(a,e),e in h||(h[e]=i.start,p&&(i.end=i.start,i.start="width"===e||"height"===e?1:0))}function K(a,b,c,d,e){return new K.prototype.init(a,b,c,d,e)}function L(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=qc[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function M(a){return $.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}var N,O,P=a.document,Q=a.location,R=a.navigator,S=a.jQuery,T=a.$,U=Array.prototype.push,V=Array.prototype.slice,W=Array.prototype.indexOf,X=Object.prototype.toString,Y=Object.prototype.hasOwnProperty,Z=String.prototype.trim,$=function(a,b){return new $.fn.init(a,b,N)},_=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,ab=/\S/,bb=/\s+/,cb=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,db=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,eb=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,fb=/^[\],:{}\s]*$/,gb=/(?:^|:|,)(?:\s*\[)+/g,hb=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,ib=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,jb=/^-ms-/,kb=/-([\da-z])/gi,lb=function(a,b){return(b+"").toUpperCase()},mb=function(){P.addEventListener?(P.removeEventListener("DOMContentLoaded",mb,!1),$.ready()):"complete"===P.readyState&&(P.detachEvent("onreadystatechange",mb),$.ready())},nb={};$.fn=$.prototype={constructor:$,init:function(a,c,d){var e,f,g;if(!a)return this;if(a.nodeType)return this.context=this[0]=a,this.length=1,this;if("string"==typeof a){if(e="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:db.exec(a),!e||!e[1]&&c)return!c||c.jquery?(c||d).find(a):this.constructor(c).find(a);if(e[1])return c=c instanceof $?c[0]:c,g=c&&c.nodeType?c.ownerDocument||c:P,a=$.parseHTML(e[1],g,!0),eb.test(e[1])&&$.isPlainObject(c)&&this.attr.call(a,c,!0),$.merge(this,a);if(f=P.getElementById(e[2]),f&&f.parentNode){if(f.id!==e[2])return d.find(a);this.length=1,this[0]=f}return this.context=P,this.selector=a,this}return $.isFunction(a)?d.ready(a):(a.selector!==b&&(this.selector=a.selector,this.context=a.context),$.makeArray(a,this))},selector:"",jquery:"1.8.2",length:0,size:function(){return this.length},toArray:function(){return V.call(this)},get:function(a){return null==a?this.toArray():0>a?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=$.merge(this.constructor(),a);return d.prevObject=this,d.context=this.context,"find"===b?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")"),d},each:function(a,b){return $.each(this,a,b)},ready:function(a){return $.ready.promise().done(a),this},eq:function(a){return a=+a,-1===a?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(V.apply(this,arguments),"slice",V.call(arguments).join(","))},map:function(a){return this.pushStack($.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:U,sort:[].sort,splice:[].splice},$.fn.init.prototype=$.fn,$.extend=$.fn.extend=function(){var a,c,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;for("boolean"==typeof h&&(k=h,h=arguments[1]||{},i=2),"object"==typeof h||$.isFunction(h)||(h={}),j===i&&(h=this,--i);j>i;i++)if(null!=(a=arguments[i]))for(c in a)d=h[c],e=a[c],h!==e&&(k&&e&&($.isPlainObject(e)||(f=$.isArray(e)))?(f?(f=!1,g=d&&$.isArray(d)?d:[]):g=d&&$.isPlainObject(d)?d:{},h[c]=$.extend(k,g,e)):e!==b&&(h[c]=e));return h},$.extend({noConflict:function(b){return a.$===$&&(a.$=T),b&&a.jQuery===$&&(a.jQuery=S),$},isReady:!1,readyWait:1,holdReady:function(a){a?$.readyWait++:$.ready(!0)},ready:function(a){if(a===!0?!--$.readyWait:!$.isReady){if(!P.body)return setTimeout($.ready,1);$.isReady=!0,a!==!0&&--$.readyWait>0||(O.resolveWith(P,[$]),$.fn.trigger&&$(P).trigger("ready").off("ready"))}},isFunction:function(a){return"function"===$.type(a)},isArray:Array.isArray||function(a){return"array"===$.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return null==a?String(a):nb[X.call(a)]||"object"},isPlainObject:function(a){if(!a||"object"!==$.type(a)||a.nodeType||$.isWindow(a))return!1;try{if(a.constructor&&!Y.call(a,"constructor")&&!Y.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||Y.call(a,d)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},error:function(a){throw new Error(a)},parseHTML:function(a,b,c){var d;return a&&"string"==typeof a?("boolean"==typeof b&&(c=b,b=0),b=b||P,(d=eb.exec(a))?[b.createElement(d[1])]:(d=$.buildFragment([a],b,c?null:[]),$.merge([],(d.cacheable?$.clone(d.fragment):d.fragment).childNodes))):null},parseJSON:function(b){return b&&"string"==typeof b?(b=$.trim(b),a.JSON&&a.JSON.parse?a.JSON.parse(b):fb.test(b.replace(hb,"@").replace(ib,"]").replace(gb,""))?new Function("return "+b)():void $.error("Invalid JSON: "+b)):null},parseXML:function(c){var d,e;if(!c||"string"!=typeof c)return null;try{a.DOMParser?(e=new DOMParser,d=e.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(f){d=b}return d&&d.documentElement&&!d.getElementsByTagName("parsererror").length||$.error("Invalid XML: "+c),d},noop:function(){},globalEval:function(b){b&&ab.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(jb,"ms-").replace(kb,lb)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,c,d){var e,f=0,g=a.length,h=g===b||$.isFunction(a);if(d)if(h){for(e in a)if(c.apply(a[e],d)===!1)break}else for(;g>f&&c.apply(a[f++],d)!==!1;);else if(h){for(e in a)if(c.call(a[e],e,a[e])===!1)break}else for(;g>f&&c.call(a[f],f,a[f++])!==!1;);return a},trim:Z&&!Z.call("﻿ ")?function(a){return null==a?"":Z.call(a)}:function(a){return null==a?"":(a+"").replace(cb,"")},makeArray:function(a,b){var c,d=b||[];return null!=a&&(c=$.type(a),null==a.length||"string"===c||"function"===c||"regexp"===c||$.isWindow(a)?U.call(d,a):$.merge(d,a)),d},inArray:function(a,b,c){var d;if(b){if(W)return W.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=c.length,e=a.length,f=0;if("number"==typeof d)for(;d>f;f++)a[e++]=c[f];else for(;c[f]!==b;)a[e++]=c[f++];return a.length=e,a},grep:function(a,b,c){var d,e=[],f=0,g=a.length;for(c=!!c;g>f;f++)d=!!b(a[f],f),c!==d&&e.push(a[f]);return e},map:function(a,c,d){var e,f,g=[],h=0,i=a.length,j=a instanceof $||i!==b&&"number"==typeof i&&(i>0&&a[0]&&a[i-1]||0===i||$.isArray(a));if(j)for(;i>h;h++)e=c(a[h],h,d),null!=e&&(g[g.length]=e);else for(f in a)e=c(a[f],f,d),null!=e&&(g[g.length]=e);return g.concat.apply([],g)},guid:1,proxy:function(a,c){var d,e,f;return"string"==typeof c&&(d=a[c],c=a,a=d),$.isFunction(a)?(e=V.call(arguments,2),f=function(){return a.apply(c,e.concat(V.call(arguments)))},f.guid=a.guid=a.guid||$.guid++,f):b},access:function(a,c,d,e,f,g,h){var i,j=null==d,k=0,l=a.length;if(d&&"object"==typeof d){for(k in d)$.access(a,c,k,d[k],1,g,e);f=1}else if(e!==b){if(i=h===b&&$.isFunction(e),j&&(i?(i=c,c=function(a,b,c){return i.call($(a),c)}):(c.call(a,e),c=null)),c)for(;l>k;k++)c(a[k],d,i?e.call(a[k],k,c(a[k],d)):e,h);f=1}return f?a:j?c.call(a):l?c(a[0],d):g},now:function(){return(new Date).getTime()}}),$.ready.promise=function(b){if(!O)if(O=$.Deferred(),"complete"===P.readyState)setTimeout($.ready,1);else if(P.addEventListener)P.addEventListener("DOMContentLoaded",mb,!1),a.addEventListener("load",$.ready,!1);else{P.attachEvent("onreadystatechange",mb),a.attachEvent("onload",$.ready);var c=!1;try{c=null==a.frameElement&&P.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!$.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}$.ready()}}()}return O.promise(b)},$.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){nb["[object "+b+"]"]=b.toLowerCase()}),N=$(P);var ob={};$.Callbacks=function(a){a="string"==typeof a?ob[a]||c(a):$.extend({},a);var d,e,f,g,h,i,j=[],k=!a.once&&[],l=function(b){for(d=a.memory&&b,e=!0,i=g||0,g=0,h=j.length,f=!0;j&&h>i;i++)if(j[i].apply(b[0],b[1])===!1&&a.stopOnFalse){d=!1;break}f=!1,j&&(k?k.length&&l(k.shift()):d?j=[]:m.disable())},m={add:function(){if(j){var b=j.length;!function c(b){$.each(b,function(b,d){var e=$.type(d);"function"!==e||a.unique&&m.has(d)?d&&d.length&&"string"!==e&&c(d):j.push(d)})}(arguments),f?h=j.length:d&&(g=b,l(d))}return this},remove:function(){return j&&$.each(arguments,function(a,b){for(var c;(c=$.inArray(b,j,c))>-1;)j.splice(c,1),f&&(h>=c&&h--,i>=c&&i--)}),this},has:function(a){return $.inArray(a,j)>-1},empty:function(){return j=[],this},disable:function(){return j=k=d=b,this},disabled:function(){return!j},lock:function(){return k=b,d||m.disable(),this},locked:function(){return!k},fireWith:function(a,b){return b=b||[],b=[a,b.slice?b.slice():b],!j||e&&!k||(f?k.push(b):l(b)),this},fire:function(){return m.fireWith(this,arguments),this},fired:function(){return!!e}};return m},$.extend({Deferred:function(a){var b=[["resolve","done",$.Callbacks("once memory"),"resolved"],["reject","fail",$.Callbacks("once memory"),"rejected"],["notify","progress",$.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return $.Deferred(function(c){$.each(b,function(b,d){var f=d[0],g=a[b];e[d[1]]($.isFunction(g)?function(){var a=g.apply(this,arguments);a&&$.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f+"With"](this===e?c:this,[a])}:c[f])}),a=null}).promise()},promise:function(a){return null!=a?$.extend(a,d):d}},e={};return d.pipe=d.then,$.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=g.fire,e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b,c,d,e=0,f=V.call(arguments),g=f.length,h=1!==g||a&&$.isFunction(a.promise)?g:0,i=1===h?a:$.Deferred(),j=function(a,c,d){return function(e){c[a]=this,d[a]=arguments.length>1?V.call(arguments):e,d===b?i.notifyWith(c,d):--h||i.resolveWith(c,d)}};if(g>1)for(b=new Array(g),c=new Array(g),d=new Array(g);g>e;e++)f[e]&&$.isFunction(f[e].promise)?f[e].promise().done(j(e,d,f)).fail(i.reject).progress(j(e,c,b)):--h;return h||i.resolveWith(d,f),i.promise()}}),$.support=function(){var b,c,d,e,f,g,h,i,j,k,l,m=P.createElement("div");if(m.setAttribute("className","t"),m.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",c=m.getElementsByTagName("*"),d=m.getElementsByTagName("a")[0],d.style.cssText="top:1px;float:left;opacity:.5",!c||!c.length)return{};e=P.createElement("select"),f=e.appendChild(P.createElement("option")),g=m.getElementsByTagName("input")[0],b={leadingWhitespace:3===m.firstChild.nodeType,tbody:!m.getElementsByTagName("tbody").length,htmlSerialize:!!m.getElementsByTagName("link").length,style:/top/.test(d.getAttribute("style")),hrefNormalized:"/a"===d.getAttribute("href"),opacity:/^0.5/.test(d.style.opacity),cssFloat:!!d.style.cssFloat,checkOn:"on"===g.value,optSelected:f.selected,getSetAttribute:"t"!==m.className,enctype:!!P.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==P.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===P.compatMode,submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},g.checked=!0,b.noCloneChecked=g.cloneNode(!0).checked,e.disabled=!0,b.optDisabled=!f.disabled;try{delete m.test}catch(n){b.deleteExpando=!1}if(!m.addEventListener&&m.attachEvent&&m.fireEvent&&(m.attachEvent("onclick",l=function(){b.noCloneEvent=!1}),m.cloneNode(!0).fireEvent("onclick"),m.detachEvent("onclick",l)),g=P.createElement("input"),g.value="t",g.setAttribute("type","radio"),b.radioValue="t"===g.value,g.setAttribute("checked","checked"),g.setAttribute("name","t"),m.appendChild(g),h=P.createDocumentFragment(),h.appendChild(m.lastChild),b.checkClone=h.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=g.checked,h.removeChild(g),h.appendChild(m),m.attachEvent)for(j in{submit:!0,change:!0,focusin:!0})i="on"+j,k=i in m,k||(m.setAttribute(i,"return;"),k="function"==typeof m[i]),b[j+"Bubbles"]=k;return $(function(){var c,d,e,f,g="padding:0;margin:0;border:0;display:block;overflow:hidden;",h=P.getElementsByTagName("body")[0];h&&(c=P.createElement("div"),c.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",h.insertBefore(c,h.firstChild),d=P.createElement("div"),c.appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",e=d.getElementsByTagName("td"),e[0].style.cssText="padding:0;margin:0;border:0;display:none",k=0===e[0].offsetHeight,e[0].style.display="",e[1].style.display="none",b.reliableHiddenOffsets=k&&0===e[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",b.boxSizing=4===d.offsetWidth,b.doesNotIncludeMarginInBodyOffset=1!==h.offsetTop,a.getComputedStyle&&(b.pixelPosition="1%"!==(a.getComputedStyle(d,null)||{}).top,b.boxSizingReliable="4px"===(a.getComputedStyle(d,null)||{width:"4px"}).width,f=P.createElement("div"),f.style.cssText=d.style.cssText=g,f.style.marginRight=f.style.width="0",d.style.width="1px",d.appendChild(f),b.reliableMarginRight=!parseFloat((a.getComputedStyle(f,null)||{}).marginRight)),"undefined"!=typeof d.style.zoom&&(d.innerHTML="",d.style.cssText=g+"width:1px;padding:1px;display:inline;zoom:1",b.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.style.overflow="visible",d.innerHTML="<div></div>",d.firstChild.style.width="5px",b.shrinkWrapBlocks=3!==d.offsetWidth,c.style.zoom=1),h.removeChild(c),c=d=e=f=null)}),h.removeChild(m),c=d=e=f=g=h=m=null,b}();var pb=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,qb=/([A-Z])/g;$.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+($.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){return a=a.nodeType?$.cache[a[$.expando]]:a[$.expando],!!a&&!e(a)},data:function(a,c,d,e){if($.acceptData(a)){var f,g,h=$.expando,i="string"==typeof c,j=a.nodeType,k=j?$.cache:a,l=j?a[h]:a[h]&&h;if(l&&k[l]&&(e||k[l].data)||!i||d!==b)return l||(j?a[h]=l=$.deletedIds.pop()||$.guid++:l=h),k[l]||(k[l]={},j||(k[l].toJSON=$.noop)),("object"==typeof c||"function"==typeof c)&&(e?k[l]=$.extend(k[l],c):k[l].data=$.extend(k[l].data,c)),f=k[l],e||(f.data||(f.data={}),f=f.data),d!==b&&(f[$.camelCase(c)]=d),i?(g=f[c],null==g&&(g=f[$.camelCase(c)])):g=f,g}},removeData:function(a,b,c){if($.acceptData(a)){var d,f,g,h=a.nodeType,i=h?$.cache:a,j=h?a[$.expando]:$.expando;if(i[j]){if(b&&(d=c?i[j]:i[j].data)){$.isArray(b)||(b in d?b=[b]:(b=$.camelCase(b),b=b in d?[b]:b.split(" ")));for(f=0,g=b.length;g>f;f++)delete d[b[f]];if(!(c?e:$.isEmptyObject)(d))return}(c||(delete i[j].data,e(i[j])))&&(h?$.cleanData([a],!0):$.support.deleteExpando||i!=i.window?delete i[j]:i[j]=null)}}},_data:function(a,b,c){return $.data(a,b,c,!0)},acceptData:function(a){var b=a.nodeName&&$.noData[a.nodeName.toLowerCase()];return!b||b!==!0&&a.getAttribute("classid")===b}}),$.fn.extend({data:function(a,c){var e,f,g,h,i,j=this[0],k=0,l=null;if(a===b){if(this.length&&(l=$.data(j),1===j.nodeType&&!$._data(j,"parsedAttrs"))){for(g=j.attributes,i=g.length;i>k;k++)h=g[k].name,h.indexOf("data-")||(h=$.camelCase(h.substring(5)),d(j,h,l[h]));$._data(j,"parsedAttrs",!0)}return l}return"object"==typeof a?this.each(function(){$.data(this,a)}):(e=a.split(".",2),e[1]=e[1]?"."+e[1]:"",f=e[1]+"!",$.access(this,function(c){return c===b?(l=this.triggerHandler("getData"+f,[e[0]]),l===b&&j&&(l=$.data(j,a),l=d(j,a,l)),l===b&&e[1]?this.data(e[0]):l):(e[1]=c,void this.each(function(){var b=$(this);b.triggerHandler("setData"+f,e),$.data(this,a,c),b.triggerHandler("changeData"+f,e)}))},null,c,arguments.length>1,null,!1))},removeData:function(a){return this.each(function(){$.removeData(this,a)})}}),$.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=$._data(a,b),c&&(!d||$.isArray(c)?d=$._data(a,b,$.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=$.queue(a,b),d=c.length,e=c.shift(),f=$._queueHooks(a,b),g=function(){$.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return $._data(a,c)||$._data(a,c,{empty:$.Callbacks("once memory").add(function(){$.removeData(a,b+"queue",!0),$.removeData(a,c,!0)})})}}),$.fn.extend({queue:function(a,c){var d=2;return"string"!=typeof a&&(c=a,a="fx",d--),arguments.length<d?$.queue(this[0],a):c===b?this:this.each(function(){var b=$.queue(this,a,c);$._queueHooks(this,a),"fx"===a&&"inprogress"!==b[0]&&$.dequeue(this,a)})},dequeue:function(a){return this.each(function(){$.dequeue(this,a)})},delay:function(a,b){return a=$.fx?$.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){var d,e=1,f=$.Deferred(),g=this,h=this.length,i=function(){--e||f.resolveWith(g,[g])};for("string"!=typeof a&&(c=a,a=b),a=a||"fx";h--;)d=$._data(g[h],a+"queueHooks"),d&&d.empty&&(e++,d.empty.add(i));return i(),f.promise(c)}});var rb,sb,tb,ub=/[\t\r\n]/g,vb=/\r/g,wb=/^(?:button|input)$/i,xb=/^(?:button|input|object|select|textarea)$/i,yb=/^a(?:rea|)$/i,zb=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,Ab=$.support.getSetAttribute;$.fn.extend({attr:function(a,b){return $.access(this,$.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){$.removeAttr(this,a)})},prop:function(a,b){return $.access(this,$.prop,a,b,arguments.length>1)},removeProp:function(a){return a=$.propFix[a]||a,this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,f,g,h;if($.isFunction(a))return this.each(function(b){$(this).addClass(a.call(this,b,this.className))});if(a&&"string"==typeof a)for(b=a.split(bb),c=0,d=this.length;d>c;c++)if(e=this[c],1===e.nodeType)if(e.className||1!==b.length){for(f=" "+e.className+" ",g=0,h=b.length;h>g;g++)f.indexOf(" "+b[g]+" ")<0&&(f+=b[g]+" ");e.className=$.trim(f)}else e.className=a;return this},removeClass:function(a){var c,d,e,f,g,h,i;if($.isFunction(a))return this.each(function(b){$(this).removeClass(a.call(this,b,this.className))});if(a&&"string"==typeof a||a===b)for(c=(a||"").split(bb),h=0,i=this.length;i>h;h++)if(e=this[h],1===e.nodeType&&e.className){for(d=(" "+e.className+" ").replace(ub," "),f=0,g=c.length;g>f;f++)for(;d.indexOf(" "+c[f]+" ")>=0;)d=d.replace(" "+c[f]+" "," ");e.className=a?$.trim(d):""}return this},toggleClass:function(a,b){var c=typeof a,d="boolean"==typeof b;return this.each($.isFunction(a)?function(c){$(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c)for(var e,f=0,g=$(this),h=b,i=a.split(bb);e=i[f++];)h=d?h:!g.hasClass(e),g[h?"addClass":"removeClass"](e);else("undefined"===c||"boolean"===c)&&(this.className&&$._data(this,"__className__",this.className),this.className=this.className||a===!1?"":$._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ub," ").indexOf(b)>=0)return!0;return!1},val:function(a){var c,d,e,f=this[0];{if(arguments.length)return e=$.isFunction(a),this.each(function(d){var f,g=$(this);1===this.nodeType&&(f=e?a.call(this,d,g.val()):a,null==f?f="":"number"==typeof f?f+="":$.isArray(f)&&(f=$.map(f,function(a){return null==a?"":a+""})),c=$.valHooks[this.type]||$.valHooks[this.nodeName.toLowerCase()],c&&"set"in c&&c.set(this,f,"value")!==b||(this.value=f))});if(f)return c=$.valHooks[f.type]||$.valHooks[f.nodeName.toLowerCase()],c&&"get"in c&&(d=c.get(f,"value"))!==b?d:(d=f.value,"string"==typeof d?d.replace(vb,""):null==d?"":d)}}}),$.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,f=a.selectedIndex,g=[],h=a.options,i="select-one"===a.type;if(0>f)return null;for(c=i?f:0,d=i?f+1:h.length;d>c;c++)if(e=h[c],!(!e.selected||($.support.optDisabled?e.disabled:null!==e.getAttribute("disabled"))||e.parentNode.disabled&&$.nodeName(e.parentNode,"optgroup"))){if(b=$(e).val(),i)return b;g.push(b)}return i&&!g.length&&h.length?$(h[f]).val():g},set:function(a,b){var c=$.makeArray(b);return $(a).find("option").each(function(){this.selected=$.inArray($(this).val(),c)>=0}),c.length||(a.selectedIndex=-1),c}}},attrFn:{},attr:function(a,c,d,e){var f,g,h,i=a.nodeType;if(a&&3!==i&&8!==i&&2!==i)return e&&$.isFunction($.fn[c])?$(a)[c](d):"undefined"==typeof a.getAttribute?$.prop(a,c,d):(h=1!==i||!$.isXMLDoc(a),h&&(c=c.toLowerCase(),g=$.attrHooks[c]||(zb.test(c)?sb:rb)),d!==b?null===d?void $.removeAttr(a,c):g&&"set"in g&&h&&(f=g.set(a,d,c))!==b?f:(a.setAttribute(c,d+""),d):g&&"get"in g&&h&&null!==(f=g.get(a,c))?f:(f=a.getAttribute(c),null===f?b:f))},removeAttr:function(a,b){var c,d,e,f,g=0;if(b&&1===a.nodeType)for(d=b.split(bb);g<d.length;g++)e=d[g],e&&(c=$.propFix[e]||e,f=zb.test(e),f||$.attr(a,e,""),a.removeAttribute(Ab?e:c),f&&c in a&&(a[c]=!1))},attrHooks:{type:{set:function(a,b){if(wb.test(a.nodeName)&&a.parentNode)$.error("type property can't be changed");else if(!$.support.radioValue&&"radio"===b&&$.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}},value:{get:function(a,b){return rb&&$.nodeName(a,"button")?rb.get(a,b):b in a?a.value:null},set:function(a,b,c){return rb&&$.nodeName(a,"button")?rb.set(a,b,c):void(a.value=b)}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,f,g,h=a.nodeType;if(a&&3!==h&&8!==h&&2!==h)return g=1!==h||!$.isXMLDoc(a),g&&(c=$.propFix[c]||c,f=$.propHooks[c]),d!==b?f&&"set"in f&&(e=f.set(a,d,c))!==b?e:a[c]=d:f&&"get"in f&&null!==(e=f.get(a,c))?e:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):xb.test(a.nodeName)||yb.test(a.nodeName)&&a.href?0:b}}}}),sb={get:function(a,c){var d,e=$.prop(a,c);return e===!0||"boolean"!=typeof e&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;return b===!1?$.removeAttr(a,c):(d=$.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase())),c}},Ab||(tb={name:!0,id:!0,coords:!0},rb=$.valHooks.button={get:function(a,c){var d;return d=a.getAttributeNode(c),d&&(tb[c]?""!==d.value:d.specified)?d.value:b},set:function(a,b,c){var d=a.getAttributeNode(c);return d||(d=P.createAttribute(c),a.setAttributeNode(d)),d.value=b+""}},$.each(["width","height"],function(a,b){$.attrHooks[b]=$.extend($.attrHooks[b],{set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0
}})}),$.attrHooks.contenteditable={get:rb.get,set:function(a,b,c){""===b&&(b="false"),rb.set(a,b,c)}}),$.support.hrefNormalized||$.each(["href","src","width","height"],function(a,c){$.attrHooks[c]=$.extend($.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return null===d?b:d}})}),$.support.style||($.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=b+""}}),$.support.optSelected||($.propHooks.selected=$.extend($.propHooks.selected,{get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}})),$.support.enctype||($.propFix.enctype="encoding"),$.support.checkOn||$.each(["radio","checkbox"],function(){$.valHooks[this]={get:function(a){return null===a.getAttribute("value")?"on":a.value}}}),$.each(["radio","checkbox"],function(){$.valHooks[this]=$.extend($.valHooks[this],{set:function(a,b){return $.isArray(b)?a.checked=$.inArray($(a).val(),b)>=0:void 0}})});var Bb=/^(?:textarea|input|select)$/i,Cb=/^([^\.]*|)(?:\.(.+)|)$/,Db=/(?:^|\s)hover(\.\S+|)\b/,Eb=/^key/,Fb=/^(?:mouse|contextmenu)|click/,Gb=/^(?:focusinfocus|focusoutblur)$/,Hb=function(a){return $.event.special.hover?a:a.replace(Db,"mouseenter$1 mouseleave$1")};$.event={add:function(a,c,d,e,f){var g,h,i,j,k,l,m,n,o,p,q;if(3!==a.nodeType&&8!==a.nodeType&&c&&d&&(g=$._data(a))){for(d.handler&&(o=d,d=o.handler,f=o.selector),d.guid||(d.guid=$.guid++),i=g.events,i||(g.events=i={}),h=g.handle,h||(g.handle=h=function(a){return"undefined"==typeof $||a&&$.event.triggered===a.type?b:$.event.dispatch.apply(h.elem,arguments)},h.elem=a),c=$.trim(Hb(c)).split(" "),j=0;j<c.length;j++)k=Cb.exec(c[j])||[],l=k[1],m=(k[2]||"").split(".").sort(),q=$.event.special[l]||{},l=(f?q.delegateType:q.bindType)||l,q=$.event.special[l]||{},n=$.extend({type:l,origType:k[1],data:e,handler:d,guid:d.guid,selector:f,needsContext:f&&$.expr.match.needsContext.test(f),namespace:m.join(".")},o),p=i[l],p||(p=i[l]=[],p.delegateCount=0,q.setup&&q.setup.call(a,e,m,h)!==!1||(a.addEventListener?a.addEventListener(l,h,!1):a.attachEvent&&a.attachEvent("on"+l,h))),q.add&&(q.add.call(a,n),n.handler.guid||(n.handler.guid=d.guid)),f?p.splice(p.delegateCount++,0,n):p.push(n),$.event.global[l]=!0;a=null}},global:{},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=$.hasData(a)&&$._data(a);if(q&&(m=q.events)){for(b=$.trim(Hb(b||"")).split(" "),f=0;f<b.length;f++)if(g=Cb.exec(b[f])||[],h=i=g[1],j=g[2],h){for(n=$.event.special[h]||{},h=(d?n.delegateType:n.bindType)||h,o=m[h]||[],k=o.length,j=j?new RegExp("(^|\\.)"+j.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null,l=0;l<o.length;l++)p=o[l],!e&&i!==p.origType||c&&c.guid!==p.guid||j&&!j.test(p.namespace)||d&&d!==p.selector&&("**"!==d||!p.selector)||(o.splice(l--,1),p.selector&&o.delegateCount--,n.remove&&n.remove.call(a,p));0===o.length&&k!==o.length&&(n.teardown&&n.teardown.call(a,j,q.handle)!==!1||$.removeEvent(a,h,q.handle),delete m[h])}else for(h in m)$.event.remove(a,h+b[f],c,d,!0);$.isEmptyObject(m)&&(delete q.handle,$.removeData(a,"events",!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,f){if(!e||3!==e.nodeType&&8!==e.nodeType){var g,h,i,j,k,l,m,n,o,p,q=c.type||c,r=[];if(!Gb.test(q+$.event.triggered)&&(q.indexOf("!")>=0&&(q=q.slice(0,-1),h=!0),q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),e&&!$.event.customEvent[q]||$.event.global[q]))if(c="object"==typeof c?c[$.expando]?c:new $.Event(q,c):new $.Event(q),c.type=q,c.isTrigger=!0,c.exclusive=h,c.namespace=r.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,l=q.indexOf(":")<0?"on"+q:"",e){if(c.result=b,c.target||(c.target=e),d=null!=d?$.makeArray(d):[],d.unshift(c),m=$.event.special[q]||{},!m.trigger||m.trigger.apply(e,d)!==!1){if(o=[[e,m.bindType||q]],!f&&!m.noBubble&&!$.isWindow(e)){for(p=m.delegateType||q,j=Gb.test(p+q)?e:e.parentNode,k=e;j;j=j.parentNode)o.push([j,p]),k=j;k===(e.ownerDocument||P)&&o.push([k.defaultView||k.parentWindow||a,p])}for(i=0;i<o.length&&!c.isPropagationStopped();i++)j=o[i][0],c.type=o[i][1],n=($._data(j,"events")||{})[c.type]&&$._data(j,"handle"),n&&n.apply(j,d),n=l&&j[l],n&&$.acceptData(j)&&n.apply&&n.apply(j,d)===!1&&c.preventDefault();return c.type=q,f||c.isDefaultPrevented()||m._default&&m._default.apply(e.ownerDocument,d)!==!1||"click"===q&&$.nodeName(e,"a")||!$.acceptData(e)||l&&e[q]&&("focus"!==q&&"blur"!==q||0!==c.target.offsetWidth)&&!$.isWindow(e)&&(k=e[l],k&&(e[l]=null),$.event.triggered=q,e[q](),$.event.triggered=b,k&&(e[l]=k)),c.result}}else{g=$.cache;for(i in g)g[i].events&&g[i].events[q]&&$.event.trigger(c,d,g[i].handle.elem,!0)}}},dispatch:function(c){c=$.event.fix(c||a.event);var d,e,f,g,h,i,j,k,l,m=($._data(this,"events")||{})[c.type]||[],n=m.delegateCount,o=V.call(arguments),p=!c.exclusive&&!c.namespace,q=$.event.special[c.type]||{},r=[];if(o[0]=c,c.delegateTarget=this,!q.preDispatch||q.preDispatch.call(this,c)!==!1){if(n&&(!c.button||"click"!==c.type))for(f=c.target;f!=this;f=f.parentNode||this)if(f.disabled!==!0||"click"!==c.type){for(h={},j=[],d=0;n>d;d++)k=m[d],l=k.selector,h[l]===b&&(h[l]=k.needsContext?$(l,this).index(f)>=0:$.find(l,this,null,[f]).length),h[l]&&j.push(k);j.length&&r.push({elem:f,matches:j})}for(m.length>n&&r.push({elem:this,matches:m.slice(n)}),d=0;d<r.length&&!c.isPropagationStopped();d++)for(i=r[d],c.currentTarget=i.elem,e=0;e<i.matches.length&&!c.isImmediatePropagationStopped();e++)k=i.matches[e],(p||!c.namespace&&!k.namespace||c.namespace_re&&c.namespace_re.test(k.namespace))&&(c.data=k.data,c.handleObj=k,g=(($.event.special[k.origType]||{}).handle||k.handler).apply(i.elem,o),g!==b&&(c.result=g,g===!1&&(c.preventDefault(),c.stopPropagation())));return q.postDispatch&&q.postDispatch.call(this,c),c.result}},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,c){var d,e,f,g=c.button,h=c.fromElement;return null==a.pageX&&null!=c.clientX&&(d=a.target.ownerDocument||P,e=d.documentElement,f=d.body,a.pageX=c.clientX+(e&&e.scrollLeft||f&&f.scrollLeft||0)-(e&&e.clientLeft||f&&f.clientLeft||0),a.pageY=c.clientY+(e&&e.scrollTop||f&&f.scrollTop||0)-(e&&e.clientTop||f&&f.clientTop||0)),!a.relatedTarget&&h&&(a.relatedTarget=h===a.target?c.toElement:h),a.which||g===b||(a.which=1&g?1:2&g?3:4&g?2:0),a}},fix:function(a){if(a[$.expando])return a;var b,c,d=a,e=$.event.fixHooks[a.type]||{},f=e.props?this.props.concat(e.props):this.props;for(a=$.Event(d),b=f.length;b;)c=f[--b],a[c]=d[c];return a.target||(a.target=d.srcElement||P),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,e.filter?e.filter(a,d):a},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){$.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=$.extend(new $.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?$.event.trigger(e,null,b):$.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},$.event.handle=$.event.dispatch,$.removeEvent=P.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&("undefined"==typeof a[d]&&(a[d]=null),a.detachEvent(d,c))},$.Event=function(a,b){return this instanceof $.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?g:f):this.type=a,b&&$.extend(this,b),this.timeStamp=a&&a.timeStamp||$.now(),void(this[$.expando]=!0)):new $.Event(a,b)},$.Event.prototype={preventDefault:function(){this.isDefaultPrevented=g;var a=this.originalEvent;a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=g;var a=this.originalEvent;a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=g,this.stopPropagation()},isDefaultPrevented:f,isPropagationStopped:f,isImmediatePropagationStopped:f},$.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){$.event.special[a]={delegateType:b,bindType:b,handle:function(a){{var c,d=this,e=a.relatedTarget,f=a.handleObj;f.selector}return(!e||e!==d&&!$.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),$.support.submitBubbles||($.event.special.submit={setup:function(){return $.nodeName(this,"form")?!1:void $.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=$.nodeName(c,"input")||$.nodeName(c,"button")?c.form:b;d&&!$._data(d,"_submit_attached")&&($.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),$._data(d,"_submit_attached",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&$.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return $.nodeName(this,"form")?!1:void $.event.remove(this,"._submit")}}),$.support.changeBubbles||($.event.special.change={setup:function(){return Bb.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&($.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),$.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),$.event.simulate("change",this,a,!0)})),!1):void $.event.add(this,"beforeactivate._change",function(a){var b=a.target;Bb.test(b.nodeName)&&!$._data(b,"_change_attached")&&($.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||$.event.simulate("change",this.parentNode,a,!0)}),$._data(b,"_change_attached",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return $.event.remove(this,"._change"),!Bb.test(this.nodeName)}}),$.support.focusinBubbles||$.each({focus:"focusin",blur:"focusout"},function(a,b){var c=0,d=function(a){$.event.simulate(b,a.target,$.event.fix(a),!0)};$.event.special[b]={setup:function(){0===c++&&P.addEventListener(a,d,!0)},teardown:function(){0===--c&&P.removeEventListener(a,d,!0)}}}),$.fn.extend({on:function(a,c,d,e,g){var h,i;if("object"==typeof a){"string"!=typeof c&&(d=d||c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}if(null==d&&null==e?(e=c,d=c=b):null==e&&("string"==typeof c?(e=d,d=b):(e=d,d=c,c=b)),e===!1)e=f;else if(!e)return this;return 1===g&&(h=e,e=function(a){return $().off(a),h.apply(this,arguments)},e.guid=h.guid||(h.guid=$.guid++)),this.each(function(){$.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){var e,g;if(a&&a.preventDefault&&a.handleObj)return e=a.handleObj,$(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler),this;if("object"==typeof a){for(g in a)this.off(g,c,a[g]);return this}return(c===!1||"function"==typeof c)&&(d=c,c=b),d===!1&&(d=f),this.each(function(){$.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){return $(this.context).on(a,this.selector,b,c),this},die:function(a,b){return $(this.context).off(a,this.selector||"**",b),this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)},trigger:function(a,b){return this.each(function(){$.event.trigger(a,b,this)})},triggerHandler:function(a,b){return this[0]?$.event.trigger(a,b,this[0],!0):void 0},toggle:function(a){var b=arguments,c=a.guid||$.guid++,d=0,e=function(c){var e=($._data(this,"lastToggle"+a.guid)||0)%d;return $._data(this,"lastToggle"+a.guid,e+1),c.preventDefault(),b[e].apply(this,arguments)||!1};for(e.guid=c;d<b.length;)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),$.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){$.fn[b]=function(a,c){return null==c&&(c=a,a=null),arguments.length>0?this.on(b,null,a,c):this.trigger(b)},Eb.test(b)&&($.event.fixHooks[b]=$.event.keyHooks),Fb.test(b)&&($.event.fixHooks[b]=$.event.mouseHooks)}),function(a,b){function c(a,b,c,d){c=c||[],b=b||F;var e,f,g,h,i=b.nodeType;if(!a||"string"!=typeof a)return c;if(1!==i&&9!==i)return[];if(g=v(b),!g&&!d&&(e=cb.exec(a)))if(h=e[1]){if(9===i){if(f=b.getElementById(h),!f||!f.parentNode)return c;if(f.id===h)return c.push(f),c}else if(b.ownerDocument&&(f=b.ownerDocument.getElementById(h))&&w(b,f)&&f.id===h)return c.push(f),c}else{if(e[2])return K.apply(c,L.call(b.getElementsByTagName(a),0)),c;if((h=e[3])&&mb&&b.getElementsByClassName)return K.apply(c,L.call(b.getElementsByClassName(h),0)),c}return p(a.replace(Z,"$1"),b,c,d,g)}function d(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function e(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function f(a){return N(function(b){return b=+b,N(function(c,d){for(var e,f=a([],c.length,b),g=f.length;g--;)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function g(a,b,c){if(a===b)return c;for(var d=a.nextSibling;d;){if(d===b)return-1;d=d.nextSibling}return 1}function h(a,b){var d,e,f,g,h,i,j,k=Q[D][a];if(k)return b?0:k.slice(0);for(h=a,i=[],j=t.preFilter;h;){(!d||(e=_.exec(h)))&&(e&&(h=h.slice(e[0].length)),i.push(f=[])),d=!1,(e=ab.exec(h))&&(f.push(d=new E(e.shift())),h=h.slice(d.length),d.type=e[0].replace(Z," "));for(g in t.filter)!(e=hb[g].exec(h))||j[g]&&!(e=j[g](e,F,!0))||(f.push(d=new E(e.shift())),h=h.slice(d.length),d.type=g,d.matches=e);if(!d)break}return b?h.length:h?c.error(a):Q(a,i).slice(0)}function i(a,b,c){var d=b.dir,e=c&&"parentNode"===b.dir,f=I++;return b.first?function(b,c,f){for(;b=b[d];)if(e||1===b.nodeType)return a(b,c,f)}:function(b,c,g){if(g){for(;b=b[d];)if((e||1===b.nodeType)&&a(b,c,g))return b}else for(var h,i=H+" "+f+" ",j=i+r;b=b[d];)if(e||1===b.nodeType){if((h=b[D])===j)return b.sizset;if("string"==typeof h&&0===h.indexOf(i)){if(b.sizset)return b}else{if(b[D]=j,a(b,c,g))return b.sizset=!0,b;b.sizset=!1}}}}function j(a){return a.length>1?function(b,c,d){for(var e=a.length;e--;)if(!a[e](b,c,d))return!1;return!0}:a[0]}function k(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function l(a,b,c,d,e,f){return d&&!d[D]&&(d=l(d)),e&&!e[D]&&(e=l(e,f)),N(function(f,g,h,i){if(!f||!e){var j,l,m,n=[],p=[],q=g.length,r=f||o(b||"*",h.nodeType?[h]:h,[],f),s=!a||!f&&b?r:k(r,n,a,h,i),t=c?e||(f?a:q||d)?[]:g:s;if(c&&c(s,t,h,i),d)for(m=k(t,p),d(m,[],h,i),j=m.length;j--;)(l=m[j])&&(t[p[j]]=!(s[p[j]]=l));if(f)for(j=a&&t.length;j--;)(l=t[j])&&(f[n[j]]=!(g[n[j]]=l));else t=k(t===g?t.splice(q,t.length):t),e?e(null,g,t,i):K.apply(g,t)}})}function m(a){for(var b,c,d,e=a.length,f=t.relative[a[0].type],g=f||t.relative[" "],h=f?1:0,k=i(function(a){return a===b},g,!0),n=i(function(a){return M.call(b,a)>-1},g,!0),o=[function(a,c,d){return!f&&(d||c!==A)||((b=c).nodeType?k(a,c,d):n(a,c,d))}];e>h;h++)if(c=t.relative[a[h].type])o=[i(j(o),c)];else{if(c=t.filter[a[h].type].apply(null,a[h].matches),c[D]){for(d=++h;e>d&&!t.relative[a[d].type];d++);return l(h>1&&j(o),h>1&&a.slice(0,h-1).join("").replace(Z,"$1"),c,d>h&&m(a.slice(h,d)),e>d&&m(a=a.slice(d)),e>d&&a.join(""))}o.push(c)}return j(o)}function n(a,b){var d=b.length>0,e=a.length>0,f=function(g,h,i,j,l){var m,n,o,p=[],q=0,s="0",u=g&&[],v=null!=l,w=A,x=g||e&&t.find.TAG("*",l&&h.parentNode||h),y=H+=null==w?1:Math.E;for(v&&(A=h!==F&&h,r=f.el);null!=(m=x[s]);s++){if(e&&m){for(n=0;o=a[n];n++)if(o(m,h,i)){j.push(m);break}v&&(H=y,r=++f.el)}d&&((m=!o&&m)&&q--,g&&u.push(m))}if(q+=s,d&&s!==q){for(n=0;o=b[n];n++)o(u,p,h,i);if(g){if(q>0)for(;s--;)u[s]||p[s]||(p[s]=J.call(j));p=k(p)}K.apply(j,p),v&&!g&&p.length>0&&q+b.length>1&&c.uniqueSort(j)}return v&&(H=y,A=w),u};return f.el=0,d?N(f):f}function o(a,b,d,e){for(var f=0,g=b.length;g>f;f++)c(a,b[f],d,e);return d}function p(a,b,c,d,e){{var f,g,i,j,k,l=h(a);l.length}if(!d&&1===l.length){if(g=l[0]=l[0].slice(0),g.length>2&&"ID"===(i=g[0]).type&&9===b.nodeType&&!e&&t.relative[g[1].type]){if(b=t.find.ID(i.matches[0].replace(gb,""),b,e)[0],!b)return c;a=a.slice(g.shift().length)}for(f=hb.POS.test(a)?-1:g.length-1;f>=0&&(i=g[f],!t.relative[j=i.type]);f--)if((k=t.find[j])&&(d=k(i.matches[0].replace(gb,""),db.test(g[0].type)&&b.parentNode||b,e))){if(g.splice(f,1),a=d.length&&g.join(""),!a)return K.apply(c,L.call(d,0)),c;break}}return x(a,l)(d,b,e,c,db.test(a)),c}function q(){}var r,s,t,u,v,w,x,y,z,A,B=!0,C="undefined",D=("sizcache"+Math.random()).replace(".",""),E=String,F=a.document,G=F.documentElement,H=0,I=0,J=[].pop,K=[].push,L=[].slice,M=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},N=function(a,b){return a[D]=null==b||b,a},O=function(){var a={},b=[];return N(function(c,d){return b.push(c)>t.cacheLength&&delete a[b.shift()],a[c]=d},a)},P=O(),Q=O(),R=O(),S="[\\x20\\t\\r\\n\\f]",T="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",U=T.replace("w","w#"),V="([*^$|!~]?=)",W="\\["+S+"*("+T+")"+S+"*(?:"+V+S+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+U+")|)|)"+S+"*\\]",X=":("+T+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+W+")|[^:]|\\\\.)*|.*))\\)|)",Y=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+S+"*((?:-\\d)?\\d*)"+S+"*\\)|)(?=[^-]|$)",Z=new RegExp("^"+S+"+|((?:^|[^\\\\])(?:\\\\.)*)"+S+"+$","g"),_=new RegExp("^"+S+"*,"+S+"*"),ab=new RegExp("^"+S+"*([\\x20\\t\\r\\n\\f>+~])"+S+"*"),bb=new RegExp(X),cb=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,db=/[\x20\t\r\n\f]*[+~]/,eb=/h\d/i,fb=/input|select|textarea|button/i,gb=/\\(?!\\)/g,hb={ID:new RegExp("^#("+T+")"),CLASS:new RegExp("^\\.("+T+")"),NAME:new RegExp("^\\[name=['\"]?("+T+")['\"]?\\]"),TAG:new RegExp("^("+T.replace("w","w*")+")"),ATTR:new RegExp("^"+W),PSEUDO:new RegExp("^"+X),POS:new RegExp(Y,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+S+"*(even|odd|(([+-]|)(\\d*)n|)"+S+"*(?:([+-]|)"+S+"*(\\d+)|))"+S+"*\\)|)","i"),needsContext:new RegExp("^"+S+"*[>+~]|"+Y,"i")},ib=function(a){var b=F.createElement("div");try{return a(b)}catch(c){return!1}finally{b=null}},jb=ib(function(a){return a.appendChild(F.createComment("")),!a.getElementsByTagName("*").length}),kb=ib(function(a){return a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!==C&&"#"===a.firstChild.getAttribute("href")}),lb=ib(function(a){a.innerHTML="<select></select>";var b=typeof a.lastChild.getAttribute("multiple");return"boolean"!==b&&"string"!==b}),mb=ib(function(a){return a.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",a.getElementsByClassName&&a.getElementsByClassName("e").length?(a.lastChild.className="e",2===a.getElementsByClassName("e").length):!1}),nb=ib(function(a){a.id=D+0,a.innerHTML="<a name='"+D+"'></a><div name='"+D+"'></div>",G.insertBefore(a,G.firstChild);var b=F.getElementsByName&&F.getElementsByName(D).length===2+F.getElementsByName(D+0).length;return s=!F.getElementById(D),G.removeChild(a),b});try{L.call(G.childNodes,0)[0].nodeType}catch(ob){L=function(a){for(var b,c=[];b=this[a];a++)c.push(b);return c}}c.matches=function(a,b){return c(a,null,null,b)},c.matchesSelector=function(a,b){return c(b,null,null,[a]).length>0},u=c.getText=function(a){var b,c="",d=0,e=a.nodeType;if(e){if(1===e||9===e||11===e){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=u(a)}else if(3===e||4===e)return a.nodeValue}else for(;b=a[d];d++)c+=u(b);return c},v=c.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},w=c.contains=G.contains?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!!(d&&1===d.nodeType&&c.contains&&c.contains(d))}:G.compareDocumentPosition?function(a,b){return b&&!!(16&a.compareDocumentPosition(b))}:function(a,b){for(;b=b.parentNode;)if(b===a)return!0;return!1},c.attr=function(a,b){var c,d=v(a);return d||(b=b.toLowerCase()),(c=t.attrHandle[b])?c(a):d||lb?a.getAttribute(b):(c=a.getAttributeNode(b),c?"boolean"==typeof a[b]?a[b]?b:null:c.specified?c.value:null:null)},t=c.selectors={cacheLength:50,createPseudo:N,match:hb,attrHandle:kb?{}:{href:function(a){return a.getAttribute("href",2)},type:function(a){return a.getAttribute("type")}},find:{ID:s?function(a,b,c){if(typeof b.getElementById!==C&&!c){var d=b.getElementById(a);return d&&d.parentNode?[d]:[]}}:function(a,c,d){if(typeof c.getElementById!==C&&!d){var e=c.getElementById(a);return e?e.id===a||typeof e.getAttributeNode!==C&&e.getAttributeNode("id").value===a?[e]:b:[]}},TAG:jb?function(a,b){return typeof b.getElementsByTagName!==C?b.getElementsByTagName(a):void 0}:function(a,b){var c=b.getElementsByTagName(a);if("*"===a){for(var d,e=[],f=0;d=c[f];f++)1===d.nodeType&&e.push(d);return e}return c},NAME:nb&&function(a,b){return typeof b.getElementsByName!==C?b.getElementsByName(name):void 0},CLASS:mb&&function(a,b,c){return typeof b.getElementsByClassName===C||c?void 0:b.getElementsByClassName(a)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(gb,""),a[3]=(a[4]||a[5]||"").replace(gb,""),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1]?(a[2]||c.error(a[0]),a[3]=+(a[3]?a[4]+(a[5]||1):2*("even"===a[2]||"odd"===a[2])),a[4]=+(a[6]+a[7]||"odd"===a[2])):a[2]&&c.error(a[0]),a},PSEUDO:function(a){var b,c;return hb.CHILD.test(a[0])?null:(a[3]?a[2]=a[3]:(b=a[4])&&(bb.test(b)&&(c=h(b,!0))&&(c=b.indexOf(")",b.length-c)-b.length)&&(b=b.slice(0,c),a[0]=a[0].slice(0,c)),a[2]=b),a.slice(0,3))}},filter:{ID:s?function(a){return a=a.replace(gb,""),function(b){return b.getAttribute("id")===a}}:function(a){return a=a.replace(gb,""),function(b){var c=typeof b.getAttributeNode!==C&&b.getAttributeNode("id");return c&&c.value===a}},TAG:function(a){return"*"===a?function(){return!0}:(a=a.replace(gb,"").toLowerCase(),function(b){return b.nodeName&&b.nodeName.toLowerCase()===a})},CLASS:function(a){var b=P[D][a];return b||(b=P(a,new RegExp("(^|"+S+")"+a+"("+S+"|$)"))),function(a){return b.test(a.className||typeof a.getAttribute!==C&&a.getAttribute("class")||"")}},ATTR:function(a,b,d){return function(e){var f=c.attr(e,a);return null==f?"!="===b:b?(f+="","="===b?f===d:"!="===b?f!==d:"^="===b?d&&0===f.indexOf(d):"*="===b?d&&f.indexOf(d)>-1:"$="===b?d&&f.substr(f.length-d.length)===d:"~="===b?(" "+f+" ").indexOf(d)>-1:"|="===b?f===d||f.substr(0,d.length+1)===d+"-":!1):!0}},CHILD:function(a,b,c,d){return"nth"===a?function(a){var b,e,f=a.parentNode;if(1===c&&0===d)return!0;if(f)for(e=0,b=f.firstChild;b&&(1!==b.nodeType||(e++,a!==b));b=b.nextSibling);return e-=d,e===c||e%c===0&&e/c>=0}:function(b){var c=b;switch(a){case"only":case"first":for(;c=c.previousSibling;)if(1===c.nodeType)return!1;if("first"===a)return!0;c=b;case"last":for(;c=c.nextSibling;)if(1===c.nodeType)return!1;return!0}}},PSEUDO:function(a,b){var d,e=t.pseudos[a]||t.setFilters[a.toLowerCase()]||c.error("unsupported pseudo: "+a);return e[D]?e(b):e.length>1?(d=[a,a,"",b],t.setFilters.hasOwnProperty(a.toLowerCase())?N(function(a,c){for(var d,f=e(a,b),g=f.length;g--;)d=M.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,d)}):e}},pseudos:{not:N(function(a){var b=[],c=[],d=x(a.replace(Z,"$1"));return d[D]?N(function(a,b,c,e){for(var f,g=d(a,null,e,[]),h=a.length;h--;)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:N(function(a){return function(b){return c(a,b).length>0}}),contains:N(function(a){return function(b){return(b.textContent||b.innerText||u(b)).indexOf(a)>-1}}),enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},parent:function(a){return!t.pseudos.empty(a)},empty:function(a){var b;for(a=a.firstChild;a;){if(a.nodeName>"@"||3===(b=a.nodeType)||4===b)return!1;a=a.nextSibling}return!0},header:function(a){return eb.test(a.nodeName)},text:function(a){var b,c;return"input"===a.nodeName.toLowerCase()&&"text"===(b=a.type)&&(null==(c=a.getAttribute("type"))||c.toLowerCase()===b)},radio:d("radio"),checkbox:d("checkbox"),file:d("file"),password:d("password"),image:d("image"),submit:e("submit"),reset:e("reset"),button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},input:function(a){return fb.test(a.nodeName)},focus:function(a){var b=a.ownerDocument;return!(a!==b.activeElement||b.hasFocus&&!b.hasFocus()||!a.type&&!a.href)},active:function(a){return a===a.ownerDocument.activeElement},first:f(function(){return[0]}),last:f(function(a,b){return[b-1]}),eq:f(function(a,b,c){return[0>c?c+b:c]}),even:f(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:f(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:f(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:f(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},y=G.compareDocumentPosition?function(a,b){return a===b?(z=!0,0):(a.compareDocumentPosition&&b.compareDocumentPosition?4&a.compareDocumentPosition(b):a.compareDocumentPosition)?-1:1}:function(a,b){if(a===b)return z=!0,0;if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],h=a.parentNode,i=b.parentNode,j=h;if(h===i)return g(a,b);if(!h)return-1;if(!i)return 1;for(;j;)e.unshift(j),j=j.parentNode;for(j=i;j;)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;c>k&&d>k;k++)if(e[k]!==f[k])return g(e[k],f[k]);return k===c?g(a,f[k],-1):g(e[k],b,1)},[0,0].sort(y),B=!z,c.uniqueSort=function(a){var b,c=1;if(z=B,a.sort(y),z)for(;b=a[c];c++)b===a[c-1]&&a.splice(c--,1);return a},c.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},x=c.compile=function(a,b){var c,d=[],e=[],f=R[D][a];if(!f){for(b||(b=h(a)),c=b.length;c--;)f=m(b[c]),f[D]?d.push(f):e.push(f);f=R(a,n(e,d))}return f},F.querySelectorAll&&!function(){var a,b=p,d=/'|\\/g,e=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,f=[":focus"],g=[":active",":focus"],i=G.matchesSelector||G.mozMatchesSelector||G.webkitMatchesSelector||G.oMatchesSelector||G.msMatchesSelector;ib(function(a){a.innerHTML="<select><option selected=''></option></select>",a.querySelectorAll("[selected]").length||f.push("\\["+S+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),a.querySelectorAll(":checked").length||f.push(":checked")}),ib(function(a){a.innerHTML="<p test=''></p>",a.querySelectorAll("[test^='']").length&&f.push("[*^$]="+S+"*(?:\"\"|'')"),a.innerHTML="<input type='hidden'/>",a.querySelectorAll(":enabled").length||f.push(":enabled",":disabled")}),f=new RegExp(f.join("|")),p=function(a,c,e,g,i){if(!(g||i||f&&f.test(a))){var j,k,l=!0,m=D,n=c,o=9===c.nodeType&&a;if(1===c.nodeType&&"object"!==c.nodeName.toLowerCase()){for(j=h(a),(l=c.getAttribute("id"))?m=l.replace(d,"\\$&"):c.setAttribute("id",m),m="[id='"+m+"'] ",k=j.length;k--;)j[k]=m+j[k].join("");n=db.test(a)&&c.parentNode||c,o=j.join(",")}if(o)try{return K.apply(e,L.call(n.querySelectorAll(o),0)),e}catch(p){}finally{l||c.removeAttribute("id")}}return b(a,c,e,g,i)},i&&(ib(function(b){a=i.call(b,"div");try{i.call(b,"[test!='']:sizzle"),g.push("!=",X)}catch(c){}}),g=new RegExp(g.join("|")),c.matchesSelector=function(b,d){if(d=d.replace(e,"='$1']"),!(v(b)||g.test(d)||f&&f.test(d)))try{var h=i.call(b,d);if(h||a||b.document&&11!==b.document.nodeType)return h}catch(j){}return c(d,null,null,[b]).length>0})}(),t.pseudos.nth=t.pseudos.eq,t.filters=q.prototype=t.pseudos,t.setFilters=new q,c.attr=$.attr,$.find=c,$.expr=c.selectors,$.expr[":"]=$.expr.pseudos,$.unique=c.uniqueSort,$.text=c.getText,$.isXMLDoc=c.isXML,$.contains=c.contains}(a);var Ib=/Until$/,Jb=/^(?:parents|prev(?:Until|All))/,Kb=/^.[^:#\[\.,]*$/,Lb=$.expr.match.needsContext,Mb={children:!0,contents:!0,next:!0,prev:!0};$.fn.extend({find:function(a){var b,c,d,e,f,g,h=this;if("string"!=typeof a)return $(a).filter(function(){for(b=0,c=h.length;c>b;b++)if($.contains(h[b],this))return!0});for(g=this.pushStack("","find",a),b=0,c=this.length;c>b;b++)if(d=g.length,$.find(a,this[b],g),b>0)for(e=d;e<g.length;e++)for(f=0;d>f;f++)if(g[f]===g[e]){g.splice(e--,1);break}return g},has:function(a){var b,c=$(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if($.contains(this,c[b]))return!0})},not:function(a){return this.pushStack(j(this,a,!1),"not",a)},filter:function(a){return this.pushStack(j(this,a,!0),"filter",a)},is:function(a){return!!a&&("string"==typeof a?Lb.test(a)?$(a,this.context).index(this[0])>=0:$.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=Lb.test(a)||"string"!=typeof a?$(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c.ownerDocument&&c!==b&&11!==c.nodeType;){if(g?g.index(c)>-1:$.find.matchesSelector(c,a)){f.push(c);break}c=c.parentNode}return f=f.length>1?$.unique(f):f,this.pushStack(f,"closest",a)},index:function(a){return a?"string"==typeof a?$.inArray(this[0],$(a)):$.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(a,b){var c="string"==typeof a?$(a,b):$.makeArray(a&&a.nodeType?[a]:a),d=$.merge(this.get(),c);return this.pushStack(h(c[0])||h(d[0])?d:$.unique(d))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}}),$.fn.andSelf=$.fn.addBack,$.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return $.dir(a,"parentNode")},parentsUntil:function(a,b,c){return $.dir(a,"parentNode",c)},next:function(a){return i(a,"nextSibling")},prev:function(a){return i(a,"previousSibling")},nextAll:function(a){return $.dir(a,"nextSibling")},prevAll:function(a){return $.dir(a,"previousSibling")},nextUntil:function(a,b,c){return $.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return $.dir(a,"previousSibling",c)},siblings:function(a){return $.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return $.sibling(a.firstChild)},contents:function(a){return $.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:$.merge([],a.childNodes)}},function(a,b){$.fn[a]=function(c,d){var e=$.map(this,b,c);return Ib.test(a)||(d=c),d&&"string"==typeof d&&(e=$.filter(d,e)),e=this.length>1&&!Mb[a]?$.unique(e):e,this.length>1&&Jb.test(a)&&(e=e.reverse()),this.pushStack(e,a,V.call(arguments).join(","))}}),$.extend({filter:function(a,b,c){return c&&(a=":not("+a+")"),1===b.length?$.find.matchesSelector(b[0],a)?[b[0]]:[]:$.find.matches(a,b)},dir:function(a,c,d){for(var e=[],f=a[c];f&&9!==f.nodeType&&(d===b||1!==f.nodeType||!$(f).is(d));)1===f.nodeType&&e.push(f),f=f[c];return e},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}});var Nb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",Ob=/ jQuery\d+="(?:null|\d+)"/g,Pb=/^\s+/,Qb=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Rb=/<([\w:]+)/,Sb=/<tbody/i,Tb=/<|&#?\w+;/,Ub=/<(?:script|style|link)/i,Vb=/<(?:script|object|embed|option|style)/i,Wb=new RegExp("<(?:"+Nb+")[\\s/>]","i"),Xb=/^(?:checkbox|radio)$/,Yb=/checked\s*(?:[^=]|=\s*.checked.)/i,Zb=/\/(java|ecma)script/i,$b=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,_b={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},ac=k(P),bc=ac.appendChild(P.createElement("div"));
_b.optgroup=_b.option,_b.tbody=_b.tfoot=_b.colgroup=_b.caption=_b.thead,_b.th=_b.td,$.support.htmlSerialize||(_b._default=[1,"X<div>","</div>"]),$.fn.extend({text:function(a){return $.access(this,function(a){return a===b?$.text(this):this.empty().append((this[0]&&this[0].ownerDocument||P).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if($.isFunction(a))return this.each(function(b){$(this).wrapAll(a.call(this,b))});if(this[0]){var b=$(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){for(var a=this;a.firstChild&&1===a.firstChild.nodeType;)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each($.isFunction(a)?function(b){$(this).wrapInner(a.call(this,b))}:function(){var b=$(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=$.isFunction(a);return this.each(function(c){$(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){$.nodeName(this,"body")||$(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){(1===this.nodeType||11===this.nodeType)&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){(1===this.nodeType||11===this.nodeType)&&this.insertBefore(a,this.firstChild)})},before:function(){if(!h(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=$.clean(arguments);return this.pushStack($.merge(a,this),"before",this.selector)}},after:function(){if(!h(this[0]))return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=$.clean(arguments);return this.pushStack($.merge(this,a),"after",this.selector)}},remove:function(a,b){for(var c,d=0;null!=(c=this[d]);d++)(!a||$.filter(a,[c]).length)&&(b||1!==c.nodeType||($.cleanData(c.getElementsByTagName("*")),$.cleanData([c])),c.parentNode&&c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)for(1===a.nodeType&&$.cleanData(a.getElementsByTagName("*"));a.firstChild;)a.removeChild(a.firstChild);return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return $.clone(this,a,b)})},html:function(a){return $.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return 1===c.nodeType?c.innerHTML.replace(Ob,""):b;if(!("string"!=typeof a||Ub.test(a)||!$.support.htmlSerialize&&Wb.test(a)||!$.support.leadingWhitespace&&Pb.test(a)||_b[(Rb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(Qb,"<$1></$2>");try{for(;e>d;d++)c=this[d]||{},1===c.nodeType&&($.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(f){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){return h(this[0])?this.length?this.pushStack($($.isFunction(a)?a():a),"replaceWith",a):this:$.isFunction(a)?this.each(function(b){var c=$(this),d=c.html();c.replaceWith(a.call(this,b,d))}):("string"!=typeof a&&(a=$(a).detach()),this.each(function(){var b=this.nextSibling,c=this.parentNode;$(this).remove(),b?$(b).before(a):$(c).append(a)}))},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){a=[].concat.apply([],a);var e,f,g,h,i=0,j=a[0],k=[],m=this.length;if(!$.support.checkClone&&m>1&&"string"==typeof j&&Yb.test(j))return this.each(function(){$(this).domManip(a,c,d)});if($.isFunction(j))return this.each(function(e){var f=$(this);a[0]=j.call(this,e,c?f.html():b),f.domManip(a,c,d)});if(this[0]){if(e=$.buildFragment(a,this,k),g=e.fragment,f=g.firstChild,1===g.childNodes.length&&(g=f),f)for(c=c&&$.nodeName(f,"tr"),h=e.cacheable||m-1;m>i;i++)d.call(c&&$.nodeName(this[i],"table")?l(this[i],"tbody"):this[i],i===h?g:$.clone(g,!0,!0));g=f=null,k.length&&$.each(k,function(a,b){b.src?$.ajax?$.ajax({url:b.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):$.error("no ajax"):$.globalEval((b.text||b.textContent||b.innerHTML||"").replace($b,"")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),$.buildFragment=function(a,c,d){var e,f,g,h=a[0];return c=c||P,c=!c.nodeType&&c[0]||c,c=c.ownerDocument||c,!(1===a.length&&"string"==typeof h&&h.length<512&&c===P&&"<"===h.charAt(0))||Vb.test(h)||!$.support.checkClone&&Yb.test(h)||!$.support.html5Clone&&Wb.test(h)||(f=!0,e=$.fragments[h],g=e!==b),e||(e=c.createDocumentFragment(),$.clean(a,c,e,d),f&&($.fragments[h]=g&&e)),{fragment:e,cacheable:f}},$.fragments={},$.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){$.fn[a]=function(c){var d,e=0,f=[],g=$(c),h=g.length,i=1===this.length&&this[0].parentNode;if((null==i||i&&11===i.nodeType&&1===i.childNodes.length)&&1===h)return g[b](this[0]),this;for(;h>e;e++)d=(e>0?this.clone(!0):this).get(),$(g[e])[b](d),f=f.concat(d);return this.pushStack(f,a,g.selector)}}),$.extend({clone:function(a,b,c){var d,e,f,g;if($.support.html5Clone||$.isXMLDoc(a)||!Wb.test("<"+a.nodeName+">")?g=a.cloneNode(!0):(bc.innerHTML=a.outerHTML,bc.removeChild(g=bc.firstChild)),!($.support.noCloneEvent&&$.support.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||$.isXMLDoc(a)))for(n(a,g),d=o(a),e=o(g),f=0;d[f];++f)e[f]&&n(d[f],e[f]);if(b&&(m(a,g),c))for(d=o(a),e=o(g),f=0;d[f];++f)m(d[f],e[f]);return d=e=null,g},clean:function(a,b,c,d){var e,f,g,h,i,j,l,m,n,o,q,r=b===P&&ac,s=[];for(b&&"undefined"!=typeof b.createDocumentFragment||(b=P),e=0;null!=(g=a[e]);e++)if("number"==typeof g&&(g+=""),g){if("string"==typeof g)if(Tb.test(g)){for(r=r||k(b),l=b.createElement("div"),r.appendChild(l),g=g.replace(Qb,"<$1></$2>"),h=(Rb.exec(g)||["",""])[1].toLowerCase(),i=_b[h]||_b._default,j=i[0],l.innerHTML=i[1]+g+i[2];j--;)l=l.lastChild;if(!$.support.tbody)for(m=Sb.test(g),n="table"!==h||m?"<table>"!==i[1]||m?[]:l.childNodes:l.firstChild&&l.firstChild.childNodes,f=n.length-1;f>=0;--f)$.nodeName(n[f],"tbody")&&!n[f].childNodes.length&&n[f].parentNode.removeChild(n[f]);!$.support.leadingWhitespace&&Pb.test(g)&&l.insertBefore(b.createTextNode(Pb.exec(g)[0]),l.firstChild),g=l.childNodes,l.parentNode.removeChild(l)}else g=b.createTextNode(g);g.nodeType?s.push(g):$.merge(s,g)}if(l&&(g=l=r=null),!$.support.appendChecked)for(e=0;null!=(g=s[e]);e++)$.nodeName(g,"input")?p(g):"undefined"!=typeof g.getElementsByTagName&&$.grep(g.getElementsByTagName("input"),p);if(c)for(o=function(a){return!a.type||Zb.test(a.type)?d?d.push(a.parentNode?a.parentNode.removeChild(a):a):c.appendChild(a):void 0},e=0;null!=(g=s[e]);e++)$.nodeName(g,"script")&&o(g)||(c.appendChild(g),"undefined"!=typeof g.getElementsByTagName&&(q=$.grep($.merge([],g.getElementsByTagName("script")),o),s.splice.apply(s,[e+1,0].concat(q)),e+=q.length));return s},cleanData:function(a,b){for(var c,d,e,f,g=0,h=$.expando,i=$.cache,j=$.support.deleteExpando,k=$.event.special;null!=(e=a[g]);g++)if((b||$.acceptData(e))&&(d=e[h],c=d&&i[d])){if(c.events)for(f in c.events)k[f]?$.event.remove(e,f):$.removeEvent(e,f,c.handle);i[d]&&(delete i[d],j?delete e[h]:e.removeAttribute?e.removeAttribute(h):e[h]=null,$.deletedIds.push(d))}}}),function(){var a,b;$.uaMatch=function(a){a=a.toLowerCase();var b=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},a=$.uaMatch(R.userAgent),b={},a.browser&&(b[a.browser]=!0,b.version=a.version),b.chrome?b.webkit=!0:b.webkit&&(b.safari=!0),$.browser=b,$.sub=function(){function a(b,c){return new a.fn.init(b,c)}$.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(c,d){return d&&d instanceof $&&!(d instanceof a)&&(d=a(d)),$.fn.init.call(this,c,d,b)},a.fn.init.prototype=a.fn;var b=a(P);return a}}();var cc,dc,ec,fc=/alpha\([^)]*\)/i,gc=/opacity=([^)]*)/,hc=/^(top|right|bottom|left)$/,ic=/^(none|table(?!-c[ea]).+)/,jc=/^margin/,kc=new RegExp("^("+_+")(.*)$","i"),lc=new RegExp("^("+_+")(?!px)[a-z%]+$","i"),mc=new RegExp("^([-+])=("+_+")","i"),nc={},oc={position:"absolute",visibility:"hidden",display:"block"},pc={letterSpacing:0,fontWeight:400},qc=["Top","Right","Bottom","Left"],rc=["Webkit","O","Moz","ms"],sc=$.fn.toggle;$.fn.extend({css:function(a,c){return $.access(this,function(a,c,d){return d!==b?$.style(a,c,d):$.css(a,c)},a,c,arguments.length>1)},show:function(){return s(this,!0)},hide:function(){return s(this)},toggle:function(a,b){var c="boolean"==typeof a;return $.isFunction(a)&&$.isFunction(b)?sc.apply(this,arguments):this.each(function(){(c?a:r(this))?$(this).show():$(this).hide()})}}),$.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=cc(a,"opacity");return""===c?"1":c}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":$.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var f,g,h,i=$.camelCase(c),j=a.style;if(c=$.cssProps[i]||($.cssProps[i]=q(j,i)),h=$.cssHooks[c]||$.cssHooks[i],d===b)return h&&"get"in h&&(f=h.get(a,!1,e))!==b?f:j[c];if(g=typeof d,"string"===g&&(f=mc.exec(d))&&(d=(f[1]+1)*f[2]+parseFloat($.css(a,c)),g="number"),!(null==d||"number"===g&&isNaN(d)||("number"!==g||$.cssNumber[i]||(d+="px"),h&&"set"in h&&(d=h.set(a,d,e))===b)))try{j[c]=d}catch(k){}}},css:function(a,c,d,e){var f,g,h,i=$.camelCase(c);return c=$.cssProps[i]||($.cssProps[i]=q(a.style,i)),h=$.cssHooks[c]||$.cssHooks[i],h&&"get"in h&&(f=h.get(a,!0,e)),f===b&&(f=cc(a,c)),"normal"===f&&c in pc&&(f=pc[c]),d||e!==b?(g=parseFloat(f),d||$.isNumeric(g)?g||0:f):f},swap:function(a,b,c){var d,e,f={};for(e in b)f[e]=a.style[e],a.style[e]=b[e];d=c.call(a);for(e in b)a.style[e]=f[e];return d}}),a.getComputedStyle?cc=function(b,c){var d,e,f,g,h=a.getComputedStyle(b,null),i=b.style;return h&&(d=h[c],""!==d||$.contains(b.ownerDocument,b)||(d=$.style(b,c)),lc.test(d)&&jc.test(c)&&(e=i.width,f=i.minWidth,g=i.maxWidth,i.minWidth=i.maxWidth=i.width=d,d=h.width,i.width=e,i.minWidth=f,i.maxWidth=g)),d}:P.documentElement.currentStyle&&(cc=function(a,b){var c,d,e=a.currentStyle&&a.currentStyle[b],f=a.style;return null==e&&f&&f[b]&&(e=f[b]),lc.test(e)&&!hc.test(b)&&(c=f.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),f.left="fontSize"===b?"1em":e,e=f.pixelLeft+"px",f.left=c,d&&(a.runtimeStyle.left=d)),""===e?"auto":e}),$.each(["height","width"],function(a,b){$.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&ic.test(cc(a,"display"))?$.swap(a,oc,function(){return v(a,b,d)}):v(a,b,d):void 0},set:function(a,c,d){return t(a,c,d?u(a,b,d,$.support.boxSizing&&"border-box"===$.css(a,"boxSizing")):0)}}}),$.support.opacity||($.cssHooks.opacity={get:function(a,b){return gc.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=$.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,b>=1&&""===$.trim(f.replace(fc,""))&&c.removeAttribute&&(c.removeAttribute("filter"),d&&!d.filter)||(c.filter=fc.test(f)?f.replace(fc,e):f+" "+e)}}),$(function(){$.support.reliableMarginRight||($.cssHooks.marginRight={get:function(a,b){return $.swap(a,{display:"inline-block"},function(){return b?cc(a,"marginRight"):void 0})}}),!$.support.pixelPosition&&$.fn.position&&$.each(["top","left"],function(a,b){$.cssHooks[b]={get:function(a,c){if(c){var d=cc(a,b);return lc.test(d)?$(a).position()[b]+"px":d}}}})}),$.expr&&$.expr.filters&&($.expr.filters.hidden=function(a){return 0===a.offsetWidth&&0===a.offsetHeight||!$.support.reliableHiddenOffsets&&"none"===(a.style&&a.style.display||cc(a,"display"))},$.expr.filters.visible=function(a){return!$.expr.filters.hidden(a)}),$.each({margin:"",padding:"",border:"Width"},function(a,b){$.cssHooks[a+b]={expand:function(c){var d,e="string"==typeof c?c.split(" "):[c],f={};for(d=0;4>d;d++)f[a+qc[d]+b]=e[d]||e[d-2]||e[0];return f}},jc.test(a)||($.cssHooks[a+b].set=t)});var tc=/%20/g,uc=/\[\]$/,vc=/\r?\n/g,wc=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,xc=/^(?:select|textarea)/i;$.fn.extend({serialize:function(){return $.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?$.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||xc.test(this.nodeName)||wc.test(this.type))}).map(function(a,b){var c=$(this).val();return null==c?null:$.isArray(c)?$.map(c,function(a){return{name:b.name,value:a.replace(vc,"\r\n")}}):{name:b.name,value:c.replace(vc,"\r\n")}}).get()}}),$.param=function(a,c){var d,e=[],f=function(a,b){b=$.isFunction(b)?b():null==b?"":b,e[e.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(c===b&&(c=$.ajaxSettings&&$.ajaxSettings.traditional),$.isArray(a)||a.jquery&&!$.isPlainObject(a))$.each(a,function(){f(this.name,this.value)});else for(d in a)x(d,a[d],c,f);return e.join("&").replace(tc,"+")};var yc,zc,Ac=/#.*$/,Bc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Cc=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,Dc=/^(?:GET|HEAD)$/,Ec=/^\/\//,Fc=/\?/,Gc=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,Hc=/([?&])_=[^&]*/,Ic=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Jc=$.fn.load,Kc={},Lc={},Mc=["*/"]+["*"];try{zc=Q.href}catch(Nc){zc=P.createElement("a"),zc.href="",zc=zc.href}yc=Ic.exec(zc.toLowerCase())||[],$.fn.load=function(a,c,d){if("string"!=typeof a&&Jc)return Jc.apply(this,arguments);if(!this.length)return this;var e,f,g,h=this,i=a.indexOf(" ");return i>=0&&(e=a.slice(i,a.length),a=a.slice(0,i)),$.isFunction(c)?(d=c,c=b):c&&"object"==typeof c&&(f="POST"),$.ajax({url:a,type:f,dataType:"html",data:c,complete:function(a,b){d&&h.each(d,g||[a.responseText,b,a])}}).done(function(a){g=arguments,h.html(e?$("<div>").append(a.replace(Gc,"")).find(e):a)}),this},$.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){$.fn[b]=function(a){return this.on(b,a)}}),$.each(["get","post"],function(a,c){$[c]=function(a,d,e,f){return $.isFunction(d)&&(f=f||e,e=d,d=b),$.ajax({type:c,url:a,data:d,success:e,dataType:f})}}),$.extend({getScript:function(a,c){return $.get(a,b,c,"script")},getJSON:function(a,b,c){return $.get(a,b,c,"json")},ajaxSetup:function(a,b){return b?A(a,$.ajaxSettings):(b=a,a=$.ajaxSettings),A(a,b),a},ajaxSettings:{url:zc,isLocal:Cc.test(yc[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Mc},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":$.parseJSON,"text xml":$.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:y(Kc),ajaxTransport:y(Lc),ajax:function(a,c){function d(a,c,d,g){var j,l,s,t,v,x=c;2!==u&&(u=2,i&&clearTimeout(i),h=b,f=g||"",w.readyState=a>0?4:0,d&&(t=B(m,w,d)),a>=200&&300>a||304===a?(m.ifModified&&(v=w.getResponseHeader("Last-Modified"),v&&($.lastModified[e]=v),v=w.getResponseHeader("Etag"),v&&($.etag[e]=v)),304===a?(x="notmodified",j=!0):(j=C(m,t),x=j.state,l=j.data,s=j.error,j=!s)):(s=x,(!x||a)&&(x="error",0>a&&(a=0))),w.status=a,w.statusText=(c||x)+"",j?p.resolveWith(n,[l,x,w]):p.rejectWith(n,[w,x,s]),w.statusCode(r),r=b,k&&o.trigger("ajax"+(j?"Success":"Error"),[w,m,j?l:s]),q.fireWith(n,[w,x]),k&&(o.trigger("ajaxComplete",[w,m]),--$.active||$.event.trigger("ajaxStop")))}"object"==typeof a&&(c=a,a=b),c=c||{};var e,f,g,h,i,j,k,l,m=$.ajaxSetup({},c),n=m.context||m,o=n!==m&&(n.nodeType||n instanceof $)?$(n):$.event,p=$.Deferred(),q=$.Callbacks("once memory"),r=m.statusCode||{},s={},t={},u=0,v="canceled",w={readyState:0,setRequestHeader:function(a,b){if(!u){var c=a.toLowerCase();a=t[c]=t[c]||a,s[a]=b}return this},getAllResponseHeaders:function(){return 2===u?f:null},getResponseHeader:function(a){var c;if(2===u){if(!g)for(g={};c=Bc.exec(f);)g[c[1].toLowerCase()]=c[2];c=g[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){return u||(m.mimeType=a),this},abort:function(a){return a=a||v,h&&h.abort(a),d(0,a),this}};if(p.promise(w),w.success=w.done,w.error=w.fail,w.complete=q.add,w.statusCode=function(a){if(a){var b;if(2>u)for(b in a)r[b]=[r[b],a[b]];else b=a[w.status],w.always(b)}return this},m.url=((a||m.url)+"").replace(Ac,"").replace(Ec,yc[1]+"//"),m.dataTypes=$.trim(m.dataType||"*").toLowerCase().split(bb),null==m.crossDomain&&(j=Ic.exec(m.url.toLowerCase())||!1,m.crossDomain=j&&j.join(":")+(j[3]?"":"http:"===j[1]?80:443)!==yc.join(":")+(yc[3]?"":"http:"===yc[1]?80:443)),m.data&&m.processData&&"string"!=typeof m.data&&(m.data=$.param(m.data,m.traditional)),z(Kc,m,c,w),2===u)return w;if(k=m.global,m.type=m.type.toUpperCase(),m.hasContent=!Dc.test(m.type),k&&0===$.active++&&$.event.trigger("ajaxStart"),!m.hasContent&&(m.data&&(m.url+=(Fc.test(m.url)?"&":"?")+m.data,delete m.data),e=m.url,m.cache===!1)){var x=$.now(),y=m.url.replace(Hc,"$1_="+x);m.url=y+(y===m.url?(Fc.test(m.url)?"&":"?")+"_="+x:"")}(m.data&&m.hasContent&&m.contentType!==!1||c.contentType)&&w.setRequestHeader("Content-Type",m.contentType),m.ifModified&&(e=e||m.url,$.lastModified[e]&&w.setRequestHeader("If-Modified-Since",$.lastModified[e]),$.etag[e]&&w.setRequestHeader("If-None-Match",$.etag[e])),w.setRequestHeader("Accept",m.dataTypes[0]&&m.accepts[m.dataTypes[0]]?m.accepts[m.dataTypes[0]]+("*"!==m.dataTypes[0]?", "+Mc+"; q=0.01":""):m.accepts["*"]);for(l in m.headers)w.setRequestHeader(l,m.headers[l]);if(m.beforeSend&&(m.beforeSend.call(n,w,m)===!1||2===u))return w.abort();v="abort";for(l in{success:1,error:1,complete:1})w[l](m[l]);if(h=z(Lc,m,c,w)){w.readyState=1,k&&o.trigger("ajaxSend",[w,m]),m.async&&m.timeout>0&&(i=setTimeout(function(){w.abort("timeout")},m.timeout));try{u=1,h.send(s,d)}catch(A){if(!(2>u))throw A;d(-1,A)}}else d(-1,"No Transport");return w},active:0,lastModified:{},etag:{}});var Oc=[],Pc=/\?/,Qc=/(=)\?(?=&|$)|\?\?/,Rc=$.now();$.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Oc.pop()||$.expando+"_"+Rc++;return this[a]=!0,a}}),$.ajaxPrefilter("json jsonp",function(c,d,e){var f,g,h,i=c.data,j=c.url,k=c.jsonp!==!1,l=k&&Qc.test(j),m=k&&!l&&"string"==typeof i&&!(c.contentType||"").indexOf("application/x-www-form-urlencoded")&&Qc.test(i);return"jsonp"===c.dataTypes[0]||l||m?(f=c.jsonpCallback=$.isFunction(c.jsonpCallback)?c.jsonpCallback():c.jsonpCallback,g=a[f],l?c.url=j.replace(Qc,"$1"+f):m?c.data=i.replace(Qc,"$1"+f):k&&(c.url+=(Pc.test(j)?"&":"?")+c.jsonp+"="+f),c.converters["script json"]=function(){return h||$.error(f+" was not called"),h[0]},c.dataTypes[0]="json",a[f]=function(){h=arguments},e.always(function(){a[f]=g,c[f]&&(c.jsonpCallback=d.jsonpCallback,Oc.push(f)),h&&$.isFunction(g)&&g(h[0]),h=g=b}),"script"):void 0}),$.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){return $.globalEval(a),a}}}),$.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),$.ajaxTransport("script",function(a){if(a.crossDomain){var c,d=P.head||P.getElementsByTagName("head")[0]||P.documentElement;return{send:function(e,f){c=P.createElement("script"),c.async="async",a.scriptCharset&&(c.charset=a.scriptCharset),c.src=a.url,c.onload=c.onreadystatechange=function(a,e){(e||!c.readyState||/loaded|complete/.test(c.readyState))&&(c.onload=c.onreadystatechange=null,d&&c.parentNode&&d.removeChild(c),c=b,e||f(200,"success"))},d.insertBefore(c,d.firstChild)},abort:function(){c&&c.onload(0,1)}}}});var Sc,Tc=a.ActiveXObject?function(){for(var a in Sc)Sc[a](0,1)}:!1,Uc=0;$.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&D()||E()}:D,function(a){$.extend($.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}($.ajaxSettings.xhr()),$.support.ajax&&$.ajaxTransport(function(c){if(!c.crossDomain||$.support.cors){var d;return{send:function(e,f){var g,h,i=c.xhr();if(c.username?i.open(c.type,c.url,c.async,c.username,c.password):i.open(c.type,c.url,c.async),c.xhrFields)for(h in c.xhrFields)i[h]=c.xhrFields[h];c.mimeType&&i.overrideMimeType&&i.overrideMimeType(c.mimeType),c.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");try{for(h in e)i.setRequestHeader(h,e[h])}catch(j){}i.send(c.hasContent&&c.data||null),d=function(a,e){var h,j,k,l,m;try{if(d&&(e||4===i.readyState))if(d=b,g&&(i.onreadystatechange=$.noop,Tc&&delete Sc[g]),e)4!==i.readyState&&i.abort();else{h=i.status,k=i.getAllResponseHeaders(),l={},m=i.responseXML,m&&m.documentElement&&(l.xml=m);try{l.text=i.responseText}catch(a){}try{j=i.statusText}catch(n){j=""}h||!c.isLocal||c.crossDomain?1223===h&&(h=204):h=l.text?200:404}}catch(o){e||f(-1,o)}l&&f(h,j,l,k)},c.async?4===i.readyState?setTimeout(d,0):(g=++Uc,Tc&&(Sc||(Sc={},$(a).unload(Tc)),Sc[g]=d),i.onreadystatechange=d):d()},abort:function(){d&&d(0,1)}}}});var Vc,Wc,Xc=/^(?:toggle|show|hide)$/,Yc=new RegExp("^(?:([-+])=|)("+_+")([a-z%]*)$","i"),Zc=/queueHooks$/,$c=[J],_c={"*":[function(a,b){var c,d,e=this.createTween(a,b),f=Yc.exec(b),g=e.cur(),h=+g||0,i=1,j=20;if(f){if(c=+f[2],d=f[3]||($.cssNumber[a]?"":"px"),"px"!==d&&h){h=$.css(e.elem,a,!0)||c||1;do i=i||".5",h/=i,$.style(e.elem,a,h+d);while(i!==(i=e.cur()/g)&&1!==i&&--j)}e.unit=d,e.start=h,e.end=f[1]?h+(f[1]+1)*c:c}return e}]};$.Animation=$.extend(H,{tweener:function(a,b){$.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],_c[c]=_c[c]||[],_c[c].unshift(b)},prefilter:function(a,b){b?$c.unshift(a):$c.push(a)}}),$.Tween=K,K.prototype={constructor:K,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||($.cssNumber[c]?"":"px")},cur:function(){var a=K.propHooks[this.prop];return a&&a.get?a.get(this):K.propHooks._default.get(this)},run:function(a){var b,c=K.propHooks[this.prop];return this.pos=b=this.options.duration?$.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):K.propHooks._default.set(this),this}},K.prototype.init.prototype=K.prototype,K.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=$.css(a.elem,a.prop,!1,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){$.fx.step[a.prop]?$.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[$.cssProps[a.prop]]||$.cssHooks[a.prop])?$.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},K.propHooks.scrollTop=K.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},$.each(["toggle","show","hide"],function(a,b){var c=$.fn[b];$.fn[b]=function(d,e,f){return null==d||"boolean"==typeof d||!a&&$.isFunction(d)&&$.isFunction(e)?c.apply(this,arguments):this.animate(L(b,!0),d,e,f)}}),$.fn.extend({fadeTo:function(a,b,c,d){return this.filter(r).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=$.isEmptyObject(a),f=$.speed(b,c,d),g=function(){var b=H(this,$.extend({},a),f);e&&b.stop(!0)};return e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,c,d){var e=function(a){var b=a.stop;delete a.stop,b(d)};return"string"!=typeof a&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,c=null!=a&&a+"queueHooks",f=$.timers,g=$._data(this);if(c)g[c]&&g[c].stop&&e(g[c]);else for(c in g)g[c]&&g[c].stop&&Zc.test(c)&&e(g[c]);for(c=f.length;c--;)f[c].elem!==this||null!=a&&f[c].queue!==a||(f[c].anim.stop(d),b=!1,f.splice(c,1));(b||!d)&&$.dequeue(this,a)})}}),$.each({slideDown:L("show"),slideUp:L("hide"),slideToggle:L("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){$.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),$.speed=function(a,b,c){var d=a&&"object"==typeof a?$.extend({},a):{complete:c||!c&&b||$.isFunction(a)&&a,duration:a,easing:c&&b||b&&!$.isFunction(b)&&b};return d.duration=$.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in $.fx.speeds?$.fx.speeds[d.duration]:$.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){$.isFunction(d.old)&&d.old.call(this),d.queue&&$.dequeue(this,d.queue)},d},$.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},$.timers=[],$.fx=K.prototype.init,$.fx.tick=function(){for(var a,b=$.timers,c=0;c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||$.fx.stop()},$.fx.timer=function(a){a()&&$.timers.push(a)&&!Wc&&(Wc=setInterval($.fx.tick,$.fx.interval))},$.fx.interval=13,$.fx.stop=function(){clearInterval(Wc),Wc=null},$.fx.speeds={slow:600,fast:200,_default:400},$.fx.step={},$.expr&&$.expr.filters&&($.expr.filters.animated=function(a){return $.grep($.timers,function(b){return a===b.elem}).length});var ad=/^(?:body|html)$/i;$.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){$.offset.setOffset(this,a,b)});var c,d,e,f,g,h,i,j={top:0,left:0},k=this[0],l=k&&k.ownerDocument;if(l)return(d=l.body)===k?$.offset.bodyOffset(k):(c=l.documentElement,$.contains(c,k)?("undefined"!=typeof k.getBoundingClientRect&&(j=k.getBoundingClientRect()),e=M(l),f=c.clientTop||d.clientTop||0,g=c.clientLeft||d.clientLeft||0,h=e.pageYOffset||c.scrollTop,i=e.pageXOffset||c.scrollLeft,{top:j.top+h-f,left:j.left+i-g}):j)},$.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;return $.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat($.css(a,"marginTop"))||0,c+=parseFloat($.css(a,"marginLeft"))||0),{top:b,left:c}},setOffset:function(a,b,c){var d=$.css(a,"position");"static"===d&&(a.style.position="relative");var e,f,g=$(a),h=g.offset(),i=$.css(a,"top"),j=$.css(a,"left"),k=("absolute"===d||"fixed"===d)&&$.inArray("auto",[i,j])>-1,l={},m={};k?(m=g.position(),e=m.top,f=m.left):(e=parseFloat(i)||0,f=parseFloat(j)||0),$.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(l.top=b.top-h.top+e),null!=b.left&&(l.left=b.left-h.left+f),"using"in b?b.using.call(a,l):g.css(l)}},$.fn.extend({position:function(){if(this[0]){var a=this[0],b=this.offsetParent(),c=this.offset(),d=ad.test(b[0].nodeName)?{top:0,left:0}:b.offset();return c.top-=parseFloat($.css(a,"marginTop"))||0,c.left-=parseFloat($.css(a,"marginLeft"))||0,d.top+=parseFloat($.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat($.css(b[0],"borderLeftWidth"))||0,{top:c.top-d.top,left:c.left-d.left}}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||P.body;a&&!ad.test(a.nodeName)&&"static"===$.css(a,"position");)a=a.offsetParent;return a||P.body})}}),$.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);$.fn[a]=function(e){return $.access(this,function(a,e,f){var g=M(a);return f===b?g?c in g?g[c]:g.document.documentElement[e]:a[e]:void(g?g.scrollTo(d?$(g).scrollLeft():f,d?f:$(g).scrollTop()):a[e]=f)},a,e,arguments.length,null)}}),$.each({Height:"height",Width:"width"},function(a,c){$.each({padding:"inner"+a,content:c,"":"outer"+a},function(d,e){$.fn[e]=function(e,f){var g=arguments.length&&(d||"boolean"!=typeof e),h=d||(e===!0||f===!0?"margin":"border");return $.access(this,function(c,d,e){var f;return $.isWindow(c)?c.document.documentElement["client"+a]:9===c.nodeType?(f=c.documentElement,Math.max(c.body["scroll"+a],f["scroll"+a],c.body["offset"+a],f["offset"+a],f["client"+a])):e===b?$.css(c,d,e,h):$.style(c,d,e,h)},c,g?e:b,g,null)}})}),a.jQuery=a.$=$,"function"==typeof define&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return $})}(window),function(){var a=this,b=a._,c={},d=Array.prototype,e=Object.prototype,f=Function.prototype,g=d.push,h=d.slice,i=d.concat,j=(d.unshift,e.toString),k=e.hasOwnProperty,l=d.forEach,m=d.map,n=d.reduce,o=d.reduceRight,p=d.filter,q=d.every,r=d.some,s=d.indexOf,t=d.lastIndexOf,u=Array.isArray,v=Object.keys,w=f.bind,x=function(a){return a instanceof x?a:this instanceof x?void(this._wrapped=a):new x(a)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=x),exports._=x):a._=x,x.VERSION="1.4.2";var y=x.each=x.forEach=function(a,b,d){if(null!=a)if(l&&a.forEach===l)a.forEach(b,d);else if(a.length===+a.length){for(var e=0,f=a.length;f>e;e++)if(b.call(d,a[e],e,a)===c)return}else for(var g in a)if(x.has(a,g)&&b.call(d,a[g],g,a)===c)return};x.map=x.collect=function(a,b,c){var d=[];return null==a?d:m&&a.map===m?a.map(b,c):(y(a,function(a,e,f){d[d.length]=b.call(c,a,e,f)}),d)},x.reduce=x.foldl=x.inject=function(a,b,c,d){var e=arguments.length>2;if(null==a&&(a=[]),n&&a.reduce===n)return d&&(b=x.bind(b,d)),e?a.reduce(b,c):a.reduce(b);if(y(a,function(a,f,g){e?c=b.call(d,c,a,f,g):(c=a,e=!0)}),!e)throw new TypeError("Reduce of empty array with no initial value");return c},x.reduceRight=x.foldr=function(a,b,c,d){var e=arguments.length>2;if(null==a&&(a=[]),o&&a.reduceRight===o)return d&&(b=x.bind(b,d)),arguments.length>2?a.reduceRight(b,c):a.reduceRight(b);var f=a.length;if(f!==+f){var g=x.keys(a);f=g.length}if(y(a,function(h,i,j){i=g?g[--f]:--f,e?c=b.call(d,c,a[i],i,j):(c=a[i],e=!0)}),!e)throw new TypeError("Reduce of empty array with no initial value");return c},x.find=x.detect=function(a,b,c){var d;return z(a,function(a,e,f){return b.call(c,a,e,f)?(d=a,!0):void 0}),d},x.filter=x.select=function(a,b,c){var d=[];return null==a?d:p&&a.filter===p?a.filter(b,c):(y(a,function(a,e,f){b.call(c,a,e,f)&&(d[d.length]=a)}),d)},x.reject=function(a,b,c){var d=[];return null==a?d:(y(a,function(a,e,f){b.call(c,a,e,f)||(d[d.length]=a)}),d)},x.every=x.all=function(a,b,d){b||(b=x.identity);var e=!0;return null==a?e:q&&a.every===q?a.every(b,d):(y(a,function(a,f,g){return(e=e&&b.call(d,a,f,g))?void 0:c}),!!e)};var z=x.some=x.any=function(a,b,d){b||(b=x.identity);var e=!1;return null==a?e:r&&a.some===r?a.some(b,d):(y(a,function(a,f,g){return e||(e=b.call(d,a,f,g))?c:void 0}),!!e)};x.contains=x.include=function(a,b){var c=!1;return null==a?c:s&&a.indexOf===s?-1!=a.indexOf(b):c=z(a,function(a){return a===b})},x.invoke=function(a,b){var c=h.call(arguments,2);return x.map(a,function(a){return(x.isFunction(b)?b:a[b]).apply(a,c)})},x.pluck=function(a,b){return x.map(a,function(a){return a[b]})},x.where=function(a,b){return x.isEmpty(b)?[]:x.filter(a,function(a){for(var c in b)if(b[c]!==a[c])return!1;return!0})},x.max=function(a,b,c){if(!b&&x.isArray(a)&&a[0]===+a[0]&&a.length<65535)return Math.max.apply(Math,a);if(!b&&x.isEmpty(a))return-1/0;var d={computed:-1/0};return y(a,function(a,e,f){var g=b?b.call(c,a,e,f):a;g>=d.computed&&(d={value:a,computed:g})}),d.value},x.min=function(a,b,c){if(!b&&x.isArray(a)&&a[0]===+a[0]&&a.length<65535)return Math.min.apply(Math,a);if(!b&&x.isEmpty(a))return 1/0;var d={computed:1/0};return y(a,function(a,e,f){var g=b?b.call(c,a,e,f):a;g<d.computed&&(d={value:a,computed:g})}),d.value},x.shuffle=function(a){var b,c=0,d=[];return y(a,function(a){b=x.random(c++),d[c-1]=d[b],d[b]=a}),d};var A=function(a){return x.isFunction(a)?a:function(b){return b[a]}};x.sortBy=function(a,b,c){var d=A(b);return x.pluck(x.map(a,function(a,b,e){return{value:a,index:b,criteria:d.call(c,a,b,e)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;if(c!==d){if(c>d||void 0===c)return 1;if(d>c||void 0===d)return-1}return a.index<b.index?-1:1}),"value")};var B=function(a,b,c,d){var e={},f=A(b);return y(a,function(b,g){var h=f.call(c,b,g,a);d(e,h,b)}),e};x.groupBy=function(a,b,c){return B(a,b,c,function(a,b,c){(x.has(a,b)?a[b]:a[b]=[]).push(c)})},x.countBy=function(a,b,c){return B(a,b,c,function(a,b){x.has(a,b)||(a[b]=0),a[b]++
})},x.sortedIndex=function(a,b,c,d){c=null==c?x.identity:A(c);for(var e=c.call(d,b),f=0,g=a.length;g>f;){var h=f+g>>>1;c.call(d,a[h])<e?f=h+1:g=h}return f},x.toArray=function(a){return a?a.length===+a.length?h.call(a):x.values(a):[]},x.size=function(a){return a.length===+a.length?a.length:x.keys(a).length},x.first=x.head=x.take=function(a,b,c){return null==b||c?a[0]:h.call(a,0,b)},x.initial=function(a,b,c){return h.call(a,0,a.length-(null==b||c?1:b))},x.last=function(a,b,c){return null==b||c?a[a.length-1]:h.call(a,Math.max(a.length-b,0))},x.rest=x.tail=x.drop=function(a,b,c){return h.call(a,null==b||c?1:b)},x.compact=function(a){return x.filter(a,function(a){return!!a})};var C=function(a,b,c){return y(a,function(a){x.isArray(a)?b?g.apply(c,a):C(a,b,c):c.push(a)}),c};x.flatten=function(a,b){return C(a,b,[])},x.without=function(a){return x.difference(a,h.call(arguments,1))},x.uniq=x.unique=function(a,b,c,d){var e=c?x.map(a,c,d):a,f=[],g=[];return y(e,function(c,d){(b?d&&g[g.length-1]===c:x.contains(g,c))||(g.push(c),f.push(a[d]))}),f},x.union=function(){return x.uniq(i.apply(d,arguments))},x.intersection=function(a){var b=h.call(arguments,1);return x.filter(x.uniq(a),function(a){return x.every(b,function(b){return x.indexOf(b,a)>=0})})},x.difference=function(a){var b=i.apply(d,h.call(arguments,1));return x.filter(a,function(a){return!x.contains(b,a)})},x.zip=function(){for(var a=h.call(arguments),b=x.max(x.pluck(a,"length")),c=new Array(b),d=0;b>d;d++)c[d]=x.pluck(a,""+d);return c},x.object=function(a,b){for(var c={},d=0,e=a.length;e>d;d++)b?c[a[d]]=b[d]:c[a[d][0]]=a[d][1];return c},x.indexOf=function(a,b,c){if(null==a)return-1;var d=0,e=a.length;if(c){if("number"!=typeof c)return d=x.sortedIndex(a,b),a[d]===b?d:-1;d=0>c?Math.max(0,e+c):c}if(s&&a.indexOf===s)return a.indexOf(b,c);for(;e>d;d++)if(a[d]===b)return d;return-1},x.lastIndexOf=function(a,b,c){if(null==a)return-1;var d=null!=c;if(t&&a.lastIndexOf===t)return d?a.lastIndexOf(b,c):a.lastIndexOf(b);for(var e=d?c:a.length;e--;)if(a[e]===b)return e;return-1},x.range=function(a,b,c){arguments.length<=1&&(b=a||0,a=0),c=arguments[2]||1;for(var d=Math.max(Math.ceil((b-a)/c),0),e=0,f=new Array(d);d>e;)f[e++]=a,a+=c;return f};var D=function(){};x.bind=function(a,b){var c,d;if(a.bind===w&&w)return w.apply(a,h.call(arguments,1));if(!x.isFunction(a))throw new TypeError;return d=h.call(arguments,2),c=function(){if(!(this instanceof c))return a.apply(b,d.concat(h.call(arguments)));D.prototype=a.prototype;var e=new D,f=a.apply(e,d.concat(h.call(arguments)));return Object(f)===f?f:e}},x.bindAll=function(a){var b=h.call(arguments,1);return 0==b.length&&(b=x.functions(a)),y(b,function(b){a[b]=x.bind(a[b],a)}),a},x.memoize=function(a,b){var c={};return b||(b=x.identity),function(){var d=b.apply(this,arguments);return x.has(c,d)?c[d]:c[d]=a.apply(this,arguments)}},x.delay=function(a,b){var c=h.call(arguments,2);return setTimeout(function(){return a.apply(null,c)},b)},x.defer=function(a){return x.delay.apply(x,[a,1].concat(h.call(arguments,1)))},x.throttle=function(a,b){var c,d,e,f,g,h,i=x.debounce(function(){g=f=!1},b);return function(){c=this,d=arguments;var j=function(){e=null,g&&(h=a.apply(c,d)),i()};return e||(e=setTimeout(j,b)),f?g=!0:(f=!0,h=a.apply(c,d)),i(),h}},x.debounce=function(a,b,c){var d,e;return function(){var f=this,g=arguments,h=function(){d=null,c||(e=a.apply(f,g))},i=c&&!d;return clearTimeout(d),d=setTimeout(h,b),i&&(e=a.apply(f,g)),e}},x.once=function(a){var b,c=!1;return function(){return c?b:(c=!0,b=a.apply(this,arguments),a=null,b)}},x.wrap=function(a,b){return function(){var c=[a];return g.apply(c,arguments),b.apply(this,c)}},x.compose=function(){var a=arguments;return function(){for(var b=arguments,c=a.length-1;c>=0;c--)b=[a[c].apply(this,b)];return b[0]}},x.after=function(a,b){return 0>=a?b():function(){return--a<1?b.apply(this,arguments):void 0}},x.keys=v||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var b=[];for(var c in a)x.has(a,c)&&(b[b.length]=c);return b},x.values=function(a){var b=[];for(var c in a)x.has(a,c)&&b.push(a[c]);return b},x.pairs=function(a){var b=[];for(var c in a)x.has(a,c)&&b.push([c,a[c]]);return b},x.invert=function(a){var b={};for(var c in a)x.has(a,c)&&(b[a[c]]=c);return b},x.functions=x.methods=function(a){var b=[];for(var c in a)x.isFunction(a[c])&&b.push(c);return b.sort()},x.extend=function(a){return y(h.call(arguments,1),function(b){for(var c in b)a[c]=b[c]}),a},x.pick=function(a){var b={},c=i.apply(d,h.call(arguments,1));return y(c,function(c){c in a&&(b[c]=a[c])}),b},x.omit=function(a){var b={},c=i.apply(d,h.call(arguments,1));for(var e in a)x.contains(c,e)||(b[e]=a[e]);return b},x.defaults=function(a){return y(h.call(arguments,1),function(b){for(var c in b)null==a[c]&&(a[c]=b[c])}),a},x.clone=function(a){return x.isObject(a)?x.isArray(a)?a.slice():x.extend({},a):a},x.tap=function(a,b){return b(a),a};var E=function(a,b,c,d){if(a===b)return 0!==a||1/a==1/b;if(null==a||null==b)return a===b;a instanceof x&&(a=a._wrapped),b instanceof x&&(b=b._wrapped);var e=j.call(a);if(e!=j.call(b))return!1;switch(e){case"[object String]":return a==String(b);case"[object Number]":return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case"[object Date]":case"[object Boolean]":return+a==+b;case"[object RegExp]":return a.source==b.source&&a.global==b.global&&a.multiline==b.multiline&&a.ignoreCase==b.ignoreCase}if("object"!=typeof a||"object"!=typeof b)return!1;for(var f=c.length;f--;)if(c[f]==a)return d[f]==b;c.push(a),d.push(b);var g=0,h=!0;if("[object Array]"==e){if(g=a.length,h=g==b.length)for(;g--&&(h=E(a[g],b[g],c,d)););}else{var i=a.constructor,k=b.constructor;if(i!==k&&!(x.isFunction(i)&&i instanceof i&&x.isFunction(k)&&k instanceof k))return!1;for(var l in a)if(x.has(a,l)&&(g++,!(h=x.has(b,l)&&E(a[l],b[l],c,d))))break;if(h){for(l in b)if(x.has(b,l)&&!g--)break;h=!g}}return c.pop(),d.pop(),h};x.isEqual=function(a,b){return E(a,b,[],[])},x.isEmpty=function(a){if(null==a)return!0;if(x.isArray(a)||x.isString(a))return 0===a.length;for(var b in a)if(x.has(a,b))return!1;return!0},x.isElement=function(a){return!(!a||1!==a.nodeType)},x.isArray=u||function(a){return"[object Array]"==j.call(a)},x.isObject=function(a){return a===Object(a)},y(["Arguments","Function","String","Number","Date","RegExp"],function(a){x["is"+a]=function(b){return j.call(b)=="[object "+a+"]"}}),x.isArguments(arguments)||(x.isArguments=function(a){return!(!a||!x.has(a,"callee"))}),"function"!=typeof/./&&(x.isFunction=function(a){return"function"==typeof a}),x.isFinite=function(a){return x.isNumber(a)&&isFinite(a)},x.isNaN=function(a){return x.isNumber(a)&&a!=+a},x.isBoolean=function(a){return a===!0||a===!1||"[object Boolean]"==j.call(a)},x.isNull=function(a){return null===a},x.isUndefined=function(a){return void 0===a},x.has=function(a,b){return k.call(a,b)},x.noConflict=function(){return a._=b,this},x.identity=function(a){return a},x.times=function(a,b,c){for(var d=0;a>d;d++)b.call(c,d)},x.random=function(a,b){return null==b&&(b=a,a=0),a+(0|Math.random()*(b-a+1))};var F={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};F.unescape=x.invert(F.escape);var G={escape:new RegExp("["+x.keys(F.escape).join("")+"]","g"),unescape:new RegExp("("+x.keys(F.unescape).join("|")+")","g")};x.each(["escape","unescape"],function(a){x[a]=function(b){return null==b?"":(""+b).replace(G[a],function(b){return F[a][b]})}}),x.result=function(a,b){if(null==a)return null;var c=a[b];return x.isFunction(c)?c.call(a):c},x.mixin=function(a){y(x.functions(a),function(b){var c=x[b]=a[b];x.prototype[b]=function(){var a=[this._wrapped];return g.apply(a,arguments),L.call(this,c.apply(x,a))}})};var H=0;x.uniqueId=function(a){var b=H++;return a?a+b:b},x.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var I=/(.)^/,J={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},K=/\\|'|\r|\n|\t|\u2028|\u2029/g;x.template=function(a,b,c){c=x.defaults({},c,x.templateSettings);var d=new RegExp([(c.escape||I).source,(c.interpolate||I).source,(c.evaluate||I).source].join("|")+"|$","g"),e=0,f="__p+='";a.replace(d,function(b,c,d,g,h){f+=a.slice(e,h).replace(K,function(a){return"\\"+J[a]}),f+=c?"'+\n((__t=("+c+"))==null?'':_.escape(__t))+\n'":d?"'+\n((__t=("+d+"))==null?'':__t)+\n'":g?"';\n"+g+"\n__p+='":"",e=h+b.length}),f+="';\n",c.variable||(f="with(obj||{}){\n"+f+"}\n"),f="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+f+"return __p;\n";try{var g=new Function(c.variable||"obj","_",f)}catch(h){throw h.source=f,h}if(b)return g(b,x);var i=function(a){return g.call(this,a,x)};return i.source="function("+(c.variable||"obj")+"){\n"+f+"}",i},x.chain=function(a){return x(a).chain()};var L=function(a){return this._chain?x(a).chain():a};x.mixin(x),y(["pop","push","reverse","shift","sort","splice","unshift"],function(a){var b=d[a];x.prototype[a]=function(){var c=this._wrapped;return b.apply(c,arguments),"shift"!=a&&"splice"!=a||0!==c.length||delete c[0],L.call(this,c)}}),y(["concat","join","slice"],function(a){var b=d[a];x.prototype[a]=function(){return L.call(this,b.apply(this._wrapped,arguments))}}),x.extend(x.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}.call(this),function(){var a,b=this,c=b.Backbone,d=Array.prototype.slice,e=Array.prototype.splice;a="undefined"!=typeof exports?exports:b.Backbone={},a.VERSION="0.9.2";var f=b._;f||"undefined"==typeof require||(f=require("underscore"));var g=b.jQuery||b.Zepto||b.ender;a.setDomLibrary=function(a){g=a},a.noConflict=function(){return b.Backbone=c,this},a.emulateHTTP=!1,a.emulateJSON=!1;var h=/\s+/,i=a.Events={on:function(a,b,c){var d,e,f,g,i;if(!b)return this;for(a=a.split(h),d=this._callbacks||(this._callbacks={});e=a.shift();)i=d[e],f=i?i.tail:{},f.next=g={},f.context=c,f.callback=b,d[e]={tail:g,next:i?i.next:f};return this},off:function(a,b,c){var d,e,g,i,j,k;if(e=this._callbacks){if(!(a||b||c))return delete this._callbacks,this;for(a=a?a.split(h):f.keys(e);d=a.shift();)if(g=e[d],delete e[d],g&&(b||c))for(i=g.tail;(g=g.next)!==i;)j=g.callback,k=g.context,(b&&j!==b||c&&k!==c)&&this.on(d,j,k);return this}},trigger:function(a){var b,c,e,f,g,i,j;if(!(e=this._callbacks))return this;for(i=e.all,a=a.split(h),j=d.call(arguments,1);b=a.shift();){if(c=e[b])for(f=c.tail;(c=c.next)!==f;)c.callback.apply(c.context||this,j);if(c=i)for(f=c.tail,g=[b].concat(j);(c=c.next)!==f;)c.callback.apply(c.context||this,g)}return this}};i.bind=i.on,i.unbind=i.off;var j=a.Model=function(a,b){var c;a||(a={}),b&&b.parse&&(a=this.parse(a)),(c=A(this,"defaults"))&&(a=f.extend({},c,a)),b&&b.collection&&(this.collection=b.collection),this.attributes={},this._escapedAttributes={},this.cid=f.uniqueId("c"),this.changed={},this._silent={},this._pending={},this.set(a,{silent:!0}),this.changed={},this._silent={},this._pending={},this._previousAttributes=f.clone(this.attributes),this.initialize.apply(this,arguments)};f.extend(j.prototype,i,{changed:null,_silent:null,_pending:null,idAttribute:"id",initialize:function(){},toJSON:function(){return f.clone(this.attributes)},get:function(a){return this.attributes[a]},escape:function(a){var b;if(b=this._escapedAttributes[a])return b;var c=this.get(a);return this._escapedAttributes[a]=f.escape(null==c?"":""+c)},has:function(a){return null!=this.get(a)},set:function(a,b,c){var d,e,g;if(f.isObject(a)||null==a?(d=a,c=b):(d={},d[a]=b),c||(c={}),!d)return this;if(d instanceof j&&(d=d.attributes),c.unset)for(e in d)d[e]=void 0;if(!this._validate(d,c))return!1;this.idAttribute in d&&(this.id=d[this.idAttribute]);var h=c.changes={},i=this.attributes,k=this._escapedAttributes,l=this._previousAttributes||{};for(e in d)g=d[e],(!f.isEqual(i[e],g)||c.unset&&f.has(i,e))&&(delete k[e],(c.silent?this._silent:h)[e]=!0),c.unset?delete i[e]:i[e]=g,f.isEqual(l[e],g)&&f.has(i,e)==f.has(l,e)?(delete this.changed[e],delete this._pending[e]):(this.changed[e]=g,c.silent||(this._pending[e]=!0));return c.silent||this.change(c),this},unset:function(a,b){return(b||(b={})).unset=!0,this.set(a,null,b)},clear:function(a){return(a||(a={})).unset=!0,this.set(f.clone(this.attributes),a)},fetch:function(b){b=b?f.clone(b):{};var c=this,d=b.success;return b.success=function(a,e,f){return c.set(c.parse(a,f),b)?void(d&&d(c,a)):!1},b.error=a.wrapError(b.error,c,b),(this.sync||a.sync).call(this,"read",this,b)},save:function(b,c,d){var e,g;if(f.isObject(b)||null==b?(e=b,d=c):(e={},e[b]=c),d=d?f.clone(d):{},d.wait){if(!this._validate(e,d))return!1;g=f.clone(this.attributes)}var h=f.extend({},d,{silent:!0});if(e&&!this.set(e,d.wait?h:d))return!1;var i=this,j=d.success;d.success=function(a,b,c){var g=i.parse(a,c);return d.wait&&(delete d.wait,g=f.extend(e||{},g)),i.set(g,d)?void(j?j(i,a):i.trigger("sync",i,a,d)):!1},d.error=a.wrapError(d.error,i,d);var k=this.isNew()?"create":"update",l=(this.sync||a.sync).call(this,k,this,d);return d.wait&&this.set(g,h),l},destroy:function(b){b=b?f.clone(b):{};var c=this,d=b.success,e=function(){c.trigger("destroy",c,c.collection,b)};if(this.isNew())return e(),!1;b.success=function(a){b.wait&&e(),d?d(c,a):c.trigger("sync",c,a,b)},b.error=a.wrapError(b.error,c,b);var g=(this.sync||a.sync).call(this,"delete",this,b);return b.wait||e(),g},url:function(){var a=A(this,"urlRoot")||A(this.collection,"url")||B();return this.isNew()?a:a+("/"==a.charAt(a.length-1)?"":"/")+encodeURIComponent(this.id)},parse:function(a){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return null==this.id},change:function(a){a||(a={});var b=this._changing;this._changing=!0;for(var c in this._silent)this._pending[c]=!0;var d=f.extend({},a.changes,this._silent);this._silent={};for(var c in d)this.trigger("change:"+c,this,this.get(c),a);if(b)return this;for(;!f.isEmpty(this._pending);){this._pending={},this.trigger("change",this,a);for(var c in this.changed)this._pending[c]||this._silent[c]||delete this.changed[c];this._previousAttributes=f.clone(this.attributes)}return this._changing=!1,this},hasChanged:function(a){return arguments.length?f.has(this.changed,a):!f.isEmpty(this.changed)},changedAttributes:function(a){if(!a)return this.hasChanged()?f.clone(this.changed):!1;var b,c=!1,d=this._previousAttributes;for(var e in a)f.isEqual(d[e],b=a[e])||((c||(c={}))[e]=b);return c},previous:function(a){return arguments.length&&this._previousAttributes?this._previousAttributes[a]:null},previousAttributes:function(){return f.clone(this._previousAttributes)},isValid:function(){return!this.validate(this.attributes)},_validate:function(a,b){if(b.silent||!this.validate)return!0;a=f.extend({},this.attributes,a);var c=this.validate(a,b);return c?(b&&b.error?b.error(this,c,b):this.trigger("error",this,c,b),!1):!0}});var k=a.Collection=function(a,b){b||(b={}),b.model&&(this.model=b.model),b.comparator&&(this.comparator=b.comparator),this._reset(),this.initialize.apply(this,arguments),a&&this.reset(a,{silent:!0,parse:b.parse})};f.extend(k.prototype,i,{model:j,initialize:function(){},toJSON:function(a){return this.map(function(b){return b.toJSON(a)})},add:function(a,b){var c,d,g,h,i,j,k={},l={},m=[];for(b||(b={}),a=f.isArray(a)?a.slice():[a],c=0,g=a.length;g>c;c++){if(!(h=a[c]=this._prepareModel(a[c],b)))throw new Error("Can't add an invalid model to a collection");i=h.cid,j=h.id,k[i]||this._byCid[i]||null!=j&&(l[j]||this._byId[j])?m.push(c):k[i]=l[j]=h}for(c=m.length;c--;)a.splice(m[c],1);for(c=0,g=a.length;g>c;c++)(h=a[c]).on("all",this._onModelEvent,this),this._byCid[h.cid]=h,null!=h.id&&(this._byId[h.id]=h);if(this.length+=g,d=null!=b.at?b.at:this.models.length,e.apply(this.models,[d,0].concat(a)),this.comparator&&this.sort({silent:!0}),b.silent)return this;for(c=0,g=this.models.length;g>c;c++)k[(h=this.models[c]).cid]&&(b.index=c,h.trigger("add",h,this,b));return this},remove:function(a,b){var c,d,e,g;for(b||(b={}),a=f.isArray(a)?a.slice():[a],c=0,d=a.length;d>c;c++)g=this.getByCid(a[c])||this.get(a[c]),g&&(delete this._byId[g.id],delete this._byCid[g.cid],e=this.indexOf(g),this.models.splice(e,1),this.length--,b.silent||(b.index=e,g.trigger("remove",g,this,b)),this._removeReference(g));return this},push:function(a,b){return a=this._prepareModel(a,b),this.add(a,b),a},pop:function(a){var b=this.at(this.length-1);return this.remove(b,a),b},unshift:function(a,b){return a=this._prepareModel(a,b),this.add(a,f.extend({at:0},b)),a},shift:function(a){var b=this.at(0);return this.remove(b,a),b},get:function(a){return null==a?void 0:this._byId[null!=a.id?a.id:a]},getByCid:function(a){return a&&this._byCid[a.cid||a]},at:function(a){return this.models[a]},where:function(a){return f.isEmpty(a)?[]:this.filter(function(b){for(var c in a)if(a[c]!==b.get(c))return!1;return!0})},sort:function(a){if(a||(a={}),!this.comparator)throw new Error("Cannot sort a set without a comparator");var b=f.bind(this.comparator,this);return 1==this.comparator.length?this.models=this.sortBy(b):this.models.sort(b),a.silent||this.trigger("reset",this,a),this},pluck:function(a){return f.map(this.models,function(b){return b.get(a)})},reset:function(a,b){a||(a=[]),b||(b={});for(var c=0,d=this.models.length;d>c;c++)this._removeReference(this.models[c]);return this._reset(),this.add(a,f.extend({silent:!0},b)),b.silent||this.trigger("reset",this,b),this},fetch:function(b){b=b?f.clone(b):{},void 0===b.parse&&(b.parse=!0);var c=this,d=b.success;return b.success=function(a,e,f){c[b.add?"add":"reset"](c.parse(a,f),b),d&&d(c,a)},b.error=a.wrapError(b.error,c,b),(this.sync||a.sync).call(this,"read",this,b)},create:function(a,b){var c=this;if(b=b?f.clone(b):{},a=this._prepareModel(a,b),!a)return!1;b.wait||c.add(a,b);var d=b.success;return b.success=function(e,f){b.wait&&c.add(e,b),d?d(e,f):e.trigger("sync",a,f,b)},a.save(null,b),a},parse:function(a){return a},chain:function(){return f(this.models).chain()},_reset:function(){this.length=0,this.models=[],this._byId={},this._byCid={}},_prepareModel:function(a,b){if(b||(b={}),a instanceof j)a.collection||(a.collection=this);else{var c=a;b.collection=this,a=new this.model(c,b),a._validate(a.attributes,b)||(a=!1)}return a},_removeReference:function(a){this==a.collection&&delete a.collection,a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){("add"!=a&&"remove"!=a||c==this)&&("destroy"==a&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],this._byId[b.id]=b),this.trigger.apply(this,arguments))}});var l=["forEach","each","map","reduce","reduceRight","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","sortBy","sortedIndex","toArray","size","first","initial","rest","last","without","indexOf","shuffle","lastIndexOf","isEmpty","groupBy"];f.each(l,function(a){k.prototype[a]=function(){return f[a].apply(f,[this.models].concat(f.toArray(arguments)))}});var m=a.Router=function(a){a||(a={}),a.routes&&(this.routes=a.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},n=/:\w+/g,o=/\*\w+/g,p=/[-[\]{}()+?.,\\^$|#\s]/g;f.extend(m.prototype,i,{initialize:function(){},route:function(b,c,d){return a.history||(a.history=new q),f.isRegExp(b)||(b=this._routeToRegExp(b)),d||(d=this[c]),a.history.route(b,f.bind(function(e){var f=this._extractParameters(b,e);d&&d.apply(this,f),this.trigger.apply(this,["route:"+c].concat(f)),a.history.trigger("route",this,c,f)},this)),this},navigate:function(b,c){a.history.navigate(b,c)},_bindRoutes:function(){if(this.routes){var a=[];for(var b in this.routes)a.unshift([b,this.routes[b]]);for(var c=0,d=a.length;d>c;c++)this.route(a[c][0],a[c][1],this[a[c][1]])}},_routeToRegExp:function(a){return a=a.replace(p,"\\$&").replace(n,"([^/]+)").replace(o,"(.*?)"),new RegExp("^"+a+"$")},_extractParameters:function(a,b){return a.exec(b).slice(1)}});var q=a.History=function(){this.handlers=[],f.bindAll(this,"checkUrl")},r=/^[#\/]/,s=/msie [\w.]+/;q.started=!1,f.extend(q.prototype,i,{interval:50,getHash:function(a){var b=a?a.location:window.location,c=b.href.match(/#(.*)$/);return c?c[1]:""},getFragment:function(a,b){if(null==a)if(this._hasPushState||b){a=window.location.pathname;var c=window.location.search;c&&(a+=c)}else a=this.getHash();return a.indexOf(this.options.root)||(a=a.substr(this.options.root.length)),a.replace(r,"")},start:function(a){if(q.started)throw new Error("Backbone.history has already been started");q.started=!0,this.options=f.extend({},{root:"/"},this.options,a),this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&window.history&&window.history.pushState);var b=this.getFragment(),c=document.documentMode,d=s.exec(navigator.userAgent.toLowerCase())&&(!c||7>=c);d&&(this.iframe=g('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(b)),this._hasPushState?g(window).bind("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!d?g(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=b;var e=window.location,h=e.pathname==this.options.root;return this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!h?(this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0):(this._wantsPushState&&this._hasPushState&&h&&e.hash&&(this.fragment=this.getHash().replace(r,""),window.history.replaceState({},document.title,e.protocol+"//"+e.host+this.options.root+this.fragment)),this.options.silent?void 0:this.loadUrl())},stop:function(){g(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl),clearInterval(this._checkUrlInterval),q.started=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();return a==this.fragment&&this.iframe&&(a=this.getFragment(this.getHash(this.iframe))),a==this.fragment?!1:(this.iframe&&this.navigate(a),void(this.loadUrl()||this.loadUrl(this.getHash())))},loadUrl:function(a){var b=this.fragment=this.getFragment(a),c=f.any(this.handlers,function(a){return a.route.test(b)?(a.callback(b),!0):void 0});return c},navigate:function(a,b){if(!q.started)return!1;b&&b!==!0||(b={trigger:b});var c=(a||"").replace(r,"");this.fragment!=c&&(this._hasPushState?(0!=c.indexOf(this.options.root)&&(c=this.options.root+c),this.fragment=c,window.history[b.replace?"replaceState":"pushState"]({},document.title,c)):this._wantsHashChange?(this.fragment=c,this._updateHash(window.location,c,b.replace),this.iframe&&c!=this.getFragment(this.getHash(this.iframe))&&(b.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,c,b.replace))):window.location.assign(this.options.root+a),b.trigger&&this.loadUrl(a))},_updateHash:function(a,b,c){c?a.replace(a.toString().replace(/(javascript:|#).*$/,"")+"#"+b):a.hash=b}});var t=a.View=function(a){this.cid=f.uniqueId("view"),this._configure(a||{}),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},u=/^(\S+)\s*(.*)$/,v=["model","collection","el","id","attributes","className","tagName"];f.extend(t.prototype,i,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this},make:function(a,b,c){var d=document.createElement(a);return b&&g(d).attr(b),c&&g(d).html(c),d},setElement:function(a,b){return this.$el&&this.undelegateEvents(),this.$el=a instanceof g?a:g(a),this.el=this.$el[0],b!==!1&&this.delegateEvents(),this},delegateEvents:function(a){if(a||(a=A(this,"events"))){this.undelegateEvents();for(var b in a){var c=a[b];if(f.isFunction(c)||(c=this[a[b]]),!c)throw new Error('Method "'+a[b]+'" does not exist');var d=b.match(u),e=d[1],g=d[2];c=f.bind(c,this),e+=".delegateEvents"+this.cid,""===g?this.$el.bind(e,c):this.$el.delegate(g,e,c)}}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+this.cid)},_configure:function(a){this.options&&(a=f.extend({},this.options,a));for(var b=0,c=v.length;c>b;b++){var d=v[b];a[d]&&(this[d]=a[d])}this.options=a},_ensureElement:function(){if(this.el)this.setElement(this.el,!1);else{var a=A(this,"attributes")||{};this.id&&(a.id=this.id),this.className&&(a["class"]=this.className),this.setElement(this.make(this.tagName,a),!1)}}});var w=function(a,b){var c=z(this,a,b);return c.extend=this.extend,c};j.extend=k.extend=m.extend=t.extend=w;var x={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};a.sync=function(b,c,d){var e=x[b];d||(d={});var h={type:e,dataType:"json"};return d.url||(h.url=A(c,"url")||B()),d.data||!c||"create"!=b&&"update"!=b||(h.contentType="application/json",h.data=JSON.stringify(c.toJSON())),a.emulateJSON&&(h.contentType="application/x-www-form-urlencoded",h.data=h.data?{model:h.data}:{}),a.emulateHTTP&&("PUT"===e||"DELETE"===e)&&(a.emulateJSON&&(h.data._method=e),h.type="POST",h.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",e)}),"GET"===h.type||a.emulateJSON||(h.processData=!1),g.ajax(f.extend(h,d))},a.wrapError=function(a,b,c){return function(d,e){e=d===b?e:d,a?a(b,e,c):b.trigger("error",b,e,c)}};var y=function(){},z=function(a,b,c){var d;return d=b&&b.hasOwnProperty("constructor")?b.constructor:function(){a.apply(this,arguments)},f.extend(d,a),y.prototype=a.prototype,d.prototype=new y,b&&f.extend(d.prototype,b),c&&f.extend(d,c),d.prototype.constructor=d,d.__super__=a.prototype,d},A=function(a,b){return a&&a[b]?f.isFunction(a[b])?a[b]():a[b]:null},B=function(){throw new Error('A "url" property or function must be specified')}}.call(this),function(){var a={},b=this,c=b.async;"undefined"!=typeof module&&module.exports?module.exports=a:b.async=a,a.noConflict=function(){return b.async=c,a};var d=function(a,b){if(a.forEach)return a.forEach(b);for(var c=0;c<a.length;c+=1)b(a[c],c,a)},e=function(a,b){if(a.map)return a.map(b);var c=[];return d(a,function(a,d,e){c.push(b(a,d,e))}),c},f=function(a,b,c){return a.reduce?a.reduce(b,c):(d(a,function(a,d,e){c=b(c,a,d,e)}),c)},g=function(a){if(Object.keys)return Object.keys(a);var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c);return b},h=function(a,b){if(a.indexOf)return a.indexOf(b);for(var c=0;c<a.length;c+=1)if(a[c]===b)return c;return-1};a.nextTick="undefined"!=typeof process&&process.nextTick?process.nextTick:function(a){setTimeout(a,0)},a.forEach=function(a,b,c){if(!a.length)return c();var e=0;d(a,function(d){b(d,function(b){b?(c(b),c=function(){}):(e+=1,e===a.length&&c())})})},a.forEachSeries=function(a,b,c){if(!a.length)return c();var d=0,e=function(){b(a[d],function(b){b?(c(b),c=function(){}):(d+=1,d===a.length?c():e())})};e()};var i=function(b){return function(){var c=Array.prototype.slice.call(arguments);return b.apply(null,[a.forEach].concat(c))}},j=function(b){return function(){var c=Array.prototype.slice.call(arguments);return b.apply(null,[a.forEachSeries].concat(c))}},k=function(a,b,c,d){var f=[];b=e(b,function(a,b){return{index:b,value:a}}),a(b,function(a,b){c(a.value,function(c,d){f[a.index]=d,b(c)})},function(a){d(a,f)})};a.map=i(k),a.mapSeries=j(k),a.reduce=function(b,c,d,e){a.forEachSeries(b,function(a,b){d(c,a,function(a,d){c=d,b(a)})},function(a){e(a,c)})},a.inject=a.reduce,a.foldl=a.reduce,a.reduceRight=function(b,c,d,f){var g=e(b,function(a){return a}).reverse();a.reduce(g,c,d,f)},a.foldr=a.reduceRight;var l=function(a,b,c,d){var f=[];b=e(b,function(a,b){return{index:b,value:a}}),a(b,function(a,b){c(a.value,function(c){c&&f.push(a),b()})},function(){d(e(f.sort(function(a,b){return a.index-b.index}),function(a){return a.value}))})};a.filter=i(l),a.filterSeries=j(l),a.select=a.filter,a.selectSeries=a.filterSeries;var m=function(a,b,c,d){var f=[];b=e(b,function(a,b){return{index:b,value:a}}),a(b,function(a,b){c(a.value,function(c){c||f.push(a),b()})},function(){d(e(f.sort(function(a,b){return a.index-b.index}),function(a){return a.value}))})};a.reject=i(m),a.rejectSeries=j(m);var n=function(a,b,c,d){a(b,function(a,b){c(a,function(c){c?d(a):b()})},function(){d()})};a.detect=i(n),a.detectSeries=j(n),a.some=function(b,c,d){a.forEach(b,function(a,b){c(a,function(a){a&&(d(!0),d=function(){}),b()})},function(){d(!1)})},a.any=a.some,a.every=function(b,c,d){a.forEach(b,function(a,b){c(a,function(a){a||(d(!1),d=function(){}),b()})},function(){d(!0)})},a.all=a.every,a.sortBy=function(b,c,d){a.map(b,function(a,b){c(a,function(c,d){c?b(c):b(null,{value:a,criteria:d})})},function(a,b){if(a)return d(a);var c=function(a,b){var c=a.criteria,d=b.criteria;return d>c?-1:c>d?1:0};d(null,e(b.sort(c),function(a){return a.value}))})},a.auto=function(a,b){b=b||function(){};var c=g(a);if(!c.length)return b(null);var e=[],i=[],j=function(a){i.unshift(a)},k=function(a){for(var b=0;b<i.length;b+=1)if(i[b]===a)return void i.splice(b,1)},l=function(){d(i,function(a){a()})};j(function(){e.length===c.length&&b(null)}),d(c,function(c){var d=a[c]instanceof Function?[a[c]]:a[c],g=function(a){a?(b(a),b=function(){}):(e.push(c),l())},i=d.slice(0,Math.abs(d.length-1))||[],m=function(){return f(i,function(a,b){return a&&-1!==h(e,b)},!0)};if(m())d[d.length-1](g);else{var n=function(){m()&&(k(n),d[d.length-1](g))};j(n)}})},a.waterfall=function(b,c){if(!b.length)return c();c=c||function(){};var d=function(b){return function(e){if(e)c(e),c=function(){};else{var f=Array.prototype.slice.call(arguments,1),g=b.next();f.push(g?d(g):c),a.nextTick(function(){b.apply(null,f)})}}};d(a.iterator(b))()},a.parallel=function(b,c){if(c=c||function(){},b.constructor===Array)a.map(b,function(a,b){a&&a(function(a){var c=Array.prototype.slice.call(arguments,1);c.length<=1&&(c=c[0]),b.call(null,a,c)})},c);else{var d={};a.forEach(g(b),function(a,c){b[a](function(b){var e=Array.prototype.slice.call(arguments,1);e.length<=1&&(e=e[0]),d[a]=e,c(b)})},function(a){c(a,d)})}},a.series=function(b,c){if(c=c||function(){},b.constructor===Array)a.mapSeries(b,function(a,b){a&&a(function(a){var c=Array.prototype.slice.call(arguments,1);c.length<=1&&(c=c[0]),b.call(null,a,c)})},c);else{var d={};a.forEachSeries(g(b),function(a,c){b[a](function(b){var e=Array.prototype.slice.call(arguments,1);e.length<=1&&(e=e[0]),d[a]=e,c(b)})},function(a){c(a,d)})}},a.iterator=function(a){var b=function(c){var d=function(){return a.length&&a[c].apply(null,arguments),d.next()};return d.next=function(){return c<a.length-1?b(c+1):null},d};return b(0)},a.apply=function(a){var b=Array.prototype.slice.call(arguments,1);return function(){return a.apply(null,b.concat(Array.prototype.slice.call(arguments)))}};var o=function(a,b,c,d){var e=[];a(b,function(a,b){c(a,function(a,c){e=e.concat(c||[]),b(a)})},function(a){d(a,e)})};a.concat=i(o),a.concatSeries=j(o),a.whilst=function(b,c,d){b()?c(function(e){return e?d(e):void a.whilst(b,c,d)}):d()},a.until=function(b,c,d){b()?d():c(function(e){return e?d(e):void a.until(b,c,d)})},a.queue=function(b,c){var d=0,e=[],f={concurrency:c,saturated:null,empty:null,drain:null,push:function(b,d){e.push({data:b,callback:d}),f.saturated&&e.length==c&&f.saturated(),a.nextTick(f.process)},process:function(){if(d<f.concurrency&&e.length){var a=e.splice(0,1)[0];f.empty&&0==e.length&&f.empty(),d+=1,b(a.data,function(){d-=1,a.callback&&a.callback.apply(a,arguments),f.drain&&e.length+d==0&&f.drain(),f.process()})}},length:function(){return e.length},running:function(){return d}};return f};var p=function(a){return function(b){var c=Array.prototype.slice.call(arguments,1);b.apply(null,c.concat([function(b){var c=Array.prototype.slice.call(arguments,1);"undefined"!=typeof console&&(b?console.error&&console.error(b):console[a]&&d(c,function(b){console[a](b)}))}]))}};a.log=p("log"),a.dir=p("dir"),a.memoize=function(a,b){var c={};return b=b||function(a){return a},function(){var d=Array.prototype.slice.call(arguments),e=d.pop(),f=b.apply(null,d);f in c?e.apply(null,c[f]):a.apply(null,d.concat([function(){c[f]=arguments,e.apply(null,arguments)
}]))}}}(),function(a,b){function c(a,b){this._d=a,this._isUTC=!!b}function d(a){return 0>a?Math.ceil(a):Math.floor(a)}function e(a){var b=this._data={},c=a.years||a.y||0,e=a.months||a.M||0,f=a.weeks||a.w||0,g=a.days||a.d||0,h=a.hours||a.h||0,i=a.minutes||a.m||0,j=a.seconds||a.s||0,k=a.milliseconds||a.ms||0;this._milliseconds=k+1e3*j+6e4*i+36e5*h,this._days=g+7*f,this._months=e+12*c,b.milliseconds=k%1e3,j+=d(k/1e3),b.seconds=j%60,i+=d(j/60),b.minutes=i%60,h+=d(i/60),b.hours=h%24,g+=d(h/24),g+=7*f,b.days=g%30,e+=d(g/30),b.months=e%12,c+=d(e/12),b.years=c}function f(a,b){for(var c=a+"";c.length<b;)c="0"+c;return c}function g(a,b,c){var d,e=b._milliseconds,f=b._days,g=b._months;e&&a._d.setTime(+a+e*c),f&&a.date(a.date()+f*c),g&&(d=a.date(),a.date(1).month(a.month()+g*c).date(Math.min(d,a.daysInMonth())))}function h(a){return"[object Array]"===Object.prototype.toString.call(a)}function i(b){return new a(b[0],b[1]||0,b[2]||1,b[3]||0,b[4]||0,b[5]||0,b[6]||0)}function j(b,c){function d(c){var r,s;switch(c){case"M":return e+1;case"Mo":return e+1+p(e+1);case"MM":return f(e+1,2);case"MMM":return v.monthsShort[e];case"MMMM":return v.months[e];case"D":return g;case"Do":return g+p(g);case"DD":return f(g,2);case"DDD":return r=new a(h,e,g),s=new a(h,0,1),~~((r-s)/864e5+1.5);case"DDDo":return r=d("DDD"),r+p(r);case"DDDD":return f(d("DDD"),3);case"d":return i;case"do":return i+p(i);case"ddd":return v.weekdaysShort[i];case"dddd":return v.weekdays[i];case"w":return r=new a(h,e,g-i+5),s=new a(r.getFullYear(),0,4),~~((r-s)/864e5/7+1.5);case"wo":return r=d("w"),r+p(r);case"ww":return f(d("w"),2);case"YY":return f(h%100,2);case"YYYY":return h;case"a":return q?q(k,l,!1):k>11?"pm":"am";case"A":return q?q(k,l,!0):k>11?"PM":"AM";case"H":return k;case"HH":return f(k,2);case"h":return k%12||12;case"hh":return f(k%12||12,2);case"m":return l;case"mm":return f(l,2);case"s":return m;case"ss":return f(m,2);case"S":return~~(n/100);case"SS":return f(~~(n/10),2);case"SSS":return f(n,3);case"Z":return(0>o?"-":"+")+f(~~(Math.abs(o)/60),2)+":"+f(~~(Math.abs(o)%60),2);case"ZZ":return(0>o?"-":"+")+f(~~(10*Math.abs(o)/6),4);case"L":case"LL":case"LLL":case"LLLL":case"LT":return j(b,v.longDateFormat[c]);default:return c.replace(/(^\[)|(\\)|\]$/g,"")}}var e=b.month(),g=b.date(),h=b.year(),i=b.day(),k=b.hours(),l=b.minutes(),m=b.seconds(),n=b.milliseconds(),o=-b.zone(),p=v.ordinal,q=v.meridiem;return c.replace(E,d)}function k(a){switch(a){case"DDDD":return I;case"YYYY":return J;case"S":case"SS":case"SSS":case"DDD":return H;case"MMM":case"MMMM":case"ddd":case"dddd":case"a":case"A":return K;case"Z":case"ZZ":return L;case"T":return M;case"MM":case"DD":case"dd":case"YY":case"HH":case"hh":case"mm":case"ss":case"M":case"D":case"d":case"H":case"h":case"m":case"s":return G;default:return new RegExp(a.replace("\\",""))}}function l(a,b,c,d){var e;switch(a){case"M":case"MM":c[1]=null==b?0:~~b-1;break;case"MMM":case"MMMM":for(e=0;12>e;e++)if(v.monthsParse[e].test(b)){c[1]=e;break}break;case"D":case"DD":case"DDD":case"DDDD":c[2]=~~b;break;case"YY":b=~~b,c[0]=b+(b>70?1900:2e3);break;case"YYYY":c[0]=~~Math.abs(b);break;case"a":case"A":d.isPm="pm"===(b+"").toLowerCase();break;case"H":case"HH":case"h":case"hh":c[3]=~~b;break;case"m":case"mm":c[4]=~~b;break;case"s":case"ss":c[5]=~~b;break;case"S":case"SS":case"SSS":c[6]=~~(1e3*("0."+b));break;case"Z":case"ZZ":d.isUTC=!0,e=(b+"").match(Q),e&&e[1]&&(d.tzh=~~e[1]),e&&e[2]&&(d.tzm=~~e[2]),e&&"+"===e[0]&&(d.tzh=-d.tzh,d.tzm=-d.tzm)}}function m(b,c){var d,e,f=[0,0,1,0,0,0,0],g={tzh:0,tzm:0},h=c.match(E);for(d=0;d<h.length;d++)e=(k(h[d]).exec(b)||[])[0],b=b.replace(k(h[d]),""),l(h[d],e,f,g);return g.isPm&&f[3]<12&&(f[3]+=12),g.isPm===!1&&12===f[3]&&(f[3]=0),f[3]+=g.tzh,f[4]+=g.tzm,g.isUTC?new a(a.UTC.apply({},f)):i(f)}function n(a,b){var c,d=Math.min(a.length,b.length),e=Math.abs(a.length-b.length),f=0;for(c=0;d>c;c++)~~a[c]!==~~b[c]&&f++;return f+e}function o(a,b){var d,e,f,g,h,i=a.match(F)||[],k=99;for(f=0;f<b.length;f++)g=m(a,b[f]),e=j(new c(g),b[f]).match(F)||[],h=n(i,e),k>h&&(k=h,d=g);return d}function p(b){var c,d="YYYY-MM-DDT";if(N.exec(b)){for(c=0;4>c;c++)if(P[c][1].exec(b)){d+=P[c][0];break}return L.exec(b)?m(b,d+" Z"):m(b,d)}return new a(b)}function q(a,b,c,d){var e=v.relativeTime[a];return"function"==typeof e?e(b||1,!!c,a,d):e.replace(/%d/i,b||1)}function r(a,b){var c=y(Math.abs(a)/1e3),d=y(c/60),e=y(d/60),f=y(e/24),g=y(f/365),h=45>c&&["s",c]||1===d&&["m"]||45>d&&["mm",d]||1===e&&["h"]||22>e&&["hh",e]||1===f&&["d"]||25>=f&&["dd",f]||45>=f&&["M"]||345>f&&["MM",y(f/30)]||1===g&&["y"]||["yy",g];return h[2]=b,h[3]=a>0,q.apply({},h)}function s(a,b){v.fn[a]=function(a){var c=this._isUTC?"UTC":"";return null!=a?(this._d["set"+c+b](a),this):this._d["get"+c+b]()}}function t(a){v.duration.fn[a]=function(){return this._data[a]}}function u(a,b){v.duration.fn["as"+a]=function(){return+this/b}}var v,w,x="1.6.2",y=Math.round,z={},A="en",B="undefined"!=typeof module,C="months|monthsShort|monthsParse|weekdays|weekdaysShort|longDateFormat|calendar|relativeTime|ordinal|meridiem".split("|"),D=/^\/?Date\((\-?\d+)/i,E=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|dddd?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?|LT|LL?L?L?)/g,F=/([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi,G=/\d\d?/,H=/\d{1,3}/,I=/\d{3}/,J=/\d{4}/,K=/[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/i,L=/Z|[\+\-]\d\d:?\d\d/i,M=/T/i,N=/^\s*\d{4}-\d\d-\d\d(T(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,O="YYYY-MM-DDTHH:mm:ssZ",P=[["HH:mm:ss.S",/T\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/T\d\d:\d\d:\d\d/],["HH:mm",/T\d\d:\d\d/],["HH",/T\d\d/]],Q=/([\+\-]|\d\d)/gi,R="Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"),S={Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6};for(v=function(d,e){if(null===d||""===d)return null;var f,g,j;return v.isMoment(d)?(f=new a(+d._d),j=d._isUTC):e?f=h(e)?o(d,e):m(d,e):(g=D.exec(d),f=d===b?new a:g?new a(+g[1]):d instanceof a?d:h(d)?i(d):"string"==typeof d?p(d):new a(d)),new c(f,j)},v.utc=function(b,d){return h(b)?new c(new a(a.UTC.apply({},b)),!0):d&&b?v(b+" +0000",d+" Z").utc():v(b&&!L.exec(b)?b+"+0000":b).utc()},v.unix=function(a){return v(1e3*a)},v.duration=function(a,b){var c=v.isDuration(a),d="number"==typeof a,f=c?a._data:d?{}:a;return d&&(b?f[b]=a:f.milliseconds=a),new e(f)},v.humanizeDuration=function(a,b,c){return v.duration(a,b===!0?null:b).humanize(b===!0?!0:c)},v.version=x,v.defaultFormat=O,v.lang=function(a,b){var c,d,e=[];if(!a)return A;if(b){for(c=0;12>c;c++)e[c]=new RegExp("^"+b.months[c]+"|^"+b.monthsShort[c].replace(".",""),"i");b.monthsParse=b.monthsParse||e,z[a]=b}if(z[a]){for(c=0;c<C.length;c++)v[C[c]]=z[a][C[c]]||z.en[C[c]];A=a}else B&&(d=require("./lang/"+a),v.lang(a,d))},v.lang("en",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},meridiem:!1,calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinal:function(a){var b=a%10;return 1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th"}}),v.isMoment=function(a){return a instanceof c},v.isDuration=function(a){return a instanceof e},v.fn=c.prototype={clone:function(){return v(this)},valueOf:function(){return+this._d},unix:function(){return Math.floor(+this._d/1e3)},toString:function(){return this._d.toString()},toDate:function(){return this._d},utc:function(){return this._isUTC=!0,this},local:function(){return this._isUTC=!1,this},format:function(a){return j(this,a?a:v.defaultFormat)},add:function(a,b){var c=b?v.duration(+b,a):v.duration(a);return g(this,c,1),this},subtract:function(a,b){var c=b?v.duration(+b,a):v.duration(a);return g(this,c,-1),this},diff:function(a,b,c){var d,e=this._isUTC?v(a).utc():v(a).local(),f=6e4*(this.zone()-e.zone()),g=this._d-e._d-f,h=this.year()-e.year(),i=this.month()-e.month(),j=this.date()-e.date();return d="months"===b?12*h+i+j/30:"years"===b?h+(i+j/30)/12:"seconds"===b?g/1e3:"minutes"===b?g/6e4:"hours"===b?g/36e5:"days"===b?g/864e5:"weeks"===b?g/6048e5:g,c?d:y(d)},from:function(a,b){return v.duration(this.diff(a)).humanize(!b)},fromNow:function(a){return this.from(v(),a)},calendar:function(){var a=this.diff(v().sod(),"days",!0),b=v.calendar,c=b.sameElse,d=-6>a?c:-1>a?b.lastWeek:0>a?b.lastDay:1>a?b.sameDay:2>a?b.nextDay:7>a?b.nextWeek:c;return this.format("function"==typeof d?d.apply(this):d)},isLeapYear:function(){var a=this.year();return a%4===0&&a%100!==0||a%400===0},isDST:function(){return this.zone()<v([this.year()]).zone()||this.zone()<v([this.year(),5]).zone()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null==a?b:this.add({d:a-b})},sod:function(){return v(this).hours(0).minutes(0).seconds(0).milliseconds(0)},eod:function(){return this.sod().add({d:1,ms:-1})},zone:function(){return this._isUTC?0:this._d.getTimezoneOffset()},daysInMonth:function(){return v(this).month(this.month()+1).date(0).date()}},w=0;w<R.length;w++)s(R[w].toLowerCase(),R[w]);s("year","FullYear"),v.duration.fn=e.prototype={weeks:function(){return d(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+2592e6*this._months},humanize:function(a){var b=+this,c=v.relativeTime,d=r(b,!a);return a&&(d=(0>=b?c.past:c.future).replace(/%s/i,d)),d}};for(w in S)S.hasOwnProperty(w)&&(u(w,S[w]),t(w.toLowerCase()));u("Weeks",6048e5),B&&(module.exports=v),"undefined"!=typeof window&&"undefined"==typeof ender&&(window.moment=v),"function"==typeof define&&define.amd&&define("moment",[],function(){return v})}(Date),function(a){function b(b,c){function f(b){return a.isArray(W.readonly)?(b=a(".dwwl",R).index(b),W.readonly[b]):W.readonly}function h(a){var b,c="";for(b in Y[a])c+='<li class="dw-v" data-val="'+b+'" style="height:'+P+"px;line-height:"+P+'px;"><div class="dw-i">'+Y[a][b]+"</div></li>";return c}function w(){var a=document.body,b=document.documentElement;return Math.max(a.scrollHeight,a.offsetHeight,b.clientHeight,b.scrollHeight,b.offsetHeight)}function y(b){k=a("li.dw-v",b).eq(0).index(),l=a("li.dw-v",b).eq(-1).index(),q=a("ul",R).index(b),j=P,m=S}function z(a){var b=W.headerText;return b?"function"==typeof b?b.call(U,a):b.replace(/\{value\}/i,a):""}function G(){S.temp=$&&(null!==S.val&&S.val!=V.val()||!V.val().length)||null===S.values?W.parseValue(V.val()||"",S):S.values.slice(0),S.setValue(!0)}function H(b,c,d,e){J("validate",[R,c]),a(".dww ul",R).each(function(d){var f=a(this),g=a('li[data-val="'+S.temp[d]+'"]',f),h=g.index(),i=d==c||void 0===c;if(!g.hasClass("dw-v")){for(var j=g,k=0,l=0;j.prev().length&&!j.hasClass("dw-v");)j=j.prev(),k++;for(;g.next().length&&!g.hasClass("dw-v");)g=g.next(),l++;(k>l&&l&&2!==e||!k||!j.hasClass("dw-v")||1==e)&&g.hasClass("dw-v")?h+=l:(g=j,h-=k)}(!g.hasClass("dw-sel")||i)&&(S.temp[d]=g.attr("data-val"),a(".dw-sel",f).removeClass("dw-sel"),g.addClass("dw-sel"),S.scroll(f,d,h,b))}),S.change(d)}function I(){function b(){a(".dwc",R).each(function(){c=a(this).outerWidth(!0),i+=c,j=c>j?c:j}),c=i>k?j:i,c=a(".dwwr",R).width(c+1).outerWidth(),f=n.outerHeight()}if("inline"!=W.display){var c,d,e,f,g,h,i=0,j=0,k=a(window).width(),l=window.innerHeight,m=a(window).scrollTop(),n=a(".dw",R),o={},p=void 0===W.anchor?V:W.anchor,l=l||a(window).height();if("modal"==W.display)b(),e=(k-c)/2,d=m+(l-f)/2;else if("bubble"==W.display){b();var q=p.offset(),r=a(".dw-arr",R),s=a(".dw-arrw-i",R),t=n.outerWidth();g=p.outerWidth(),e=q.left-(n.outerWidth(!0)-g)/2,e=e>k-t?k-(t+20):e,e=e>=0?e:20,d=q.top-(n.outerHeight()+3),m>d||q.top>m+l?(n.removeClass("dw-bubble-top").addClass("dw-bubble-bottom"),d=q.top+p.outerHeight()+3,h=d+n.outerHeight(!0)>m+l||q.top>m+l):n.removeClass("dw-bubble-bottom").addClass("dw-bubble-top"),d=d>=m?d:m,m=q.left+g/2-(e+(t-s.outerWidth())/2),m>s.outerWidth()&&(m=s.outerWidth()),r.css({left:m})}else o.width="100%","top"==W.display?d=m:"bottom"==W.display&&(d=m+l-n.outerHeight(),d=d>=0?d:0);o.top=d,o.left=e,n.css(o),a(".dwo, .dw-persp",R).height(0).height(w()),h&&a(window).scrollTop(d+n.outerHeight(!0)-l)}}function J(b,d){var e;return d.push(S),a.each([X,c],function(a,c){c[b]&&(e=c[b].apply(U,d))}),e}function K(a){var b=+a.data("pos")+1;g(a,b>l?k:b,1)}function L(a){var b=+a.data("pos")-1;g(a,k>b?l:b,2)}var M,N,O,P,Q,R,S=this,T=a.mobiscroll,U=b,V=a(U),W=C({},E),X={},Y=[],Z={},$=V.is("input"),_=!1;S.enable=function(){W.disabled=!1,$&&V.prop("disabled",!1)},S.disable=function(){W.disabled=!0,$&&V.prop("disabled",!0)},S.scroll=function(a,b,c,d,e,f){function g(){clearInterval(Z[b]),Z[b]=void 0,a.data("pos",c).closest(".dwwl").removeClass("dwa")}var h,i=(O-c)*P,f=f||x;a.attr("style",(d?B+"-transition:all "+d.toFixed(1)+"s ease-out;":"")+(A?B+"-transform:translate3d(0,"+i+"px,0);":"top:"+i+"px;")),Z[b]&&g(),d&&void 0!==e?(h=0,a.closest(".dwwl").addClass("dwa"),Z[b]=setInterval(function(){h+=.1,a.data("pos",Math.round((c-e)*Math.sin(h/d*(Math.PI/2))+e)),h>=d&&(g(),f())},100),J("onAnimStart",[b,d])):(a.data("pos",c),f())},S.setValue=function(a,b,c,d){d||(S.values=S.temp.slice(0)),_&&a&&H(c),b&&(Q=W.formatResult(S.temp),S.val=Q,$&&V.val(Q).trigger("change"))},S.validate=function(a,b){H(.2,a,!0,b)},S.change=function(b){Q=W.formatResult(S.temp),"inline"==W.display?S.setValue(!1,b):a(".dwv",R).html(z(Q)),b&&J("onChange",[Q])},S.hide=function(b){return!1===J("onClose",[Q])?!1:(a(".dwtd").prop("disabled",!1).removeClass("dwtd"),V.blur(),void(R&&("inline"!=W.display&&W.animate&&!b?(a(".dw",R).addClass("dw-"+W.animate+" dw-out"),setTimeout(function(){R.remove(),R=null},350)):(R.remove(),R=null),_=!1,a(window).unbind(".dw"))))},S.changeWheel=function(b,c){if(R){var d,e,f=0,g=b.length;for(d in W.wheels)for(e in W.wheels[d]){if(-1<a.inArray(f,b)&&(Y[f]=W.wheels[d][e],a("ul",R).eq(f).html(h(f)),g--,!g))return I(),void H(c);f++}}},S.show=function(b){if(W.disabled||_)return!1;"top"==W.display&&(W.animate="slidedown"),"bottom"==W.display&&(W.animate="slideup"),G(),J("onBeforeShow",[R]);var c,e=0,j="",k="",l="";for(W.animate&&!b&&(k='<div class="dw-persp">',l="</div>",j="dw-"+W.animate+" dw-in"),j='<div class="'+W.theme+" dw-"+W.display+'">'+("inline"==W.display?'<div class="dw dwbg dwi"><div class="dwwr">':k+'<div class="dwo"></div><div class="dw dwbg '+j+'"><div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div><div class="dwwr">'+(W.headerText?'<div class="dwv"></div>':"")),b=0;b<W.wheels.length;b++){j+='<div class="dwc'+("scroller"!=W.mode?" dwpm":" dwsc")+(W.showLabel?"":" dwhl")+'"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>';for(c in W.wheels[b])Y[e]=W.wheels[b][c],j+='<td><div class="dwwl dwrc dwwl'+e+'">'+("scroller"!=W.mode?'<div class="dwwb dwwbp" style="height:'+P+"px;line-height:"+P+'px;"><span>+</span></div><div class="dwwb dwwbm" style="height:'+P+"px;line-height:"+P+'px;"><span>&ndash;</span></div>':"")+'<div class="dwl">'+c+'</div><div class="dww dwrc" style="height:'+W.rows*P+"px;min-width:"+W.width+'px;"><ul>',j+=h(e),j+='</ul><div class="dwwo"></div></div><div class="dwwol"></div></div></td>',e++;j+="</tr></table></div></div>"}j+=("inline"!=W.display?'<div class="dwbc'+(W.button3?" dwbc-p":"")+'"><span class="dwbw dwb-s"><span class="dwb">'+W.setText+"</span></span>"+(W.button3?'<span class="dwbw dwb-n"><span class="dwb">'+W.button3Text+"</span></span>":"")+'<span class="dwbw dwb-c"><span class="dwb">'+W.cancelText+"</span></span></div>"+l:'<div class="dwcc"></div>')+"</div></div></div>",R=a(j),H(),"inline"!=W.display?R.appendTo("body"):V.is("div")?V.html(R):R.insertAfter(V),_=!0,"inline"!=W.display&&(a(".dwb-s span",R).click(function(){return S.hide()!==!1&&(S.setValue(!1,!0),J("onSelect",[S.val])),!1}),a(".dwb-c span",R).click(function(){return S.hide()!==!1&&J("onCancel",[S.val]),!1}),W.button3&&a(".dwb-n span",R).click(W.button3),W.scrollLock&&R.bind("touchmove",function(a){a.preventDefault()}),a("input,select").each(function(){a(this).prop("disabled")||a(this).addClass("dwtd")}),a("input,select").prop("disabled",!0),I(),a(window).bind("resize.dw",I)),R.delegate(".dwwl","DOMMouseScroll mousewheel",function(b){if(!f(this)){b.preventDefault();var b=b.originalEvent,b=b.wheelDelta?b.wheelDelta/120:b.detail?-b.detail/3:0,c=a("ul",this),d=+c.data("pos"),d=Math.round(d-b);y(c),g(c,d,0>b?1:2)}}).delegate(".dwb, .dwwb",D,function(){a(this).addClass("dwb-a")}).delegate(".dwwb",D,function(b){var c=a(this).closest(".dwwl");if(!f(c)&&!c.hasClass("dwa")){b.preventDefault(),b.stopPropagation();var d=c.find("ul"),e=a(this).hasClass("dwwbp")?K:L;o=!0,y(d),clearInterval(i),i=setInterval(function(){e(d)},W.delay),e(d)}}).delegate(".dwwl",D,function(b){b.preventDefault(),n||f(this)||o||"clickpick"==W.mode||(n=!0,p=a("ul",this),p.closest(".dwwl").addClass("dwa"),u=+p.data("pos"),y(p),v=void 0!==Z[q],r=d(b),t=new Date,s=r,S.scroll(p,q,u))}),J("onShow",[R,Q]),M.init(R,S)},S.init=function(a){M=C({defaults:{},init:x},T.themes[a.theme||W.theme]),N=T.i18n[a.lang||W.lang],C(c,a),C(W,M.defaults,N,c),S.settings=W,V.unbind(".dw"),(a=T.presets[W.preset])&&(X=a.call(U,S),C(W,X,c),C(F,X.methods)),O=Math.floor(W.rows/2),P=W.height,void 0!==V.data("dwro")&&(U.readOnly=e(V.data("dwro"))),_&&S.hide(),"inline"==W.display?S.show():(G(),$&&W.showOnFocus&&(V.data("dwro",U.readOnly),U.readOnly=!0,V.bind("focus.dw",function(){S.show()})))},S.values=null,S.val=null,S.temp=null,S.init(c)}function c(a){for(var b in a)if(void 0!==z[a[b]])return!0;return!1}function d(a){var b=a.originalEvent,c=a.changedTouches;return c||b&&b.changedTouches?b?b.changedTouches[0].pageY:c[0].pageY:a.pageY}function e(a){return!0===a||"true"==a}function f(a,b,c){return a=a>c?c:a,b>a?b:a}function g(b,c,d,e,g){var c=f(c,k,l),h=a("li",b).eq(c),i=q,e=e?c==g?.1:Math.abs(.1*(c-g)):0;m.scroll(b,i,c,e,g,function(){m.temp[i]=h.attr("data-val"),m.validate(i,d)})}function h(a,b,c){return F[b]?F[b].apply(a,Array.prototype.slice.call(c,1)):"object"==typeof b?F.init.call(a,b):a}var i,j,k,l,m,n,o,p,q,r,s,t,u,v,w={},x=function(){},y=(new Date).getTime(),z=document.createElement("modernizr").style,A=c(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]),B=function(){var a,b=["Webkit","Moz","O","ms"];for(a in b)if(c([b[a]+"Transform"]))return"-"+b[a].toLowerCase();return""}(),C=a.extend,D="touchstart mousedown",E={width:70,height:40,rows:3,delay:300,disabled:!1,readonly:!1,showOnFocus:!0,showLabel:!0,wheels:[],theme:"",headerText:"{value}",display:"modal",mode:"scroller",preset:"",lang:"en-US",setText:"Set",cancelText:"Cancel",scrollLock:!0,formatResult:function(a){return a.join(" ")},parseValue:function(a,b){var c,d,e,f=b.settings.wheels,g=a.split(" "),h=[],i=0;for(c=0;c<f.length;c++)for(d in f[c]){if(void 0!==f[c][d][g[i]])h.push(g[i]);else for(e in f[c][d]){h.push(e);break}i++}return h}},F={init:function(a){return void 0===a&&(a={}),this.each(function(){this.id||(y+=1,this.id="scoller"+y),w[this.id]=new b(this,a)})},enable:function(){return this.each(function(){var a=w[this.id];a&&a.enable()})},disable:function(){return this.each(function(){var a=w[this.id];a&&a.disable()})},isDisabled:function(){var a=w[this[0].id];return a?a.settings.disabled:void 0},option:function(a,b){return this.each(function(){var c=w[this.id];if(c){var d={};"object"==typeof a?d=a:d[a]=b,c.init(d)}})},setValue:function(a,b,c,d){return this.each(function(){var e=w[this.id];e&&(e.temp=a,e.setValue(!0,b,c,d))})},getInst:function(){return w[this[0].id]},getValue:function(){var a=w[this[0].id];return a?a.values:void 0},show:function(){var a=w[this[0].id];return a?a.show():void 0},hide:function(){return this.each(function(){var a=w[this.id];a&&a.hide()})},destroy:function(){return this.each(function(){var b=w[this.id];b&&(b.hide(),a(this).unbind(".dw"),delete w[this.id],a(this).is("input")&&(this.readOnly=e(a(this).data("dwro"))))})}};a(document).bind("touchmove mousemove",function(a){n&&(a.preventDefault(),s=d(a),m.scroll(p,q,f(u+(r-s)/j,k-1,l+1)),v=!0)}),a(document).bind("touchend mouseup",function(b){if(n){b.preventDefault();var c,d=new Date-t,b=f(u+(r-s)/j,k-1,l+1);if(c=p.offset().top,300>d?(d=(s-r)/d,d=d*d/.0012,0>s-r&&(d=-d)):d=s-r,d||v)c=Math.round(u-d/j);else{c=Math.floor((s-c)/j);var e=a("li",p).eq(c);e.addClass("dw-hl"),setTimeout(function(){e.removeClass("dw-hl")},200)}g(p,c,0,!0,Math.round(b)),n=!1,p=null}o&&(clearInterval(i),o=!1),a(".dwb-a").removeClass("dwb-a")}),a.fn.mobiscroll=function(b){return C(this,a.mobiscroll.shorts),h(this,b,arguments)},a.mobiscroll=a.mobiscroll||{setDefaults:function(a){C(E,a)},presetShort:function(a){this.shorts[a]=function(b){return h(this,C(b,{preset:a}),arguments)}},shorts:{},presets:{},themes:{},i18n:{}},a.scroller=a.scroller||a.mobiscroll,a.fn.scroller=a.fn.scroller||a.fn.mobiscroll}(jQuery),function(a){var b=a.mobiscroll,c=new Date,d={dateFormat:"mm/dd/yy",dateOrder:"mmddy",timeWheels:"hhiiA",timeFormat:"hh:ii A",startYear:c.getFullYear()-100,endYear:c.getFullYear()+1,monthNames:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),monthNamesShort:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),dayNames:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),dayNamesShort:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),shortYearCutoff:"+10",monthText:"Month",dayText:"Day",yearText:"Year",hourText:"Hours",minuteText:"Minutes",secText:"Seconds",ampmText:"&nbsp;",nowText:"Now",showNow:!1,stepHour:1,stepMinute:1,stepSecond:1,separator:" "},e=function(c){function e(a,b,c){return void 0!==p[b]?+a[p[b]]:void 0!==c?c:y[q[b]]?y[q[b]]():q[b](y)}function f(a,b){return Math.floor(a/b)*b}function g(a){var b=e(a,"h",0);return new Date(e(a,"y"),e(a,"m"),e(a,"d",1),e(a,"ap")?b+12:b,e(a,"i",0),e(a,"s",0))}var h,i=a(this),j={};if(i.is("input")){switch(i.attr("type")){case"date":h="yy-mm-dd";break;case"datetime":h="yy-mm-ddTHH:ii:ssZ";break;case"datetime-local":h="yy-mm-ddTHH:ii:ss";break;case"month":h="yy-mm",j.dateOrder="mmyy";break;case"time":h="HH:ii:ss"}var k=i.attr("min"),i=i.attr("max");k&&(j.minDate=b.parseDate(h,k)),i&&(j.maxDate=b.parseDate(h,i))}var l,m=a.extend({},d,j,c.settings),n=0,j=[],o=[],p={},q={y:"getFullYear",m:"getMonth",d:"getDate",h:function(a){return a=a.getHours(),a=w&&a>=12?a-12:a,f(a,z)},i:function(a){return f(a.getMinutes(),A)},s:function(a){return f(a.getSeconds(),B)},ap:function(a){return v&&11<a.getHours()?1:0}},r=m.preset,s=m.dateOrder,t=m.timeWheels,u=s.match(/D/),v=t.match(/a/i),w=t.match(/h/),x="datetime"==r?m.dateFormat+m.separator+m.timeFormat:"time"==r?m.timeFormat:m.dateFormat,y=new Date,z=m.stepHour,A=m.stepMinute,B=m.stepSecond,C=m.minDate||new Date(m.startYear,0,1),D=m.maxDate||new Date(m.endYear,11,31,23,59,59);if(h=h||x,r.match(/date/i)){for(a.each(["y","m","d"],function(a,b){l=s.search(RegExp(b,"i")),l>-1&&o.push({o:l,v:b})}),o.sort(function(a,b){return a.o>b.o?1:-1}),a.each(o,function(a,b){p[b.v]=a}),k={},i=0;3>i;i++)if(i==p.y){n++,k[m.yearText]={};var E=C.getFullYear(),F=D.getFullYear();for(l=E;F>=l;l++)k[m.yearText][l]=s.match(/yy/i)?l:(l+"").substr(2,2)}else if(i==p.m)for(n++,k[m.monthText]={},l=0;12>l;l++)E=s.replace(/[dy]/gi,"").replace(/mm/,9>l?"0"+(l+1):l+1).replace(/m/,l),k[m.monthText][l]=E.match(/MM/)?E.replace(/MM/,'<span class="dw-mon">'+m.monthNames[l]+"</span>"):E.replace(/M/,'<span class="dw-mon">'+m.monthNamesShort[l]+"</span>");else if(i==p.d)for(n++,k[m.dayText]={},l=1;32>l;l++)k[m.dayText][l]=s.match(/dd/i)&&10>l?"0"+l:l;j.push(k)}if(r.match(/time/i)){for(o=[],a.each(["h","i","s"],function(a,b){a=t.search(RegExp(b,"i")),a>-1&&o.push({o:a,v:b})}),o.sort(function(a,b){return a.o>b.o?1:-1}),a.each(o,function(a,b){p[b.v]=n+a}),k={},i=n;n+3>i;i++)if(i==p.h)for(n++,k[m.hourText]={},l=0;(w?12:24)>l;l+=z)k[m.hourText][l]=w&&0==l?12:t.match(/hh/i)&&10>l?"0"+l:l;else if(i==p.i)for(n++,k[m.minuteText]={},l=0;60>l;l+=A)k[m.minuteText][l]=t.match(/ii/)&&10>l?"0"+l:l;else if(i==p.s)for(n++,k[m.secText]={},l=0;60>l;l+=B)k[m.secText][l]=t.match(/ss/)&&10>l?"0"+l:l;v&&(p.ap=n++,i=t.match(/A/),k[m.ampmText]={0:i?"AM":"am",1:i?"PM":"pm"}),j.push(k)}return c.setDate=function(a,b,c,d){for(var e in p)this.temp[p[e]]=a[q[e]]?a[q[e]]():q[e](a);this.setValue(!0,b,c,d)},c.getDate=function(a){return g(a)},{button3Text:m.showNow?m.nowText:void 0,button3:m.showNow?function(){c.setDate(new Date,!1,.3,!0)}:void 0,wheels:j,headerText:function(){return b.formatDate(x,g(c.temp),m)},formatResult:function(a){return b.formatDate(h,g(a),m)},parseValue:function(a){var c,d=new Date,e=[];try{d=b.parseDate(h,a,m)}catch(f){}for(c in p)e[p[c]]=d[q[c]]?d[q[c]]():q[c](d);return e},validate:function(b){var d=c.temp,g={y:C.getFullYear(),m:0,d:1,h:0,i:0,s:0,ap:0},h={y:D.getFullYear(),m:11,d:31,h:f(w?11:23,z),i:f(59,A),s:f(59,B),ap:1},i=!0,j=!0;a.each("y,m,d,ap,h,i,s".split(","),function(c,f){if(void 0!==p[f]){var k,l,n=g[f],o=h[f],r=31,t=e(d,f),v=a("ul",b).eq(p[f]);if("d"==f&&(k=e(d,"y"),l=e(d,"m"),o=r=32-new Date(k,l,32).getDate(),u&&a("li",v).each(function(){var b=a(this),c=b.data("val"),d=new Date(k,l,c).getDay(),c=s.replace(/[my]/gi,"").replace(/dd/,10>c?"0"+c:c).replace(/d/,c);a(".dw-i",b).html(c.match(/DD/)?c.replace(/DD/,'<span class="dw-day">'+m.dayNames[d]+"</span>"):c.replace(/D/,'<span class="dw-day">'+m.dayNamesShort[d]+"</span>"))})),i&&C&&(n=C[q[f]]?C[q[f]]():q[f](C)),j&&D&&(o=D[q[f]]?D[q[f]]():q[f](D)),"y"!=f){var w=a('li[data-val="'+n+'"]',v).index(),x=a('li[data-val="'+o+'"]',v).index();a("li",v).removeClass("dw-v").slice(w,x+1).addClass("dw-v"),"d"==f&&a("li",v).removeClass("dw-h").slice(r).addClass("dw-h")}if(n>t&&(t=n),t>o&&(t=o),i&&(i=t==n),j&&(j=t==o),m.invalid&&"d"==f){var y=[];if(m.invalid.dates&&a.each(m.invalid.dates,function(a,b){b.getFullYear()==k&&b.getMonth()==l&&y.push(b.getDate()-1)}),m.invalid.daysOfWeek){var z,A=new Date(k,l,1).getDay();a.each(m.invalid.daysOfWeek,function(a,b){for(z=b-A;r>z;z+=7)z>=0&&y.push(z)})}m.invalid.daysOfMonth&&a.each(m.invalid.daysOfMonth,function(a,b){b=(b+"").split("/"),b[1]?b[0]-1==l&&y.push(b[1]-1):y.push(b[0]-1)}),a.each(y,function(b,c){a("li",v).eq(c).removeClass("dw-v")})}d[p[f]]=t}})},methods:{getDate:function(b){var c=a(this).mobiscroll("getInst");return c?c.getDate(b?c.temp:c.values):void 0},setDate:function(b,c,d,e){return void 0==c&&(c=!1),this.each(function(){var f=a(this).mobiscroll("getInst");f&&f.setDate(b,c,d,e)})}}}};a.each(["date","time","datetime"],function(a,c){b.presets[c]=e,b.presetShort(c)}),b.formatDate=function(b,c,e){if(!c)return null;var f,e=a.extend({},d,e),g=function(a){for(var c=0;f+1<b.length&&b.charAt(f+1)==a;)c++,f++;return c},h=function(a,b,c){if(b=""+b,g(a))for(;b.length<c;)b="0"+b;return b},i=function(a,b,c,d){return g(a)?d[b]:c[b]},j="",k=!1;for(f=0;f<b.length;f++)if(k)"'"!=b.charAt(f)||g("'")?j+=b.charAt(f):k=!1;else switch(b.charAt(f)){case"d":j+=h("d",c.getDate(),2);break;case"D":j+=i("D",c.getDay(),e.dayNamesShort,e.dayNames);break;case"o":j+=h("o",(c.getTime()-new Date(c.getFullYear(),0,0).getTime())/864e5,3);break;case"m":j+=h("m",c.getMonth()+1,2);break;case"M":j+=i("M",c.getMonth(),e.monthNamesShort,e.monthNames);break;case"y":j+=g("y")?c.getFullYear():(10>c.getYear()%100?"0":"")+c.getYear()%100;break;case"h":var l=c.getHours(),j=j+h("h",l>12?l-12:0==l?12:l,2);break;case"H":j+=h("H",c.getHours(),2);break;case"i":j+=h("i",c.getMinutes(),2);break;case"s":j+=h("s",c.getSeconds(),2);break;case"a":j+=11<c.getHours()?"pm":"am";break;case"A":j+=11<c.getHours()?"PM":"AM";break;case"'":g("'")?j+="'":k=!0;break;default:j+=b.charAt(f)}return j},b.parseDate=function(b,c,e){var f=new Date;if(!b||!c)return f;var g,c="object"==typeof c?c.toString():c+"",h=a.extend({},d,e),i=h.shortYearCutoff,e=f.getFullYear(),j=f.getMonth()+1,k=f.getDate(),l=-1,m=f.getHours(),f=f.getMinutes(),n=0,o=-1,p=!1,q=function(a){return(a=g+1<b.length&&b.charAt(g+1)==a)&&g++,a},r=function(a){return q(a),(a=c.substr(t).match(RegExp("^\\d{1,"+("@"==a?14:"!"==a?20:"y"==a?4:"o"==a?3:2)+"}")))?(t+=a[0].length,parseInt(a[0],10)):0},s=function(a,b,d){for(a=q(a)?d:b,b=0;b<a.length;b++)if(c.substr(t,a[b].length).toLowerCase()==a[b].toLowerCase())return t+=a[b].length,b+1;return 0},t=0;for(g=0;g<b.length;g++)if(p)"'"!=b.charAt(g)||q("'")?t++:p=!1;else switch(b.charAt(g)){case"d":k=r("d");break;case"D":s("D",h.dayNamesShort,h.dayNames);break;case"o":l=r("o");break;case"m":j=r("m");break;case"M":j=s("M",h.monthNamesShort,h.monthNames);break;case"y":e=r("y");break;case"H":m=r("H");break;case"h":m=r("h");break;case"i":f=r("i");break;case"s":n=r("s");break;case"a":o=s("a",["am","pm"],["am","pm"])-1;break;case"A":o=s("A",["am","pm"],["am","pm"])-1;break;case"'":q("'")?t++:p=!0;break;default:t++}if(100>e&&(e+=(new Date).getFullYear()-(new Date).getFullYear()%100+(e<=("string"!=typeof i?i:(new Date).getFullYear()%100+parseInt(i,10))?0:-100)),l>-1)for(j=1,k=l;;){if(h=32-new Date(e,j-1,32).getDate(),h>=k)break;j++,k-=h}if(m=new Date(e,j-1,k,-1==o?m:o&&12>m?m+12:o||12!=m?m:0,f,n),m.getFullYear()!=e||m.getMonth()+1!=j||m.getDate()!=k)throw"Invalid date";return m}}(jQuery),function(){function a(a,b,c){"undefined"==typeof c&&(c=6371),this._lat="number"==typeof a?a:"string"==typeof a&&""!==a.trim()?+a:0/0,this._lon="number"==typeof b?b:"string"==typeof b&&""!==b.trim()?+b:0/0,this._radius="number"==typeof c?c:"string"==typeof c&&""!==trim(b)?+c:0/0}function b(a,b){this.easting=parseInt(a,10),this.northing=parseInt(b,10)}var c={};c.parseDMS=function(a){if("object"==typeof c)throw new TypeError("Geo.parseDMS - dmsStr is [DOM?] object");if("number"==typeof a&&isFinite(a))return Number(a);var b=String(a).trim().replace(/^-/,"").replace(/[NSEW]$/i,"").split(/[^0-9.,]+/);if(""===b[b.length-1]&&b.splice(b.length-1),""===b)return 0/0;var c;switch(b.length){case 3:c=b[0]/1+b[1]/60+b[2]/3600;break;case 2:c=b[0]/1+b[1]/60;break;case 1:c=b[0];break;default:return 0/0}return/^-|[WS]$/i.test(a.trim())&&(c=-c),Number(c)},c.toDMS=function(a,b,c){if("object"==typeof a)throw new TypeError("Geo.toDMS - deg is [DOM?] object");if(isNaN(a))return null;if("undefined"==typeof b&&(b="dms"),"undefined"==typeof c)switch(b){case"d":c=4;break;case"dm":c=2;break;case"dms":c=0;break;default:b="dms",c=0}a=Math.abs(a);var d,e,f;switch(b){case"d":d=a.toFixed(c),100>d&&(d="0"+d),10>d&&(d="0"+d);var g=d+"°";break;case"dm":var h=(60*a).toFixed(c);d=Math.floor(h/60),e=(h%60).toFixed(c),100>d&&(d="0"+d),10>d&&(d="0"+d),10>e&&(e="0"+e),g=d+"°"+e+"′";break;case"dms":var i=(3600*a).toFixed(c);d=Math.floor(i/3600),e=Math.floor(i/60)%60,f=(i%60).toFixed(c),100>d&&(d="0"+d),10>d&&(d="0"+d),10>e&&(e="0"+e),10>f&&(f="0"+f),g=d+"°"+e+"′"+f+"″"}return g},c.toLat=function(a,b,d){var e=c.toDMS(a,b,d);return null==e?"â€“":e.slice(1)+(0>a?"S":"N")},c.toLon=function(a,b,d){var e=c.toDMS(a,b,d);return null==e?"â€“":e+(0>a?"W":"E")},c.toBrng=function(a,b,d){a=(Number(a)+360)%360;var e=c.toDMS(a,b,d);return null==e?"â€“":e.replace("360","0")},window.console||(window.console={log:function(){}}),a.prototype.distanceTo=function(a,b){"undefined"==typeof b&&(b=4);var c=this._radius,d=this._lat.toRad(),e=this._lon.toRad(),f=a._lat.toRad(),g=a._lon.toRad(),h=f-d,i=g-e,j=Math.sin(h/2)*Math.sin(h/2)+Math.cos(d)*Math.cos(f)*Math.sin(i/2)*Math.sin(i/2),k=2*Math.atan2(Math.sqrt(j),Math.sqrt(1-j)),l=c*k;return l.toPrecisionFixed(b)},a.prototype.bearingTo=function(a){var b=this._lat.toRad(),c=a._lat.toRad(),d=(a._lon-this._lon).toRad(),e=Math.sin(d)*Math.cos(c),f=Math.cos(b)*Math.sin(c)-Math.sin(b)*Math.cos(c)*Math.cos(d),g=Math.atan2(e,f);return(g.toDeg()+360)%360},a.prototype.finalBearingTo=function(a){var b=a._lat.toRad(),c=this._lat.toRad(),d=(this._lon-a._lon).toRad(),e=Math.sin(d)*Math.cos(c),f=Math.cos(b)*Math.sin(c)-Math.sin(b)*Math.cos(c)*Math.cos(d),g=Math.atan2(e,f);
return(g.toDeg()+180)%360},a.prototype.midpointTo=function(b){var c=this._lat.toRad(),d=this._lon.toRad(),e=b._lat.toRad(),f=(b._lon-this._lon).toRad(),g=Math.cos(e)*Math.cos(f),h=Math.cos(e)*Math.sin(f),i=Math.atan2(Math.sin(c)+Math.sin(e),Math.sqrt((Math.cos(c)+g)*(Math.cos(c)+g)+h*h)),j=d+Math.atan2(h,Math.cos(c)+g);return j=(j+3*Math.PI)%(2*Math.PI)-Math.PI,new a(i.toDeg(),j.toDeg())},a.prototype.destinationPoint=function(b,c){c="number"==typeof c?c:"string"==typeof c&&""!==c.trim()?+c:0/0,c/=this._radius,b=b.toRad();var d=this._lat.toRad(),e=this._lon.toRad(),f=Math.asin(Math.sin(d)*Math.cos(c)+Math.cos(d)*Math.sin(c)*Math.cos(b)),g=e+Math.atan2(Math.sin(b)*Math.sin(c)*Math.cos(d),Math.cos(c)-Math.sin(d)*Math.sin(f));return g=(g+3*Math.PI)%(2*Math.PI)-Math.PI,new a(f.toDeg(),g.toDeg())},a.intersection=function(b,c,d,e){c="number"==typeof c?c:"string"==typeof c&&""!==trim(c)?+c:0/0,e="number"==typeof e?e:"string"==typeof e&&""!==trim(e)?+e:0/0;var f,g,h,i,j=b._lat.toRad(),k=b._lon.toRad(),l=d._lat.toRad(),m=d._lon.toRad(),n=c.toRad(),o=e.toRad(),p=l-j,q=m-k,r=2*Math.asin(Math.sqrt(Math.sin(p/2)*Math.sin(p/2)+Math.cos(j)*Math.cos(l)*Math.sin(q/2)*Math.sin(q/2)));if(0===r)return null;var s=Math.acos((Math.sin(l)-Math.sin(j)*Math.cos(r))/(Math.sin(r)*Math.cos(j)));isNaN(s)&&(s=0);var t=Math.acos((Math.sin(j)-Math.sin(l)*Math.cos(r))/(Math.sin(r)*Math.cos(l)));if(Math.sin(m-k)>0?(f=s,g=2*Math.PI-t):(f=2*Math.PI-s,g=t),h=(n-f+Math.PI)%(2*Math.PI)-Math.PI,i=(g-o+Math.PI)%(2*Math.PI)-Math.PI,0===Math.sin(h)&&0===Math.sin(i))return null;if(Math.sin(h)*Math.sin(i)<0)return null;var u=Math.acos(-Math.cos(h)*Math.cos(i)+Math.sin(h)*Math.sin(i)*Math.cos(r)),v=Math.atan2(Math.sin(r)*Math.sin(h)*Math.sin(i),Math.cos(i)+Math.cos(h)*Math.cos(u)),w=Math.asin(Math.sin(j)*Math.cos(v)+Math.cos(j)*Math.sin(v)*Math.cos(n)),x=Math.atan2(Math.sin(n)*Math.sin(v)*Math.cos(j),Math.cos(v)-Math.sin(j)*Math.sin(w)),y=k+x;return y=(y+3*Math.PI)%(2*Math.PI)-Math.PI,new a(w.toDeg(),y.toDeg())},a.prototype.rhumbDistanceTo=function(a){var b=this._radius,c=this._lat.toRad(),d=a._lat.toRad(),e=(a._lat-this._lat).toRad(),f=Math.abs(a._lon-this._lon).toRad(),g=Math.log(Math.tan(d/2+Math.PI/4)/Math.tan(c/2+Math.PI/4)),h=isFinite(e/g)?e/g:Math.cos(c);Math.abs(f)>Math.PI&&(f=f>0?-(2*Math.PI-f):2*Math.PI+f);var i=Math.sqrt(e*e+h*h*f*f)*b;return i.toPrecisionFixed(4)},a.prototype.rhumbBearingTo=function(a){var b=this._lat.toRad(),c=a._lat.toRad(),d=(a._lon-this._lon).toRad(),e=Math.log(Math.tan(c/2+Math.PI/4)/Math.tan(b/2+Math.PI/4));Math.abs(d)>Math.PI&&(d=d>0?-(2*Math.PI-d):2*Math.PI+d);var f=Math.atan2(d,e);return(f.toDeg()+360)%360},a.prototype.rhumbDestinationPoint=function(b,c){var d=this._radius,e=parseFloat(c)/d,f=this._lat.toRad(),g=this._lon.toRad();b=b.toRad();var h=e*Math.cos(b);Math.abs(h)<1e-10&&(h=0);var i=f+h,j=Math.log(Math.tan(i/2+Math.PI/4)/Math.tan(f/2+Math.PI/4)),k=isFinite(h/j)?h/j:Math.cos(f),l=e*Math.sin(b)/k;return Math.abs(i)>Math.PI/2&&(i=i>0?Math.PI-i:-Math.PI-i),lon2=(g+l+3*Math.PI)%(2*Math.PI)-Math.PI,new a(i.toDeg(),lon2.toDeg())},a.prototype.rhumbMidpointTo=function(b){var c=this._lat.toRad(),d=this._lon.toRad(),e=b._lat.toRad(),f=b._lon.toRad();Math.abs(f-d)>Math.PI&&(d+=2*Math.PI);var g=(c+e)/2,h=Math.tan(Math.PI/4+c/2),i=Math.tan(Math.PI/4+e/2),j=Math.tan(Math.PI/4+g/2),k=((f-d)*Math.log(j)+d*Math.log(i)-f*Math.log(h))/Math.log(i/h);return isFinite(k)||(k=(d+f)/2),k=(k+3*Math.PI)%(2*Math.PI)-Math.PI,new a(g.toDeg(),k.toDeg())},a.prototype.lat=function(a,b){return"undefined"==typeof a?this._lat:c.toLat(this._lat,a,b)},a.prototype.lon=function(a,b){return"undefined"==typeof a?this._lon:c.toLon(this._lon,a,b)},a.prototype.toString=function(a,b){return"undefined"==typeof a&&(a="dms"),c.toLat(this._lat,a,b)+", "+c.toLon(this._lon,a,b)},"undefined"==typeof Number.prototype.toRad&&(Number.prototype.toRad=function(){return this*Math.PI/180}),"undefined"==typeof Number.prototype.toDeg&&(Number.prototype.toDeg=function(){return 180*this/Math.PI}),"undefined"==typeof Number.prototype.toPrecisionFixed&&(Number.prototype.toPrecisionFixed=function(a){var b=this.toPrecision(a);return b=b.replace(/(.+)e\+(.+)/,function(a,b,c){for(b=b.replace(/\./,""),l=b.length-1;c-->l;)b+="0";return b}),b=b.replace(/(.+)e-(.+)/,function(a,b,c){for(b=b.replace(/\./,"");c-->1;)b="0"+b;return"0."+b})}),"undefined"==typeof String.prototype.trim&&(String.prototype.trim=function(){return String(this).replace(/^\s\s*/,"").replace(/\s\s*$/,"")}),window.console||(window.console={log:function(){}}),b.latLongToOsGrid=function(a){var c=a.lat().toRad(),d=a.lon().toRad(),e=6377563.396,f=6356256.91,g=.9996012717,h=49..toRad(),i=(-2).toRad(),j=-1e5,k=4e5,l=1-f*f/(e*e),m=(e-f)/(e+f),n=m*m,o=m*m*m,p=Math.cos(c),q=Math.sin(c),r=e*g/Math.sqrt(1-l*q*q),s=e*g*(1-l)/Math.pow(1-l*q*q,1.5),t=r/s-1,u=(1+m+5/4*n+5/4*o)*(c-h),v=(3*m+3*m*m+21/8*o)*Math.sin(c-h)*Math.cos(c+h),w=(15/8*n+15/8*o)*Math.sin(2*(c-h))*Math.cos(2*(c+h)),x=35/24*o*Math.sin(3*(c-h))*Math.cos(3*(c+h)),y=f*g*(u-v+w-x),z=p*p*p,A=z*p*p,B=Math.tan(c)*Math.tan(c),C=B*B,D=y+j,E=r/2*q*p,F=r/24*q*z*(5-B+9*t),G=r/720*q*A*(61-58*B+C),H=r*p,I=r/6*z*(r/s-B),J=r/120*A*(5-18*B+C+14*t-58*B*t),K=d-i,L=K*K,M=L*K,N=M*K,O=N*K,P=O*K,Q=D+E*L+F*N+G*P,R=k+H*K+I*M+J*O;return new b(R,Q)},b.osGridToLatLong=function(b){var c=b.easting,d=b.northing,e=6377563.396,f=6356256.91,g=.9996012717,h=49*Math.PI/180,i=-2*Math.PI/180,j=-1e5,k=4e5,l=1-f*f/(e*e),m=(e-f)/(e+f),n=m*m,o=m*m*m,p=h,q=0;do{p=(d-j-q)/(e*g)+p;var r=(1+m+5/4*n+5/4*o)*(p-h),s=(3*m+3*m*m+21/8*o)*Math.sin(p-h)*Math.cos(p+h),t=(15/8*n+15/8*o)*Math.sin(2*(p-h))*Math.cos(2*(p+h)),u=35/24*o*Math.sin(3*(p-h))*Math.cos(3*(p+h));q=f*g*(r-s+t-u)}while(d-j-q>=1e-5);var v=Math.cos(p),w=Math.sin(p),x=e*g/Math.sqrt(1-l*w*w),y=e*g*(1-l)/Math.pow(1-l*w*w,1.5),z=x/y-1,A=Math.tan(p),B=A*A,C=B*B,D=C*B,E=1/v,F=x*x*x,G=F*x*x,H=G*x*x,I=A/(2*y*x),J=A/(24*y*F)*(5+3*B+z-9*B*z),K=A/(720*y*G)*(61+90*B+45*C),L=E/x,M=E/(6*F)*(x/y+2*B),N=E/(120*G)*(5+28*B+24*C),O=E/(5040*H)*(61+662*B+1320*C+720*D),P=c-k,Q=P*P,R=Q*P,S=Q*Q,T=R*Q,U=S*Q,V=T*Q;p=p-I*Q+J*S-K*U;var W=i+L*P-M*R+N*T-O*V;return new a(p.toDeg(),W.toDeg())},b.parse=function(a){a=a.trim();var c=a.toUpperCase().charCodeAt(0)-"A".charCodeAt(0),d=a.toUpperCase().charCodeAt(1)-"A".charCodeAt(0);c>7&&c--,d>7&&d--;var e=(c-2)%5*5+d%5,f=19-5*Math.floor(c/5)-Math.floor(d/5);if(0>e||e>6||0>f||f>12)return new b(0/0,0/0);switch(a=a.slice(2).replace(/ /g,""),e+=a.slice(0,a.length/2),f+=a.slice(a.length/2),a.length){case 0:e+="50000",f+="50000";break;case 2:e+="5000",f+="5000";break;case 4:e+="500",f+="500";break;case 6:e+="50",f+="50";break;case 8:e+="5",f+="5";break;case 10:break;default:return new b(0/0,0/0)}return new b(e,f)},b.prototype.toString=function(a){a="undefined"==typeof a?10:a;var b=this.easting,c=this.northing;if(isNaN(b)||isNaN(c))return"??";var d=Math.floor(b/1e5),e=Math.floor(c/1e5);if(0>d||d>6||0>e||e>12)return"";var f=19-e-(19-e)%5+Math.floor((d+10)/5),g=5*(19-e)%25+d%5;f>7&&f++,g>7&&g++;var h=String.fromCharCode(f+"A".charCodeAt(0),g+"A".charCodeAt(0));b=Math.floor(b%1e5/Math.pow(10,5-a/2)),c=Math.floor(c%1e5/Math.pow(10,5-a/2));var i=h+" "+b.padLz(a/2)+" "+c.padLz(a/2);return i},"undefined"==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s\s*/,"").replace(/\s\s*$/,"")}),"undefined"==typeof String.prototype.padLz&&(Number.prototype.padLz=function(a){for(var b=this.toString(),c=b.length,d=0;a-c>d;d++)b="0"+b;return b}),window.console||(window.console={log:function(){}}),function(a){function b(b,c){function d(b,c){var d,e,f=a(b.target).offset();return clearTimeout(A),A=!1,"undefined"!=typeof b.changedTouches?(d=Math.floor(b.changedTouches[0].pageX-f.left),e=Math.floor(b.changedTouches[0].pageY-f.top)):(d=Math.floor(b.pageX-f.left),e=Math.floor(b.pageY-f.top)),y.x===d&&y.y===e?!0:(null===y.x&&(y.x=d),null===y.y&&(y.y=e),c&&(e+=c),x.beginPath(),x.moveTo(y.x,y.y),x.lineTo(d,e),x.lineCap=t.penCap,x.stroke(),x.closePath(),z.push({lx:d,ly:e,mx:y.x,my:y.y}),y.x=d,void(y.y=e))}function e(){B?v.each(function(){this.ontouchmove=null}):v.unbind("mousemove.signaturepad"),y.x=null,y.y=null,z.length>0&&a(t.output,u).val(JSON.stringify(z))}function f(){return t.lineWidth?(x.beginPath(),x.lineWidth=t.lineWidth,x.strokeStyle=t.lineColour,x.moveTo(t.lineMargin,t.lineTop),x.lineTo(w.width-t.lineMargin,t.lineTop),x.stroke(),void x.closePath()):!1}function g(){e(),x.clearRect(0,0,w.width,w.height),x.fillStyle=t.bgColour,x.fillRect(0,0,w.width,w.height),t.displayOnly||f(),x.lineWidth=t.penWidth,x.strokeStyle=t.penColour,a(t.output,u).val(""),z=[]}function h(a){B?v.each(function(){this.addEventListener("touchmove",d,!1)}):v.bind("mousemove.signaturepad",d),d(a,1)}function i(){C=!1,B?v.each(function(){this.removeEventListener("touchstart",e),this.removeEventListener("touchend",e),this.removeEventListener("touchmove",d)}):(v.unbind("mousedown.signaturepad"),v.unbind("mouseup.signaturepad"),v.unbind("mousemove.signaturepad"),v.unbind("mouseleave.signaturepad")),a(t.clear,u).unbind("click.signaturepad")}function j(a){return C?!1:(C=!0,"undefined"!=typeof a.changedTouches&&(B=!0),void(B?(v.each(function(){this.addEventListener("touchend",e,!1),this.addEventListener("touchcancel",e,!1)}),v.unbind("mousedown.signaturepad")):(v.bind("mouseup.signaturepad",function(){e()}),v.bind("mouseleave.signaturepad",function(){A||(A=setTimeout(function(){e(),clearTimeout(A),A=!1},500))}),v.each(function(){this.ontouchstart=null}))))}function k(){a(t.typed,u).hide(),g(),v.each(function(){this.ontouchstart=function(a){a.preventDefault(),j(a),h(a,this)}}),v.bind("mousedown.signaturepad",function(a){j(a),h(a,this)}),a(t.clear,u).bind("click.signaturepad",function(a){a.preventDefault(),g()}),a(t.typeIt,u).bind("click.signaturepad",function(a){a.preventDefault(),l()}),a(t.drawIt,u).unbind("click.signaturepad"),a(t.drawIt,u).bind("click.signaturepad",function(a){a.preventDefault()}),a(t.typeIt,u).removeClass(t.currentClass),a(t.drawIt,u).addClass(t.currentClass),a(t.sig,u).addClass(t.currentClass),a(t.typeItDesc,u).hide(),a(t.drawItDesc,u).show(),a(t.clear,u).show()}function l(){g(),i(),a(t.typed,u).show(),a(t.drawIt,u).bind("click.signaturepad",function(a){a.preventDefault(),k()}),a(t.typeIt,u).unbind("click.signaturepad"),a(t.typeIt,u).bind("click.signaturepad",function(a){a.preventDefault()}),a(t.output,u).val(""),a(t.drawIt,u).removeClass(t.currentClass),a(t.typeIt,u).addClass(t.currentClass),a(t.sig,u).removeClass(t.currentClass),a(t.drawItDesc,u).hide(),a(t.clear,u).hide(),a(t.typeItDesc,u).show()}function m(b){for(a(t.typed,u).html(b.replace(/>/g,"&gt;").replace(/</g,"&lt;"));a(t.typed,u).width()>w.width;){var c=a(t.typed,u).css("font-size").replace(/px/,"");a(t.typed,u).css("font-size",c-1+"px")}}function n(b,c){a("p."+c.errorClass,b).remove(),b.removeClass(c.errorClass),a("input, label",b).removeClass(c.errorClass)}function o(b,c,d){b.nameInvalid&&(c.prepend(['<p class="',d.errorClass,'">',d.errorMessage,"</p>"].join("")),a(d.name,c).focus(),a(d.name,c).addClass(d.errorClass),a("label[for="+a(d.name).attr("id")+"]",c).addClass(d.errorClass)),b.drawInvalid&&c.prepend(['<p class="',d.errorClass,'">',d.errorMessageDraw,"</p>"].join(""))}function p(){var b=!0,c={drawInvalid:!1,nameInvalid:!1},d=[u,t],e=[c,u,t];return t.onBeforeValidate&&"function"==typeof t.onBeforeValidate?t.onBeforeValidate.apply(s,d):n.apply(s,d),t.drawOnly&&z.length<1&&(c.drawInvalid=!0,b=!1),""===a(t.name,u).val()&&(c.nameInvalid=!0,b=!1),t.onFormError&&"function"==typeof t.onFormError?t.onFormError.apply(s,e):o.apply(s,e),b}function q(a,b,c){for(var d in a)"object"==typeof a[d]&&(b.beginPath(),b.moveTo(a[d].mx,a[d].my),b.lineTo(a[d].lx,a[d].ly),b.lineCap=t.penCap,b.stroke(),b.closePath(),c&&z.push({lx:a[d].lx,ly:a[d].ly,mx:a[d].mx,my:a[d].my}))}function r(){parseFloat((/CPU.+OS ([0-9_]{3}).*AppleWebkit.*Mobile/i.exec(navigator.userAgent)||[0,"4_2"])[1].replace("_","."))<4.1&&(a.fn.Oldoffset=a.fn.offset,a.fn.offset=function(){var b=a(this).Oldoffset();return b.top-=window.scrollY,b.left-=window.scrollX,b}),a(t.typed,u).bind("selectstart.signaturepad",function(b){return a(b.target).is(":input")}),v.bind("selectstart.signaturepad",function(b){return a(b.target).is(":input")}),!w.getContext&&FlashCanvas&&FlashCanvas.initElement(w),w.getContext&&(x=w.getContext("2d"),a(t.sig,u).show(),t.displayOnly||(t.drawOnly||(a(t.name,u).bind("keyup.signaturepad",function(){m(a(this).val())}),a(t.name,u).bind("blur.signaturepad",function(){m(a(this).val())}),a(t.drawIt,u).bind("click.signaturepad",function(a){a.preventDefault(),k()})),t.drawOnly||"drawIt"===t.defaultAction?k():l(),t.validateFields&&(a(b).is("form")?a(b).bind("submit.signaturepad",function(){return p()}):a(b).parents("form").bind("submit.signaturepad",function(){return p()})),a(t.sigNav,u).show()))}var s=this,t=a.extend({},a.fn.signaturePad.defaults,c),u=a(b),v=a(t.canvas,u),w=v.get(0),x=null,y={x:null,y:null},z=[],A=!1,B=!1,C=!1;a.extend(s,{init:function(){r()},regenerate:function(b){s.clearCanvas(),a(t.typed,u).hide(),"string"==typeof b&&(b=JSON.parse(b)),q(b,x,!0),a(t.output,u).length>0&&a(t.output,u).val(JSON.stringify(z))},clearCanvas:function(){g()},getSignature:function(){return z},getSignatureString:function(){return JSON.stringify(z)},getSignatureImage:function(){var a=document.createElement("canvas"),b=null,c=null;return a.style.position="absolute",a.style.top="-999em",a.width=w.width,a.height=w.height,document.body.appendChild(a),!a.getContext&&FlashCanvas&&FlashCanvas.initElement(a),b=a.getContext("2d"),b.fillStyle=t.bgColour,b.fillRect(0,0,w.width,w.height),b.lineWidth=t.penWidth,b.strokeStyle=t.penColour,q(z,b),c=a.toDataURL.apply(a,arguments),document.body.removeChild(a),a=null,c}})}a.fn.signaturePad=function(a){var c=null;return this.each(function(){c=new b(this,a),c.init()}),c},a.fn.signaturePad.defaults={defaultAction:"typeIt",displayOnly:!1,drawOnly:!1,canvas:"canvas",sig:".sig",sigNav:".sigNav",bgColour:"#ffffff",penColour:"#145394",penWidth:2,penCap:"round",lineColour:"#ccc",lineWidth:2,lineMargin:5,lineTop:35,name:".name",typed:".typed",clear:".clearButton",typeIt:".typeIt a",drawIt:".drawIt a",typeItDesc:".typeItDesc",drawItDesc:".drawItDesc",output:".output",currentClass:"current",validateFields:!0,errorClass:"error",errorMessage:"Please enter your name",errorMessageDraw:"Please sign the document",onBeforeValidate:null,onFormError:null}}(jQuery);var d=(function(a,b,c){function d(b){for(var d=[],e=0,f=b.length;f>e;e+=c)d.push(a.apply(null,b.slice(e,e+c)));return d.join("")}function e(a){return[a&b,a>>8&b,a>>16&b,a>>24&b]}function f(a,b,c){for(var d,e,f,g,h,i,j=4*b,k=c-1,l=[];c--;)for(h=j*(k-c),i=j*c,d=0;b>d;d++)e=4*d,f=h+e,g=i+e,l[f]=a[g+2],l[f+1]=a[g+1],l[f+2]=a[g],l[f+3]=a[g+3];return l}function g(a){var c,g=a.width,h=a.height,i=[].concat(e(g),e(h),1,0,32,0,3,0,0,0,e(g*h*4),19,11,0,0,19,11,0,0,0,0,0,0,0,0,0,0,0,0,b,0,0,b,0,0,b,0,0,0,0,0,0,b,32,110,105,87),j=f(a.getContext("2d").getImageData(0,0,g,h).data,g,h);return i=e(i.length).concat(i),c=14+i.length,"data:image/bmp;base64,"+btoa(d([66,77].concat(e(c+j.length),0,0,0,0,e(c),i,j)))}return g}(String.fromCharCode,255,32767),function(a){return a.views={},a.models={},a.collections={},a.config={},a}(d||{})),e=Backbone.View.extend({onLoad:function(){},onLoadEnd:function(){}}),f=e.extend({events:{"click button#formlist_reload":"reload"},templates:{list:'<ul class="form_list fh_appform_body"></ul>',header:"<h2>Your Forms</h2><h4>Choose a form from the list below</h4>",error:'<li><button id="formlist_reload" class="button-block <%= enabledClass %> <%= dataClass %> fh_appform_button_default"><%= name %><div class="loading"></div></button></li>'},initialize:function(){$fh.forms.log.l("Initialize Form List"),_.bindAll(this,"render","appendForm"),this.views=[],d.collections.forms.bind("reset",function(a,b){null!=b&&b.noFetch||d.collections.forms.each(function(a){a.fetch()})}),d.collections.forms.bind("add remove reset error",this.render,this),this.model.on("updated",this.render)},reload:function(){$fh.forms.log.l("Reload Form List");var a=this;this.onLoad(),this.model.refresh(!0,function(b,c){this.onLoadEnd(),a.model=c,a.render()})},show:function(){$(this.$el).show()},hide:function(){$(this.$el).hide()},renderErrorHandler:function(a){try{(null==a||a.match("error_ajaxfail"))&&(a="An unexpected error occurred.")}catch(b){a="An unexpected error occurred."}var c=_.template(this.templates.error,{name:a+"<br/>Please Retry Later",enabledClass:"fh_appform_button_cancel",dataClass:"fetched"});$("ul",this.$el).append(c)},render:function(){this.options.parentEl.append(this.templates.list);var a=this.model.getFormsList();a.length>0?(this.options.parentEl.find("ul").append(this.templates.header),_(a).forEach(function(a){this.appendForm(a)},this)):this.renderErrorHandler(arguments[1])},appendForm:function(a){var b=new g({model:a});this.views.push(b),$("ul",this.options.parentEl).append(b.render().$el)},initFormList:function(a,b){var c=this;$fh.forms.getForms({fromRemote:a},function(a,d){a?b(a):(c.model=d,b(null,c))})}}),g=e.extend({events:{"click button.show.fetched":"show","click button.show.fetch_error":"fetch"},templates:{form_button:'<li><button class="show button-block <%= enabledClass %> <%= dataClass %>"><%= name %><div class="loading"></div></button></li>'},render:function(){var a,b=!0;return a=_.template(this.templates.form_button,{name:this.model.name,enabledClass:b?"button-main":"",dataClass:"fetched"}),this.$el.html(a),this.$el.find("button").not(".fh_full_data_loaded"),this},unrender:function(){$(this.$el).remove()},show:function(){var a=this.model._id,b=new j({parentEl:$("#backbone #page")});b.loadForm({formId:a},function(){b.render(),Backbone.history.navigate("form",!0)})},fetch:function(){}}),h=Backbone.View.extend({className:"fh_appform_field_area",errMessageContainer:".fh_appform_field_error_container",requiredClassName:"fh_appform_field_required",errorClassName:"fh_appform_field_error",repeatingClassName:"repeating",nonRepeatingClassName:"non_repeating",addInputButtonClass:".fh_appform_addInputBtn",removeInputButtonClass:".fh_appform_removeInputBtn",fieldWrapper:'<div class="fh_appform_input_wrapper"></div>',input:"<input class='fh_appform_field_input <%= repeatingClassName%>' data-field='<%= fieldId %>' data-index='<%= index %>' value='<%= value %>' type='<%= inputType %>' />",inputTemplate:"<div id='wrapper_<%= fieldId %>_<%= index %>'> <div class='fh_appform_field_input_container non_repeating' >  <%= inputHtml %> <div class='fh_appform_field_error_container fh_appform_hidden' ></div></div><br style='clear:both'/>    </div>",inputTemplateRepeating:"<div id='wrapper_<%= fieldId %>_<%= index %>' > <div class='<%= required %> fh_appform_field_title fh_appform_field_numbering'> <%=index + 1%>.  </div> <div class='fh_appform_field_input_container repeating' >  <%= inputHtml %> <div class='fh_appform_field_error_container fh_appform_hidden'></div></div><br style='clear:both'/></div>",fh_appform_fieldActionBar:"<div class='fh_appform_field_button_bar' ><button class='fh_appform_removeInputBtn special_button fh_appform_button_action'>-</button><button class='special_button fh_appform_addInputBtn fh_appform_button_action'>+</button></div>",title:'<label class="fh_appform_field_title <%= required%>"><%= title %> </label>',titleRepeating:'<label class="fh_appform_field_title"><%= title %> </label>',instructions:'<p class="fh_appform_field_instructions"><%= helpText %></p>',events:{change:"contentChanged","blur input,select,textarea":"validate","click .fh_appform_addInputBtn":"onAddInput","click .fh_appform_removeInputBtn":"onRemoveInput"},onAddInput:function(){this.addElement(),this.checkActionBar()},onRemoveInput:function(){this.removeElement(),this.checkActionBar()},checkActionBar:function(){var a=this.curRepeat,b=this.maxRepeat,c=this.initialRepeat;b>a?this.$fh_appform_fieldActionBar.find(this.addInputButtonClass).show():this.$fh_appform_fieldActionBar.find(this.addInputButtonClass).hide(),a>c?this.$fh_appform_fieldActionBar.find(this.removeInputButtonClass).show():this.$fh_appform_fieldActionBar.find(this.removeInputButtonClass).hide()},removeElement:function(){var a=this.curRepeat,b=a-1;this.getWrapper(b).remove(),this.curRepeat--},renderTitle:function(){var a=this.model.getName(),b=a,c=this.title;return this.model.isRepeating()&&(c=this.titleRepeating),_.template(c,{title:b,required:this.getFieldRequired(0)})},renderInput:function(a){var b=this.model.getFieldId(),c=this.getHTMLInputType(),d=this.model.isRepeating()?this.repeatingClassName:this.nonRepeatingClassName;return _.template(this.input,{fieldId:b,index:a,inputType:c,repeatingClassName:d,value:this.model.getDefaultValue()})},getHTMLInputType:function(){return this.type||"text"},getFieldRequired:function(a){var b="";return this.model.isRequired()&&a<this.initialRepeat&&(b=this.requiredClassName),b},renderEle:function(a,b,c){var d=this.model.getFieldId(),e=this.inputTemplate;return this.model.isRepeating()&&(e=this.inputTemplateRepeating),_.template(e,{fieldId:d,index:c,inputHtml:b,required:this.getFieldRequired(c)})},renderHelpText:function(){var a=this.model.getHelpText();return"string"==typeof a&&a.length>0?_.template(this.instructions,{helpText:a}):""},addElement:function(){var a=this.curRepeat,b=this.renderInput(a),c=this.renderEle("",b,a);this.$fieldWrapper.append(c),this.curRepeat++,this.onElementShow(a)},onElementShow:function(a){$fh.forms.log.d("Show done for field "+a)},render:function(){var a=this;this.initialRepeat=1,this.maxRepeat=1,this.curRepeat=0,this.$fieldWrapper.append(this.renderTitle()),this.$fieldWrapper.append(this.renderHelpText()),this.model.isRepeating()&&(this.initialRepeat=this.model.getMinRepeat(),this.maxRepeat=this.model.getMaxRepeat());for(var b=0;b<this.initialRepeat;b++)this.addElement();this.$el.append(this.$fieldWrapper),this.$el.append(this.$fh_appform_fieldActionBar),this.$el.attr("data-field",this.model.getFieldId()),this.options.sectionName?this.options.parentEl.find("#fh_appform_"+this.options.sectionName).append(this.$el):this.options.parentEl.append(this.$el),this.show(),this.$el.hasClass("hide")&&this.hide(!0);var c=this.options.formView.getSubmission();c&&(this.submission=c,this.submission.getInputValueByFieldId(this.model.get("_id"),function(b,c){a.value(c)})),this.checkActionBar(),this.onRender()},onRender:function(){},initialize:function(){_.bindAll(this,"dumpContent","clearError","onAddInput","onRemoveInput"),this.$fieldWrapper=$(this.fieldWrapper),this.$fh_appform_fieldActionBar=$(this.fh_appform_fieldActionBar),this.render()},dumpContent:function(){$fh.forms.log.d("Value changed :: "+JSON.stringify(this.value()))},getTopView:function(){var a,b=this.options.parentView;do a=b.options.parentView,a&&(b=a);while(a);return b},validateElement:function(a,b,c){var d=this,e=d.model.getFieldId();d.model.validate(b,a,function(b,f){if(b)d.setErrorText(a,"Error validating field: "+b),c&&c(b);else{var g=f.validation[e];if(g.valid)d.clearError(a),c&&c();else{var h=g.errorMessages.join(", ");d.setErrorText(a,h),c&&c(h)}}})},validate:function(a){var b=this,c=$(a.currentTarget),d=c.data().index,e=b.valueFromElement(d);b.validateElement(d,e),b.trigger("checkrules")},setErrorText:function(a,b){var c=this.getWrapper(a);c.find(this.errMessageContainer).text(b),c.find(this.errMessageContainer).show(),c.find(this.errMessageContainer).addClass(this.errorClassName),c.find("input,textarea,select").addClass(this.errorClassName)},contentChanged:function(a){this.validate(a)},isRequired:function(){return this.model.isRequired()},hide:function(){this.$el.hide()},renderButton:function(a,b,c){var d=$("<button>");return d.addClass("special_button fh_appform_button_action"),d.addClass(c),d.attr("data-index",a),d.html(" "+b),this.htmlFromjQuery(d)},addButton:function(a,b,c){var d=this,e=$("<button>");return e.addClass("special_button fh_appform_button_action"),e.addClass(b),e.html(" "+c),e.click(function(a){return d.action(this),a.preventDefault(),!1}),a.append(e),e},show:function(){this.$el.show()},defaultValue:function(){var a={};return a[this.model.get("_id")]=this.model.get("DefaultVal"),a},htmlFromjQuery:function(a){return $("<div>").append(a.clone()).html()},value:function(a){var b=this;return a&&!_.isEmpty(a)&&b.valuePopulate(a),b.getValue()},getValue:function(){for(var a=[],b=this.curRepeat,c=0;b>c;c++)a[c]=this.valueFromElement(c);return a},valueFromElement:function(a){var b=this.getWrapper(a);return b.find("input,select,textarea").val()||""},valuePopulate:function(a){for(var b=a.length;b>this.curRepeat;)this.addElement();for(var c=0;c<a.length;c++){var d=a[c];this.valuePopulateToElement(c,d)}},valuePopulateToElement:function(a,b){var c=this.getWrapper(a);c.find("input,select,textarea").val(b)},getWrapper:function(a){var b=this.model.getFieldId();return this.$fieldWrapper.find("#wrapper_"+b+"_"+a)},fillArray:function(a,b){for(var c=0;c<a.length;c++)a[c]||(a[c]=b)},clearError:function(a){var b=this.getWrapper(a);b.find(this.errMessageContainer).hide(),b.find("."+this.errorClassName).removeClass(this.errorClassName)}});FieldCameraView=h.extend({input:"<img class='imageThumb' width='100%' data-field='<%= fieldId %>' data-index='<%= index %>'  type='<%= inputType %>'>",html5Cam:'<div class="html5Cam"><div class="camActionBar"><button class="camCancel camBtn fh_appform_button_cancel">Cancel</button><button class="camOk camBtn fh_appform_button_action">Ok</button></div><div class="cam"></div></div>',onElementShow:function(a){var b=$(this.renderButton(a,"<i class='fa fa-camera'></i>&nbsp;Capture Photo From Camera","fhcam")),c=$(this.renderButton(a,"<i class='fa fa-folder'></i>&nbsp;Choose Photo from Library","fhcam_lib")),d=$(this.renderButton(a,"<i class='fa fa-times-circle'></i>&nbsp;Remove Photo","remove"));this.getWrapper(a).append(b),this.getWrapper(a).append(c),this.getWrapper(a).append(d);var e=this;b.on("click",function(b){e.addFromCamera(b,a)}),c.on("click",function(b){e.addFromLibrary(b,a)}),d.on("click",function(b){e.removeThumb(b,a)}),d.hide()},setImage:function(a,b){var c=this.getWrapper(a),d=c.find("img.imageThumb");d.attr("src",b).show(),c.find("button").hide(),c.find(".remove").show()},getImageThumb:function(a){var b=this.getWrapper(a),c=b.find("img.imageThumb");return c},getCameraBtn:function(a){var b=this.getWrapper(a);return b.find("button.fhcam")},getLibBtn:function(a){var b=this.getWrapper(a);return b.find("button.fhcam_lib")},getRemoveBtn:function(a){var b=this.getWrapper(a);return b.find("button.remove")},removeThumb:function(a,b){a.preventDefault();var c=this.getImageThumb(b);c.removeAttr("src").hide(),this.getLibBtn(b).show(),this.getCameraBtn(b).show(),this.getRemoveBtn(b).hide()},addFromCamera:function(a,b){a.preventDefault();var c=this,d={};if(d=this.model.getPhotoOptions(),this.model.utils.isPhoneGapCamAvailable())this.model.utils.takePhoto(d,function(a,d){a?$fh.forms.log.e("Error Taking Photo",a):c.setImage(b,d)});else if(this.model.utils.isHtml5CamAvailable()){var e=$(c.html5Cam),f=e.find(".camActionBar");e.css({position:"fixed",top:0,bottom:0,left:0,right:0,background:"#000","z-index":9999}),f.css({"text-align":"center",padding:"10px",background:"#999"}),f.find("button").css({width:"80px",height:"30px","margin-right":"8px","font-size":"1.3em"}),c.$el.append(e),f.find(".camCancel").on("click",function(){c.model.utils.cancelHtml5Camera(),e.remove()}),this.model.utils.initHtml5Camera(d,function(a,g){a?($fh.forms.log.e(a),e.remove()):($(g).css("width","100%"),e.find(".cam").append(g),f.find(".camOk").on("click",function(){c.model.utils.takePhoto(d,function(a,d){e.remove(),a?$fh.forms.log.e(a):c.setImage(b,d)})}))})}else{var g=c.sampleImage();c.setImage(b,g)}},addFromLibrary:function(a,b){var c=this,d={};if(c.model.utils.isPhoneGapCamAvailable())a.preventDefault(),d.sourceType=Camera.PictureSourceType.PHOTOLIBRARY,c.model.utils.takePhoto(d,function(a,d){a&&$fh.forms.log.e("error occured with take photo ",JSON.stringify(a)),d&&c.setImage(b,d)});else{var e=document.createElement("input");e.type="file";var f=$(e);f.hide(),c.$el.append(f),f.on("change",function(){var a=f[0];a.files&&a.files.length>0&&(a=a.files[0],f.remove(),c.model.utils.fileSystem.fileToBase64(a,function(a,d){a?$fh.forms.log.e(a):c.setImage(b,d)}))}),f.click()}},valueFromElement:function(a){var b=this.getImageThumb(a);return b.attr("src")},valuePopulateToElement:function(a,b){if(b){var c=b.data,d=b.imgHeader+c;this.setImage(a,d)}},sampleImages:["/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAAAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgTWFjaW50b3NoIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVEMzgyQjRCMTU1MjExRTJBNzNDQzMyMEE5ODI5OEU0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVEMzgyQjRDMTU1MjExRTJBNzNDQzMyMEE5ODI5OEU0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUQzODJCNDkxNTUyMTFFMkE3M0NDMzIwQTk4Mjk4RTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUQzODJCNEExNTUyMTFFMkE3M0NDMzIwQTk4Mjk4RTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAbGhopHSlBJiZBQi8vL0JHPz4+P0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHAR0pKTQmND8oKD9HPzU/R0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0f/wAARCAAyADIDASIAAhEBAxEB/8QATQABAQAAAAAAAAAAAAAAAAAAAAQBAQEBAAAAAAAAAAAAAAAAAAAEBRABAAAAAAAAAAAAAAAAAAAAABEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AiASt8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k=","iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAALklEQVQYV2NkwAT/oUKMyFIoHKAETBFIDU6FIEUgSaJMBJk0MhQihx2W8IcIAQBhewsKNsLKIgAAAABJRU5ErkJggg==","iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAYUlEQVQYV2NkQAJlM1X/g7hd6bdBFCOyHCNIEigBppElkNkgeYIKYBrwKoQ6A+wEuDtwOQHmLLgbQbqQ3YnubhSfwRTj9DUu3+J0I7oGkPVwXwMZKOEHdCdcPdQJILczAAACnDmkK8T25gAAAABJRU5ErkJggg=="],sampleImage:function(){return window.sampleImageNum=(window.sampleImageNum+=1)%this.sampleImages.length,this.sampleImages[window.sampleImageNum]}}),window.sampleImageNum=-1,FieldCheckboxView=h.extend({checkboxes:'<div class="fh_appform_field_input <%= repeatingClassName%>"><div class="checkboxes"><%= choices %></div></div>',choice:'<input data-fieldId="<%= fieldId %>" <%= checked %> data-index="<%= index %>" name="<%= fieldId %>[]" type="checkbox" class="field checkbox" value="<%= value %>" ><label class="choice" ><%= choice %></label><br/>',renderInput:function(a){var b=this.model.getCheckBoxOptions(),c=this.model.getFieldId(),d="",e="",f=(this.getFieldRequired(a),this),g=this.model.isRepeating()?this.repeatingClassName:this.nonRepeatingClassName;return $.each(b,function(b,e){d+=_.template(f.choice,{fieldId:c,index:a,choice:e.label,value:e.label,checked:e.checked?"checked='checked'":""})}),e=_.template(this.checkboxes,{choices:d,repeatingClassName:g})},valueFromElement:function(a){var b={selections:[]},c=this.getWrapper(a),d=c.find("input:checked");return d.each(function(){b.selections.push($(this).val())}),b},valuePopulateToElement:function(a,b){var c=this.getWrapper(a);if(b&&b instanceof Array)for(var d=0;b>d;d++){var e=b[d];c.find("input[value='"+e+"']").attr("checked","checked")}}}),FieldEmailView=h.extend({type:"email"}),FieldFileView=h.extend({input:"<button data-field='<%= fieldId %>' class='special_button fh_appform_button_action select' data-index='<%= index %>' style='margin-top:0px;'  type='<%= inputType %>'>Select A File</button><button data-field='<%= fieldId %>' class='special_button fh_appform_button_action remove' data-index='<%= index %>' style='margin-top:0px;'  type='<%= inputType %>'><i class='fa fa-times-circle'></i>&nbsp;Remove File Entry</button><input style='opacity: 0; filter:alpha(opacity: 0); width:2px;height:2px' class='fh_appform_field_input' data-field='<%= fieldId %>' data-index='<%= index %>' type='<%= inputType %>'/>",type:"file",initialize:function(){var a=this;
a.fileObjs=[],h.prototype.initialize.apply(a,arguments)},contentChanged:function(a){var b=this,c=a.target,d=$(c),e=d.data().index,f=c.files?c.files[0]:null;f?b.validateElement(e,f,function(a){if(a)d.val(""),b.showButton(e,null);else{var c={fileName:f.name,fileSize:f.size,fileType:f.type};b.showButton(e,c)}}):b.showButton(e,null)},valueFromElement:function(a){var b=this.getWrapper(a),c=b.find(".fh_appform_field_input")[0];return c.files&&c.files.length>0?c.files[0]:this.fileObjs[a]},showButton:function(a,b){var c=this,d=this.getWrapper(a),e=d.find("button.select"),f=d.find("button.remove"),g=d.find(".fh_appform_field_input");e.show(),null==b?(e.text("Select A File"),f.hide()):(e.text(b.fileName+"("+b.fileSize+")"),f.show()),e.off("click"),e.on("click",function(){$(this).data().index;g.click()}),f.off("click"),f.on("click",function(){var a=$(this).data().index;c.fileObjs&&c.fileObjs[a]&&(c.fileObjs[a]=null),c.resetFormElement(g),c.showButton(a,null)})},resetFormElement:function(a){a.wrap("<form>").closest("form").get(0).reset(),a.unwrap()},valuePopulateToElement:function(a,b){b&&(this.fileObjs[a]=b,this.showButton(a,b))},onElementShow:function(a){this.showButton(a,null)}}),FieldGeoView=h.extend({input:"<input class='fh_appform_field_input <%= repeatingClassName%>' data-field='<%= fieldId %>' data-index='<%= index %>'  type='<%= inputType %>' disabled/>",buttonHtml:"<i class='fa fa-map-marker'></i>&nbsp<%= buttonText %>",type:"text",initialize:function(){this.geoValues=[],this.locationUnit=this.model.getFieldDefinition().locationUnit,h.prototype.initialize.apply(this,arguments)},renderInput:function(a){var b=this.model.isRepeating()?this.repeatingClassName:this.nonRepeatingClassName,c=_.template(this.input,{fieldId:this.model.getFieldId(),index:a,inputType:"text",repeatingClassName:b});return c},onElementShow:function(a){var b=this,c=$(this.renderButton(a,"<i class='fa fa-times-circle'></i>&nbsp;Remove Location","remove")),d="latlong"===this.locationUnit?"Capture Location (Lat/Lon)":"Capture Location (East/North)";d=_.template(this.buttonHtml,{buttonText:d});var e=$(this.renderButton(a,d,"fhgeo"));this.getWrapper(a).append(e),this.getWrapper(a).append(c),e.on("click",function(c){b.getLocation(c,a)}),c.on("click",function(d){b.clearLocation(d,a),c.hide()}),c.hide()},clearLocation:function(a,b){var c=this.getWrapper(b).find(".fh_appform_field_input");c.val(""),this.geoValues.splice(b,1)},onRender:function(){},convertLocation:function(a){var c=a.lat,d=a.lon,e={lat:function(){return c},lon:function(){return d}};return b.latLongToOsGrid(e)},renderElement:function(a){var b=this.geoValues[a],c="",d=this.getWrapper(a),e=d.find(".fh_appform_field_input");b?("latlong"===this.locationUnit?(c="("+b.lat+", "+b["long"]+")",d.find(".remove").show()):"eastnorth"===this.locationUnit?(c="("+b.zone+" "+b.eastings+", "+b.northings+")",d.find(".remove").show()):$fh.forms.log.e("FieldGeo: Invalid location unit: "+c),e.val(c)):d.find(".remove").hide(),e.blur()},valuePopulateToElement:function(a,b){this.geoValues[a]=b,this.renderElement(a)},valueFromElement:function(a){return this.geoValues[a]},getLocation:function(a,b){var c=this;a.preventDefault();var d=c.getWrapper(b),e=d.find(".fh_appform_field_input");return $fh.geo&&$fh.geo(function(a){if("latlong"===c.locationUnit)c.geoValues[b]={lat:a.lat,"long":a.lon};else if("eastnorth"===c.locationUnit){var d=c.convertLocation(a),e=d.toString().split(" ");c.geoValues[b]={zone:e[0],eastings:e[1],northings:e[2]}}else $fh.forms.log.e("FieldGeo: Invalid location unit: "+locStr);c.renderElement(b)},function(){e.attr("placeholder","Location could not be determined")}),!1}}),FieldMapView=h.extend({extension_type:"fhmap",input:"<div data-index='<%= index %>' id='<%= id%>' class='fh_map_canvas' style='width:<%= width%>; height:<%= height%>;'></div>",initialize:function(){this.mapInited=0,this.maps=[],this.mapData=[],this.markers=[],this.allMapInitFunc=[],this.mapSettings={mapWidth:"100%",mapHeight:"300px",defaultZoom:16,location:{lon:-5.80078125,lat:53.12040528310657}},h.prototype.initialize.apply(this,arguments)},renderInput:function(a){return _.template(this.input,{width:this.mapSettings.mapWidth,height:this.mapSettings.mapHeight,index:a,id:Math.random()})},show:function(){this.$el.show(),this.mapResize()},onMapInit:function(){this.mapInited++,this.mapInited===this.curRepeat&&this.allMapInit()},allMapInit:function(){for(var a=this.allMapInitFunc.shift();"undefined"!=typeof a;)"function"==typeof a?(a(),a=this.allMapInitFunc.shift()):a=this.allMapInitFunc.shift()},onAllMapInit:function(a){this.mapInited===this.curRepeat?a():-1===this.allMapInitFunc.indexOf(a)&&this.allMapInitFunc.push(a)},onElementShow:function(a){var b=this.getWrapper(a),c=this,d=b.find(".fh_map_canvas")[0];$fh.geo&&$fh.geo({interval:0},function(b){var e={lat:b.lat,lon:b.lon};$fh.map({target:d,lon:e.lon,lat:e.lat,zoom:c.mapSettings.defaultZoom},function(b){c.maps[a]=b.map;var d=new google.maps.Marker({position:c.maps[a].getCenter(),map:c.maps[a],draggable:!0,animation:google.maps.Animation.DROP,title:"Drag this to set position"});c.markers[a]=d,c.mapData[a]={lat:d.getPosition().lat(),"long":d.getPosition().lng(),zoom:c.mapSettings.defaultZoom},c.onMapInit(a)},function(b){$fh.forms.log.e("Error getting map: ",b),c.onMapInit(a)})})},mapResize:function(){var a=this;if(a.maps.length>0)for(var b=0;b<a.maps.length;b++){var c=this.maps[b];c&&(google.maps.event.trigger(c,"resize"),c.setCenter(new google.maps.LatLng(a.mapData[b].lat,a.mapData[b]["long"])))}},valueFromElement:function(a){var b=this.maps[a],c=this.markers[a];return b&&c?{lat:c.getPosition().lat(),"long":c.getPosition().lng(),zoom:b.getZoom()}:null},valuePopulateToElement:function(a,b){function c(){var c=d.maps[a],e=new google.maps.LatLng(b.lat,b["long"]);c.setCenter(e),c.setZoom(b.zoom),d.markers[a].setPosition(e)}var d=this;b&&this.onAllMapInit(c)}}),FieldNumberView=h.extend({type:"number",getHTMLInputType:function(){return"number"}}),FieldPhoneView=h.extend({type:"tel"}),FieldRadioView=h.extend({hidden_field:'<input  id="radio<%= id %>" type="fh_appform_hidden" value="" data-type="radio">',choice:'<input data-field="<%= fieldId %>" data-index="<%= index %>" name="<%= fieldId %>_<%= index %>" class="field radio" value="<%= value %>" type="radio"><label class="choice" ><%= choice %></label><br/>',radio:'<div class="fh_appform_field_input <%= repeatingClassName%>"><%= radioChoices %></div>',renderInput:function(a){var b=this.model.getRadioOption(),c=this,d="",e=this.model.isRepeating()?this.repeatingClassName:this.nonRepeatingClassName,f=this.model.getFieldId();return $.each(b,function(b,e){var g=$(_.template(c.choice,{fieldId:f,choice:e.label,value:e.label,index:a}));e.checked===!0&&g.attr("checked","checked"),d+=c.htmlFromjQuery(g)}),_.template(this.radio,{radioChoices:d,repeatingClassName:e})},valuePopulateToElement:function(a,b){var c=this.getWrapper(a),d=c.find("input[value='"+b+"']");0===d.length&&(d=c.find("input:first-child")),d.attr("checked","checked")},valueFromElement:function(a){var b=this.getWrapper(a);return b.find("input:checked").val()||this.model.getRadioOption()[0].label}}),FieldSelectView=h.extend({select:"<select class='fh_appform_field_input <%= repeatingClassName%>' data-field='<%= fieldId %>' data-index='<%= index %>'><%= options %></select>",option:'<option value="<%= value %>" <%= selected %>><%= value %></option>',renderInput:function(a){var b=this.model.getFieldId(),c=this.model.get("fieldOptions");c=c.definition.options;var d="",e=this.model.isRepeating()?this.repeatingClassName:this.nonRepeatingClassName,f=this;return $.each(c,function(a,b){d+=_.template(f.option,{value:b.label,selected:b.checked?"selected='selected'":""})}),_.template(this.select,{fieldId:b,index:a,options:d,repeatingClassName:e})}}),FieldSignatureView=h.extend({extension_type:"fhsig",input:"<img class='sigImage' style='width: 100%;' data-field='<%= fieldId %>' data-index='<%= index %>'/>",templates:{signaturePad:['<div class="sigPad">','<ul class="sigNav" style="text-align: center;">','<button class="clearButton fh_appform_button_cancel">Clear</button><button class="cap_sig_done_btn fh_appform_button_action">Done</button>','<br style="clear:both;" />',"</ul>",'<div class="sig sigWrapper">','<canvas class="pad" width="<%= canvasWidth %>" height="<%= canvasHeight %>"></canvas>',"</div>","</div>"]},initialize:function(){h.prototype.initialize.call(this),this.on("visible",this.clearError)},onElementShow:function(a){var b=$(this.renderButton(a,"<i class='fa fa-pencil'></i>&nbsp;Capture Signature",this.extension_type));this.getWrapper(a).append(b);var c=this;b.on("click",function(){c.showSignatureCapture(a)})},validate:function(){this.trigger("checkrules")},showSignatureCapture:function(a){var b=this,c=$(window).height(),d=$(window).width(),e=c-70,f=d-2,g=e-20;this.$el.append(_.template(this.templates.signaturePad.join(""),{canvasHeight:e,canvasWidth:f}));var h=$(".sigPad",this.$el);h.css({position:"fixed","z-index":9999,bottom:"0px",right:"0px",top:"0px",left:"0px","background-color":"#fff"});var i=$(".sigNav",this.$el).outerHeight();$(".sigPad",this.$el).css({width:"100%",height:c+"px"}),$(".sigWrapper",this.$el).css({height:c-i-20+"px"}),sigPad=$(".sigPad",this.$el).signaturePad({drawOnly:!0,lineTop:g}),$(this.$el).data("sigpadInited",!0),$(".cap_sig_done_btn",this.$el).unbind("click").bind("click",function(c){c.preventDefault();var d=sigPad.getSignature();if(d&&d.length){var e=sigPad.getSignatureImage();b.isEmptyImage(e)&&(e=b.toBmp()),b.setSignature(a,e)}$(".sigPad",b.$el).hide()})},setSignature:function(a,b){var c=this.getWrapper(a);c.find("img.sigImage").attr("src",b)},valueFromElement:function(a){var b=this.getWrapper(a),c=b.find("img.sigImage");return c.attr("src")},valuePopulateToElement:function(a,b){if(b){var c=b.data,d=b.imgHeader+c,e=this.getWrapper(a),f=e.find("img.sigImage");f.attr("src",d)}},dbgImage:function(a,b){$fh.forms.log.d(a+(b?b.substring(0,b.indexOf(","))+"[len="+b.length+"]":" empty"))},toBmp:function(a){a=_.extend({},a||{},{quality:100,width:248,height:100});var b,c=$(".sigPad",self.$el).find("canvas")[0],d=this.scaleCanvas(c,a.width,a.height),e=this.readCanvasData(d),f=this.createBMP(e);return b=this.makeDataURI(f,"image/bmp")},readCanvasData:function(a){var b=parseInt(a.width,10),c=parseInt(a.height,10);return a.getContext("2d").getImageData(0,0,b,c)},encodeData:function(a){var b="";if("string"==typeof a)b=a;else for(var c=a,d=0;d<c.length;d++)b+=String.fromCharCode(c[d]);return btoa(b)},createBMP:function(a){var b=[],c=a.width,d=a.height;b.push(66),b.push(77);var e=c*d*3+54;b.push(e%256),e=Math.floor(e/256),b.push(e%256),e=Math.floor(e/256),b.push(e%256),e=Math.floor(e/256),b.push(e%256),b.push(0),b.push(0),b.push(0),b.push(0),b.push(54),b.push(0),b.push(0),b.push(0);var f=[];f.push(40),f.push(0),f.push(0),f.push(0);var g=c;f.push(g%256),g=Math.floor(g/256),f.push(g%256),g=Math.floor(g/256),f.push(g%256),g=Math.floor(g/256),f.push(g%256);var h=d;f.push(h%256),h=Math.floor(h/256),f.push(h%256),h=Math.floor(h/256),f.push(h%256),h=Math.floor(h/256),f.push(h%256),f.push(1),f.push(0),f.push(24),f.push(0),f.push(0),f.push(0),f.push(0),f.push(0);var i=c*d*3;f.push(i%256),i=Math.floor(i/256),f.push(i%256),i=Math.floor(i/256),f.push(i%256),i=Math.floor(i/256),f.push(i%256);for(var j=0;16>j;j++)f.push(0);var k=(4-3*c%4)%4,l=a.data,m="",n=d;do{for(var o=c*(n-1)*4,p="",q=0;c>q;q++){var r=4*q;p+=String.fromCharCode(l[o+r+2]),p+=String.fromCharCode(l[o+r+1]),p+=String.fromCharCode(l[o+r])}for(var s=0;k>s;s++)p+=String.fromCharCode(0);m+=p}while(--n);var t=this.encodeData(b.concat(f))+this.encodeData(m);return t},makeDataURI:function(a,b){return"data:"+b+";base64,"+a},scaleCanvas:function(a,b,c){if(b&&c){var d=document.createElement("canvas");d.width=b,d.height=c,d.style.width=b+"px",d.style.height=c+"px";var e=d.getContext("2d");return e.drawImage(a,0,0,a.width,a.height,0,0,b,c),d}return a},isEmptyImage:function(a){return null===a||""===a||"data:,"===a},splitImage:function(a){var b="data:",c=";base64,",d=a.indexOf(b),e="image/bmp",f="bmp";if(d>=0){var g=a.indexOf(c,d)+1;e=a.substring(d,g-1),f=e.split("/")[1]}return[e,f]}}),FieldTextView=h.extend({}),FieldTextareaView=h.extend({input:"<textarea class='fh_appform_field_input' data-field='<%= fieldId %>' data-index='<%= index %>'  ></textarea>"}),FieldSectionBreak=h.extend({className:"fh_appform_section_break",templates:{sectionBreak:'<div class="fh_appform_section_title"><%= sectionTitle %></div><div class="fh_appform_section_description"><%= sectionDescription%></div>'},renderEle:function(){return _.template(this.templates.sectionBreak,{sectionTitle:this.model.getName(),sectionDescription:this.model.getHelpText()})},renderTitle:function(){return""},renderHelpText:function(){return""}}),FieldDateTimeView=h.extend({extension_type:"fhdate",inputTime:"<div><input class='fh_appform_field_input <%= repeatingClassName%>' data-field='<%= fieldId %>' data-index='<%= index %>' type='time'></div>",inputDate:"<div ><input class='fh_appform_field_input <%= repeatingClassName%>' data-field='<%= fieldId %>' data-index='<%= index %>' type='date'></div>",inputDateTime:"<div ><input class='fh_appform_field_input <%= repeatingClassName%>' data-field='<%= fieldId %>' data-index='<%= index %>' type='text'></div>",renderInput:function(a){var b=this.model.getFieldId(),c=this.model.isRepeating()?this.repeatingClassName:this.nonRepeatingClassName,d=this.getUnit(),e="",f="";"datetime"===d?(e=this.inputDateTime,f="<i class='fa fa-calendar'></i> <i class='fa fa-clock-o'></i>&nbspGet Current Date & Time"):"date"===d?(e=this.inputDate,f="<i class='fa fa-calendar'></i>&nbspGet Current Date"):"time"===d&&(e=this.inputTime,f="<i class='fa fa-clock-o'></i>&nbspGet Current Time");var g=_.template(e,{fieldId:b,index:a,repeatingClassName:c});return g+=this.renderButton(a,f,"fhdate")},getUnit:function(){var a=this.model.getFieldDefinition();return a.datetimeUnit},onRender:function(){var a=this;this.$el.on("click","button",function(){a.action(this)})},action:function(a){var b=$(a).data().index,c=this,d=new Date;"datetime"===c.getUnit()?$('input[data-index="'+b+'"]',this.$el).val(c.getDate(d)+" "+c.getTime(d)).blur():"date"===c.getUnit()?$('input[data-index="'+b+'"]',this.$el).val(c.getDate(d)).blur():"time"===c.getUnit()&&$('input[data-index="'+b+'"]',this.$el).val(c.getTime(d)).blur()},getDate:function(a){return"YYYY-MM-DD".replace("YYYY",a.getFullYear()).replace("MM",this.twoDigi(a.getMonth()+1)).replace("DD",this.twoDigi(a.getDate()))},getTime:function(a){return"HH:mm".replace("HH",this.twoDigi(a.getHours())).replace("mm",this.twoDigi(a.getMinutes()))},twoDigi:function(a){return 10>a?"0"+a.toString():a.toString()}}),FieldUrlView=h.extend({type:"url"});{var i=e.extend({viewMap:{text:FieldTextView,number:FieldNumberView,textarea:FieldTextareaView,radio:FieldRadioView,checkboxes:FieldCheckboxView,dropdown:FieldSelectView,file:FieldFileView,emailAddress:FieldEmailView,phone:FieldPhoneView,location:FieldGeoView,photo:FieldCameraView,signature:FieldSignatureView,locationMap:FieldMapView,dateTime:FieldDateTimeView,sectionBreak:FieldSectionBreak,url:FieldUrlView},templates:{pageTitle:'<div class="fh_appform_page_title"><%= pageTitle %></div>',pageDescription:'<div class="fh_appform_page_description"><%= pageDescription%></div>',section:'<div id="fh_appform_<%= sectionId %>" class="fh_appform_section_area"></div>'},initialize:function(){var a=this;_.bindAll(this,"render","show","hide"),this.model.on("visible",a.show),this.model.on("hidden",a.hide),this.render()},render:function(){var a=this;this.fieldViews={},this.sectionViews={},this.$el.empty().addClass("fh_appform_page fh_appform_hidden"),this.$el.append(_.template(this.templates.pageDescription,{pageDescription:this.model.getDescription()})),this.options.parentEl.append(this.$el);var b=this.model.getFieldModelList(),c=this.model.getSections();if(null!=c){var d;for(d in c)this.$el.append(_.template(this.templates.section,{sectionId:d}));for(d in c)c[d].forEach(function(b){var c=b.getType();a.viewMap[c]?($fh.forms.log.l("*- "+c),a.fieldViews[b.get("_id")]=new a.viewMap[c]({parentEl:a.$el,parentView:a,model:b,formView:a.options.formView,sectionName:d})):$fh.forms.log.w("FIELD NOT SUPPORTED:"+c)})}else b.forEach(function(b){if(b){var c=b.getType();a.viewMap[c]?($fh.forms.log.l("*- "+c),a.fieldViews[b.get("_id")]=new a.viewMap[c]({parentEl:a.$el,parentView:a,model:b,formView:a.options.formView})):console.warn("FIELD NOT SUPPORTED:"+c)}})},show:function(){var a=this;a.$el.removeClass("fh_appform_hidden");for(var b in a.fieldViews)a.fieldViews[b].mapResize&&a.fieldViews[b].mapResize()},hide:function(){this.$el.addClass("fh_appform_hidden")},showField:function(a){this.fieldViews[a]&&this.fieldViews[a].show()},hideField:function(a){this.fieldViews[a]&&this.fieldViews[a].hide()},isValid:function(){var a=this.$el.find(".fh_appform_field_input").not(".validate_ignore]:hidden");return a.length?a.valid():!0}}),j=e.extend({pageNum:0,pageCount:0,pageViews:[],submission:null,fieldValue:[],templates:{formLogo:'<div class="fh_appform_logo_container" style="text-align:center;"><div class="fh_appform_logo"></div></div>',formTitle:'<div class="fh_appform_form_title"><%= title %></div>',formDescription:'<div class="fh_appform_form_description"><%= description %></div>',formContainer:'<div id="fh_appform_container" class="fh_appform_form_area fh_appform_container"></div>',buttons:'<div id="fh_appform_navigation_buttons" class="fh_appform_button_bar"><button class="fh_appform_button_saveDraft fh_appform_hidden fh_appform_button_main fh_appform_button_action">Save Draft</button><button class="fh_appform_button_previous fh_appform_hidden fh_appform_button_default">Previous</button><button class="fh_appform_button_next fh_appform_hidden fh_appform_button_default">Next</button><button class="fh_appform_button_submit fh_appform_hidden fh_appform_button_action">Submit</button></div>'},events:{},elementNames:{formContainer:"#fh_appform_container"},initialize:function(){_.bindAll(this,"checkRules","onValidateError"),this.$el=this.options.parentEl,this.fieldModels=[],this.pageViewStatus={},this.$el.empty()},loadForm:function(a,b){var c=this;a.formId?(c.onLoad(),$fh.forms.getForm(a,function(d,e){if(d)throw d.body;c.form=e,c.params=a,c.initWithForm(e,a),b()})):a.form&&(c.form=a.form,c.params=a,c.initWithForm(a.form,a),b())},readOnly:function(){this.readonly=!0;for(var a=0;a<this.fieldViews.length;a++){var b=this.fieldViews[a];b.$el.find("button,input,textarea,select").attr("disabled","disabled")}this.$el.find("button.fh_appform_button_saveDraft").hide(),this.$el.find(" button.fh_appform_button_submit").hide()},onValidateError:function(a){var b=this,c=null,d=null;if(b.fieldViews.forEach(function(e){var f=e.model.getFieldId();if(a.hasOwnProperty(f)){var g=a[f];if(g.errorMessages=g.errorMessages||[],g.fieldErrorMessage=g.fieldErrorMessage||[],!g.valid){null===c&&(c=f,d=b.form.getPageNumberByFieldId(c));for(var h=0;h<g.errorMessages.length;h++)g.errorMessages[h]&&e.setErrorText(h,g.errorMessages[h]);for(h=0;h<g.fieldErrorMessage.length;h++)g.fieldErrorMessage[h]&&e.setErrorText(h,g.fieldErrorMessage[h])}}}),null!==c&&null!==d){var e=this.getDisplayIndex(d)+1;this.$el.find("#fh_appform_page_error").html("Unable to submit form. Validation error on page "+e),this.$el.find("#fh_appform_page_error").show()}},initWithForm:function(a,b){var c,d=this;d.formId=a.getFormId(),d.$el.empty(),d.model=a,d.$el.append(this.templates.formContainer),d.$el.find(this.elementNames.formContainer).append(_.template(this.templates.formLogo,{})),d.$el.find(this.elementNames.formContainer).append(_.template(this.templates.formTitle,{title:this.model.getName()})),d.$el.find(this.elementNames.formContainer).append(_.template(this.templates.formDescription,{description:this.model.getDescription()})),b.submission||(b.submission=d.model.newSubmission()),d.submission=b.submission,d.submission.on("validationerror",d.onValidateError);var e=a.getPageModelList(),f=[];d.steps=new StepsView({parentEl:d.$el.find(this.elementNames.formContainer),parentView:d,model:d.model});for(var g=0;g<e.length;g++){var h=e[g],j=h.getPageId();d.pageViewStatus[j]={targetId:j,action:"show"};var k=h.getFieldModelList();d.fieldModels=d.fieldModels.concat(k),c=new i({model:h,parentEl:d.$el.find(this.elementNames.formContainer),formView:d}),f.push(c)}var l=[];for(g=0;g<f.length;g++){c=f[g];var m=c.fieldViews;for(var n in m){var o=m[n];l.push(o),o.on("checkrules",d.checkRules),d.readonly&&o.$el.find("input,button,textarea,select").attr("disabled","disabled")}}d.fieldViews=l,d.pageViews=f,d.pageCount=f.length},checkRules:function(a){function b(){d.checkRules(function(a,b){if(a)console.error(a);else{var d,e=b.actions;for(d in e.pages)c.pageViewStatus[d]=e.pages[d];var f=e.fields;for(d in f)c.performRuleAction("field",d,f[d].action)}c.checkPages(),c.steps.activePageChange(c)})}var c=this,d=c.submission;a=a||{},a.initialising?b():c.populateFieldViewsToSubmission(!1,function(){b()})},performRuleAction:function(a,b,c){var d=null;if("field"===a&&(d=this.getFieldViewById(b)),null===d)return void console.error("cannot find target with id:"+b);switch(c){case"show":d.$el.show();break;case"hide":d.$el.hide();break;default:console.error("action not defined:"+c)}},rebindButtons:function(){var a=this;this.$el.find("button.fh_appform_button_next").unbind().bind("click",function(){a.nextPage()}),this.$el.find("button.fh_appform_button_previous").unbind().bind("click",function(){a.prevPage()}),this.$el.find("button.fh_appform_button_saveDraft").unbind().bind("click",function(){a.saveToDraft()}),this.$el.find("button.fh_appform_button_submit").unbind().bind("click",function(){$fh.forms.config.isStudioMode()?alert("Please create a project and interact with the form there."):a.submit()})},setSubmission:function(a){this.submission=a},getSubmission:function(){return this.submission},getPageViewById:function(a){for(var b=0;b<this.pageViews.length;b++){var c=this.pageViews[b],d=c.model.getPageId();if(d===a)return c}return null},getFieldViewById:function(a){for(var b=0;b<this.fieldViews.length;b++){var c=this.fieldViews[b],d=c.model.getFieldId();if(d===a)return c}return null},checkPages:function(){var a=this.getNumDisplayedPages(),b=this.getDisplayIndex();0===b&&b===a-1?(this.$el.find(" button.fh_appform_button_previous").addClass("fh_appform_hidden"),this.$el.find("button.fh_appform_button_next").addClass("fh_appform_hidden"),this.$el.find("button.fh_appform_button_saveDraft").removeClass("fh_appform_hidden"),this.$el.find(" button.fh_appform_button_submit").removeClass("fh_appform_hidden"),this.$el.find(".fh_appform_button_bar button").removeClass("fh_appform_three_button"),this.$el.find(".fh_appform_button_bar button").addClass("fh_appform_two_button")):0===b?(this.$el.find(" button.fh_appform_button_previous").addClass("fh_appform_hidden"),this.$el.find("button.fh_appform_button_next").removeClass("fh_appform_hidden"),this.$el.find("button.fh_appform_button_saveDraft").removeClass("fh_appform_hidden"),this.$el.find(" button.fh_appform_button_submit").addClass("fh_appform_hidden"),this.$el.find(".fh_appform_button_bar button").removeClass("fh_appform_three_button"),this.$el.find(".fh_appform_button_bar button").addClass("fh_appform_two_button")):b===a-1?(this.$el.find(" button.fh_appform_button_previous").removeClass("fh_appform_hidden"),this.$el.find(" button.fh_appform_button_next").addClass("fh_appform_hidden"),this.$el.find(" button.fh_appform_button_saveDraft").removeClass("fh_appform_hidden"),this.$el.find(" button.fh_appform_button_submit").removeClass("fh_appform_hidden"),this.$el.find(".fh_appform_button_bar button").removeClass("fh_appform_two_button"),this.$el.find(".fh_appform_button_bar button").addClass("fh_appform_three_button")):(this.$el.find(" button.fh_appform_button_previous").removeClass("fh_appform_hidden"),this.$el.find(" button.fh_appform_button_next").removeClass("fh_appform_hidden"),this.$el.find(" button.fh_appform_button_saveDraft").removeClass("fh_appform_hidden"),this.$el.find(" button.fh_appform_button_submit").addClass("fh_appform_hidden"),this.$el.find(".fh_appform_button_bar button").removeClass("fh_appform_two_button"),this.$el.find(".fh_appform_button_bar button").addClass("fh_appform_three_button")),this.readonly&&(this.$el.find("button.fh_appform_button_saveDraft").addClass("fh_appform_hidden"),this.$el.find(" button.fh_appform_button_submit").addClass("fh_appform_hidden"))},render:function(){return this.$el.find("#fh_appform_container.fh_appform_form_area").append(this.templates.buttons),this.rebindButtons(),this.pageViews[0].$el.removeClass("fh_appform_hidden"),this.pageNum=0,this.steps.activePageChange(this),this.checkRules({initialising:!1}),this},getNextPageIndex:function(a){var b=this;if(c>=this.pageViews.length)return this.pageViews.length-1;for(var c=a+1;c<this.pageViews.length;c+=1){var d=this.pageViews[c].model.getPageId(),e=b.pageViewStatus[d].action;if("show"===e)return c}},getPrevPageIndex:function(a){var b=this;if(0>=a)return 0;for(var c=a-1;c>=0;c--){var d=b.pageViews[c].model.getPageId(),e=b.pageViewStatus[d].action;if("show"===e)return c}},getDisplayIndex:function(a){for(var b=this,c=null===a||"undefined"==typeof a?this.pageNum:a,d=this.pageNum;d>0;d--){var e=this.pageViews[d].model.getPageId(),f=b.pageViewStatus[e].action;"hide"===f&&(c-=1)}return c},getNumDisplayedPages:function(){return this.getDisplayedPages().length},getDisplayedPages:function(){for(var a=this,b=[],c=0;c<a.pageViews.length;c++){var d=this.pageViews[c].model.getPageId(),e=a.pageViewStatus[d].action;"show"===e&&b.push(d)}return b},nextPage:function(){this.hideAllPages(),this.pageNum=this.getNextPageIndex(this.pageNum),this.pageViews[this.pageNum].show(),this.steps.activePageChange(this),this.checkPages(),this.scrollToTop()},prevPage:function(){this.hideAllPages(),this.pageNum=this.getPrevPageIndex(this.pageNum),this.pageViews[this.pageNum].show(),this.steps.activePageChange(this),this.checkPages(),this.scrollToTop()},scrollToTop:function(){var a=$(this.elementNames.formContainer).outerHeight();a>0?(a*=-1,window.scrollBy(0,a)):window.scrollTo(0,0)},backEvent:function(){var a=this;return this.pageNum<=0?!1:(a.prevPage(),!0)},hideAllPages:function(){this.pageViews.forEach(function(a){a.hide()})},submit:function(){var a=this;this.populateFieldViewsToSubmission(function(){a.submission.submit(function(b){b?$fh.forms.log.e("Error Submitting Form:",b):a.submission.upload(function(b){b&&$fh.forms.log.e("Error Uploading Form:",b),a.$el.empty()})})})},saveToDraft:function(){var a=this;this.populateFieldViewsToSubmission(function(){a.submission.saveDraft(function(b){b&&$fh.forms.log.e(b),a.$el.empty()})})},populateFieldViewsToSubmission:function(a,b){"undefined"==typeof b&&(b=a,a=!0);for(var c,d=this.submission,e=this.fieldViews,f=[],g=0;g<e.length;g++){var h=e[g],i=h.value();c=h.model.getFieldId();var j=h.model.getType();if("sectionBreak"!==j)for(var k=0;k<i.length;k++){var l=i[k];f.push({id:c,value:l,index:k})}}var m=f.length;for(g=0;g<f.length;g++){var n=f[g];c=n.id;var o=n.value,p=n.index;null!==o||"undefined"!=typeof o?d.addInputValue({fieldId:c,value:o,index:p,isStore:a},function(a){a&&console.error(a),m--,0===m&&b()}):($fh.forms.log.e("Input value for fieldId "+c+" was not defined"),m--,0===m&&b())}},setInputValue:function(a,b){for(var c=0;c<this.fieldValue.length;c++){var d=this.fieldValue[c];d.id===a&&this.fieldValue.splice(c,1)}for(c=0;c<b.length;c++){var e=b[c];this.fieldValue.push({id:a,value:e})}}});e.extend({events:{"click button#convert":"convert"},templates:{body:'<h1>Insert JSON</h1><textarea id="jsonBox" rows="30" cols="50"></textarea><button id="convert">Convert</button><div id="resultArea"></div>'},el:"#jsonPage",initialize:function(){_.bindAll(this,"render")},show:function(){$(this.$el).show()},hide:function(){$(this.$el).hide()},render:function(){$(this.$el).html(this.templates.body),this.show()},convert:function(){var a,b=$("#jsonBox").val();try{a=JSON.parse(b)}catch(c){throw $fh.forms.log.d("Error parsing json: ",c),"Invalid JSON object"}var d={formId:(new Date).getTime(),rawMode:!0,rawData:a},e=new j({parentEl:$("#backbone #resultArea")});e.loadForm(d,function(){e.render()})}})}SectionView=e.extend({initialize:function(){_.bindAll(this,"render"),this.$el.addClass("fh_appform_section")},render:function(){this.options.parentEl.append(this.$el)}}),StepsView=Backbone.View.extend({className:"fh_appform_steps",templates:{table:'<div class="fh_appform_progress_wrapper"><table class="fh_appform_progress_steps" cellspacing="0"><tr></tr></table><span class="fh_appform_page_title"></span><span id="fh_appform_page_error" class="fh_appform_hidden fh_appform_page_title fh_appform_field_error" style="display:none;"></span></div>',step:'<td><span class="number_container" style=""><div class="number"><%= step_num %></div></span><br style="clear:both"/></td>'},initialize:function(){_.bindAll(this,"render"),this.parentView=this.options.parentView,this.options.parentEl.append(this.$el)},render:function(){var a=this;this.$el.empty();var b=$(a.templates.table),c=this.parentView.getDisplayedPages(),d=100;c.length>0&&(d=100/c.length),c.forEach(function(c,e){var f=a.parentView.getPageViewById(c).model,g=$(_.template(a.templates.step,{step_name:f.getName(),step_num:e+1}));g.css("width",d+"%"),$("tr:first",b).append(g)}),this.$el.append(b)},activePageChange:function(){var a=this;a.render(),a.$el.find("td").removeClass("active");var b=a.parentView.getDisplayIndex(),c=a.parentView.pageViews[a.parentView.pageNum].model;a.$el.find("td:eq("+b+")").addClass("active"),a.$el.find(".fh_appform_page_title").html(c.getName())}});var k=Backbone.View.extend({templates:['<div class="fh_appform_field_area config_camera"><fieldset><div class="fh_appform_field_title">Camera</div><div class="form-group" style="margin:5px 5px 5px 5px;"><label class="fh_appform_field_instructions" style="margin-top: 5px;font-weight: bold;line-height: 2em;">Quality</label><input class="fh_appform_field_input" style="display: inline-block;text-align: center;width: 40%;float: right;" data-key="quality" value="<%= quality%>"/></div><br/><div class="form-group" style="margin:5px 5px 5px 5px;"><label class="fh_appform_field_instructions" style="margin-top: 5px;font-weight: bold;line-height: 2em;">Target Width</label><input class="fh_appform_field_input" style="display: inline-block;text-align: center;width: 40%;float: right;" data-key="targetWidth" value="<%= targetWidth%>"/></div><br/><div class="form-group" style="margin:5px 5px 5px 5px;"><label class="fh_appform_field_instructions" style="margin-top: 5px;font-weight: bold;line-height: 2em;">Target Height</label><input class="fh_appform_field_input" style="display: inline-block;text-align: center;width: 40%;float: right;" data-key="targetHeight" value="<%= targetHeight%>"/></div><br/></fieldset></div>','<div class="fh_appform_field_area config_submission"><fieldset><div class="fh_appform_field_title">Submission</div><div class="form-group" style="margin:5px 5px 5px 5px;"><label class="fh_appform_field_instructions" style="margin-top: 5px;font-weight: bold;line-height: 2em;">Max Retries</label><input class="fh_appform_field_input" style="display: inline-block;text-align: center;width: 40%;float: right;" data-key="max_retries" value="<%= max_retries%>"/></div><br/><div class="form-group" style="margin:5px 5px 5px 5px;"><label class="fh_appform_field_instructions" style="margin-top: 5px;font-weight: bold;line-height: 2em;">Timeout</label><input class="fh_appform_field_input" style="display: inline-block;text-align: center;width: 40%;float: right;" data-key="timeout" value="<%= timeout%>"/></div><br/><div class="form-group" style="margin:5px 5px 5px 5px;"><label class="fh_appform_field_instructions" style="margin-top: 5px;font-weight: bold;line-height: 2em;">Min Sent Items to Save</label><input class="fh_appform_field_input" style="display: inline-block;text-align: center;width: 40%;float: right;" data-key="sent_save_min" value="<%= sent_save_min%>"/></div><br/><div class="form-group" style="margin:5px 5px 5px 5px;"><label class="fh_appform_field_instructions" style="margin-top: 5px;font-weight: bold;line-height: 2em;">Max Sent Items to Save</label><input class="fh_appform_field_input" style="display: inline-block;text-align: center;width: 40%;float: right;" data-key="sent_save_max" value="<%= sent_save_max%>"/></div><br/></fieldset></div>','<style type="text/css">#_logsViewPanel{position:fixed;left:10px;top:10px;right:10px;bottom:10px;padding:8px;background: white;-webkit-border-radius: 8px;border-radius: 8px;overflow: auto;}#_closeViewBtn{border: 1px solid;padding:3px;}</style><div class="fh_appform_field_area config_debugging"><fieldset><div class="fh_appform_field_title">Debugging</div><br/><div class="form-group" style="margin:5px 5px 5px 5px;"><label class="fh_appform_field_instructions" style="margin-top: 5px;font-weight: bold;line-height: 2em;">Device Id</label><button class="fh_appform_button_action" id="fh_appform_show_deviceId">Show Device Id</button></div><br/><div id="config_debugging_log_enabled" class="form-group" style="margin:5px 5px 5px 5px;"><label class="fh_appform_field_instructions" style="margin-top: 5px;font-weight: bold;line-height: 2em;margin-top:5px;">Log Enabled</label><input class="fh_appform_field_input" style="display: inline-block;text-align: center;width: 40%;float: right;" type="checkbox" data-key="logger"  <%= logger?"checked":"" %> value="true"/></div><br/><div id="config_debugging_log_level" class="form-group" style="margin:5px 5px 5px 5px;"><label class="fh_appform_field_instructions" style="margin-top: 5px;font-weight: bold;line-height: 2em;margin-top:5px;">Log Level</label><select class="fh_appform_field_input" style="display: inline-block;text-align: center;width: 40%;float: right;" data-key="log_level"><%for (var i=0;i<log_levels.length;i++){var val=log_levels[i];var selected=(i==log_level)?"selected":"";%><option value="<%= i %>" <%= selected%>><%= val%></option><%}%></select></div><br/><div id="config_debugging_log_line_limit" class="form-group" style="margin:5px 5px 5px 5px;"><label class="fh_appform_field_instructions" style="margin-top: 5px;font-weight: bold;line-height: 2em;">Log Line Number</label><input class="fh_appform_field_input" style="display: inline-block;text-align: center;width: 40%;float: right;" data-key="log_line_limit" value="<%= log_line_limit%>"/></div><br/><div id="config_debugging_log_email" class="form-group" style="margin:5px 5px 5px 5px;"><label class="fh_appform_field_instructions" style="margin-top: 5px;font-weight: bold;line-height: 2em;">Log Email Address</label><input class="fh_appform_field_input" style="display: inline-block;text-align: center;width: 98%;float: right;" data-key="log_email" value="<%= log_email%>"/></div><div class="log_buttons" style="width:100%;margin: 20px 0px 20px 0px;padding:0px 0px 0px 0px;text-align:center;"><button class="fh_appform_button_default" style="width:30%;margin-right:10px" type="button" id="_viewLogsBtn">View Logs</button><button class="fh_appform_button_cancel" style="width:30%;margin-right:10px" type="button" id="_clearLogsBtn">Clear Logs</button><button class="fh_appform_button_action" style="width:30%;" type="button" id="_sendLogsBtn">Send Logs</button></div></fieldset></div><div class="hidden" id="_logsViewPanel"><div><span class="fh_appform_button_cancel" id="_closeViewBtn">Close</span></div><div class="fh_appform_field_area" id="_logViewDiv"></div></div>'],_myEvents:{"click #_viewLogsBtn":"viewLogs","click #_clearLogsBtn":"clearLogs","click #_sendLogsBtn":"sendLogs","click #_closeViewBtn":"closeViewLogs","click #fh_appform_show_deviceId":"showDeviceId"},showDeviceId:function(){alert($fh.forms.config.getDeviceId())
},viewLogs:function(){var a=$fh.forms.log.getPolishedLogs(),b=a.join("");this.$el.find("#_logViewDiv").html(b),this.$el.find("#_logsViewPanel").show()},clearLogs:function(){var a=this;$fh.forms.log.clearLogs(function(){a.$el.find("#_logViewDiv").html(""),alert("Logs cleared.")})},sendLogs:function(){$fh.forms.log.sendLogs(function(a){alert(a?a:"Log has been sent to:"+$fh.forms.config.get("log_email"))})},closeViewLogs:function(){this.$el.find("#_logsViewPanel").hide()},events:{},initialize:function(){this.events=_.extend({},this._myEvents,this.events)},render:function(){var a=this;a.$el.html("");var b=$fh.forms.config.getConfig();b.deviceId=$fh.forms.config.getDeviceId();var c=_.template(a.templates.join(""),b);return a.$el.append(c),$fh.forms.config.editAllowed()===!1&&(a.$el.find(".config_camera").hide(),a.$el.find(".config_submission").hide(),a.$el.find("#config_debugging_log_enabled").hide(),a.$el.find("#config_debugging_log_level").hide(),a.$el.find("#config_debugging_log_line_limit").hide(),a.$el.find("#config_debugging_log_email").hide()),a},save:function(a){$fh.forms.log.l("Saving config");var b=this.$el.find("input,select,textarea");$fh.forms.config.editAllowed()?(b.each(function(){var a=$(this).data().key,b=$(this).val();$(this).attr("type")&&"checkbox"===$(this).attr("type").toLowerCase()&&(b=$(this).attr("checked")?!0:!1),$fh.forms.config.set(a,b)}),$fh.forms.config.saveConfig(a)):alert("Editing config not permitted.")}});"undefined"==typeof $fh&&($fh={}),$fh.forms||($fh.forms={}),$fh.forms.renderForm=function(a,b){var c=a.container,d=(a.formId,a.fromRemote||!1,a.type||"backbone"),e=new j({parentEl:c});e.loadForm(a,function(){"backbone"===d?b(null,e):"html"===d&&b(null,e)})},$fh.forms.renderFormFromJSON=function(a){if(!a)throw new Error("params cannot be empty");if(!a.rawData)throw new Error("raw json data must be passed in the params.rawData");if(!a.container)throw new Error("a container element must be passed in the params.container");a.formId=(new Date).getTime(),a.rawMode=!0;var b=new j({parentEl:a.container});b.loadForm(a,function(a){a&&console.error("error loading form for renderFormFromJSON ",a),b.render()})},$fh.forms.renderFormList=function(a){var b=a.fromRemote||!1,c=a.parentEl;$fh.forms.getForms({fromRemote:b},function(a,b){formListView=new f({model:b,parentEl:c}),formListView.render()})},$fh.forms.backbone={},$fh.forms.backbone.FormView=j,$fh.forms.backbone.ConfigView=k}(window||module.exports);
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
          self.trigger("error", self, err);
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

    // if model changes, re-initialise sub-collection of pages
    this.bind('change', this.reInitPages, this);
    this.on('change:page_history', function(model, history) {
      model.set('active_page', _(history).last());
    });
  },

  handleError: function(e, cb) {
    var type = e.msg || "unknown";
    var err = e.err;
    var msg;
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
          self.trigger("error", err);
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
                  self.trigger("error", self, err);
              } else {
                  self.coreModel = submission;
                  self.id = submission.getLocalId();
              }

              self.coreModel.clearEvents();
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
        coreModel.on("submitted", function(submissionId) {
          AlertView.showAlert({
            "text": "Form submission submitted."
          }, "success", 5000);
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
            console.log("$fh.forms.getSubmissions", self.status);
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
    if(this.percent > 100) this.percent = 100;
    this.updateLoadedCount();
    this.totalCounter += 1;
    this.updateProgress(this.percent);
    this.checkTotal();
  },

  modelLoadError: function(model, b, c) {
    model.set('fh_error_loading', true);
    this.percent += 100 / App.collections.forms.length;
    if(this.percent > 100) this.percent = 100;
    this.totalCounter += 1;
    this.updateProgress(this.percent);
    this.checkTotal();
  },

  checkTotal: function() {
    var self = this;
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
    form_button: '<li><button class="show button-block <%= enabledClass %> <%= dataClass %> fh_appform_button_action"><%= name %><div class="loading"></div></button></li>'
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
      "parentEl":$("#fh_appform_content"),
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

            if (params.form) {
                params.formId = params.form.getFormId();
            }

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

                self.submission.on("progress", function(progress) {
                    console.log("PROGRESS", progress, this);
                });
                self.submission.on("submitted", function() {
                    console.log("SUBMITTED", this);
                });
                self.submission.on("error", function(errorMessage) {
                    console.log("ERROR", errorMessage);
                });
                self.submission.on("inprogress", function(uploadTask) {
                    console.log("READY FOR UPLOAD ", this, uploadTask);
                });
                self.trigger("loaded");
                if (params.autoShow) {
                    self.$el.show();
                }
                self.render();
            });
        }
    });
});

var FormListView = Backbone.View.extend({
  el: $('#fh_appform_form_list'),

  events: {
    'click .settings': 'showSettings',
    'click button.reload': 'reload',
    'click #refresh_forms_list': 'reload'
  },

  templates: {
    list: '<ul class="form_list"></ul>',
    header: '<div class="fh_appform_form_title">Your Forms</div><div class="fh_appform_form_description">Choose a form from the list below</div>',
    error: '<li><button class="reload button-block <%= enabledClass %> <%= dataClass %>"><%= name %><div class="loading"></div></button></li>',
    footer: '<a class="about fh_appform_form_title" href="#fh_appform_banner"><i class="fa fa-info-circle"></i></a><a class="settings fh_appform_field_instructions"><i class="fa fa-cogs"></i></a><br style="clear:both;">',
    refreshForms: '<div id="refresh_forms_list" class="fh_appform_form_title" style="text-align: right;margin-right:20px;font-size:30px;"><i class="fa fa-cloud-download fa-4"></i></div>',
    appformLogo: '<div class="fh_appform_logo_container"><div class="fh_appform_logo"></div></div>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'appendForm');
    this.views = [];

    App.collections.forms.bind('reset', function(collection, options) {
      if (options == null || !options.noFetch) {
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
    App.views.header.markActive('.fh_appform_home');
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
      enabledClass: 'fh_appform_button_cancel',
      dataClass: 'fetched'
    });
    $('ul', this.el).append(html);

  },

  render: function() {
    // Empty our existing view
    $(this.el).empty();
    $(this.el).append(this.templates.appformLogo);
    $(this.el).append(this.templates.refreshForms);

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
  el: $('#fh_appform_sent'),

  events: {
    'click button.dismiss-all': 'dismissAll',
    "change #sentSaveMax": "saveMaxSelected"
  },

  templates: {
    sent_list: '<ul class="fh_appform_field_area list inset sent_list"></ul>',
    sent_header: '<li class="list-divider fh_appform_field_title">Sent Submissions</li>',
    dismiss_all: '<li><button class="fh_appform_button_cancel dismiss-all button button-main button-block">Dismiss All</button></li>',
    save_max: '<li><label for="sentSaveMax" class="fh_appform_field_title">Number of sent items to keep</label><select class="fh_appform_field_input" id="sentSaveMax"><%= options%></select></li>',
    save_max_option: '<option value="<%= value%>"><%= value%></option>'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'appendSentForm', 'changed');

    App.collections.sent.bind('add remove reset', this.changed, this);

    this.render();
  },

  saveMaxSelected: function() {
    var saveMax = parseInt($('#sentSaveMax', this.el).val(), 10);
    if (_.isNumber(saveMax)) {
      if(saveMax < $fh.forms.config.get("sent_save_max") && saveMax > $fh.forms.config.get("sent_save_min")){
        $fh.forms.config.set("max_sent_saved", saveMax);
        $fh.forms.config.saveConfig();
      }
    }
  },

  show: function() {
    App.views.header.markActive('.fh_appform_sent');
    this.populate();
    $(this.el).show();
  },

  populate: function() {
    // Re-render save
    var maxSize = $fh.forms.config.get("max_sent_saved") ? $fh.forms.config.get("max_sent_saved") : $fh.forms.config.get("sent_save_min");
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

    var interval = $fh.forms.config.get("sent_save_max") - $fh.forms.config.get("sent_save_min");

    var currentVal = $fh.forms.config.get("max_sent_saved") ? $fh.forms.config.get("max_sent_saved") : $fh.forms.config.get("sent_save_min");
    var steps = 10;
    var stepSize = Math.floor(interval / steps);
    var optionsString = "";

    //max and min are the same.
    if(interval > 0){

      optionsString += _.template(this.templates.save_max_option, {"value": $fh.forms.config.get("sent_save_min")});

      for(var step = 2; step <= steps; step++){
        var currentStep = (step * stepSize) + $fh.forms.config.get("sent_save_min");
        var nextStep = (step + 1) * stepSize;

        if(currentVal > currentStep && currentVal < nextStep){
          optionsString += _.template(this.templates.save_max_option, {"value": currentStep});
          optionsString += _.template(this.templates.save_max_option, {"value": currentVal});
        } else {
          optionsString += _.template(this.templates.save_max_option, {"value": currentStep});
        }
      }
    } else {
      optionsString += _.template(this.templates.save_max_option, {"value": $fh.forms.config.get("sent_save_max")});
    }

    $('.sent_list', this.el).append(this.templates.dismiss_all);
    $('.sent_list', this.el).append(_.template(this.templates.save_max, {"options": optionsString}));

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
  el: $('#fh_appform_drafts'),

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
    App.views.header.markActive('.fh_appform_drafts');
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
$(function() {
  SettingsView = $fh.forms.backbone.ConfigView.extend({
    el: $('#fh_appform_settings'),
    events:{
      "click #cancelBtn":"cancel",
      "click #saveBtn":"save"
    },
    buttons:"<div style='margin: 20px 20px 20px 20px;'><button class='fh_appform_button_cancel' style='width:45%;margin-right:25px;' type='button' id='cancelBtn'>Cancel</button><button class='fh_appform_button_action' style='width:45%;'  type='button' id='saveBtn'>Save</button></div>",
    render:function(){
      SettingsView.__super__.render.apply(this);
      if($fh.forms.config.editAllowed()){
        this.$el.append(this.buttons);  
      }
      
      return this;
    },
    show: function() {
      App.views.header.hideAll();
      this.render();
      this.$el.show();
    },

    hide: function() {
      this.$el.hide();
    },
    save:function(){
      SettingsView.__super__.save.call(this,function(){
        App.views.header.showHome();  
      });
      
    },
    cancel:function(){
      App.views.header.showHome();
    }
  });
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
    item_failed: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Submitted At: <br/><%= timestamp %></span><br/><span class="pending_review_type fh_appform_error <%= error_type %>"><%= error_message %></span><button class="button fh_appform_button_cancel button-negative delete-item first_button">Delete</button><button class="button fh_appform_button_action button-positive submit-item second_button">Retry</button>',
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts"><%= timestamp %></span><button class="button fh_appform_button_cancel button-negative delete-item first_button">Delete</button><button class="button fh_appform_button_action button-positive submit-item second_button">Submit</button>'
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
    var self = this;
    e.stopPropagation();


    var confirmDelete = confirm("Are you sure you want to delete this submission?");
    if (confirmDelete) {
      self.model.loadSubmission(self.model.submissionMeta, function(err){
        if(err){
          $fh.forms.log.e("Error Loading Submission: ", err);
        } else {
          self.model.coreModel.clearLocal(function(err){
            if(err) console.error("Error clearing local: ", err);
            self.model.destroy();
            return false;
          });
        }
      });
    }
  },
  submit: function(e) {
    var self = this;
    var model = self.model;
    e.stopPropagation();

    self.model.loadSubmission(self.model.submissionMeta, function(err){
      if(err){
        $fh.forms.log.e("Error Loading Submission: ", err);
      } else {
        model.coreModel.upload(function(err) {
          if(err){
            $fh.forms.log.e("Error Calling Upload Submission: ", err);
          }
          return false;
        });
      }
    });
  },

  unrender: function() {
    $(this.el).remove();
  },

  show: function() {
    if(this.model.load){
      this.model.load(function(err, actual) {
        var draft = new DraftModel(actual.toJSON());
        App.views.form = new DraftView({
          model: draft
        });
        App.views.form.render();
      });
    }
  }
});
DraftItemView = ItemView.extend({

  templates: {
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts"><%= timestamp %></span><button class="fh_appform_button_cancel button button-negative delete-item second_button">Delete</button>'
  },

  show: function() {
    var self = this;
    App.views.header.hideAll();

    self.model.loadSubmission(self.model.submissionMeta, function(err){
      if(err){
        $fh.forms.log.e("Error loading submission ", err);
      }
      var submission=self.model.coreModel;
      App.views.form=new FormView({
        "parentEl":$("#fh_appform_content"),
        "formId":submission.get("formId"),
        "autoShow":true,
        "submission":submission
      });
    });
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
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Submitted At: <br/><%= timestamp %></span><br/><span class="pending_review_type"><%= error_type %></span><button class="button button-negative fh_appform_button_cancel delete-item first_button">Delete</button><button class="button button-positive submit-item fh_appform_button_action second_button">Retry</button>'
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
    var self = this;
    App.views.header.hideAll();

    self.model.loadSubmission(self.model.submissionMeta, function(err){
      if(err){
        $fh.forms.log.e("Error loading submission ", err);
      }
      var submission = self.model.coreModel;
      App.views.form = new FormView({
        "parentEl": $("#fh_appform_content"),
        "formId": submission.get("formId"),
        "autoShow": true,
        "submission": submission
      });
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
    var self = this;
    App.views.header.hideAll();

    self.model.loadSubmission(self.model.submissionMeta, function(err){
      if(err){
        $fh.forms.log.e("Error loading submission ", err);
      }

      var submission=self.model.coreModel;
      App.views.form=new FormView({
        "parentEl":$("#fh_appform_content"),
        "formId":submission.get("formId"),
        "autoShow":true,
        "submission":submission
      });
      App.views.form.readOnly();
    });
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
  }
});
PendingSubmittedItemView = ItemView.extend({
  templates: {
    item: '<span class="name <%= screen %>"><%= name %></span><br/><span class="title <%= screen %>"><%= id %></span><br/><span class="ts">Submitted: <br/><%= timestamp %></span><button class="button button-main fh_appform_button_cancel delete-item second_button">Dismiss</button>'
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
    var self = this;
    App.views.header.hideAll();

    self.model.loadSubmission(self.model.submissionMeta, function(err){
      if(err){
        $fh.forms.log.e("Error loading submission ", err);
      }
      var submission=self.model.coreModel;
      App.views.form=new FormView({
        "parentEl":$("#fh_appform_content"),
        "formId":submission.get("formId"),
        "autoShow":true,
        "submission":submission
      });
      App.views.form.readOnly();
    });
  }

});
PendingListView = Backbone.View.extend({
  el: $('#fh_appform_pending'),

  events: {
    'click button.submit-all': 'submitAll'
  },

  templates: {
    pending_waiting_list: '<ul class="fh_appform_field_area list inset pending_waiting_list"></ul>',
    pending_waiting_header: '<li class="list-divider"><div class="fh_appform_field_title">Forms Awaiting Submission</div></li>',
    pending_waiting_submitall: '<li><button class="fh_appform_button_action submit-all button button-positive button-block">Submit All Awaiting Forms</button></li>',
    pending_submitting_list: '<ul class="fh_appform_field_area list inset pending_submitting_list"></ul>',
    pending_submitting_header: '<li class="list-divider"><div class="fh_appform_field_title">Forms currently being submitted</div></li>',
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
      };
    });    // Kick things off by fetching when all stores are initialised

    async.series(tasks, function (){
      loadingView.hide();
    });
    return false;
  },

  show: function() {
    App.views.header.markActive('.fh_appform_pending');
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
    el: '#fh_appform_header',

    events: {
        'click div.fh_appform_home': 'showHome',
        'click div.fh_appform_drafts': 'showDrafts',
        'click div.fh_appform_pending': 'showPending',
        'click div.fh_appform_sent': 'showSent'
    },

    templates: {
        list: '<div class="navigation_list"></div>',
        forms_button: '<div class="fh_appform_home nav_item"><a class="" href="#">Forms</a></li>',
        drafts_button: '<div class="fh_appform_drafts nav_item"><a class="" href="#">Drafts<span class="count"></span></a></div>',
        pending_button: '<div class="fh_appform_pending nav_item"><a class="" href="#">Pending<span class="count"></span></a></div>',
        sent_button: '<div class="fh_appform_sent nav_item_last"><a class="" href="#">Sent<span class="count"></span></a></div>'
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
        this.showDrafts = this.advise(this.showDrafts);
        this.showPending = this.advise(this.showPending);
        this.showSent = this.advise(this.showSent);
    },
    advise: function(func) {
        var self = this;
        return function() {
            var skip = false;
            var args = arguments;
            if (args.length && args[0] === true) {
                skip = true;
            }
            var proceed = function(clear) {
                try {
                    return func.call(self, args);
                } finally {
                    if (clear && App.views.form) {
                        App.views.form = null;
                    }
                }
            };
            if (skip || App.views.form == null || App.views.form.readonly) {
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

    showSettings: function() {
        this.hideAll();
        App.views.settings.show();
    },
    hideAll: function() {
        window.scrollTo(0, 0);
        App.views.form_list.hide();
        App.views.drafts_list.hide();
        App.views.pending_list.hide();
        App.views.sent_list.hide();
        App.views.settings.hide();
        if (_.isObject(App.views.form)) {
            App.views.form.$el.hide();
        }
    },

    markActive: function(tab_class) {
        var self = this;
        self.$el.find('.navigation_list a').removeClass('fh_appform_button_default_active');
        self.$el.find('.navigation_list a').addClass('fh_appform_button_default');
        self.$el.find(tab_class + " a").addClass('fh_appform_button_default_active');
    },

    updateCounts: function() {
        // TODO: DRY
        var drafts_count = App.collections.drafts.length;
        if (drafts_count > 0) {
            $('.fh_appform_drafts .count', this.el).text(drafts_count).css('display', 'inline-block');
        } else {
            $('.fh_appform_drafts .count', this.el).hide();
        }

        var pending_count = App.collections.pending_submitting.length + App.collections.pending_review.length + App.collections.pending_waiting.length;

        if (pending_count > 0) {
            $('.fh_appform_pending .count', this.el).text(pending_count).css('display', 'inline-block');
        } else {
            $('.fh_appform_pending .count', this.el).hide();
        }

        var sent_count = App.collections.sent.length;
        if (sent_count > 0) {
            $('.fh_appform_sent .count', this.el).text(sent_count).css('display', 'inline-block');
        } else {
            $('.fh_appform_sent .count', this.el).hide();
        }
    }
});
AlertView = Backbone.View.extend({
  options:{el: $("#fh_appform_alerts_area")},

  templates: {
    alert: '<div class="fh_appform_alert <%= type %>"><%= message %></div>',
    bar: '<div class="fh_appform_alert <%= type %>"><span class="small"><%= message %></span><progress max="100" value="<%= value %>"><strong><%= message %></strong></progress></div>',
    ios_bar: '<div class="fh_appform_alert <%= type %>"><span class="small"><%= message %></span><div class="progress_bar_container" ><div class="progress_bar complete" style="width:<%=value%>%%"></div></div></div>'
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
      template = this.templates.bar;
    }
    $(self.$el).find('.fh_appform_alert').remove();
    this.$el.append(_.template(template, {message:message,value:value,type:type}));
    this.$el.show();
    clearTimeout(this.to);
    this.to = setTimeout(function() {
//      self.$el.slideUp(function() {
//
//      });
      $(self.$el).find('.fh_appform_alert').remove();
    }, opts.timeout || 10000);
    return this;
  }
});
var alertView = new AlertView();//{o:o, type:type, timeout:timeout});

AlertView.showAlert = function(o, type, timeout) {
  alertView.render({o:o, type:type, timeout:timeout});
};
App.Router = Backbone.Router.extend({
    routes: {
        "form_list": "form_list",
        "*path": "form_list" // Default route
    },

    initialize: function() {
        _.bindAll(this);
    },

    form_list: function() {
        var self = this;
        var initRetryLimit = 20;
        var initRetryAttempts = 0;
        self.loadingView = new LoadingCollectionView();
        self.loadingView.show("App Starting");
        self.deviceReady = false;
        self.initReady = false;

        function startForms() {

            $fh.forms.init({}, function() {
                $fh.forms.getTheme({
                    "fromRemote": false,
                    "css": true
                }, function(err, themeCSS) {
                    App.views.form_list = new FormListView();
                    App.views.drafts_list = new DraftListView();
                    App.views.pending_list = new PendingListView();
                    App.views.sent_list = new SentListView();
                    App.views.settings = new SettingsView();
                    App.views.header = new HeaderView();
                    App.views.header.showHome();

                    $fh.forms.config.mbaasOnline(function(){
                      $fh.forms.log.d("Device online");
                      $('.fh_appform_alert_offline').hide();
                    });

                    $fh.forms.config.mbaasOffline(function(){
                      $fh.forms.log.d("Device offline");
                      $('.fh_appform_alert_offline').show();
                    });


                    if ($('#fh_appform_style').length > 0) {
                        $('#fh_appform_style').html(themeCSS);
                    } else {
                        $('head').append('<style id="fh_appform_style">' + themeCSS + '</style>');
                    }
                    if (err) console.error(err);
                    self.onReady();
                });
            });
        }

        $fh.ready({}, function() {



            if (window.PhoneGap || window.cordova) {
                document.addEventListener("deviceready", function() {
                    self.deviceReady = true;
                }, false);
                document.addEventListener("backbutton", function(){
                    $fh.forms.log.d("Back Button Clicked");
                    if(App.views.form && typeof(App.views.form.backEvent) === 'function'){
                        if(App.views.form.backEvent() === false){//Clicked back while on the first page. Should go home
                            App.views.header.showHome();
                        }
                    } else {
                        App.views.header.showHome();
                    }
                }, false);
            } else {
                self.deviceReady = true;
            }
            $fh.on('fhinit', function(err, cloudProps) {
                console.log("fhinit called");
                if (err) {
                    console.error("Error on fhinit", err);
                }

                self.initReady = true;
            });
            var deviceReadyInterval = setInterval(function() {
                if (self.deviceReady === true && self.initReady === true) {
                    startForms();
                    clearInterval(deviceReadyInterval);
                } else {
                    if(initRetryAttempts > initRetryLimit){
                        console.error("Forms Not Ready Yet. Retry Attempts Exceeded");

                        if(self.deviceReady === true){
                            console.error("Forms Not Ready Yet. Device Ready. Starting in offline mode.");
                            startForms();
                            clearInterval(deviceReadyInterval);
                        } else {
                            console.error("Forms Device Not Ready. Trying again.");
                            initRetryAttempts = 0;
                        }
                    } else {
                        initRetryAttempts += 1;   
                    }
                }
            }, 500);
        });
    },
    onReady: function() {
        this.loadingView.show("App Ready, Loading form list");

        $fh.env(this.onPropsRead);

        // by default, allow fetching on resume event.
        // Can be set to false when taking a pic so refetch doesn't happen on resume from that
        App.resumeFetchAllowed = true;
        document.addEventListener("resume", this.onResume, false);
        var banner = false;
        $('#fh_appform_banner .list li').each(function(i, e) {
            banner = true;
        });
        this.onConfigLoaded();
    },

    // run App.router.onResume() to test this in browser
    onResume: function() {
        // only trigger resync of forms if NOT resuming after taking a photo
        if (App.resumeFetchAllowed) {
            App.collections.forms.fetch();
        } else {
            // reset flag to true for next time
            App.resumeFetchAllowed = true;
        }
    },
    onConfigLoaded: function() {
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
    onPropsRead: function(props) {
        this.props = props;
    }
});

App.router = new App.Router();
Backbone.history.start();