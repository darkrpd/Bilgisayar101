$( document ).ready(function() {
    "use strict";
    
    var minYear = $('#decadeNav .years a:first').text();
    var maxYear = $('#decadeNav .years a:last').text();

	$.scrollUp({
		scrollImg: true,
		scrollDistance: 500,
		scrollSpeed: 700,
		animationSpeed: 500
	});

    // Side Menu
	$('#simple-menu').sidr();
   
	$("#header").headroom({
		offset: 70
	});
	


    // Credits 
    $('#showcredites, #credits-title').click(function() {
		$("#credits").fadeToggle("slow"); 
        var _elemOffset = $("#credits").offset().top;
   		$('html,body').animate({scrollTop : _elemOffset}, "slow");

	});



    // Timeline Years Slider Navigation
	var navByYear = slidr.create("decadeNav", {
		after: function(e) {			
			var in_id = e.in.el.id;
			$('.decade-nav li').removeClass("active");

			var current_decade = $(".decade-nav li[data-id='"+in_id+"']");
			current_decade.addClass("active");		   
		},  
		controls: false,
		breadcrumbs: false,
		overflow: true,
		timing: { 'cube': '0.8s ease-in' },
		transition: 'cube'
	});

	// highlight initial decades
    //navByYear.start("1940s");
	//$(".decade-nav li[data-id='1940s']").addClass("active");

	// 
	$('.decade-nav li').click(function() {
		var id = $(this).attr("data-id"); 
		navByYear.slide(id);
	});

	// Prev & Next Navigation
	$('.nav-circlepop a').click(function() {
		var id = $(this).attr("data-link"); 
		navByYear.slide(id);
		return false;
	});  



	
	
	// highlight current year
    // currentYear should be set based on the path of URL. Ex /1997/, /1946/
    // Parse window.location.pathname to get currentYear
	var pathname = window.location.pathname.split( '/' ); 
	var currentYear = parseInt(pathname[2]);
	if(isNaN(currentYear)) {
		currentYear = minYear;
    } else if (currentYear > maxYear) {
		currentYear = maxYear;
    } else if (currentYear < minYear) {
		currentYear = minYear;
    } else {
		currentYear = pathname[2];
    }
		
	//console.log(currentYear);
    //console.log("Entry ID " + pathname[3]);
    
    
	
    $('.years').each(function() {
    	var thisYear = $(this).children().html();

    	// square dot to indicate current entry location
    	var currentHTML = "<div class='current'></div>";

    	if (thisYear === currentYear) {
        	$(this).addClass("currentyear");

            var parentID = $(this).parent().attr("id");
            var decadeNav = $(".decade-nav li[data-id='" + parentID + "']");
			if($('#chm-timeline-content').hasClass('homepage')) {
				navByYear.auto(9000).start(parentID);
				//navByYear.start(parentID);
			} else {
				navByYear.start(parentID);
			}
			decadeNav.addClass("active");
        	decadeNav.append(currentHTML);

		}
		// de-emphasize years that doesn't have content
		else if (thisYear === undefined) {
            $(this).addClass("emptyYear");

		}
        
        $(this).click(function() {
            if($(this).find("a").length === 1){
                window.location = $(this).find("a").attr("href"); 
                return false;
            }
        });        

	});
	
    var currentCategory = pathname[2] || "undefined";
	$('#byCategory .category').each(function(){
		if($(this).attr('id') === currentCategory){
			$(this).addClass('current');
        }
	});
							


	// Timeline byYear/byCategory Slider Navigation
	var mainNav = $("#chm-timeline-content");
	
	if(mainNav.hasClass("slidr")){
		var navBy = slidr.create(mainNav.attr('id'), {
			after: function(e) {			
				var in_id = e.in.el.id;
				$('.navBy span.slidr').removeClass("active");
	
				var current = $(".navBy span.slidr[data-id='"+in_id+"']");
				current.addClass("active");		   
			},  
			breadcrumbs: 'none',
			controls: false,
			overflow: false,
			timing: { 'cube': '0.8s ease-in' },
			transition: 'cube'
		}).start();
		
		$('.navBy span.slidr').click(function() {
			var id = $(this).attr("data-id"); 
			navBy.slide(id);
		});
	}
	

		
	// For Homepage and Landing layouts, when selected year is undefined	
	if($("#navByYear").hasClass('no-year-selected')) {
		$(".decade-nav").find('.current').removeClass('current');
		$("#decadeNav").find('.currentyear').removeClass('currentyear');
	}
	
		
	$('.chm-timeline-year-entry').each(function() {
		var _media = $(this).find('.media');
		if(_media.length === 0){
			$(this).find('.pure-u-7-12').removeClass('pure-u-7-12').addClass('pure-u-1-1');
        }
	});


	$('.noentries').each(function() {
    	$(this).parent('.years').addClass('emptyYear').css('cursor', 'default');
	});


	// turn timeline into fixed navigation
	/*
	var mainNav = $('.chm-main-nav');
	if(mainNav.length > 0) {
		
		mainNav.each (function(){
			var _offset = $(this).offset();
			$(window).bind('scroll', function() {
				if ($(window).scrollTop() > _offset.top) {
					$(this).addClass('fixed');
				}
				else {
					$(this).removeClass('fixed');
				}
			});    
	   });
		
	}
	
	var navpos = $('#navMain').offset();
	if (navpos){
		//console.log(navpos.top);
		$(window).bind('scroll', function() {
			if ($(window).scrollTop() > navpos.top) {
				$('#navMain').addClass('fixed');
			}
			else {
				$('#navMain').removeClass('fixed');
			}
		});    
		
	}
	*/
	
	

	/*
	$('.fancybox').fancybox();
	*/



	$(window).load(function() {
		
		//Homepage Featured Elements
		$('.chm-preview-content').each(function(){
			$(this).masonry({
				itemSelector: '.chm-preview'
			});	
		});

		
		
		//Homepage Featured Elements
		$('.chm-category-timeline-sections').each(function(){
			
			var $grid = $(this).masonry({
				itemSelector: '.chm-category-timeline-section'
			});	
            
            // bind event listener
            $grid.on('layoutComplete', onLayout($(this)));
		});
							
		
		$('#chm-timeline-year-entries .divider:last hr.content-divider').remove();

		// left sidr nav menu elements
		var localpath = "/timeline/";
		$('#chm-timeline-exhibits li a[href$="' + localpath + '"]').addClass('active');
		
	});
    
    
    function onLayout(element){
        
		var yearOffset = [];
		var allYears = [];
		var minOffsetDifference = 126;
			
		element.find('.chm-category-timeline-section').each(function(){

    		var position = $(this).position();
	    	
            if(position.left === 0) {
				$(this).addClass('left');
			} else {
				$(this).addClass('right');
			}
				
			$(this).find('.chm-category-timeline-record').last().addClass('no-bottom-border no-margin-bottom');
			
			var _year = $(this).find('.chm-category-timeline-section-year');
            _year.fadeIn("slow");
		    var _offset = _year.offset();
			yearOffset.push(_offset.top);
			allYears.push(_year);
		});

			
		for(var index in yearOffset){
			var difference = (index === 0) ? minOffsetDifference : (yearOffset[index] - yearOffset[index-1]);
				
			if(difference < minOffsetDifference){
    			var cssOffset =  parseInt(allYears[index].css('top'), 10);
				var top = (minOffsetDifference - difference) + cssOffset;
				allYears[index].css('top', top + 'px');
			}
		} 
    }
	

});
       

