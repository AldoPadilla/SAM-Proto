jQuery(function($){

var HEYLONE = window.HEYLONE || {};

/* ==================================================
	Contact Form Validations
================================================== */
	HEYLONE.ContactForm = function(){
		$('.contact-form').each(function(){
			var formInstance = $(this);
			formInstance.submit(function(){
		
			var action = $(this).attr('action');
		
			$("#message").slideUp(750,function() {
			$('#message').hide();
		
			$('#submit')
				.after('<img src="images/assets/ajax-loader.gif" class="loader" />')
				.attr('disabled','disabled');
		
			$.post(action, {
				name: $('#name').val(),
				email: $('#email').val(),
				phone: $('#phone').val(),
				comments: $('#comments').val()
			},
				function(data){
					document.getElementById('message').innerHTML = data;
					$('#message').slideDown('slow');
					$('.contact-form img.loader').fadeOut('slow',function(){$(this).remove()});
					$('#submit').removeAttr('disabled');
					if(data.match('success') != null) $('.contact-form').slideUp('slow');
		
				}
			);
			});
			return false;
		});
		});
	}

/* ==================================================
	Responsive Nav Menu
================================================== */
	HEYLONE.navMenu = function() {
		// Responsive Menu Events
		$(".menu-toggle").click(function(){
			$(".navigation").slideToggle();
			return false;
		});
		if(!Modernizr.touch) {
			function menuScroll() {
			var lastScroll = 0;
			$(window).scroll(function(event){
				//Sets the current scroll position
				var st = $(this).scrollTop();
				//Determines up-or-down scrolling
				if (st > lastScroll){
				   //Replace this with your function call for downward-scrolling
				   $(".navigation").slideUp();
				}
				else {
					$(".inside .navigation").slideDown();
				}
				//Updates scroll position
				lastScroll = st;
			});
			}
			if( $(window).width() > 992 ) {
				menuScroll();
			}
		}
	}
/* ==================================================
	Scroll to Top
================================================== */
	HEYLONE.scrollToTop = function(){
		var windowWidth = $(window).width(),
			didScroll = false;
	
		var $arrow = $('#back-to-top');
	
		$arrow.click(function(e) {
			$('html').animate({ scrollTop: "0" }, 750, 'easeOutExpo' );
			e.preventDefault();
		})
	
		$(window).scroll(function() {
			didScroll = true;
		});
	
		setInterval(function() {
			if( didScroll ) {
				didScroll = false;
	
				if( $(window).scrollTop() > 800 ) {
					$arrow.fadeIn();
				} else {
					$arrow.fadeOut();
				}
			}
		}, 250);
	}
/* ==================================================
   Accordion
================================================== */
	HEYLONE.accordion = function(){
		var accordion_trigger = $('.accordion-heading.accordionize');
		
		accordion_trigger.delegate('.accordion-toggle','click', function(event){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$(this).addClass('inactive');
			}
			else{
				accordion_trigger.find('.active').addClass('inactive');          
				accordion_trigger.find('.active').removeClass('active');   
				$(this).removeClass('inactive');
				$(this).addClass('active');
			}
			event.preventDefault();
		});
	}
/* ==================================================
   Toggle
================================================== */
	HEYLONE.toggle = function(){
		var accordion_trigger_toggle = $('.accordion-heading.togglize');
		
		accordion_trigger_toggle.delegate('.accordion-toggle','click', function(event){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$(this).addClass('inactive');
			}
			else{
				$(this).removeClass('inactive');
				$(this).addClass('active');
			}
			event.preventDefault();
		});
	}
/* ==================================================
   Tooltip
================================================== */
	HEYLONE.toolTip = function(){ 
		$('a[data-toggle=tooltip]').tooltip();
	}
/* ==================================================
   Pricing Tables
================================================== */
	var $tallestCol;
	HEYLONE.pricingTable = function(){
		$('.pricing-table').each(function(){
			$tallestCol = 0;
			$(this).find('> div .features').each(function(){
				($(this).height() > $tallestCol) ? $tallestCol = $(this).height() : $tallestCol = $tallestCol;
			});	
			if($tallestCol == 0) $tallestCol = 'auto';
			$(this).find('> div .features').css('height',$tallestCol);
		});
	}

