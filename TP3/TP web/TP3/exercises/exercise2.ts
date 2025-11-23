// Exercice 2 : Types de base

// 1. Variables avec types de base
const name: string = "Jean Dupont";
const age: number = 25;
const isAdmin: boolean = false;

// 2. Tableau de nombres
const scores: number[] = [85, 92, 78, 94, 87];

// 3. Tuple pour représenter un étudiant [nom, âge]
const student: [string, number] = ["Marie Martin", 22];

// 4. Enum pour les rôles
enum Role {
    User,
    Admin,
    SuperAdmin
}

const userRole: Role = Role.Admin;

// Affichage des résultats
console.log("=== Exercice 2 : Types de base ===");
console.log(`Nom: ${name} (type: ${typeof name})`);
console.log(`Âge: ${age} (type: ${typeof age})`);
console.log(`Admin: ${isAdmin} (type: ${typeof isAdmin})`);
console.log(`Scores: [${scores.join(", ")}]`);
console.log(`Étudiant: ${student[0]}, ${student[1]} ans`);
console.log(`Rôle utilisateur: ${Role[userRole]} (valeur: ${userRole})`);

// Exporter pour utilisation dans d'autres modules
export { name, age, isAdmin, scores, student, Role };