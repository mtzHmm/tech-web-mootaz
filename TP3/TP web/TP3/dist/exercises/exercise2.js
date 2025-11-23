// Exercice 2 : Types de base
// 1. Déclare une variable name de type string, age de type number, et isAdmin de type boolean.
// 2. Crée un tableau scores contenant uniquement des nombres.
// 3. Crée un tuple [string, number] pour représenter un étudiant.
// 4. Crée un enum Role { User, Admin, SuperAdmin } et affecte-lui une valeur.
// 1. Variables avec types de base
const name = "Jean Dupont";
const age = 25;
const isAdmin = false;
// 2. Tableau de nombres
const scores = [85, 92, 78, 94, 87];
// 3. Tuple pour représenter un étudiant [nom, âge]
const student = ["Marie Martin", 22];
// 4. Enum pour les rôles
var Role;
(function (Role) {
    Role[Role["User"] = 0] = "User";
    Role[Role["Admin"] = 1] = "Admin";
    Role[Role["SuperAdmin"] = 2] = "SuperAdmin";
})(Role || (Role = {}));
const userRole = Role.Admin;
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
//# sourceMappingURL=exercise2.js.map