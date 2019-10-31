(function($){var zepto=$.zepto,oldQsa=zepto.qsa,oldMatches=zepto.matches;function visible(elem){elem=$(elem);return !!(elem.width()||elem.height())&&elem.css("display")!=="none"}var filters=$.expr[":"]={visible:function(){if(visible(this)){return this}},hidden:function(){if(!visible(this)){return this}},selected:function(){if(this.selected){return this}},checked:function(){if(this.checked){return this}},parent:function(){return this.parentNode},first:function(idx){if(idx===0){return this}},last:function(idx,nodes){if(idx===nodes.length-1){return this}},eq:function(idx,_,value){if(idx===value){return this}},contains:function(idx,_,text){if($(this).text().indexOf(text)>-1){return this}},has:function(idx,_,sel){if(zepto.qsa(this,sel).length){return this}}};var filterRe=new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),childRe=/^\s*>/,classTag="Zepto"+(+new Date());function process(sel,fn){sel=sel.replace(/=#\]/g,'="#"]');var filter,arg,match=filterRe.exec(sel);if(match&&match[2] in filters){filter=filters[match[2]],arg=match[3];sel=match[1];if(arg){var num=Number(arg);if(isNaN(num)){arg=arg.replace(/^["']|["']$/g,"")}else{arg=num}}}return fn(sel,filter,arg)}zepto.qsa=function(node,selector){return process(selector,function(sel,filter,arg){try{var taggedParent;if(!sel&&filter){sel="*"}else{if(childRe.test(sel)){taggedParent=$(node).addClass(classTag),sel="."+classTag+" "+sel}}var nodes=oldQsa(node,sel)}catch(e){console.error("error performing selector: %o",selector);throw e}finally{if(taggedParent){taggedParent.removeClass(classTag)}}return !filter?nodes:zepto.uniq($.map(nodes,function(n,i){return filter.call(n,i,nodes,arg)}))})};zepto.matches=function(node,selector){return process(selector,function(sel,filter,arg){return(!sel||oldMatches(node,sel))&&(!filter||filter.call(node,null,arg)===node)})}})(Zepto);(function($){var touch={},touchTimeout,tapTimeout,swipeTimeout,longTapTimeout,longTapDelay=750,gesture,down,up,move,eventMap,initialized=false;function swipeDirection(x1,x2,y1,y2){return Math.abs(x1-x2)>=Math.abs(y1-y2)?(x1-x2>0?"Left":"Right"):(y1-y2>0?"Up":"Down")}function longTap(){longTapTimeout=null;if(touch.last){touch.el.trigger("longTap");touch={}}}function cancelLongTap(){if(longTapTimeout){clearTimeout(longTapTimeout)}longTapTimeout=null}function cancelAll(){if(touchTimeout){clearTimeout(touchTimeout)}if(tapTimeout){clearTimeout(tapTimeout)}if(swipeTimeout){clearTimeout(swipeTimeout)}if(longTapTimeout){clearTimeout(longTapTimeout)}touchTimeout=tapTimeout=swipeTimeout=longTapTimeout=null;touch={}}function isPrimaryTouch(event){return(event.pointerType=="touch"||event.pointerType==event.MSPOINTER_TYPE_TOUCH)&&event.isPrimary}function isPointerEventType(e,type){return(e.type=="pointer"+type||e.type.toLowerCase()=="mspointer"+type)}function unregisterTouchEvents(){if(!initialized){return}$(document).off(eventMap.down,down).off(eventMap.up,up).off(eventMap.move,move).off(eventMap.cancel,cancelAll);$(window).off("scroll",cancelAll);cancelAll();initialized=false}function setup(__eventMap){var now,delta,deltaX=0,deltaY=0,firstTouch,_isPointerType;unregisterTouchEvents();eventMap=(__eventMap&&("down" in __eventMap))?__eventMap:("ontouchstart" in document?{"down":"touchstart","up":"touchend","move":"touchmove","cancel":"touchcancel"}:"onpointerdown" in document?{"down":"pointerdown","up":"pointerup","move":"pointermove","cancel":"pointercancel"}:"onmspointerdown" in document?{"down":"MSPointerDown","up":"MSPointerUp","move":"MSPointerMove","cancel":"MSPointerCancel"}:false);if(!eventMap){return}if("MSGesture" in window){gesture=new MSGesture();gesture.target=document.body;$(document).bind("MSGestureEnd",function(e){var swipeDirectionFromVelocity=e.velocityX>1?"Right":e.velocityX<-1?"Left":e.velocityY>1?"Down":e.velocityY<-1?"Up":null;if(swipeDirectionFromVelocity){touch.el.trigger("swipe");touch.el.trigger("swipe"+swipeDirectionFromVelocity)}})}down=function(e){if((_isPointerType=isPointerEventType(e,"down"))&&!isPrimaryTouch(e)){return}firstTouch=_isPointerType?e:e.touches[0];if(e.touches&&e.touches.length===1&&touch.x2){touch.x2=undefined;touch.y2=undefined}now=Date.now();delta=now-(touch.last||now);touch.el=$("tagName" in firstTouch.target?firstTouch.target:firstTouch.target.parentNode);touchTimeout&&clearTimeout(touchTimeout);touch.x1=firstTouch.pageX;touch.y1=firstTouch.pageY;if(delta>0&&delta<=250){touch.isDoubleTap=true}touch.last=now;longTapTimeout=setTimeout(longTap,longTapDelay);if(gesture&&_isPointerType){gesture.addPointer(e.pointerId)}};move=function(e){if((_isPointerType=isPointerEventType(e,"move"))&&!isPrimaryTouch(e)){return}firstTouch=_isPointerType?e:e.touches[0];cancelLongTap();touch.x2=firstTouch.pageX;touch.y2=firstTouch.pageY;deltaX+=Math.abs(touch.x1-touch.x2);deltaY+=Math.abs(touch.y1-touch.y2)};up=function(e){if((_isPointerType=isPointerEventType(e,"up"))&&!isPrimaryTouch(e)){return}cancelLongTap();if((touch.x2&&Math.abs(touch.x1-touch.x2)>30)||(touch.y2&&Math.abs(touch.y1-touch.y2)>30)){swipeTimeout=setTimeout(function(){if(touch.el){touch.el.trigger("swipe");
touch.el.trigger("swipe"+(swipeDirection(touch.x1,touch.x2,touch.y1,touch.y2)))}touch={}},0)}else{if("last" in touch){if(deltaX<30&&deltaY<30){tapTimeout=setTimeout(function(){var event=$.Event("tap");event.cancelTouch=cancelAll;if(touch.el){touch.el.trigger(event)}if(touch.isDoubleTap){if(touch.el){touch.el.trigger("doubleTap")}touch={}}else{touchTimeout=setTimeout(function(){touchTimeout=null;if(touch.el){touch.el.trigger("singleTap")}touch={}},250)}},0)}else{touch={}}}}deltaX=deltaY=0};$(document).on(eventMap.up,up).on(eventMap.down,down).on(eventMap.move,move);$(document).on(eventMap.cancel,cancelAll);$(window).on("scroll",cancelAll);initialized=true}["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(eventName){$.fn[eventName]=function(callback){return this.on(eventName,callback)}});$.touch={setup:setup};$(document).ready(setup)})(Zepto);(function($,undefined){var document=window.document,origShow=$.fn.show,origHide=$.fn.hide,origToggle=$.fn.toggle;function anim(el,speed,opacity,scale,callback){if(typeof speed=="function"&&!callback){callback=speed,speed=undefined}var props={opacity:opacity};if(scale){props.scale=scale;el.css($.fx.cssPrefix+"transform-origin","0 0")}return el.animate(props,speed,null,callback)}function hide(el,speed,scale,callback){return anim(el,speed,0,scale,function(){origHide.call($(this));callback&&callback.call(this)})}$.fn.show=function(speed,callback){origShow.call(this);if(speed===undefined){speed=0}else{this.css("opacity",0)}return anim(this,speed,1,"1,1",callback)};$.fn.hide=function(speed,callback){if(speed===undefined){return origHide.call(this)}else{return hide(this,speed,"0,0",callback)}};$.fn.toggle=function(speed,callback){if(speed===undefined||typeof speed=="boolean"){return origToggle.call(this,speed)}else{return this.each(function(){var el=$(this);el[el.css("display")=="none"?"show":"hide"](speed,callback)})}};$.fn.fadeTo=function(speed,opacity,callback){return anim(this,speed,opacity,null,callback)};$.fn.fadeIn=function(speed,callback){var target=this.css("opacity");if(target>0){this.css("opacity",0)}else{target=1}return origShow.call(this).fadeTo(speed,target,callback)};$.fn.fadeOut=function(speed,callback){return hide(this,speed,null,callback)};$.fn.fadeToggle=function(speed,callback){return this.each(function(){var el=$(this);el[(el.css("opacity")==0||el.css("display")=="none")?"fadeIn":"fadeOut"](speed,callback)})}})(Zepto);(function($,undefined){var prefix="",eventPrefix,vendors={Webkit:"webkit",Moz:"",O:"o"},testEl=document.createElement("div"),supportedTransforms=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,transform,transitionProperty,transitionDuration,transitionTiming,transitionDelay,animationName,animationDuration,animationTiming,animationDelay,cssReset={};function dasherize(str){return str.replace(/([A-Z])/g,"-$1").toLowerCase()}function normalizeEvent(name){return eventPrefix?eventPrefix+name:name.toLowerCase()}if(testEl.style.transform===undefined){$.each(vendors,function(vendor,event){if(testEl.style[vendor+"TransitionProperty"]!==undefined){prefix="-"+vendor.toLowerCase()+"-";eventPrefix=event;return false}})}transform=prefix+"transform";cssReset[transitionProperty=prefix+"transition-property"]=cssReset[transitionDuration=prefix+"transition-duration"]=cssReset[transitionDelay=prefix+"transition-delay"]=cssReset[transitionTiming=prefix+"transition-timing-function"]=cssReset[animationName=prefix+"animation-name"]=cssReset[animationDuration=prefix+"animation-duration"]=cssReset[animationDelay=prefix+"animation-delay"]=cssReset[animationTiming=prefix+"animation-timing-function"]="";$.fx={off:(eventPrefix===undefined&&testEl.style.transitionProperty===undefined),speeds:{_default:400,fast:200,slow:600},cssPrefix:prefix,transitionEnd:normalizeEvent("TransitionEnd"),animationEnd:normalizeEvent("AnimationEnd")};$.fn.animate=function(properties,duration,ease,callback,delay){if($.isFunction(duration)){callback=duration,ease=undefined,duration=undefined}if($.isFunction(ease)){callback=ease,ease=undefined}if($.isPlainObject(duration)){ease=duration.easing,callback=duration.complete,delay=duration.delay,duration=duration.duration}if(duration){duration=(typeof duration=="number"?duration:($.fx.speeds[duration]||$.fx.speeds._default))/1000}if(delay){delay=parseFloat(delay)/1000}return this.anim(properties,duration,ease,callback,delay)};$.fn.anim=function(properties,duration,ease,callback,delay){var key,cssValues={},cssProperties,transforms="",that=this,wrappedCallback,endEvent=$.fx.transitionEnd,fired=false;if(duration===undefined){duration=$.fx.speeds._default/1000}if(delay===undefined){delay=0}if($.fx.off){duration=0}if(typeof properties=="string"){cssValues[animationName]=properties;cssValues[animationDuration]=duration+"s";cssValues[animationDelay]=delay+"s";cssValues[animationTiming]=(ease||"linear");endEvent=$.fx.animationEnd}else{cssProperties=[];for(key in properties){if(supportedTransforms.test(key)){transforms+=key+"("+properties[key]+") "
}else{cssValues[key]=properties[key],cssProperties.push(dasherize(key))}}if(transforms){cssValues[transform]=transforms,cssProperties.push(transform)}if(duration>0&&typeof properties==="object"){cssValues[transitionProperty]=cssProperties.join(", ");cssValues[transitionDuration]=duration+"s";cssValues[transitionDelay]=delay+"s";cssValues[transitionTiming]=(ease||"linear")}}wrappedCallback=function(event){if(typeof event!=="undefined"){if(event.target!==event.currentTarget){return}$(event.target).unbind(endEvent,wrappedCallback)}else{$(this).unbind(endEvent,wrappedCallback)}fired=true;$(this).css(cssReset);callback&&callback.call(this)};if(duration>0){this.bind(endEvent,wrappedCallback);setTimeout(function(){if(fired){return}wrappedCallback.call(that)},((duration+delay)*1000)+25)}this.size()&&this.get(0).clientLeft;this.css(cssValues);if(duration<=0){setTimeout(function(){that.each(function(){wrappedCallback.call(this)})},0)}return this};testEl=null})(Zepto);