/* ==================================================
   Project Expander
================================================== */		
	HEYLONE.Projects = function() {
		// slide down function
		//****************************************
		var container = $('#projects');
			elements = container.children();
			startingWrapPos = 0;
			
			function calculateLIsInRow() {
				lisInRow = 0;
				$('#projects li').each(function() {
					if($(this).prev().length > 0) {
						if($(this).position().top != $(this).prev().position().top) return false;
						lisInRow++;
					}
					else {
						lisInRow++;   
					}
				});
				
				lisInLastRow = $('#projects li').length % lisInRow;
				if(lisInLastRow == 0) lisInLastRow = lisInRow;
				    $('.result').html('No: of lis in a row = ' + lisInRow + '<br>' + 'No: of lis in last row = ' + lisInLastRow  );
			}
			calculateLIsInRow();
			$(window).resize(calculateLIsInRow);
			
			
			$('.portfolio-item').click(function(){
		    var elementsIndex 	= $(this).index('.portfolio-item'); //elements current index
		    	elementsLength 	= elements.length; // total amount of elements
				elementsInRow 	= lisInRow; //amount of elements in a row
				elementsRow 	= Math.floor(elementsIndex/elementsInRow)+1;
				elementsOffset 	= $(this).offset().top + 180; //top position of element clicked (130 was added so only the title of thumbal shows not including the image)
				contentURL 		= $(this).attr("data-url"); //get data content id
				currentWrapPos 	= (elementsRow * elementsInRow) - 1; //slidedown content wrapper position
				arrowPosition 	= $(this).position().left + $(this).width() / 2 - 12; 
				currentIndexHeight = $('.portfolio-item-content').height();
		
		
		    //add remove selected class
		    elements.removeClass('activeItem');
		    $(this).addClass('activeItem');
		    
		    //slidedown content wrapper
		    if(currentWrapPos == startingWrapPos){
		        $('.portfolio-item-arrow').animate({"left": arrowPosition+'px'}, 300);
		    }else{
		        startingWrapPos = currentWrapPos;
		        elements.removeClass('lastInRow');
		        $(elements[currentWrapPos]).addClass('lastInRow');
		        $('.portfolio-item-wrap').slideUp( function() { $(this).remove(); });
		        $('.lastInRow').after('<div class="portfolio-item-wrap clearfix"><span class="portfolio-item-arrow" style="left:'+arrowPosition+'px"><i class="fa fa-caret-down"></i></span><span class="portfolio-item-close"><i class="fa fa-times"></i></span><span class="portfolio-item-next"><i class="fa fa-angle-right"></i></span><span class="portfolio-item-prev"><i class="fa fa-angle-left"></i></span><div class="portfolio-item-content"><img src="images/AjaxLoader.gif" class="Loader"></div></div>');
		        $('.portfolio-item-wrap').slideDown();
		    }
	
		   //console.log(startingWrapPos, currentWrapPos);
		    
		    //empty featContent and then append correct content based off data attribute
		    $('.portfolio-item-content').empty();
			$(".portfolio-item-content").load(contentURL).show();
			$("Loader").hide();
		    
		    //slide element to top of window
		    if(elementsIndex < $('.activeFeat').index()){
		    	$('html').animate({ scrollTop: elementsOffset - currentIndexHeight }, { duration: 'slow', queue: false });
		    }else{
		    	$('html').animate({ scrollTop: elementsOffset }, { duration: 'slow', queue: false });
		    }
		
		    //reposition arrows depending window width
		    repositionArrows();
	
		    //close button function
		    $('.portfolio-item-close').off('click').on('click', function(){
		    	$('.portfolio-item-wrap').slideUp();
		    	elements.removeClass('activeItem');
		    });
		    
		    //next button function
		    $('.portfolio-item-next').off('click').on('click', function(){
				var $next = elements.eq(elementsIndex + 1);
				if(elementsIndex === elementsLength - 1){
					elements.first().click()	
				}else{
					$next.click();
				}
			});
			
			//previous button function
			$('.portfolio-item-prev').off('click').on('click', function(e){
				var $prev = elements.eq(elementsIndex - 1);
				if(elementsIndex === 0){
					elements.last().click()	
				}else{
					$prev.click();
				}
			});
			
		}).click(function(){
			$('.portfolio-item-wrap').slideDown();
		});
		function repositionArrows(){
			var winWidth = $(window).width(),
				slidesWidth = 1440,
				contentWidth = 1024,
				arrowPosition = Math.round((slidesWidth - winWidth)/2)
				
			if(winWidth >= slidesWidth){
				$('.portfolio-item-prev').css({"left":"0px"});
				$('.portfolio-item-next').css({"right":"0px"});
			}else if(winWidth <= contentWidth){
				$('.portfolio-item-prev').css({"left":"0"});
				$('.portfolio-item-next').css({"right":"0"});
			}else{
				$('.portfolio-item-prev').css({"left":0});
				$('.portfolio-item-next').css({"right":0});
			}
		}
		$(window).resize(function(){
			repositionArrows();
		});
	}
