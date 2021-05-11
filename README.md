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

-   constructor({callbackDelay, onResize, immediate})
-   init(immediate) | If immediate is true onResize will fire right away
-   destroy()
-   getWidth()
-   getHeight()
-   onResize(width, height)
