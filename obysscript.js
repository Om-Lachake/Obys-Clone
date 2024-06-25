function locomotiveanimation(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
function loadingAnimation() {
    var t1 = gsap.timeline();
    t1.from(".line h1", {
        y: 100,
        stagger: 0.3,
        duration: 0.6,
        delay: 0.5
    })
    t1.from("#line1-part1 ", {
        opacity: 0,
        onStart: function() {
            var h5timer = document.querySelector("#line1-part1 h5");
            var grow = 0;
            var newtimer = setInterval(function() {
                if (grow < 100) {
                    h5timer.innerHTML = grow++;
                } else {
                    h5timer.innerHTML = grow;
                    clearInterval(newtimer);
                }
            }, 40);
        }
    })
    t1.to(".line span", {
        animationName: "anime",
        opacity: 1
    })
    t1.to("#loader", {
        opacity: 0,
        duration: 0.2,
        delay: 4,
        display: "none" 
    })
    t1.from("#page1", {
        delay: 0.2,
        y: 1200,
        opacity: 0,
        duration: 0.6, 
    })
    t1.from("#nav",{
        opacity: 0
    })
    t1.from("#hero1 h1,#hero2 h1,#hero4 h1",{
        y: 100,
        stagger: 0.3,
        duration: 0.6,
        delay: 0.3
    })
    t1.from("#page2",{
        opacity: 0
    },"-=1")
}
function cursoranimation(){
    document.addEventListener("mousemove",function(dets){
        gsap.to("#crsr",{
            left:dets.x,
            top:dets.y
        })
    });
    
}
function magneticeffect(){
    var navmagnet = document.querySelectorAll("#navpart2 h4");
    var imgmove = document.querySelectorAll(".image-div");
    const lerp = (x,y,a) => x*(1-a) + y*a;

    navmagnet.forEach(frame => {
        frame.addEventListener("mousemove", function(dets){
        
            var dims = frame.getBoundingClientRect();
        
            var xstart = dims.x;
            var xend = dims.x + dims.width;
        
            var ystart = dims.y;
            var yend = dims.y + dims.height;
            var yzeroone = gsap.utils.mapRange(ystart,yend,0,1,dets.clientY);
            var zeroone = gsap.utils.mapRange(xstart,xend,0,1,dets.clientX);
            

            
            gsap.to(frame,{
                color:"#fff",
                duration:0.4,
            })
            
            gsap.to(frame,{
                x: lerp(-25,25,zeroone),
                duration:0.3,
                y:lerp(-30,30,yzeroone)
            })
            gsap.to(".circle",{
                opacity:0,
                scale:0
            })
        })
        
        frame.addEventListener("mouseleave", function(){
            gsap.to(frame,{
                duration:0.4,
                y:0
            })
        
            gsap.to(frame,{
                x: 0,
                duration:0.3
            })
            gsap.to(".circle",{
                opacity:1,
                scale:1
            })
        })
    })
    imgmove.forEach(frame => {
        frame.addEventListener("mousemove", function(dets){
        
            var dims = frame.getBoundingClientRect();
        
            var xstart = dims.x;
            var xend = dims.x + dims.width;
        
            var ystart = dims.y;
            var yend = dims.y + dims.height;
            var yzeroone = gsap.utils.mapRange(ystart,yend,0,1,dets.clientY);
            var zeroone = gsap.utils.mapRange(xstart,xend,0,1,dets.clientX);
            

            
            gsap.to(frame,{
                color:"#fff",
                duration:0.4,
            })
            
            gsap.to(frame,{
                x: lerp(-30,30,zeroone),
                duration:0.3,
                y:lerp(-40,40,yzeroone)
            })
            gsap.to(".circle",{
                opacity:0,
                scale:0
            })
            
        })
        
        frame.addEventListener("mouseleave", function(){
            gsap.to(frame,{
                duration:0.4,
                y:0
            })
        
            gsap.to(frame,{
                x: 0,
                duration:0.3
            })
            gsap.to(".circle",{
                opacity:1,
                scale:1
            })
        })
    })
}
function tailcursor(){
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".circle");

    const cursor = document.querySelector(".cursor");

    circles.forEach(function (circle) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = "white";
    });

    window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;
    });

    function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    cursor.style.top = x;
    cursor.style.left = y;
    
    circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";

        circle.style.scale = (circles.length - index) / circles.length;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
    }

    animateCircles();
}
function videocursor(){
    var videoContainer = document.querySelector("#video-container");
    var video = document.querySelector("#video-container video");
    var flag = 0;
    videoContainer.addEventListener("mouseenter", function(){
        videoContainer.addEventListener("mousemove",function(dets){
            gsap.to("#video-cursor",{
                left:dets.x -520,
                top:dets.y - 370
            })
            gsap.to(".circle",{
                opacity:0
            })
        })
        videoContainer.addEventListener("mouseleave",function(){
            gsap.to("#video-cursor",{
                left:"70%",
                top:"-15%"
            })
            gsap.to(".circle",{
                opacity:1
            })
        })
        
    })
    videoContainer.addEventListener("click",function(){
        if(flag == 0){
            video.play();
            video.style.opacity=1;
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-fill"></i>`;
            gsap.to("#video-cursor",{
                scale:0.5
            })
            flag = 1;
        }else{
            video.pause();
            video.style.opacity=0;
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-mini-fill"></i>`;
            gsap.to("#video-cursor",{
                scale:1
            })
            flag = 0;
        }
    })
}
function moveflag(){
    document.addEventListener("mousemove",function(dets){
        gsap.to("#myflag",{
            x:dets.x,
            y:dets.y
        })
    })
    
    document.querySelector("#hero3").addEventListener("mouseenter",function(){
        gsap.to("#myflag",{
            opacity: 1
        })
        gsap.to(".circle",{
            opacity:0,
            scale:0
        })
    })
    document.querySelector("#hero3").addEventListener("mouseleave",function(){
        gsap.to("#myflag",{
            opacity: 0
        })
        gsap.to(".circle",{
            opacity:1,
            scale:1
        })
    })
}
function footerAnimation() {

    var word = ""
    var word2 = ""
    document.querySelector("#footer h1").textContent.split("").forEach(function (elem) {
      word += `<span>${elem}</span>`
    })
    document.querySelector("#footer h1").innerHTML = word
    document.querySelector("#footer h2").textContent.split("").forEach(function (elem) {
      word2 += `<span>${elem}</span>`
    })
    document.querySelector("#footer h2").innerHTML = word2
  
  
    document.querySelector("#footer-text").addEventListener("mouseenter", function () {
      gsap.to("#footer h1 span", {
        opacity: 0,
        stagger: 0.05
      })
      gsap.to("#footer h2 span", {
        delay: 0.35,
        opacity: 1,
        stagger: 0.1
      })
    })
    document.querySelector("#footer-text").addEventListener("mouseleave", function () {
      gsap.to("#footer h1 span", {
        opacity: 1,
        stagger: 0.1,
        delay: 0.35,
  
      })
      gsap.to("#footer h2 span", {
        opacity: 0,
        stagger: 0.05
      })
    })
}  
function arrowcursorfollower(){
    
    function arrowrotation(event){
        const arrows = document.querySelectorAll(".page3-circle1 svg,.page3-circle2 svg");
        if (!arrows) return;

        arrows.forEach(function(arrow,index){
            // To get the center of the arrow element
            const rect = arrow.getBoundingClientRect();
            const arrowCenterX = rect.left + (arrow.clientWidth / 2);
            const arrowCenterY = rect.top + (arrow.clientHeight / 2);
        
            // To calculate the rotation angle
            const radian = Math.atan2(event.pageX - arrowCenterX, event.pageY - arrowCenterY);
            let rotation;
            if(index == 0){
                rotation = (radian * (180 / Math.PI) * -1) + 360;
            }else{
                rotation = (radian * (180 / Math.PI) * -1) + 400;
            }
        
            // Apply the rotation to the arrow
            arrow.style.transform = `rotate(${rotation}deg)`;
        })
    }
    
    // Add event listener to the window or the desired element
    
    document.querySelector("#page3").addEventListener("mouseenter", function() {
        window.addEventListener('mousemove', arrowrotation);
    });
    
    document.querySelector("#page3").addEventListener("mouseleave", function() {
        window.removeEventListener('mousemove', arrowrotation);
    });
    
}
locomotiveanimation();
loadingAnimation();
magneticeffect();
tailcursor();
videocursor();
moveflag();
footerAnimation();
arrowcursorfollower();

//cursoranimation();
//cursoranimation() was used to replicate the original hollow custom cursor used in official Obys Agency website, but I chose to have my own custom cursor
//Do not use it as it will require changes in the html and js code
