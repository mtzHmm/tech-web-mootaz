/*EXERCICE 1 – VARIABLES ET PORTÉE*/

console.log("=== EXERCICE 1 – VARIABLES ET PORTÉE ===");

// Déclaration avec var, let et const
var a = 10;   // portée fonctionnelle
let b = 20;   // portée bloc
const c = 30; // portée bloc + non réassignable

{
  var a = 100;  // Remplace la variable 'a' définie plus haut
  let b = 200;  // Existe uniquement dans ce bloc
  const c = 300; // Existe uniquement dans ce bloc

  console.log("Dans le bloc :", a, b, c);
}

console.log("Hors du bloc :");
console.log("a =", a);  // Accessible (var sort du bloc)
try { console.log("b =", b); } 
catch (e) { console.log("b n'est pas défini en dehors du bloc"); }
try { console.log("c =", c); } 
catch (e) { console.log("c n'est pas défini en dehors du bloc"); }

// Question piège : Réaffecter une const
const x = 5;
try {
  x = 10; // Erreur attendue
} catch (e) {
  console.log("Impossible de réaffecter une const :", e.message);
}

const userConst = { name: "Mootaz" };
userConst.name = "Arthur"; // ✅ possible (on modifie le contenu, pas la référence)
console.log("userConst modifié :", userConst);


/* EXERCICE 2 – FONCTIONS FLÉCHÉES*/

console.log("\n=== EXERCICE 2 – FONCTIONS FLÉCHÉES ===");

// Version classique
function sommeClassique(a, b) {
  return a + b;
}
console.log("Somme classique :", sommeClassique(2, 3));

// Version fléchée avec return explicite
const somme1 = (a, b) => {
  return a + b;
};
console.log("Somme fléchée (explicite) :", somme1(4, 6));

// Version fléchée avec return implicite
const somme2 = (a, b) => a + b;
console.log("Somme fléchée (implicite) :", somme2(10, 5));


/* EXERCICE 3 – DESTRUCTURING*/

console.log("\n=== EXERCICE 3 – DESTRUCTURING ===");

const user = { name: "Noor", age: 10, city: "Tunis" };
const { name, age } = user; // Extraction
console.log("Nom :", name);
console.log("Âge :", age);


/* EXERCICE 4 – SPREAD OPERATOR*/

console.log("\n=== EXERCICE 4 – SPREAD OPERATOR ===");

// Fusion de deux tableaux
const T1 = [1, 2, 3];
const T2 = [4, 5, 6];
const fusion = [...T1, ...T2];
const T=[...fusion];
T[0] = 10; 
console.log("Fusion des tableaux :", T);

// Copie d'un objet et modification
const person = { name: "Ali", age: 25 };
const newPerson = { ...person, age: 30 }; // Copie + modification
console.log("Ancien objet :", person);
console.log("Nouvel objet :", newPerson);

/* EXERCICE 5 – OBJET SIMPLE
 */

console.log("\n=== EXERCICE 5 – OBJET SIMPLE ===");

const livre = {
  titre: "L'Étranger",
  auteur: "Albert Camus",
  annee: 1942,
  getInfo() {
    return `${this.titre} écrit par ${this.auteur} en ${this.annee}`;
  }
};

console.log(livre.getInfo());


/* EXERCICE 6 – CLASSE ES6*/

console.log("\n=== EXERCICE 6 – CLASSE ES6 ===");

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
console.log(`${etu1.nom} : ${etu1.getMention()}`);
console.log(`${etu2.nom} : ${etu2.getMention()}`);
console.log(`${etu3.nom} : ${etu3.getMention()}`);


/*
  EXERCICE 7 – TABLEAUX AVANCÉS
*/

console.log("\n=== EXERCICE 7 – TABLEAUX AVANCÉS ===");

const notes = [12, 5, 17, 9, 20];

// 1. Moyenne avec reduce
const moyenne = notes.reduce((acc, val) => acc + val, 0) / notes.length;
console.log("Moyenne :", moyenne);

// 2. Tri décroissant 
const triDecroissant = [...notes].sort((a, b) => b - a);
console.log("Tri décroissant :", triDecroissant);

// 3. Filtrer les notes ≥ 10
const notesAdmissibles = notes.filter(note => note >= 10);
console.log("Notes ≥ 10 :", notesAdmissibles);

