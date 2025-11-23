// Exercice 4 : Objets & Interfaces
// 1. Crée une interface User avec les propriétés id: number, name: string, email?: string (optionnelle), et isAdmin: boolean en lecture seule.
// 2. Crée un objet user1 conforme à cette interface.
// 3. Crée une interface Admin qui hérite de User et ajoute une propriété permissions: string[].
// 2. Objet conforme à l'interface User
const user1 = {
    id: 1,
    name: "Jean Dubois",
    email: "jean.dubois@example.com",
    isAdmin: false
};
// Exemple sans email (propriété optionnelle)
const user2 = {
    id: 2,
    name: "Marie Claire",
    isAdmin: false
};
const admin1 = {
    id: 100,
    name: "Administrateur",
    email: "admin@example.com",
    isAdmin: true,
    permissions: ["read", "write", "delete", "manage_users"]
};
const userProfile = {
    id: 3,
    name: "Sophie Martin",
    email: "sophie@example.com",
    isAdmin: false,
    avatar: "avatar.jpg",
    lastLogin: new Date()
};
// Fonction qui accepte un User
function displayUser(user) {
    console.log(`User: ${user.name} (ID: ${user.id})`);
    if (user.email) {
        console.log(`Email: ${user.email}`);
    }
    console.log(`Admin: ${user.isAdmin ? "Oui" : "Non"}`);
}
// Fonction qui accepte un Admin
function displayAdmin(admin) {
    displayUser(admin); // Admin étend User
    console.log(`Permissions: [${admin.permissions.join(", ")}]`);
}
// Affichage des résultats
console.log("=== Exercice 4 : Objets & Interfaces ===");
console.log("\n--- User 1 ---");
displayUser(user1);
console.log("\n--- User 2 (sans email) ---");
displayUser(user2);
console.log("\n--- Admin ---");
displayAdmin(admin1);
console.log("\n--- User Profile ---");
displayUser(userProfile);
console.log(`Avatar: ${userProfile.avatar || "Aucun"}`);
console.log(`Dernière connexion: ${userProfile.lastLogin.toLocaleDateString()}`);
export { user1, user2, admin1, userProfile };
//# sourceMappingURL=exercise4.js.map