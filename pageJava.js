document.addEventListener('DOMContentLoaded', function () {

    const buttonStart = document.getElementById("buttonStart");

    // Relier page Accueil vers page Jeu

    buttonStart.addEventListener('click', function(){
    window.location.href = "pageJeu.html";

    });

});