/* ==================================================
   Twitter Widget
================================================== */
	HEYLONE.TwitterWidget = function() {
		$('.twitter-widget').each(function(){
			var twitterInstance = $(this); 
			twitterTweets = twitterInstance.attr("data-tweets-count") ? twitterInstance.attr("data-tweets-count") : "1"
			twitterInstance.twittie({
            	dateFormat: '%b. %d, %Y',
            	template: '<li>{{tweet}} <span class="date">{{date}}</span></li>',
            	count: twitterTweets,
            	hideReplies: true
        	});
		});
	}
/* ==================================================
   Owl Carousel
================================================== */
	HEYLONE.OwlCarousel = function() {
		$('.adv-carousel').each(function(){
				var carouselInstance = $(this); 
				carouselColumns = carouselInstance.attr("data-columns") ? carouselInstance.attr("data-columns") : "1",
				carouselitemsDesktop = carouselInstance.attr("data-items-desktop") ? carouselInstance.attr("data-items-desktop") : "4",
				carouselitemsDesktopSmall = carouselInstance.attr("data-items-desktop-small") ? carouselInstance.attr("data-items-desktop-small") : "3",
				carouselitemsTablet = carouselInstance.attr("data-items-tablet") ? carouselInstance.attr("data-items-tablet") : "2",
				carouselitemsMobile = carouselInstance.attr("data-items-mobile") ? carouselInstance.attr("data-items-mobile") : "1",
				carouselAutoplay = carouselInstance.attr("data-autoplay") == 'yes' ? true : false,
				carouselPagination = carouselInstance.attr("data-pagination") == 'yes' ? true : false,
				carouselArrows = carouselInstance.attr("data-arrows") == 'yes' ? true : false,
				carouselSingle = carouselInstance.attr("data-single-item") == 'yes' ? true : false
				carouselStyle = carouselInstance.attr("data-style") ? carouselInstance.attr("data-style") : "fade",
				
				carouselInstance.owlCarousel({
					items: carouselColumns,
					autoPlay : carouselAutoplay,
					navigation : carouselArrows,
					pagination : carouselPagination,
					itemsDesktop:[1199,carouselitemsDesktop],
					itemsDesktopSmall:[979,carouselitemsDesktopSmall],
					itemsTablet:[768,carouselitemsTablet],
					itemsMobile:[479,carouselitemsMobile],
					singleItem:carouselSingle,
					navigationText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
					stopOnHover: true,
					lazyLoad: true,
					transitionStyle: carouselStyle
				});
		});
	}
/* ==================================================
   PrettyPhoto
================================================== */
	HEYLONE.PrettyPhoto = function() {
		$("a[data-rel^='prettyPhoto']").prettyPhoto({
			  opacity: 0.5,
			  social_tools: "",
			  deeplinking: false
		});
	}
