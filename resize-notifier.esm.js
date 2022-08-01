/*
 * resize-notifier v2.1.0 Copyright (c) 2021 AJ Savino
 * https://github.com/koga73/resize-notifier
 * MIT License
 */
class ResizeNotifier {
	constructor(params = {}) {
		this._handler_resize = this._handler_resize.bind(this);
		this._handler_timeout = this._handler_timeout.bind(this);

		this.callbackDelay = params.callbackDelay || 300;
		this.onResizeBegin = params.onResizeBegin || null;
		this.onResize = params.onResize || this._onResize;

		this.init(params.immediate || false);
	}

	init(immediate) {
		immediate = immediate === true;

		if (window.addEventListener) {
			window.addEventListener("resize", this._handler_resize, false);
			window.addEventListener("orientationchange", this._handler_resize, false);
		} else if (window.attachEvent) {
			window.attachEvent("onresize", this._handler_resize);
			window.attachEvent("onorientationchange", this._handler_resize);
		}

		//TODO: window.orientation is deprecated, change to compare width vs height
		this._lastOrientation = window.orientation;
		this._timeout = 0;

		if (immediate) {
			this.onResize(this.getWidth(), this.getHeight());
		}
	}

	destroy() {
		if (this._timeout) {
			clearTimeout(this._timeout);
			this._timeout = 0;
		}
		this.onResize = this._onResize;
		this.onResizeBegin = null;

		if (window.removeEventListener) {
			window.removeEventListener("resize", this._handler_resize);
			window.removeEventListener("orientationchange", this._handler_resize);
		} else if (window.detachEvent) {
			window.detachEvent("onresize", this._handler_resize);
			window.detachEvent("onorientationchange", this._handler_resize);
		}
	}

	getWidth() {
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	}

	getHeight() {
		return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	}

	_handler_resize() {
		if ("onorientationchange" in window) {
			const orientation = window.orientation;
			if (orientation == this._lastOrientation) {
				return;
			}
			this._lastOrientation = orientation;
		}
		if (this._timeout) {
			clearTimeout(this._timeout);
		} else {
			if (this.onResizeBegin) {
				this.onResizeBegin(this.getWidth(), this.getHeight());
			}
		}
		this._timeout = setTimeout(this._handler_timeout, this.callbackDelay);
	}

	_handler_timeout() {
		clearTimeout(this._timeout);
		this._timeout = 0;
		this.onResize(this.getWidth(), this.getHeight());
	}

	_onResize() {
		console.warn("You must override the onResize method!");
	}
}
export default ResizeNotifier;
