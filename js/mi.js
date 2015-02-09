$(document).ready(function() {
         
         
  /* Smooth scrolling to html anchors */
   $('a[href*=#]').bind('click', function(e) {
        var target = $(this).attr("href"); //Get the target

        // perform animated scrolling by getting top-position of target-element and set it as scroll target
        $('html, body').stop().animate({ scrollTop: $(target).offset().top }, 900, function() {
             location.hash = target;  //attach the hash (#jumptarget) to the pageurl
        });

        return false;
   });
  
  
  
  
  /* Floating menu */
  //config
$float_speed=1500; //milliseconds
$float_easing="easeInSine";
$menu_fade_speed=500; //milliseconds
$closed_menu_opacity=0.75;
 
//cache vars
$fl_menu=$("#fl_menu");
$fl_menu_menu=$("#fl_menu .menu");
$fl_menu_label=$("#fl_menu .label");
 
$(window).load(function() {
    menuPosition=$('#fl_menu').position().top;
    FloatMenu();
    $fl_menu.hover(
        function(){ //mouse over
            $fl_menu_label.fadeTo($menu_fade_speed, 1);
            $fl_menu_menu.fadeIn($menu_fade_speed);
        },
        function(){ //mouse out
            $fl_menu_label.fadeTo($menu_fade_speed, $closed_menu_opacity);
            $fl_menu_menu.fadeOut($menu_fade_speed);
        }
    );
});
 
$(window).scroll(function () {
    FloatMenu();
});
 
function FloatMenu(){
    var scrollAmount=$(document).scrollTop();
    var newPosition=menuPosition+scrollAmount;
    if($(window).height()<$fl_menu.height()+$fl_menu_menu.height()){
        $fl_menu.css("top",menuPosition);
    } else {
        $fl_menu.stop().animate({top: newPosition}, $float_speed, $float_easing);
    }
}



//RSS Reader
$(document).ready(function () {
    // blog.ctia.org/feed/rss/
    // www.fiercewireless.com/feed
    // www.techdirt.com/rss.php?edition=wireless
    // http://mix.chimpfeedr.com/035a6-miweb
  $('#news').rssfeed('http://mix.chimpfeedr.com/035a6-miweb',{
	limit:30,
	snippet:false,
	linktarget: '_blank',
	titletag: 'p'
    }, function(e) {
		$(e).find('div.rssBody').vTicker();
	});
});
  

});