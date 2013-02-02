/*
 * jQuery Extra Selectors - (c) Keith Clark freely distributable under the terms of the MIT license.
 * 
 * twitter.com/keithclarkcouk
 * www.keithclark.co.uk
 */

(function($){function _1(_2,_3){var t=_2,_4=0;while(_2=_2[_3]){if(t.tagName==_2.tagName){_4++;}}return _4;};function _5(_6,_7,_8){var _9=_1(_6,_8),_a;if(_7=="odd"||_7=="even"){_a=2;_9-=!(_7=="odd");}else{var _b=_7.indexOf("n");if(_b>-1){_a=parseInt(_7,10)||parseInt(_7.substring(0,_b)+"1",10);_9-=(parseInt(_7.substring(_b+1),10)||0)-1;}else{_a=_9+1;_9-=parseInt(_7,10)-1;}}return (_a<0?_9<=0:_9>=0)&&_9%_a==0;};var _c={"first-of-type":function(_d){return _1(_d,"previousSibling")==0;},"last-of-type":function(_e){return _1(_e,"nextSibling")==0;},"only-of-type":function(_f){return _c["first-of-type"](_f)&&_c["last-of-type"](_f);},"nth-of-type":function(elm,i,_10){return _5(elm,_10[3],"previousSibling");},"nth-last-of-type":function(elm,i,_11){return _5(elm,_11[3],"nextSibling");}};$.extend($.expr[":"],_c);}(jQuery));