const loader = document.getElementById("loader");
const loaderText = document.getElementById("loader-text");
const loaderPercent = document.getElementById("loader-percent");
const loaderProgress = document.getElementById("loader-progress");


const scenes = [
    "Load Scene 01...",
    "Load Scene 02...",
    "Load Scene 03...",
    "Load Scene 04...",
    "Load Scene 05..."
];


let currentScene = 0;


function loadScene() {

    if (currentScene < scenes.length) {

        loaderText.textContent = scenes[currentScene];

        const progress =
            ((currentScene + 1) / scenes.length) * 100;

        loaderProgress.style.width = progress + "%";

        loaderPercent.textContent =
            Math.round(progress) + "%";

        currentScene++;

        setTimeout(loadScene, 500);

    } else {


        loaderText.textContent = "Loading Complete";
        loaderPercent.textContent = "100%";
        loaderProgress.style.width = "100%";

        setTimeout(() => {

            loader.classList.add("finished");

            setTimeout(() => {

                loader.classList.add("hidden");

                document.body.classList.add("loaded");

            }, 1600);

        }, 900);
    }
}


window.addEventListener("load", () => {

    loadScene();

});

const sections =
    document.querySelectorAll(".reveal-section");


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.15
    }
);


sections.forEach((section) => {

    observer.observe(section);

});