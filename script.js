var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


function mouseMoveFunction() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (dets) {
        this.clearTimeout(timeout);
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;

        xscale = gsap.utils.clamp(.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(.8, 1.2, ydiff);

        xprev = dets.clientX;
        yprev = dets.clientY;

        mouseEffect(xscale, yscale);

        timeout = this.setTimeout(function () {
            document.querySelector(".cursor").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
        }, 100);
    });
}

mouseMoveFunction()

function mouseEffect(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector(".cursor").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

mouseEffect()


function firstPageAnimation() {
    var tl = gsap.timeline();

    tl.from("nav", {
        y: "-10",
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })

        .to(".bounding-elem", {
            y: 0,
            // opacity:0,
            duration: 1.5,
            ease: Expo.easeInOut,
            stagger: .5
        })
        .from(".hero-bottom", {
            y: "10",
            opacity: 0,
            duration: .7,
            ease: Expo.easeInOut
        })
}

firstPageAnimation()

document.querySelectorAll(".elem").forEach(function (elem) {

    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mousemove", function (details) {
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffrot = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot)
        });

    });

    elem.addEventListener("mouseleave", function (details) {

        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
        });
    });

});