// Fonction utilitaire pour afficher les résultats dans l'interface
function displayOutput(exerciseNumber, content, type = 'info') {
    const outputDiv = document.getElementById(`output${exerciseNumber}`);
    const line = document.createElement('div');
    line.className = `output-line ${type}`;
    line.textContent = content;
    outputDiv.appendChild(line);
}

// Fonction pour vider un output spécifique
function clearOutput(exerciseNumber) {
    const outputDiv = document.getElementById(`output${exerciseNumber}`);
    outputDiv.innerHTML = '';
}

// Fonction pour vider tous les outputs
function clearAllOutputs() {
    for (let i = 1; i <= 7; i++) {
        clearOutput(i);
    }
}

// EXERCICE 1 – VARIABLES ET PORTÉE
function runExercise1() {
    clearOutput(1);
    displayOutput(1, "=== EXERCICE 1 – VARIABLES ET PORTÉE ===", "info");
    
    try {
        // Déclaration avec var, let et const
        var a = 10;   // portée fonctionnelle
        let b = 20;   // portée bloc
        const c = 30; // portée bloc + non réassignable

        {
            var a = 100;  // Remplace la variable 'a' définie plus haut
            let b = 200;  // Existe uniquement dans ce bloc
            const c = 300; // Existe uniquement dans ce bloc

            displayOutput(1, `Dans le bloc : a=${a}, b=${b}, c=${c}`, "success");
        }

        displayOutput(1, "Hors du bloc :", "info");
        displayOutput(1, `a = ${a}`, "success");
        displayOutput(1, `b = ${b}`, "success");
        displayOutput(1, `c = ${c}`, "success");

        // Question piège : Réaffecter une const
        const x = 5;
        try {
            // Cette ligne va générer une erreur
            eval('x = 10');
        } catch (e) {
            displayOutput(1, `Impossible de réaffecter une const : ${e.message}`, "error");
        }

        const userConst = { name: "Mootaz" };
        userConst.name = "Arthur"; // ✅ possible (on modifie le contenu, pas la référence)
        displayOutput(1, `userConst modifié : ${JSON.stringify(userConst)}`, "success");

    } catch (error) {
        displayOutput(1, `Erreur : ${error.message}`, "error");
    }
}

// EXERCICE 2 – FONCTIONS FLÉCHÉES
function runExercise2() {
    clearOutput(2);
    displayOutput(2, "=== EXERCICE 2 – FONCTIONS FLÉCHÉES ===", "info");
    
    try {
        // Version classique
        function sommeClassique(a, b) {
            return a + b;
        }
        displayOutput(2, `Somme classique (2, 3) : ${sommeClassique(2, 3)}`, "success");

        // Version fléchée avec return explicite
        const somme1 = (a, b) => {
            return a + b;
        };
        displayOutput(2, `Somme fléchée explicite (4, 6) : ${somme1(4, 6)}`, "success");

        // Version fléchée avec return implicite
        const somme2 = (a, b) => a + b;
        displayOutput(2, `Somme fléchée implicite (10, 5) : ${somme2(10, 5)}`, "success");

    } catch (error) {
        displayOutput(2, `Erreur : ${error.message}`, "error");
    }
}

// EXERCICE 3 – DESTRUCTURING
function runExercise3() {
    clearOutput(3);
    displayOutput(3, "=== EXERCICE 3 – DESTRUCTURING ===", "info");
    
    try {
        const user = { name: "Noor", age: 10, city: "Tunis" };
        const { name, age } = user; // Extraction
        
        displayOutput(3, `Objet original : ${JSON.stringify(user)}`, "info");
        displayOutput(3, `Nom extrait : ${name}`, "success");
        displayOutput(3, `Âge extrait : ${age}`, "success");

    } catch (error) {
        displayOutput(3, `Erreur : ${error.message}`, "error");
    }
}

// EXERCICE 4 – SPREAD OPERATOR
function runExercise4() {
    clearOutput(4);
    displayOutput(4, "=== EXERCICE 4 – SPREAD OPERATOR ===", "info");
    
    try {
        // Fusion de deux tableaux
        const T1 = [1, 2, 3];
        const T2 = [4, 5, 6];
        const fusion = [...T1, ...T2];
        const T = [...fusion];
        T[0] = 10;
        
        displayOutput(4, `T1 : [${T1.join(', ')}]`, "info");
        displayOutput(4, `T2 : [${T2.join(', ')}]`, "info");
        displayOutput(4, `Fusion modifiée : [${T.join(', ')}]`, "success");

        // Copie d'un objet et modification
        const person = { name: "Ali", age: 25 };
        const newPerson = { ...person, age: 30 }; // Copie + modification
        
        displayOutput(4, `Ancien objet : ${JSON.stringify(person)}`, "info");
        displayOutput(4, `Nouvel objet : ${JSON.stringify(newPerson)}`, "success");

    } catch (error) {
        displayOutput(4, `Erreur : ${error.message}`, "error");
    }
}

