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


    /* Expandable-Collapsable sections */
    $(".expandable_sub").hide();

    $(".expandable_header").click(
        function () {
            var section = $(this).siblings(".expandable_sub");
            section.toggle();
            if (!section.is(":visible")) {
                $(this).removeClass('collapsable_header');
                $(this).addClass("expandable_header");
            } else {
                $(this).addClass('collapsable_header');
                $(this).removeClass("expandable_header");
            }
        }
    );


    //RSS Reader
    // $(document).ready(function () {
    //     // blog.ctia.org/feed/rss/
    //     // www.fiercewireless.com/feed
    //     // www.techdirt.com/rss.php?edition=wireless
    //     // http://mix.chimpfeedr.com/035a6-miweb
    //   $('#news').rssfeed('http://mix.chimpfeedr.com/035a6-miweb',{
    // 	limit:30,
    // 	snippet:false,
    // 	linktarget: '_blank',
    // 	titletag: 'p'
    //     }, function(e) {
    // 		$(e).find('div.rssBody').vTicker();
    // 	});
    // }); 

});