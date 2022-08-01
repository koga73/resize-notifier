# resize-notifier

Notifies on resize / orientation change events

## EcmaScript Module Usage

```js
import ResizeNotifier from "resize-notifier";

const resizeNotifier = new ResizeNotifier({
	immediate: true,
	onResize: function (width, height) {
		console.log("RESIZE", width, height);
	}
});
```

## CommonJS Usage

```js
var resizeNotifier = new ResizeNotifier({
	immediate: true,
	onResize: function (width, height) {
		console.log("RESIZE", width, height);
	}
});
```

## API

-   constructor({callbackDelay, onResize, onResizeBegin, immediate})
-   init(immediate) | If immediate is true onResize will fire right away
-   destroy()
-   getWidth()
-   getHeight()
-   onResizeBegin(width, height) | Will fire as soon as resize begins
-   onResize(width, height) | Will fire after callbackDelay when window is done resizing
