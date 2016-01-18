$( document ).ready(function() {
   
   
   
   var container = $(".container");
   var current = 0;
   var cacheLogo = $("#logo img");
   var decalTop = 0;
   var content = $(".content");
   var bonjour = $(".bonjour");
   var bonjourtxt = $(".bonjour span");
   var white = $(".bonjour .white");
   var grey = $(".bonjour .grey");
   var projects = $(".projects");
   var languettetxt = $(".languette span");
   var languette = $(".languette");
   var portfolio = $("#portfolio");
   var close = $(".close");
   var countItem = portfolio.find(".item").size();
   var currentIndex = 0;
   var currentItem = portfolio.find(".item").eq(currentIndex);
   var currentTitle = currentItem.find(".title");
   var next = portfolio.find(".next");
   var prev = portfolio.find(".prev");
   var moving = false;
   
   portfolio.find(".item").each(function(index) {
   		TweenMax.set($(this), {force3D: "true", backfaceVisibility:"hidden", x: ((index+1)*100)+'%'});
   });
   
   TweenMax.set(currentItem, {scale:0.9});
   
   TweenMax.set(close.find(".before"), {rotationZ: -45});
   TweenMax.set(close.find(".after"), {rotationZ: 45});
   
   TweenMax.set(prev.find(".before"), {rotationZ: -45});
   TweenMax.set(prev.find(".after"), {rotationZ: 45});
   
   TweenMax.set(next.find(".before"), {rotationZ: -45});
   TweenMax.set(next.find(".after"), {rotationZ: 45});
   
   TweenMax.set(portfolio.find(".item a"), {force3D: 'true'});
   
   TweenMax.set(languettetxt, {rotationZ: -45});
   TweenMax.set(container.show(), {opacity: 0, x: '100%', force3D: "true", backfaceVisibility:"hidden"});
   TweenMax.set(content, {opacity: 0, y: 40});
   TweenMax.set(bonjourtxt, {opacity: 0, y: 20, force3D: "true", backfaceVisibility:"hidden", left: $(window).width()/2});
   TweenMax.set(white, {force3D: "true", backfaceVisibility:"hidden"});
   TweenMax.set(bonjour, {force3D: "true", backfaceVisibility:"hidden"});
   TweenMax.set(portfolio, {opacity: 0, force3D: "true", backfaceVisibility:"hidden"});
   
   TweenLite.to(bonjourtxt, 1, {opacity: 1, y: 0, delay: 0.2, ease: Expo.easeOut});
   TweenLite.to(white, 1, {width: '100%', y: 0, delay: 1.5, ease: Expo.easeInOut, onComplete: function() {
   	
   		pJS.fn.vendors.destroy();
   		grey.remove();
   		slide();
   	
   }});
   
   dispatchEvent();
   initParticule();
   
   function initParticule() {
   	
   	particlesJS('particule', {
	  particles: {
	    color: '#494949',
	    shape: 'triangle', // "circle", "edge" or "triangle"
	    opacity: 1,
	    size: 4,
	    size_random: true,
	    nb: 250,
	    line_linked: {
	      enable_auto: true,
	      distance: 100,
	      color: '#000',
	      opacity: 1,
	      width: 1,
	      condensed_mode: {
	        enable: false,
	        rotateX: 600,
	        rotateY: 600
	      }
	    },
	    anim: {
	      enable: true,
	      speed: 1
	    }
	  },
	  interactivity: {
	    enable: true,
	    mouse: {
	      distance: 250
	    },
	    detect_on: 'canvas',
	    mode: 'grab',
	    line_linked: {
	      opacity: .5
	    },
	    events: {
	      onclick: {
	        enable: true,
	        mode: 'push',
	        nb: 4
	      }
	    }
	  },
	  retina_detect: true
	});
	
	
	
   }

   function dispatchEvent() {
   	
   		close.click(function() {
   			
   			container.show();
   			languette.show();
   			
   			var heightD = $(window).height()*$(window).height();
			var widthD = $(window).width()*$(window).width();
			
			var hypo = Math.sqrt(heightD+widthD);
			
			var tanx = $(window).height() / $(window).width();
			var atanx = Math.atan(tanx); // (result in radians)
			var anglex = atanx * 180 / Math.PI; // converted to degrees
			
			$(".languette").css({
				height: $(window).height()*2,
				width: $(window).width()*2
			});
			
			TweenMax.fromTo(languette.show(),1.2, {rotationZ: -anglex, x: '-25%', y: '-25%', force3D: "true", backfaceVisibility:"hidden"}, {x: '100%', y: '100%', onComplete: function() {
				portfolio.hide();
				currentItem.hide();
				currentItem.find("video").attr("src", "").remove();
			}, ease: Expo.easeIn});
   			
   			currentItem.find("video")[0].pause();
   			
   			TweenMax.to(currentItem, 0.3, {scale: 0.9, ease: Expo.easeOut});
   			TweenMax.to(currentItem, 0.8, {x: '100%', ease: Expo.easeIn, delay: 0.2});
   			TweenMax.to(currentTitle, 0.8, {x: 600, ease: Expo.easeIn, delay: 0.2});
   			
   			TweenLite.to(portfolio, 0.6, {opacity: 0, delay: .6, ease: Expo.easeOut});
   			
   			content.removeClass("reveal");
   			
   		});
   		
   		next.click(function() {
   			
   			if(moving) return;
   			
   			moving = true;
   			
   			var lastIndex = currentItem;
   			var lastItem = currentItem.find("video");
   			
   			TweenMax.to(lastIndex, 1.8, {x: '-100%', ease: Expo.easeInOut, onComplete: function() {
   				
   				lastItem[0].pause();
   				lastIndex.hide();
   				lastItem.attr("src", "").remove();
   				
   			}});
   			
   			TweenMax.to(currentTitle, 1.8, {x: -600, ease: Expo.easeInOut});
   			
   			currentIndex++;
   			
   			currentItem = portfolio.find(".item").eq(currentIndex);
   			currentTitle = currentItem.find(".title");
   			
   			render();
   		
   			TweenMax.fromTo(currentTitle, 1.8, {x: 600, force3D: "true", backfaceVisibility:"hidden"}, {x: 0, ease: Expo.easeInOut});

			currentItem.find(".video").prepend("<video src='"+ currentItem.find(".video").data("src") +"' loop muted data-width='"+ currentItem.find(".video").data("width") +"' data-height='"+ currentItem.find(".video").data("height") +"'></video>");
   			
   			currentItem.find("video")[0].addEventListener('loadedmetadata', function() {
   				resize();
   				currentItem.find("video")[0].play();
   			});
   			
   			TweenMax.fromTo(currentItem.show(), 1.8, {x:'100%'}, {x: '0%', ease: Expo.easeInOut, onComplete: function() {

				moving = false;
   				
   			}});
   			
   		});
   		
   		prev.click(function() {
   			
   			if(moving) return;
   			
   			moving = true;
   			
   			var lastItem = currentItem.find("video");
   			var lastIndex = lastItem;

   			TweenMax.to(currentItem, 1.8, {x: '100%', ease: Expo.easeInOut, onComplete: function() {
   				lastItem[0].pause();
   				lastIndex.hide();
   				lastItem.attr("src", "").remove();
   			}});
   			
   			TweenMax.to(currentTitle, 1.8, {x: 600, ease: Expo.easeInOut});
   			
   			currentIndex--;
   			
   			currentItem = portfolio.find(".item").eq(currentIndex);
   			currentTitle = currentItem.find(".title");
   			
   			render();
   			
   			TweenMax.fromTo(currentTitle,1.8, {x: -600, force3D: "true", backfaceVisibility:"hidden"}, {x: 0, ease: Expo.easeInOut});

			currentItem.find(".video").prepend("<video src='"+ currentItem.find(".video").data("src") +"' loop muted data-width='"+ currentItem.find(".video").data("width") +"' data-height='"+ currentItem.find(".video").data("height") +"'></video>");
   			
   			currentItem.find("video")[0].addEventListener('loadedmetadata', function() {
   				resize();
   				currentItem.find("video")[0].play();
   			});
   			
   			TweenMax.fromTo(currentItem.show(), 1.8, {x:'-100%'}, {x: '0%', ease: Expo.easeInOut, onComplete: function() {
				moving = false;
   			}});
   			
   		});
   		
   		projects.click(function() {
			
			var heightD = $(window).height()*$(window).height();
			var widthD = $(window).width()*$(window).width();
			
			var hypo = Math.sqrt(heightD+widthD);
			
			var tanx = $(window).height() / $(window).width();
			var atanx = Math.atan(tanx); // (result in radians)
			var anglex = atanx * 180 / Math.PI; // converted to degrees
			
			$(".languette").css({
				height: $(window).height()*2,
				width: $(window).width()*2
			});
			
			TweenLite.set(portfolio, {opacity:0});
			
			TweenMax.fromTo(languette.show(),1.7, {rotationZ: -anglex, x: '100%', y: '100%', force3D: "true", backfaceVisibility:"hidden"}, {x: '-25%', y: '-25%', ease: Expo.easeOut});
   			
			
   			TweenMax.fromTo(currentTitle,1.2, {x: 600, force3D: "true", backfaceVisibility:"hidden"}, {x: 0, ease: Expo.easeOut, delay: 0.3});
   			
   			content.addClass("reveal");
   			
   			currentItem.css({opacity:0}).find(".video").prepend("<video src='"+ currentItem.find(".video").data("src") +"' muted loop data-width='"+ currentItem.find(".video").data("width") +"' data-height='"+ currentItem.find(".video").data("height") +"'></video>");
   			
   			currentItem.show();
   			
   			resize();
	   			
	   		//TweenMax.to(container, 0.6, {x:'-25%', force3D: "true", delay: 0.3, backfaceVisibility:"hidden", ease: Expo.easeOut});
   			
   			TweenMax.fromTo(currentItem, 0.6, {x:'100%', force3D: "true", backfaceVisibility:"hidden"}, {x: '0%', opacity:1, ease: Expo.easeOut, delay: 0.6, onComplete: function() {
   				
   				TweenMax.to(currentItem,0.3, {scale: 1, ease: Expo.easeOut});
   			
   				render();
   				currentItem.find("video")[0].play();
   				
   			}});

			
   			TweenLite.fromTo(portfolio.show(), 1, {opacity:0, force3D: "true", backfaceVisibility:"hidden"}, {opacity: 1, delay: .6, onStart: function() {
   				
   				container.hide();

   				resize();
   			}, onComplete: function() {
   				languette.hide();
   			}, ease: Expo.easeOut});
   			
   		});
   	
   		resize();
   		
		$(window).bind("resize", resize);
   }
   
   function slide() {
   	
   		TweenLite.to(bonjour, 0.8, {opacity: 0, x: '-200%', ease: Expo.easeIn});
		TweenLite.to(container, 0.8, {opacity: 1, x: '0%', delay: 0.4, ease: Expo.easeOut, onComplete: function() {
			bonjour.remove();
			initPlayPart();
		}});
		
		TweenLite.to(content, .3, {opacity: 0.8, delay: 0.2, y: 0, ease: Expo.easeOut, onComplete: function() {
			animateLogo();
		}});
		
   		
   }
  
   function initPlayPart () {
   	particlesJS('particule2', {
	  particles: {
	    color: '#494949',
	    shape: 'triangle', // "circle", "edge" or "triangle"
	    opacity: 1,
	    size: 2,
	    size_random: true,
	    nb: 150,
	    line_linked: {
	      enable_auto: true,
	      distance: 100,
	      color: '#000',
	      opacity: 1,
	      width: 1,
	      condensed_mode: {
	        enable: false,
	        rotateX: 600,
	        rotateY: 600
	      }
	    },
	    anim: {
	      enable: true,
	      speed: 1
	    }
	  },
	  interactivity: {
	    enable: true,
	    mouse: {
	      distance: 250
	    },
	    detect_on: 'canvas',
	    mode: 'grab',
	    line_linked: {
	      opacity: .5
	    },
	    events: {
	      onclick: {
	        enable: true,
	        mode: 'push',
	        nb: 4
	      }
	    }
	  },
	  retina_detect: true
	});
	
	TweenLite.to($("#particule2"), 2.4, {opacity: 1, ease: Expo.easeIn});
	
   }
   function render() {
   	
   		if(currentIndex==0) {
   			hidePrev();
	   		showNext();
   		}
   		else if(currentIndex+1==countItem) {
   			showPrev();
	   		hideNext();
   		}
   		else {
   			showPrev();
   			showNext();
   		}
   		
   }
   
   function showPrev() {
   		prev.show();
   }
   
   function showNext() {
   		next.show();
   }
   
   function hidePrev() {
   		prev.hide();
   }
   
   function hideNext() {
   		next.hide();
   }
   
   function animateLogo() {
   	
		TweenLite.to(cacheLogo.eq(current), 0.2, {opacity: 0, y: 0, ease: Expo.easeOut});
		
		if(current+1>=cacheLogo.size()-1) {
   			
   			TweenLite.fromTo($("h1"), .5, {opacity:0, y:20}, {opacity: 1, y: 0, delay: 0.3, ease: Expo.easeOut});
   			TweenLite.fromTo(projects, .5, {opacity:0, y:30}, {opacity: 1, y: 0, delay: 0.4, ease: Expo.easeOut, onStart: function() {
   				projects.show();
   			}});

   		}
	   		
   		TweenLite.fromTo(cacheLogo.eq(current+1), 0.2, {y: decalTop, opacity:0, force3D: "true", backfaceVisibility:"hidden"}, {opacity: 1, y: 0, ease: Expo.easeOut, delay: 0.1, onComplete: function() {
   			
   			current++;
   			
   			if(current<cacheLogo.size()-1) {
	   			animateLogo();
   			}
   			
   		}});
   			
   }
   
   function resize() {
   	
   	resizeElement({
		kind : "video", // picture or video
		el: $("#portfolio .item video")
	});
   	
   	TweenMax.set(bonjourtxt, {left: $(window).width()/2});
   	
   	
   }
   
});