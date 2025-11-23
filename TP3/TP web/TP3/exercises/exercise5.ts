// Exercice 5 : Fonctions
// 1. Crée une fonction add(a: number, b: number): number.
// 2. Crée une fonction greet(name: string, age?: number) qui affiche un message différent selon si l'âge est fourni ou non.
// 3. Crée une fonction power(base: number, exp: number = 2) qui calcule une puissance avec un exposant par défaut.
// 4. Crée une fonction combine qui soit peut additionner deux nombres, soit concaténer deux chaînes (surcharge).

// 1. Fonction d'addition simple
function add(a: number, b: number): number {
    return a + b;
}

// 2. Fonction avec paramètre optionnel
function greet(name: string, age?: number): void {
    if (age !== undefined) {
        console.log(`Bonjour ${name}, vous avez ${age} ans.`);
    } else {
        console.log(`Bonjour ${name}!`);
    }
}

// 3. Fonction avec paramètre par défaut
function power(base: number, exp: number = 2): number {
    return Math.pow(base, exp);
}

// 4. Fonction avec surcharge (overload)
// Déclarations de surcharge
function combine(a: number, b: number): number;
function combine(a: string, b: string): string;

// Implémentation
function combine(a: number | string, b: number | string): number | string {
    if (typeof a === "number" && typeof b === "number") {
        return a + b;
    }
    if (typeof a === "string" && typeof b === "string") {
        return a + b;
    }
    throw new Error("Les paramètres doivent être de même type");
}

// Fonctions fléchées (arrow functions)
const multiply = (a: number, b: number): number => a * b;

const divide = (a: number, b: number): number => {
    if (b === 0) {
        throw new Error("Division par zéro impossible");
    }
    return a / b;
};

// Fonction d'ordre supérieur
function applyOperation(
    a: number, 
    b: number, 
    operation: (x: number, y: number) => number
): number {
    return operation(a, b);
}

// Fonction avec rest parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((acc, num) => acc + num, 0);
}

// Type pour une fonction callback
type MathOperation = (a: number, b: number) => number;

const operations: Record<string, MathOperation> = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b
};

// Tests et affichage
console.log("=== Exercice 5 : Fonctions ===");

console.log("\n--- Fonction add ---");
console.log(`add(5, 3) = ${add(5, 3)}`);

console.log("\n--- Fonction greet ---");
greet("Alice");
greet("Bob", 25);

console.log("\n--- Fonction power ---");
console.log(`power(3) = ${power(3)}`); // Par défaut exp = 2
console.log(`power(3, 4) = ${power(3, 4)}`);

console.log("\n--- Fonction combine (surcharge) ---");
console.log(`combine(10, 20) = ${combine(10, 20)}`); // Addition de nombres
console.log(`combine("Hello", " World") = ${combine("Hello", " World")}`); // Concaténation

console.log("\n--- Fonctions fléchées ---");
console.log(`multiply(4, 5) = ${multiply(4, 5)}`);
console.log(`divide(10, 2) = ${divide(10, 2)}`);

console.log("\n--- Fonction d'ordre supérieur ---");
console.log(`applyOperation(8, 3, add) = ${applyOperation(8, 3, add)}`);
console.log(`applyOperation(8, 3, multiply) = ${applyOperation(8, 3, multiply)}`);

console.log("\n--- Rest parameters ---");
console.log(`sum(1, 2, 3, 4, 5) = ${sum(1, 2, 3, 4, 5)}`);

console.log("\n--- Opérations dynamiques ---");
const addOp = operations["add"];
const multiplyOp = operations["multiply"];
if (addOp && multiplyOp) {
    console.log(`operations.add(15, 25) = ${addOp(15, 25)}`);
    console.log(`operations.multiply(6, 7) = ${multiplyOp(6, 7)}`);
}

export { 
    add, 
    greet, 
    power, 
    combine, 
    multiply, 
    divide, 
    applyOperation, 
    sum, 
    operations,
    type MathOperation
};