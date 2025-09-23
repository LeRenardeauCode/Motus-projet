document.addEventListener('DOMContentLoaded', function () {

    const words = ["ANIMAUX", "PANIERS", "LAPINES", "CHIFFRE", "BONJOUR", "JOURNAL", "DESSINS", "GARDIEN", "CLAVIER", "DRAPEAU"]
    const secret = words[Math.floor(Math.random() * words.length)];
    const secretFirst = secret.split("")
    const buttons = document.getElementsByClassName('buttonJeu')


    // Variables pour stats du jeu
    let tentativesGlobales = 0;
    let partiesJouees = 0;
    let victoires = 0;


    // Création grille et cases
    const grille = document.getElementById("grid");

    const taille = 7
    const total = taille * taille

    for (let i = 0; i < total; i++) {
        const cellule = document.createElement("div");
        cellule.classList.add("divCellule");
        grille.appendChild(cellule);
    };

    // Zone de score
    const globalScore = document.getElementById("globalScore");

    const scoreContent = document.createElement('div');
    scoreContent.id = "scoreContent";
    scoreContent.innerHTML = `
        <div id="statsJeu" style="margin-bottom: 10px; color: #333;">
            <span>Tentatives: <strong id="tentativesCount">0</strong></span> | 
            <span>Parties: <strong id="partiesCount">0</strong></span> | 
            <span>Victoires: <strong id="victoiresCount">0</strong></span>
        </div>
        <div id="messageJeu" style="margin: 10px 0; font-size: 16px; font-weight: bold;"></div>
        <button id="btnRecommencer" style="
            background: #28a745;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            display: none;
        ">Recommencer</button>
    `;
    globalScore.appendChild(scoreContent);



    // Récupération et création div pour bouton Info
    const infoConsigne = document.getElementById("infoConsigne");

    const infoPanel = document.createElement("div");
    infoPanel.id = "infoPanel";

    const titrePanel = document.createElement("h3");
    titrePanel.textContent = "Rappel des consignes";

    const contenuPanel = document.createElement('div');
    contenuPanel.innerText = "Objectif : Trouvez le mot de 7 lettres en 7 tentatives maximum ! La couleur rouge signifie que la lettre est bien placée, la couleur jaune signifie que la lettre est présente mais mal placée et aucune couleur signifie que la lettre n'est pas dans la phrase."

    const boutonFermer = document.createElement('buttonInfo');
    boutonFermer.textContent = 'Fermer';

    // Après avoir créer, on les ajoute au site avec appendChild
    infoPanel.appendChild(titrePanel);
    infoPanel.appendChild(contenuPanel);
    infoPanel.appendChild(boutonFermer);
    document.body.appendChild(infoPanel);

    // Puis on créer le bouton d'info et son panneau d'info
    infoConsigne.addEventListener('click', function() {
        if (infoPanel.style.display === 'none' || infoPanel.style.display === '') {
            infoPanel.style.display = 'block';
        } else {
            infoPanel.style.display = 'none';
        }
    });

    // Événement pour fermer le panneau
    boutonFermer.addEventListener('click', function() {
        infoPanel.style.display = 'none';
    });

    // Création clavier
    const keyboard = document.getElementById("clavier");

    const lettres = [
        ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
        ['W', 'X', 'C', 'V', 'B', 'N']
    ];


    // Incorporer les lettres dans les cases via clavier virtuel
    const cellules = grille.querySelectorAll('.divCellule'); // Selection de toutes les cellules
    let caseGrille = 1; // Position actuelle dans la grille
    let ligneGrille = 0 // Position actuelle dans la ligne


    // Fonction pour avoir toujours la première lettre dans chaque ligne mêm après "Valider"
    function firstLetter() {
        const indexFL = ligneGrille * taille
        cellules[indexFL].textContent = secretFirst[0];
    }

    // Fonction pour effacer la ligne
    function effacerLigne(ligneGrille) {
        const start = ligneGrille * taille
        for (let l = 1; l < taille; l++) {
            cellules[start + l].textContent = '';
        }

        caseGrille = 1;
    }
     

    for (let ligneKey of lettres) {
        const divLigne = document.createElement('div');
        divLigne.classList.add('ligneKeyboard'); // classe pour le CSS

        for (let touche of ligneKey) {
            const bouton = document.createElement('button');
            bouton.textContent = touche;
            bouton.classList.add('touche');

            // bouton.setAttribute('data-key', touche); // permet d'identifier la touche cliquée
            bouton.addEventListener('click', function () {
                // Rempli les cellules l'une après l'autre
                if (caseGrille < taille && ligneGrille < taille) {
                    let caseIndex = (ligneGrille * 7) + caseGrille
                    cellules[caseIndex].textContent = touche;
                    caseGrille++;
                }

            });

            divLigne.appendChild(bouton);
        }

        keyboard.appendChild(divLigne); // on ajoute chaque ligne au clavier
    }


    // Boucle pour ajouter la première lettre du mot choisi
    for (let j = 0; j < 1; j++) {
        const element = secretFirst[j];
        cellules[j].textContent = element;
    }

    for (let k = 0; k < buttons.length; k++) {
        let character = buttons[k].innerText;
        buttons[k].addEventListener('click', function () {


            // Bouton Reset
            if (character === "Reset") {
                effacerLigne(ligneGrille);
                return;
            }

            // Bouton Effacer
            if (character === "Effacer") {
                if (caseGrille > 1){
                    let caseIndex = (ligneGrille * 7) + (caseGrille - 1)
                    cellules[caseIndex].textContent = '';
                    caseGrille--;
                    return;
                }
                return;
            } 

            // Bouton Valider
            


        });    
            
    }

});
