##Resizer##
*By: AJ Savino*

Provides a way to handle resize and orientation change events with a delay.

####Usage####
```JavaScript
	var resizer = new Resizer({
		onResize:function(width, height){
			console.log("RESIZE", width, height);
		}
	});
```