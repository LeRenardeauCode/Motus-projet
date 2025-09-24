document.addEventListener('DOMContentLoaded', function () {

    const words = ["ANIMAUX", "PANIERS", "LAPINES", "CHIFFRE", "BONJOUR", "JOURNAL", "DESSINS", "GARDIEN", "CLAVIER", "DRAPEAU"]
    let secret = words[Math.floor(Math.random() * words.length)];
    let secretFirst = secret.split("")
    const buttons = document.getElementsByClassName('buttonJeu')


    // Variables pour stats du jeu
    let tentativesGlobales = 0;
    let partiesJouees = 0;
    let victoires = 0;


    // Création grille et cases
    let grille = document.getElementById("grid");

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
    infoConsigne.addEventListener('click', function () {
        if (infoPanel.style.display === 'none' || infoPanel.style.display === '') {
            infoPanel.style.display = 'block';
        } else {
            infoPanel.style.display = 'none';
        }
    });

    // Événement pour fermer le panneau
    boutonFermer.addEventListener('click', function () {
        infoPanel.style.display = 'none';
    });

    function resetJeu() {
        secret = words[Math.floor(Math.random() * words.length)];
        secretFirst = secret.split("");
        caseGrille = 1;
        ligneGrille = 0;
        grille.innerHTML = "";

        for (let i = 0; i < total; i++) {
            const cellule = document.createElement("div");
            cellule.classList.add("divCellule");
            grille.appendChild(cellule);
        };

        cellules = grille.querySelectorAll('.divCellule');
        firstLetter();

        const toutesLesTouches = document.querySelectorAll('.touche');
        toutesLesTouches.forEach(t => {
            t.style.backgroundColor = "rgb(11, 57, 72)";
            t.style.color = "white";
        });
    };

    // Création clavier
    const keyboard = document.getElementById("clavier");

    const lettres = [
        ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
        ['W', 'X', 'C', 'V', 'B', 'N']
    ];


    // Incorporer les lettres dans les cases via clavier virtuel
    let cellules = grille.querySelectorAll('.divCellule'); // Selection de toutes les cellules
    let caseGrille = 1; // Position actuelle dans la grille
    let ligneGrille = 0 // Position actuelle dans la ligne


    // Fonction pour avoir toujours la première lettre dans chaque ligne mêm après "Valider"
    function firstLetter() {
        let indexFL = ligneGrille * taille
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

    document.addEventListener('keydown', function (e) {
        const lettreTouche = e.key.toUpperCase(); // Variable pour créer clavier
        // Effacer avec Backspace
        const regex = /^[A-Z]$/ // Que de A à Z
        if (e.key === "Backspace") {
            if (caseGrille > 1) {
                let caseIndex = (ligneGrille * taille) + (caseGrille - 1);
                cellules[caseIndex].textContent = '';
                caseGrille--;
            }
            return;
        }
        if (e.key === "Enter") {
            const validerBtn = Array.from(buttons).find(function (bouton) {
                return bouton.innerText === "Valider";
            });
            if (validerBtn) {
                validerBtn.click();
            }
        }
        if (!regex.test(lettreTouche)) return; // Ignore tout sauf A-Z
        if (caseGrille < taille && ligneGrille < taille) {
            let caseIndex = (ligneGrille * taille) + caseGrille;
            cellules[caseIndex].textContent = lettreTouche;
            caseGrille++;
        }
    })


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
                if (caseGrille > 1) {
                    let caseIndex = (ligneGrille * taille) + (caseGrille - 1)
                    cellules[caseIndex].textContent = '';
                    caseGrille--;
                    return;
                }
                return;
            }

            // Bouton Valider
            if (character === "Valider") {
                // Boucle pour intégrer les lettres et donc le mot dans les cases du MOTUS !! MAIS SEULEMENT AVEC VALIDER
                const ligneActuelle = ligneGrille * taille;
                let mot = "";
                for (let m = 0; m < taille; m++) {
                    mot += cellules[ligneActuelle + m].textContent
                }

                // Alerte de remplissage de la ligne MOTUS
                if (mot.length < taille) {
                    alert("Mot de 7 lettres obligatoire !")
                    return;
                }

                tentativesGlobales++;
                document.getElementById("tentativesCount").textContent = tentativesGlobales;

                // ON STOCKE LE MOT RECUPERE AU DEBUT DU CODE !!! (INDISPENSABLE)
                let lettreUtilisée = secretFirst.slice(); // On copie le mot

                // Case de couleur "rouge" = bonne lettre et bonne position
                for (let n = 0; n < taille; n++) {
                    const celluleIndex = ligneActuelle + n
                    if (mot[n] === secret[n]) {
                        cellules[celluleIndex].style.setProperty("background", "rgb(153, 70, 54)");

                        const touche = Array.from(document.querySelectorAll('.touche'))
                            .find(b => b.textContent === mot[n]);
                        if (touche) {
                            touche.style.backgroundColor = "rgb(153, 70, 54)";
                            touche.style.color = "white";
                        }
                    }
                }
                // Case de couleur "orange" = bonne lettre mais mauvaise position + case grise = mauvaise position
                for (let n = 0; n < taille; n++) {
                    const celluleIndex = ligneActuelle + n
                    if (mot[n] !== secret[n]) {
                        if (lettreUtilisée.includes(mot[n])) {
                            cellules[celluleIndex].style.setProperty("background", "rgb(250, 169, 22)");

                            const retireLettre = lettreUtilisée.indexOf(mot[n])
                            if (retireLettre > -1) {
                                lettreUtilisée.splice(retireLettre, 1)
                            }
                        } else {
                            cellules[celluleIndex].style.setProperty("background", "rgb(217, 219, 241)");
                        }
                    }
                    if (mot === secret) {
                        partiesJouees++
                        document.getElementById("partiesCount").textContent = partiesJouees;
                        victoires++
                        document.getElementById("victoiresCount").textContent = victoires;
                        alert("VICTOIRE !")
                        document.getElementById("btnRecommencer").style.display = "inline-block"
                        return;
                    }

                }
                ligneGrille++
                caseGrille = 1

                if (ligneGrille >= taille) {
                    partiesJouees++;
                    document.getElementById("partiesCount").textContent = partiesJouees;

                    alert("Défaite ! Le mot était : " + secret);
                    document.getElementById("btnRecommencer").style.display = "inline-block";
                    return;

                }
                firstLetter();
            }

        });

        document.getElementById("btnRecommencer").addEventListener('click', function () {
            resetJeu();

        });
    }

});
