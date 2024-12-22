(function($) {
    "use strict";

    /* ----------------------------------------------------------- */
    /*  FUNCTION TO STOP LOCAL AND YOUTUBE VIDEOS IN SLIDESHOW
    /* ----------------------------------------------------------- */

    function stop_videos() {
        // Stop local video if it's playing
        var video = document.getElementById("video");
        if (video && video.paused !== true && video.ended !== true) {
            video.pause();
        }

        // Check if the YouTube iframe exists before trying to stop the video
        var youtubeVideo = $('.youtube-video')[0];
        if (youtubeVideo) {
            var contentWindow = youtubeVideo.contentWindow;
            if (contentWindow) {
                contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
        }
    }

    $(document).ready(function() {

        /* ----------------------------------------------------------- */
        /*  STOP VIDEOS
        /* ----------------------------------------------------------- */

        $('.slideshow nav span').on('click', function () {
            stop_videos();
        });

        /* ----------------------------------------------------------- */
        /*  FIX REVEALATOR ISSUE AFTER PAGE LOADED
        /* ----------------------------------------------------------- */

        $(".revealator-delay1").addClass('no-transform');

        /* ----------------------------------------------------------- */
        /*  PORTFOLIO GALLERY
        /* ----------------------------------------------------------- */

        // Initialize CBPGridGallery only once
        var gridGalleryInitialized = false;

        function initializeCBPGridGallery() {
            if ($('#grid-gallery').length && !gridGalleryInitialized) {
                try {
                    new CBPGridGallery(document.getElementById('grid-gallery'));
                    gridGalleryInitialized = true;  // Mark as initialized
                } catch (e) {
                    console.error('Error initializing CBPGridGallery:', e);
                }
            }
        }

        initializeCBPGridGallery(); // Call once on page load

        /* ----------------------------------------------------------- */
        /*  BUTTONS ANIMATION
        /* ----------------------------------------------------------- */
        function checkSize() {
            if ($( document ).width() > 992) {
                var btn_hover = "";
                $(".btn").each(function() {
                    var btn_text = $(this).text();
                    $(this).addClass(btn_hover).empty().append("<span data-hover='" + btn_text + "'>" + btn_text + "</span>");
                });
            }
        }
        checkSize();
        window.addEventListener('resize', function () {
            checkSize();
        });

        /* ----------------------------------------------------------- */
        /*  HIDE HEADER WHEN PORTFOLIO SLIDESHOW OPENED
        /* ----------------------------------------------------------- */

        $(".grid figure").on('click', function() {
            // Reset current class for all gallery items
            $(".grid figure").removeClass('current');

            // Add current class to clicked item
            $(this).addClass('current');
            
            // Hide the header when slideshow opens
            $("#navbar-collapse-toggle").addClass('hide-header');
            $(".slideshow").fadeIn();  // Show the slideshow popup

            // Initialize the CBPGridGallery if it's not initialized yet
            initializeCBPGridGallery();
        });

        /* ----------------------------------------------------------- */
        /*  SHOW HEADER WHEN PORTFOLIO SLIDESHOW CLOSED
        /* ----------------------------------------------------------- */

        $(".nav-close").on('click', function() {
            $("#navbar-collapse-toggle").removeClass('hide-header');
            $(".slideshow").fadeOut(); // Fade out the slideshow container

            // Ensure the grid is reset (remove the current class)
            $(".grid figure").removeClass('current');
        });

        $(".nav-prev").on('click', function() {
            if ($('.slideshow ul li:first-child').hasClass('current')) {
                $("#navbar-collapse-toggle").removeClass('hide-header');
            }
        });

        $(".nav-next").on('click', function() {
            if ($('.slideshow ul li:last-child').hasClass('current')) {
                $("#navbar-collapse-toggle").removeClass('hide-header');
            }
        });

        /* ----------------------------------------------------------- */
        /*  PORTFOLIO DIRECTION AWARE HOVER EFFECT
        /* ----------------------------------------------------------- */

        var item = $(".grid li figure");
        var elementsLength = item.length;
        for (var i = 0; i < elementsLength; i++) {
            $(item[i]).hoverdir();
        }

        /* ----------------------------------------------------------- */
        /*  AJAX CONTACT FORM
        /* ----------------------------------------------------------- */

        $(".contactform").on("submit", function() {
            $(".output_message").text("Message Sent!");

            var form = $(this);
            $.ajax({
                url: "https://getform.io/f/9b5abe9f-977e-4fb2-878c-39c466d36361",
                method: "POST",
                data: form.serialize(),
                success: function(result) {

                    $(".form-inputs").css("display", "none");
                    $(".box p").css("display", "none");
                    $(".contactform").find(".output_message").addClass("success");
                    $(".output_message").text("Message Sent!");

                }
            });

            return false;
        });

    });

    $(document).keyup(function(e) {

        /* ----------------------------------------------------------- */
        /*  KEYBOARD NAVIGATION IN PORTFOLIO SLIDESHOW
        /* ----------------------------------------------------------- */
        if (e.keyCode === 27) {
            stop_videos();
            $('.close-content').click();
            $("#navbar-collapse-toggle").removeClass('hide-header');
            $(".slideshow").fadeOut(); // Close the slideshow when Escape key is pressed
        }
        if ((e.keyCode === 37) || (e.keyCode === 39)) {
            stop_videos();
        }
    });

})(jQuery);