/* ==================================================
   Animated Counters
================================================== */
	HEYLONE.Counters = function() {
		$('.counters').each(function () {
			$(".timer .count").appear(function() {
			var counter = $(this).html();
			$(this).countTo({
				from: 0,
				to: counter,
				speed: 2000,
				refreshInterval: 60,
				});
			});
		});
	}
/* ==================================================
   Animated Counters
================================================== */	
	HEYLONE.WordRotate = function() {
	$(".word-rotate").each(function() {
	  var $this = $(this),
		  itemsWrapper = $(this).find(".word-rotate-items"),
		  items = itemsWrapper.find("> span"),
		  firstItem = items.eq(0),
		  firstItemClone = firstItem.clone(),
		  maxWidth = 0,
		  itemHeight = 0,
		  currentItem = 1,
		  currentTop = 0;
  
	  items.each(function() {
		  if($(this).width() > maxWidth) {
			  maxWidth = $(this).width();
		  }
	  });
  
	  itemHeight = firstItem.height();
  
	  itemsWrapper.append(firstItemClone);
  
	  $this
		  .width(maxWidth)
		  .height(itemHeight)
		  .addClass("active");
  
	  setInterval(function() {
  
		  currentTop = (currentItem * itemHeight);
  
		  itemsWrapper.animate({
			  top: -(currentTop) + "px"
		  }, 300, "easeOutQuad", function() {
  
			  currentItem++;
  
			  if(currentItem > items.length) {
  
				  itemsWrapper.css("top", 0);
				  currentItem = 1;
  
			  }
  
		  });
  
	  }, 2000);
  
  });
}
/* ==================================================
   Init Functions
================================================== */
$(document).ready(function(){
	HEYLONE.ContactForm();
	HEYLONE.scrollToTop();
	HEYLONE.accordion();
	HEYLONE.toggle();
	HEYLONE.toolTip();
	HEYLONE.pricingTable();
	HEYLONE.navMenu();
	HEYLONE.TwitterWidget();
	HEYLONE.OwlCarousel();
	HEYLONE.PrettyPhoto();
	HEYLONE.Counters();
	HEYLONE.Projects();
	HEYLONE.WordRotate();

	// FITVIDS
	$(".container").fitVids();
	/* Video Player */
	$(".player").mb_YTPlayer();
	/* Hero Slider */
	$(".hero-slider").flexslider({
		animation: "fade",              //String: Select your animation type, "fade" or "slide"
		easing: "swing",               //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
		direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
		slideshow: true,                //Boolean: Animate slider automatically
		slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
		animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
		initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
		randomize: false,               //Boolean: Randomize slide order
		pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
		controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
		directionNav: false,             //Boolean: Create navigation for previous/next navigation? (true/false)
	});
	

});

// Animation Appear
$("[data-appear-animation]").each(function() {

	var $this = $(this);
  
	$this.addClass("appear-animation");
  
	if(!$("html").hasClass("no-csstransitions") && $(window).width() > 767) {
  
		$this.appear(function() {
  
			var delay = ($this.attr("data-appear-animation-delay") ? $this.attr("data-appear-animation-delay") : 1);
  
			if(delay > 1) $this.css("animation-delay", delay + "ms");
			$this.addClass($this.attr("data-appear-animation"));
  
			setTimeout(function() {
				$this.addClass("appear-animation-visible");
			}, delay);
  
		}, {accX: 0, accY: -150});
  
	} else {
  
		$this.addClass("appear-animation-visible");
	}
});
// Animation Progress Bars
$("[data-appear-progress-animation]").each(function() {

	var $this = $(this);

	$this.appear(function() {

		var delay = ($this.attr("data-appear-animation-delay") ? $this.attr("data-appear-animation-delay") : 1);

		if(delay > 1) $this.css("animation-delay", delay + "ms");
		$this.addClass($this.attr("data-appear-animation"));

		setTimeout(function() {

			$this.animate({
				width: $this.attr("data-appear-progress-animation")
			}, 1500, "easeOutQuad", function() {
				$this.find(".progress-bar-tooltip").animate({
					opacity: 1
				}, 500, "easeOutQuad");
			});

		}, delay);

	}, {accX: 0, accY: -50});

});