// EXERCICE 5 – OBJET SIMPLE
function runExercise5() {
    clearOutput(5);
    displayOutput(5, "=== EXERCICE 5 – OBJET SIMPLE ===", "info");
    
    try {
        const livre = {
            titre: "L'Étranger",
            auteur: "Albert Camus",
            annee: 1942,
            getInfo() {
                return `${this.titre} écrit par ${this.auteur} en ${this.annee}`;
            }
        };

        displayOutput(5, livre.getInfo(), "success");

    } catch (error) {
        displayOutput(5, `Erreur : ${error.message}`, "error");
    }
}

// EXERCICE 6 – CLASSE ES6
function runExercise6() {
    clearOutput(6);
    displayOutput(6, "=== EXERCICE 6 – CLASSE ES6 ===", "info");
    
    try {
        class Etudiant {
            constructor(nom, note) {
                this.nom = nom;
                this.note = note;
            }

            getMention() {
                if (this.note >= 16) return "Très bien";
                if (this.note >= 14) return "Bien";
                if (this.note >= 10) return "Passable";
                return "Échec";
            }
        }

        // Instanciation de 3 étudiants
        const etu1 = new Etudiant("Hend", 17);
        const etu2 = new Etudiant("Mootaz", 13);
        const etu3 = new Etudiant("Yesser", 8);

        // Affichage des mentions
        displayOutput(6, `${etu1.nom} (${etu1.note}/20) : ${etu1.getMention()}`, "success");
        displayOutput(6, `${etu2.nom} (${etu2.note}/20) : ${etu2.getMention()}`, "success");
        displayOutput(6, `${etu3.nom} (${etu3.note}/20) : ${etu3.getMention()}`, "warning");

    } catch (error) {
        displayOutput(6, `Erreur : ${error.message}`, "error");
    }
}

// EXERCICE 7 – TABLEAUX AVANCÉS
function runExercise7() {
    clearOutput(7);
    displayOutput(7, "=== EXERCICE 7 – TABLEAUX AVANCÉS ===", "info");
    
    try {
        const notes = [12, 5, 17, 9, 20];
        displayOutput(7, `Notes originales : [${notes.join(', ')}]`, "info");

        // 1. Moyenne avec reduce
        const moyenne = notes.reduce((acc, val) => acc + val, 0) / notes.length;
        displayOutput(7, `Moyenne : ${moyenne.toFixed(2)}`, "success");

        // 2. Tri décroissant 
        const triDecroissant = [...notes].sort((a, b) => b - a);
        displayOutput(7, `Tri décroissant : [${triDecroissant.join(', ')}]`, "success");

        // 3. Filtrer les notes ≥ 10
        const notesAdmissibles = notes.filter(note => note >= 10);
        displayOutput(7, `Notes ≥ 10 : [${notesAdmissibles.join(', ')}]`, "success");

    } catch (error) {
        displayOutput(7, `Erreur : ${error.message}`, "error");
    }
}

// Fonction pour exécuter tous les exercices
function runAllExercises() {
    clearAllOutputs();
    
    // Délai progressif pour un effet visuel agréable
    setTimeout(() => runExercise1(), 100);
    setTimeout(() => runExercise2(), 300);
    setTimeout(() => runExercise3(), 500);
    setTimeout(() => runExercise4(), 700);
    setTimeout(() => runExercise5(), 900);
    setTimeout(() => runExercise6(), 1100);
    setTimeout(() => runExercise7(), 1300);
}

// Animation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter une animation d'entrée pour les exercices
    const exercises = document.querySelectorAll('.exercise');
    exercises.forEach((exercise, index) => {
        exercise.style.opacity = '0';
        exercise.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            exercise.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            exercise.style.opacity = '1';
            exercise.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Message de bienvenue
    console.log('🚀 Interface TP JavaScript chargée avec succès !');
    console.log('📚 Vous pouvez maintenant exécuter les exercices via l\'interface web.');
});

// Raccourcis clavier
document.addEventListener('keydown', function(event) {
    // Ctrl + Enter pour exécuter tous les exercices
    if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault();
        runAllExercises();
    }
    
    // Ctrl + R pour vider tous les résultats
    if (event.ctrlKey && event.key === 'r') {
        event.preventDefault();
        clearAllOutputs();
    }
    
    // Touches numériques 1-7 pour exécuter un exercice spécifique
    if (event.key >= '1' && event.key <= '7' && !event.ctrlKey && !event.altKey) {
        const exerciseNumber = parseInt(event.key);
        const runFunction = window[`runExercise${exerciseNumber}`];
        if (runFunction) {
            runFunction();
        }
    }
});