$(document).ready(function () {
  $(".menu-bar .menu-icon").click(function () {
    $(".menu-bar").toggleClass("active");
    $(".menu-body").toggleClass("active");
  });

  // $(".tab-panel .panel ").click(function () {
  //   var target = $(this).data("tab");
  //   $(".tab-panel .panel ").removeClass("active");
  //   $(".tab-content .content ").removeClass("active");
  //   $(this).addClass("active");
  //   $("#" + target).addClass("active");
  // });
  var pageTitle = $(".menu-bar .page-title");
  var currentURL = window.location.href;
  console.log("currentURL :>> ", currentURL);
  if (currentURL.indexOf("story") != -1) {
    pageTitle.html("Story");
    $(".menu-body li").removeClass("active");
    $(".menu-body li.story").addClass("active");
  }
  if (currentURL.indexOf("contact") != -1) {
    pageTitle.html("Contact");
    pageTitle.addClass("eventNone ");

    $(".menu-body li").removeClass("active");
    $(".menu-body li.contact").addClass("active");
  }

  if (currentURL.indexOf("projects") != -1) {
    pageTitle.html("Projects");
    pageTitle.addClass("eventNone displayNone");
    $(".menu-body li").removeClass("active");
    $(".menu-body li.projects").addClass("active");

    // var hash = window.location.hash.replace("#", "");
    // $(".tab-panel .panel ").removeClass("active");
    // $(".tab-content .content ").removeClass("active");
    // $(".tab-panel ." + hash).addClass("active");
    // $("#" + hash).addClass("active");
  }
  if (currentURL.indexOf("projectdetail") != -1) {
    pageTitle.html("Project Detail");
    pageTitle.addClass("eventNone");

    $(".menu-body li").removeClass("active");
    $(".menu-body li.projects").addClass("active");
  }
  if (currentURL.indexOf("index") != -1) {
    pageTitle.html("Home");
    $(".menu-body li").removeClass("active");
    $(".menu-body li.home").addClass("active");
  }
  function loadingF() {
    setTimeout(function () {
      $(".loading").addClass("is-hide");
      $("html").removeClass("overflow-hidden");
      setTimeout(function () {
        $(".loading").hide();
        homeBanner.play();
        detailS1.play();
        story.play();
        contact.play();
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
    multiplier: 0.8,
    lerp: 0.1,
  });
  // new ResizeObserver(() => locoScroll.update()).observe(
  //   document.querySelector(".smooth-scroll")
  // );
  locoScroll.on("scroll", ScrollTrigger.update);
  locoScroll.on("scroll", (tc) => {
    var scrollTop = tc.delta.y;
    if (scrollTop > 50) {
      $(".menu-bar").addClass("isScroll");
    } else {
      $(".menu-bar").removeClass("isScroll");
    }
  });
  locoScroll.stop();
  setTimeout(function () {
    locoScroll.start();
  }, 1000);
  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".smooth-scroll", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".smooth-scroll").style.transform
      ? "transform"
      : "fixed",
  });
  new ResizeObserver(() => locoScroll.update()).observe(scrollContainer);
  locoScroll.scrollTo(0, 0);

  var s2_2 = gsap.timeline({
    paused: true,
  });

  s2_2.from(".footer  .anim", {
    duration: 0.5,
    alpha: 0,
    x: 40,
    stagger: 0.1,
    ease: "power1.out()",
  });
  s2_2.from(
    ".footer  .v-line",
    {
      duration: 0.5,
      height: 0,
      ease: "power1.out()",
    },
    "-=.6"
  );

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".footer",
      scroller: ".smooth-scroll",
      //- scrub: true,
      //- pin: true,
      start: "0% 80%",
      end: "+=100%",
      onEnter: function () {
        s2_2.play();
      },
      onEnterBack: function () {},
    },
  });
};

var homeBanner = gsap.timeline({
  paused: true,
});
homeBanner
  .from(
    ".banner .bl-left  .img  ",
    {
      duration: 0.8,
      alpha: 0,
      scale: 0.5,

      ease: "back.out(1.5)",
    },
    "-=.2"
  )
  .from(
    " .banner .bl-right .anim",
    { duration: 0.8, alpha: 0, stagger: 0.2, x: 100, ease: "back.out(1.5)" },
    "-=.5"
  )
  .from(
    " .banner .bl-left .v-line ",
    { duration: 0.8, alpha: 0, ease: "power1.out()" },
    "-=.7"
  );

var detailS1 = gsap.timeline({
  paused: true,
});
detailS1
  .from(
    ".detail .s1  .anim  ",
    {
      duration: 0.8,
      alpha: 0,
      y: 40,
      stagger: 0.2,
      ease: "back.out(1.5)",
    },
    "-=.4"
  )

  .from(
    " .detail .s1 .v-line",
    { duration: 0.8, height: 0, ease: "power1.out()" },
    "-=.5"
  );

var story = gsap.timeline({
  paused: true,
});
story
  .from(
    ".story .b1  .anim  ",
    {
      duration: 0.8,
      alpha: 0,
      y: 40,
      stagger: 0.2,
      ease: "back.out(1.5)",
    },
    "-=.2"
  )
  .from(
    " .story .s2 .v-line",
    { duration: 0.8, height: 0, ease: "power1.out()" },
    "-=.5"
  );

var contact = gsap.timeline({
  paused: true,
});
contact
  .from(
    ".contact .b1  .item  ",
    {
      duration: 0.8,
      alpha: 0,
      y: 40,
      stagger: 0.2,
      ease: "back.out(1.5)",
    },
    "-=.2"
  )
  .from(
    " .contact .bl-right .img",
    { duration: 0.8, scale: 0.8, alpha: 0, ease: "back.out(2)" },
    "-=.5"
  )
  .from(
    " .contact .s2 .v-line",
    { duration: 0.8, height: 0, ease: "power1.out()" },
    "-=.5"
  );
