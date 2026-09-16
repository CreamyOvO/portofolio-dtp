const burger = document.querySelector(".burger");
const burgerm = document.querySelector("#navbarmobile")

function klik() {
    burger.style.display = "none";
    burgerm.style.display = "flex";
}

function klikbalik() {
    burger.style.display = "flex";
    burgerm.style.display = "none";
}