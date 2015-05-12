/*
* Resizer v1.0.0 Copyright (c) 2015 AJ Savino
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*/
var Resizer = function(params){
    var _instance = null;
	
    var _vars = {
        callbackDelay:300,      //Time in ms to wait before calling onResize
        
        _resizeEvent:("onorientationchange" in window) ? "orientationchange" : "resize",
        _timeout:null,
	};
    
    var _methods = {
        init:function(){
			if (window.addEventListener){
				window.addEventListener(_vars._resizeEvent, _methods._handler_resize, false);
			} else if (window.attachEvent){
				window.attachEvent("on" + _vars._resizeEvent, _methods._handler_resize);
			}
        },
        
        destroy:function(){
            var timeout = _vars._timeout;
			if (timeout){
				clearTimeout(timeout);
				_vars._timeout = null;
			}
            _instance.onResize = null;
            
            if (window.removeEventListener){
				window.removeEventListener(_vars._resizeEvent, _methods._handler_resize);
			} else if (window.detachEvent){
				window.detachEvent("on" + _vars._resizeEvent, _methods._handler_resize);
			}
        },
        
        getWidth:function(){
            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        },
        
        getHeight:function(){
            return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        },
        
        _handler_resize:function(){
			var timeout = _vars._timeout;
			if (timeout){
				clearTimeout(timeout);
				_vars._timeout = null;
			}
			_vars._timeout = setTimeout(function(){
				clearTimeout(timeout);
				_vars._timeout = null;
                _instance.onResize(_instance.getWidth(), _instance.getHeight());
			}, _instance.callbackDelay);
		}
    };
    
    _instance = {
        callbackDelay:_vars.callbackDelay,
        
        init:_methods.init,
        destroy:_methods.destroy,
        getWidth:_methods.getWidth,
        getHeight:_methods.getHeight,
        onResize:null
    };
    for (var param in params){
        _instance[param] = params[param];
    }
    _instance.init();
    return _instance;
};