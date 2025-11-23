// Exercice 4 : Objets & Interfaces
// 1. Crée une interface User avec les propriétés id: number, name: string, email?: string (optionnelle), et isAdmin: boolean en lecture seule.
// 2. Crée un objet user1 conforme à cette interface.
// 3. Crée une interface Admin qui hérite de User et ajoute une propriété permissions: string[].

// 1. Interface User avec propriétés mixtes
interface User {
    id: number;
    name: string;
    email?: string; // Propriété optionnelle
    readonly isAdmin: boolean; // Propriété en lecture seule
}

// 2. Objet conforme à l'interface User
const user1: User = {
    id: 1,
    name: "Jean Dubois",
    email: "jean.dubois@example.com",
    isAdmin: false
};

// Exemple sans email (propriété optionnelle)
const user2: User = {
    id: 2,
    name: "Marie Claire",
    isAdmin: false
};

// 3. Interface Admin qui hérite de User
interface Admin extends User {
    permissions: string[];
}

const admin1: Admin = {
    id: 100,
    name: "Administrateur",
    email: "admin@example.com",
    isAdmin: true,
    permissions: ["read", "write", "delete", "manage_users"]
};

// Interface supplémentaire pour démonstration
interface UserProfile extends User {
    avatar?: string;
    lastLogin: Date;
}

const userProfile: UserProfile = {
    id: 3,
    name: "Sophie Martin",
    email: "sophie@example.com",
    isAdmin: false,
    avatar: "avatar.jpg",
    lastLogin: new Date()
};

// Fonction qui accepte un User
function displayUser(user: User): void {
    console.log(`User: ${user.name} (ID: ${user.id})`);
    if (user.email) {
        console.log(`Email: ${user.email}`);
    }
    console.log(`Admin: ${user.isAdmin ? "Oui" : "Non"}`);
}

// Fonction qui accepte un Admin
function displayAdmin(admin: Admin): void {
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

// Tentative de modification d'une propriété readonly (décommentez pour voir l'erreur)
// user1.isAdmin = true; // Erreur TypeScript

export type { User, Admin, UserProfile };
export { user1, user2, admin1, userProfile };