// Exercice 7 : Génériques
// 1. Crée une fonction générique identity<T>(value: T): T.
// 2. Crée une fonction générique getFirst<T>(arr: T[]): T qui retourne le premier élément d'un tableau.
// 3. Crée une classe générique Repository<T> avec les méthodes add, remove et getAll.
// 4. Crée une interface générique ApiResponse<T> avec les propriétés data: T et error?: string.

// 1. Fonction générique identity
function identity<T>(value: T): T {
    return value;
}

// 2. Fonction générique getFirst
function getFirst<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[0] : undefined;
}

// Fonction générique supplémentaire: getLast
function getLast<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[arr.length - 1] : undefined;
}

// Fonction générique avec contrainte
function getLength<T extends { length: number }>(item: T): number {
    return item.length;
}

// 3. Classe générique Repository
class Repository<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    remove(predicate: (item: T) => boolean): boolean {
        const index = this.items.findIndex(predicate);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }

    getAll(): T[] {
        return [...this.items]; // Retourne une copie
    }

    find(predicate: (item: T) => boolean): T | undefined {
        return this.items.find(predicate);
    }

    count(): number {
        return this.items.length;
    }

    clear(): void {
        this.items = [];
    }

    // Méthode générique dans une classe générique
    map<U>(mapper: (item: T) => U): U[] {
        return this.items.map(mapper);
    }
}

// 4. Interface générique ApiResponse
interface ApiResponse<T> {
    data: T;
    error?: string;
    success: boolean;
    timestamp: Date;
}

// Interfaces pour les exemples
interface User {
    id: number;
    name: string;
    email: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}

// Fonctions utilitaires avec génériques
function createSuccessResponse<T>(data: T): ApiResponse<T> {
    return {
        data,
        success: true,
        timestamp: new Date()
    };
}

function createErrorResponse<T>(error: string, fallbackData: T): ApiResponse<T> {
    return {
        data: fallbackData,
        error,
        success: false,
        timestamp: new Date()
    };
}

// Type générique pour une fonction de comparaison
type Comparator<T> = (a: T, b: T) => number;

// Fonction générique de tri
function sort<T>(arr: T[], comparator: Comparator<T>): T[] {
    return [...arr].sort(comparator);
}

// Classe générique avec contraintes multiples
class Cache<K extends string | number, V> {
    private cache = new Map<K, V>();

    set(key: K, value: V): void {
        this.cache.set(key, value);
    }

    get(key: K): V | undefined {
        return this.cache.get(key);
    }

    has(key: K): boolean {
        return this.cache.has(key);
    }

    clear(): void {
        this.cache.clear();
    }

    size(): number {
        return this.cache.size;
    }
}

// Tests et démonstrations
console.log("=== Exercice 7 : Génériques ===");

console.log("\n--- Fonction identity ---");
console.log(`identity(42): ${identity(42)}`);
console.log(`identity("hello"): ${identity("hello")}`);
console.log(`identity(true): ${identity(true)}`);

console.log("\n--- Fonctions getFirst et getLast ---");
const numbers = [1, 2, 3, 4, 5];
const strings = ["a", "b", "c"];
const empty: number[] = [];

console.log(`getFirst([1,2,3,4,5]): ${getFirst(numbers)}`);
console.log(`getLast([1,2,3,4,5]): ${getLast(numbers)}`);
console.log(`getFirst(["a","b","c"]): ${getFirst(strings)}`);
console.log(`getFirst([]): ${getFirst(empty)}`);

console.log("\n--- Fonction avec contrainte ---");
console.log(`getLength("hello"): ${getLength("hello")}`);
console.log(`getLength([1,2,3]): ${getLength([1, 2, 3])}`);

console.log("\n--- Repository générique ---");
const userRepo = new Repository<User>();
const productRepo = new Repository<Product>();

// Ajout d'utilisateurs
userRepo.add({ id: 1, name: "Alice", email: "alice@example.com" });
userRepo.add({ id: 2, name: "Bob", email: "bob@example.com" });

// Ajout de produits
productRepo.add({ id: 1, name: "Laptop", price: 999, category: "Electronics" });
productRepo.add({ id: 2, name: "Book", price: 25, category: "Education" });

console.log(`Utilisateurs (${userRepo.count()}):`, userRepo.getAll());
console.log(`Produits (${productRepo.count()}):`, productRepo.getAll());

// Recherche
const foundUser = userRepo.find(user => user.name === "Alice");
console.log("Utilisateur trouvé:", foundUser);

// Mapping
const userNames = userRepo.map(user => user.name);
console.log("Noms des utilisateurs:", userNames);

console.log("\n--- ApiResponse générique ---");
const userResponse = createSuccessResponse<User[]>(userRepo.getAll());
const errorResponse = createErrorResponse<string>("Erreur réseau", "");

console.log("Réponse utilisateurs:", userResponse);
console.log("Réponse d'erreur:", errorResponse);

console.log("\n--- Cache générique ---");
const stringCache = new Cache<string, number>();
const numberCache = new Cache<number, string>();

stringCache.set("count", 42);
stringCache.set("total", 100);

numberCache.set(1, "premier");
numberCache.set(2, "deuxième");

console.log(`stringCache.get("count"): ${stringCache.get("count")}`);
console.log(`numberCache.get(1): ${numberCache.get(1)}`);
console.log(`Cache sizes: string=${stringCache.size()}, number=${numberCache.size()}`);

console.log("\n--- Tri générique ---");
const people = [
    { name: "Charlie", age: 35 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 }
];

const sortedByAge = sort(people, (a, b) => a.age - b.age);
const sortedByName = sort(people, (a, b) => a.name.localeCompare(b.name));

console.log("Trié par âge:", sortedByAge);
console.log("Trié par nom:", sortedByName);

export {
    identity,
    getFirst,
    getLast,
    getLength,
    Repository,
    Cache,
    sort,
    createSuccessResponse,
    createErrorResponse,
    type ApiResponse,
    type User,
    type Product,
    type Comparator
};