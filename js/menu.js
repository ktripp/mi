// JavaScript Document

$(document).ready(function() {
	 
	$(".top-navbar em").hide();
		
	
	var hover = true;
	
 	$(".top-navbar a").hover(function() {
		hover = true;
		$(this).next("em").animate({opacity: "show", top: "10"}, "slow");
	}, function() {
		setTimeout(function() {
			$(this).next("em").animate({opacity: "hide", top: "0"}, "slow");
		}, 1000);
	});
	
	$(".top-navbar a").mouseleave(function() {
		hover = false;
	});

	
/*	$(".top-navbar a").hover(function() {
		$(this).next("em").show("slow",);
	}, function() {
		$(this).next("em").hide("slow");
	});
*/
 
});