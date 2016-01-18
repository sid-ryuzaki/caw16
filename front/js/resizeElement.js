/**
 * Usage  
 *
 * resizeElement(PARAMS);
 * see defaults options for more details
 * 
 * Minimal args : {el: VALUE}
 * 
 * Add data-width and data-height to the picture or videos
 * 
 * To Launch the focus point tool : resizeElement().startToolFocusPoint(); 
 *
 */

var ResizeElement = function (opts) {
	
	var self = this;
	var args;
	var options = {
		kind : "picture", // picture or video
		el: null, // List of element to resize (can be a array, jquery or dom element),
		propX: "left", // Property X to move
		propY: "top", // Property Y to move
		position: "absolute", // Default position : absolute or relative
		addProperties: null // Add extras css attributes
	};
		
	var init = function (opts) {
		if (!opts) {return;}
		
		args = $.extend({}, options, opts);		
		if (!args.el) {console.error("missing param or empty 'el' in resizeElement function", args); return;}
		
		var lengthElements = args.el.length;
		if (!lengthElements) {args.el = $(args.el); lengthElements = args.el.length;} // Dom element
		
		for (var i=0; i < lengthElements; i++) {
			resize(args.el[i], args.kind);
		}
	};
	
	var resize = function (element, kind) {
		var $element = $(element);
		var parentWidth = $element.parent().width();
		var parentHeight = $element.parent().height();
		
		var height = element.getAttribute("data-height");
		var width = element.getAttribute("data-width");
		if (!height) {console.warn("missing data-height in element" + element);}
		if (!width) {console.warn("missing data-width in element" + element);}
		var focusX = element.getAttribute("data-focusx");
		var focusY = element.getAttribute("data-focusy");
		
		var ratio = height / width;
		
		if (kind == "video") { // get real values of videos
			var heightVideo = element.videoHeight;
			var widthVideo = element.videoWidth;
			if (heightVideo > 0 && widthVideo > 0) {ratio = heightVideo / widthVideo;}
		}
		
		var newWidth = parentWidth;
	    var newHeight = parentWidth * ratio;
		if (parentHeight/parentWidth > ratio) {
		    newHeight = parentHeight; newWidth = parentHeight / ratio;
		}
		newWidth+=4; newHeight+=4;
	
		var newX = -newWidth/2;
		var newY = -newHeight/2;
		
		if (focusX && focusY) { // Apply focus point if exist
			if (args.propX == "right") {focusX = -focusX;}
			if (args.propY == "bottom") {focusY = -focusY;}
			
			var newXFocus = newX + (newX * focusX);
			var newYFocus = newY + (newY * focusY);
			
			var minX = -parentWidth/2;
			var maxX = minX - newWidth + parentWidth +1;
			newX = Math.min(minX, newXFocus);
			newX = Math.max(maxX, newX);
			
			var minY = -parentHeight/2;
			var maxY = minY - newHeight + parentHeight +1;
			newY = Math.min(minY, newYFocus);
			newY = Math.max(maxY, newY);
		}
		
		// Apply properties
		element.style.position = args.position;
		
		if (args.propX) element.style[args.propX] = "50%";
		if (args.propY) element.style[args.propY] = "50%";
		
		if (args.propX == "left") {element.style.marginLeft = (~~newX-1)+'px';}
		else if (args.propX == "right") {element.style.marginRight = (~~newX-1)+'px';}
		if (args.propY == "top") {element.style.marginTop = (~~newY-1)+'px';}
		else if (args.propY == "bottom") {element.style.marginBottom = (~~newY-1)+'px';};
			
		element.style.width = ~~newWidth +'px';
		element.style.height = ~~newHeight +'px';
		
		if (args.addProperties) {$element.css(args.addProperties);}
	};
	
	this.startToolFocusPoint = function () {
		console.info("Click on a picture or video");
		// $("img, video").parent().css("overflow", "visible");
		$("img, video").on("click", onClickFocusPoint);
	};
	
	var onClickFocusPoint = function (e) {
		var x  = e.offsetX;
		var y = e.offsetY;
		var width = $(this).width();
		var height = $(this).height();
		
		var focusX = ((x * 100 / (width/2) - 100) / 100).toFixed(2);
		var focusY = ((y * 100 / (height/2) - 100) / 100).toFixed(2);
		
		this.setAttribute("data-focusx", focusX);
		this.setAttribute("data-focusy", focusY);
		console.info('data-focusx="'+focusX+'" data-focusy="'+focusY+'"');
		
		resizeElement({el: $(this)});
	};
	
	init(opts);
};

function resizeElement (opts) {
	return new ResizeElement(opts);	
};
