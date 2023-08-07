$(document).ready(function () {
    $(".menu-bar .menu-icon").click(function () {
        $(".menu-bar").toggleClass("active");
        $(".menu-body").toggleClass("active");
    });

    $(".tab-panel .panel ").click(function () {
        var target = $(this).data("tab");
        $(".tab-panel .panel ").removeClass("active");
        $(".tab-content .content ").removeClass("active");
        $(this).addClass("active");
        $("#" + target).addClass("active");
    });

    zoomImg();
    function zoomImg() {
        let zoom = $(".zoom");
        let zoomImg = $(".zoomImg");
        zoom.mousemove(function (e) {
            zoomImg.css({ opacity: "1" });
            let offset = zoom.offset();
            var x = e.pageX - offset.left;
            var y = e.pageY - offset.top;
            var x_percent = (x / zoom.width()) * 100;
            var y_percent = (y / zoom.height()) * 100;
            zoomImg.css("--zoom-x", x_percent + "%");
            zoomImg.css("--zoom-y", y_percent + "%");
        });
        zoom.mouseout(function (e) {
            zoomImg.css({ opacity: "0" });
        });
    }

    function loadingF() {
        setTimeout(function () {
            $(".loading").addClass("is-hide");
            setTimeout(function () {
                $(".loading").hide();
            }, 500);
        }, 1500);
    }
    loadingF();
});

$(window).on("load", function () {
    initialScroll();
});
var initialScroll = function () {
    gsap.registerPlugin(ScrollTrigger);
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    let scrollContainer = document.querySelector(".smooth-scroll");

    const locoScroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        multiplier: 0.6,
        lerp: 0.1,
    });

    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    locoScroll.on("scroll", (tc) => {
        var scrollTop = tc.delta.y;
        if (scrollTop > 50) {
            $(".menu-bar").addClass("isScroll");
        } else {
            $(".menu-bar").removeClass("isScroll");
        }
    });

    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".smooth-scroll", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed",
    });
    new ResizeObserver(() => locoScroll.update()).observe(scrollContainer);
    locoScroll.scrollTo(0, 0);
};
