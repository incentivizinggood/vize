

jQuery(function() {
    jQuery(window).scroll(function() {
        var scroll = jQuery(window).scrollTop() + 90;
        var currentArea = jQuery("section").filter(function() {
        	return scroll <= jQuery(this).offset().top + $(this).height();
        });
        jQuery(".nav a").removeClass("selected");
        jQuery(".nav a[href=\\#" + currentArea.attr("id") + "]").addClass("selected");

        if (jQuery(window).scrollTop() > 100) {
            jQuery('nav').addClass("navScroll");
            jQuery('img.logo').addClass("logoScroll");
            jQuery('div.menu').addClass("menuScroll");
        } else if (jQuery(window).scrollTop() < 100 ) {
            jQuery('nav').removeClass("navScroll");
            jQuery('img.logo').removeClass("logoScroll");
            jQuery('div.menu').removeClass("menuScroll");
        }
    });
});
