// Exercice 3 : Types avancés
// 1. Crée une variable id qui peut être soit un number, soit un string.
// 2. Crée deux types A et B, puis fais-en une intersection.
// 3. Crée un alias Status qui peut valoir "pending", "done" ou "canceled".
// 4. Déclare une variable unknown et utilise une assertion de type pour accéder à sa longueur si c'est une chaîne.

// 1. Union type - id peut être number ou string
let id: number | string = 12345;
id = "USER_001"; // Peut aussi être une chaîne

// 2. Types intersection
type A = {
    name: string;
    age: number;
};

type B = {
    email: string;
    role: string;
};

type AB = A & B; // Intersection - doit avoir toutes les propriétés de A ET B

const user: AB = {
    name: "Alice",
    age: 30,
    email: "alice@example.com",
    role: "developer"
};

// 3. Type alias pour Status
type Status = "pending" | "done" | "canceled";

let taskStatus: Status = "pending";
taskStatus = "done"; // OK
// taskStatus = "invalid"; // Erreur TypeScript

// 4. Type unknown avec assertion de type
let unknownValue: unknown = "Hello TypeScript!";

// Vérification de type avant assertion
if (typeof unknownValue === "string") {
    console.log(`Longueur de la chaîne: ${unknownValue.length}`);
}

// Ou avec assertion de type (moins sûr)
const stringValue = unknownValue as string;
console.log(`Longueur avec assertion: ${stringValue.length}`);

// Affichage des résultats
console.log("=== Exercice 3 : Types avancés ===");
console.log(`ID: ${id} (type: ${typeof id})`);
console.log(`Utilisateur complet:`, user);
console.log(`Status de la tâche: ${taskStatus}`);
console.log(`Valeur inconnue: ${unknownValue}`);

// Exemple de type guard plus avancé
function isString(value: unknown): value is string {
    return typeof value === "string";
}

if (isString(unknownValue)) {
    // TypeScript sait maintenant que unknownValue est de type string
    console.log(`Type guard - longueur: ${unknownValue.length}`);
}

export { id, user, taskStatus, unknownValue, type Status, type AB };