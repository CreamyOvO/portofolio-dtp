gsap.registerPlugin(ScrollTrigger);

const workStage = document.querySelector("#featured-work");
const codingWork = document.querySelector("#coding-work");
const uiuxWork = document.querySelector("#uiux-work");
const videoWork = document.querySelector("#video-work");
const artsWork = document.querySelector("#arts-work");

if (workStage && codingWork && uiuxWork && videoWork && artsWork) {
    const codingVisual = codingWork.querySelector(".work-visual");
    const uiuxVisual = uiuxWork.querySelector(".uiux-visual");
    const videoVisual = videoWork.querySelector(".video-visual");
    const artsVisual = artsWork.querySelector(".arts-visual");

    gsap.set([uiuxWork, videoWork, artsWork], { yPercent: 100 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: workStage,
            start: "top top",
            end: "+=400%",
            pin: true,
            scrub: 1,
            anticipatePin: 1
        }
    });

    tl.to(codingVisual, { scale: 0.9, opacity: 0.5, duration: 1 })
      .to(uiuxWork, { yPercent: 0, ease: "none", duration: 2 }, "-=0.5")
      .from(uiuxVisual, { scale: 0.85, opacity: 0, duration: 1.2 }, "-=1")

      .to(uiuxVisual, { scale: 0.9, opacity: 0.5, duration: 1 })
      .to(videoWork, { yPercent: 0, ease: "none", duration: 2 }, "-=0.5")
      .from(videoVisual, { scale: 0.85, opacity: 0, duration: 1.2 }, "-=1")

      .to(videoVisual, { scale: 0.9, opacity: 0.5, duration: 1 })
      .to(artsWork, { yPercent: 0, ease: "none", duration: 2 }, "-=0.5")
      .from(artsVisual, { scale: 0.85, opacity: 0, duration: 1.2 }, "-=1");

    window.addEventListener("load", () => ScrollTrigger.refresh());
}

const videoData = [
    "assets/ssstik.io_@creamywho_1789274329230.mp4",
    "assets/ssstik.io_@creamywho_1789274641219.mp4", 
    "assets/ssstik.io_@creamywho_1789274665209.mp4",
    "assets/ssstik.io_@creamywho_1789274710774.mp4",
    "assets/ssstik.io_@creamywho_1789274732558.mp4",
    "assets/Download.mp4",
    "assets/Download(1).mp4",
];

let currentVideoIndex = 0;
const videoPlayer = document.getElementById("main-video-player");
const videoPrevBtn = document.querySelector(".prev-btn");
const videoNextBtn = document.querySelector(".next-btn");
let isVideoSwitching = false;

function switchVideo(index) {
    if (isVideoSwitching || !videoPlayer) return;
    isVideoSwitching = true;

    gsap.to(videoPlayer, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
            currentVideoIndex = index;
            videoPlayer.src = videoData[currentVideoIndex];
            videoPlayer.load();
            videoPlayer.play();

            gsap.to(videoPlayer, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => {
                    isVideoSwitching = false;
                }
            });
        }
    });
}

if (videoPrevBtn && videoNextBtn) {
    videoNextBtn.addEventListener("click", () => {
        const nextIdx = (currentVideoIndex + 1) % videoData.length;
        switchVideo(nextIdx);
    });
    videoPrevBtn.addEventListener("click", () => {
        const prevIdx = (currentVideoIndex - 1 + videoData.length) % videoData.length;
        switchVideo(prevIdx);
    });
}

const characterData = [
    {
        scale: 1,
        main: "assets/creamyutama.png",
        chibi: "assets/creamy1.png",
        side1: "assets/creamy3.png",
        side2: "assets/creamy2.png",
        plateColor: "#2FD80050"
    },
    {
        scale: 1.05,
        main: "assets/galutama.png",
        chibi: "assets/gal1.png",
        side1: "assets/gal3.png",
        side2: "assets/gal2.png",
        plateColor: "#FFDE5980"
    }
];

let currentCharIndex = 0;
let isSwitching = false;

const mainCharImg = document.getElementById("char-main");
const chibiCharImg = document.getElementById("char-chibi");
const side1Img = document.getElementById("char-side-1");
const side2Img = document.getElementById("char-side-2");
const greenPlate = document.getElementById("greenplate2");

const charPrevBtn = document.querySelector(".char-prev");
const charNextBtn = document.querySelector(".char-next");

function updateButtonVisibility(index) {
    if (!charPrevBtn || !charNextBtn) return;

    if (index === 0) {
        gsap.to(charPrevBtn, { opacity: 0, pointerEvents: "none", duration: 0.25 });
        gsap.to(charNextBtn, { opacity: 1, pointerEvents: "auto", duration: 0.25 });
    } else if (index === characterData.length - 1) {
        gsap.to(charPrevBtn, { opacity: 1, pointerEvents: "auto", duration: 0.25 });
        gsap.to(charNextBtn, { opacity: 0, pointerEvents: "none", duration: 0.25 });
    }
}

updateButtonVisibility(currentCharIndex);

function switchCharacter(nextIndex, direction = 1) {
    if (isSwitching || nextIndex === currentCharIndex) return;
    isSwitching = true;

    const data = characterData[nextIndex];
    const fadeTargets = [chibiCharImg, side1Img, side2Img].filter(Boolean);

    updateButtonVisibility(nextIndex);

    if (mainCharImg) {
        gsap.to(mainCharImg, {
            opacity: 0,
            x: direction * -120,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.in"
        });
    }

    gsap.to(fadeTargets, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            if (mainCharImg) mainCharImg.src = data.main;
            if (chibiCharImg) chibiCharImg.src = data.chibi;
            if (side1Img) side1Img.src = data.side1;
            if (side2Img) side2Img.src = data.side2;

            if (greenPlate) {
                gsap.to(greenPlate, {
                    backgroundColor: data.plateColor,
                    duration: 0.4,
                    ease: "power2.out"
                });
            }

            if (mainCharImg) {
                gsap.set(mainCharImg, { x: direction * 120, scale: 0.8 });
                
                gsap.to(mainCharImg, {
                    opacity: 1,
                    x: 0,
                    scale: data.scale,
                    duration: 0.45,
                    ease: "back.out(1.2)"
                });
            }

            gsap.to(fadeTargets, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
                onComplete: () => {
                    currentCharIndex = nextIndex;
                    isSwitching = false;
                }
            });
        }
    });
}

if (charPrevBtn && charNextBtn) {
    charNextBtn.addEventListener("click", () => {
        if (currentCharIndex < characterData.length - 1) {
            switchCharacter(currentCharIndex + 1, 1);
        }
    });

    charPrevBtn.addEventListener("click", () => {
        if (currentCharIndex > 0) {
            switchCharacter(currentCharIndex - 1, -1);
        }
    });
}