//Parallax	
if(!Modernizr.touch) {
	$(window).bind('load', function () {
		parallaxInit();						  
	});
	( function( $ ) {
    // Init Skrollr
    var s = skrollr.init({
        render: function(data) {
        }
    });
	} )( jQuery );
}

	function parallaxInit() {
		$('.parallax1').parallax("50%", 0.1);
		$('.parallax2').parallax("50%", 0.1);
		$('.parallax3').parallax("50%", 0.1);
		$('.parallax4').parallax("50%", 0.1);
		$('.parallax5').parallax("50%", 0.1);
		$('.parallax6').parallax("50%", 0.1);
		$('.parallax7').parallax("50%", 0.1);
		$('.parallax8').parallax("50%", 0.1);
		/*add as necessary*/
	}


/* List Styles */
$('ul.checks li').prepend('<i class="fa fa-check"></i> ');
$('ul.angles li').prepend('<i class="fa fa-angle-right"></i> ');
$('ul.inline li').prepend('<i class="fa fa-check-circle-o"></i> ');
$('ul.chevrons li').prepend('<i class="fa fa-chevron-right"></i> ');
$('ul.carets li').prepend('<i class="fa fa-caret-right"></i> ');
$('a.external').prepend('<i class="fa fa-external-link"></i> ');



/* Window Height/Width Getter Class */
	wheighter = $(window).height();
	wwidth = $(window).width();
	$(".wheighter").css("height",wheighter);
	$(".wwidth").css("width",wwidth);
	$(window).resize(function(){
		wheighter = $(window).height();
		wwidth = $(window).width();
		$(".wheighter").css("height",wheighter);
		$(".wwidth").css("width",wwidth);
	});

	//LOCAL SCROLL
	jQuery('.menu, .call-to-action').localScroll({
		offset: 0
	});
	
	var sections = jQuery('section');
		var navigation_links = jQuery('.menu a');
		sections.waypoint({
		handler: function(direction) {
			var active_section;
			active_section = jQuery(this);
			if (direction === "up") active_section = active_section.prev();
			var active_link = jQuery('.menu a[href="#' + active_section.attr("id") + '"]');
			navigation_links.removeClass("current");
			active_link.addClass("current");
		},
		offset: '10%'
		});
		
		
	/* Testimonials Slider */
	 var sync1 = $("#sync1");
    var sync2 = $("#sync2");
     
    sync1.owlCarousel({
    singleItem : true,
	autoPlay: true,
    slideSpeed : 1000,
    navigation: false,
    pagination:false,
    afterAction : syncPosition,
    responsiveRefreshRate : 200,
    });
     
    sync2.owlCarousel({
    items : 4,
	autoPlay: true,
    itemsDesktop : [1199,10],
    itemsDesktopSmall : [979,4],
    itemsTablet : [768,4],
    itemsMobile : [479,2],
    pagination:false,
    responsiveRefreshRate : 100,
    afterInit : function(el){
    el.find(".owl-item").eq(0).addClass("synced");
    }
    });
     
    function syncPosition(el){
    var current = this.currentItem;
    $("#sync2")
    .find(".owl-item")
    .removeClass("synced")
    .eq(current)
    .addClass("synced")
    if($("#sync2").data("owlCarousel") !== undefined){
    center(current)
    }
    }
     
    $("#sync2").on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).data("owlItem");
    sync1.trigger("owl.goTo",number);
    });
     
    function center(number){
    var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
    var num = number;
    var found = false;
    for(var i in sync2visible){
    if(num === sync2visible[i]){
    var found = true;
    }
    }
     
    if(found===false){
    if(num>sync2visible[sync2visible.length-1]){
    sync2.trigger("owl.goTo", num - sync2visible.length+2)
    }else{
    if(num - 1 === -1){
    num = 0;
    }
    sync2.trigger("owl.goTo", num);
    }
    } else if(num === sync2visible[sync2visible.length-1]){
    sync2.trigger("owl.goTo", sync2visible[1])
    } else if(num === sync2visible[0]){
    sync2.trigger("owl.goTo", num-1)
    }
    }
});