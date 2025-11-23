// Exercice 5 : Fonctions
// 1. Crée une fonction add(a: number, b: number): number.
// 2. Crée une fonction greet(name: string, age?: number) qui affiche un message différent selon si l'âge est fourni ou non.
// 3. Crée une fonction power(base: number, exp: number = 2) qui calcule une puissance avec un exposant par défaut.
// 4. Crée une fonction combine qui soit peut additionner deux nombres, soit concaténer deux chaînes (surcharge).
// 1. Fonction d'addition simple
function add(a, b) {
    return a + b;
}
// 2. Fonction avec paramètre optionnel
function greet(name, age) {
    if (age !== undefined) {
        console.log(`Bonjour ${name}, vous avez ${age} ans.`);
    }
    else {
        console.log(`Bonjour ${name}!`);
    }
}
// 3. Fonction avec paramètre par défaut
function power(base, exp = 2) {
    return Math.pow(base, exp);
}
// Implémentation
function combine(a, b) {
    if (typeof a === "number" && typeof b === "number") {
        return a + b;
    }
    if (typeof a === "string" && typeof b === "string") {
        return a + b;
    }
    throw new Error("Les paramètres doivent être de même type");
}
// Fonctions fléchées (arrow functions)
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) {
        throw new Error("Division par zéro impossible");
    }
    return a / b;
};
// Fonction d'ordre supérieur
function applyOperation(a, b, operation) {
    return operation(a, b);
}
// Fonction avec rest parameters
function sum(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}
const operations = {
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
export { add, greet, power, combine, multiply, divide, applyOperation, sum, operations };
//# sourceMappingURL=exercise5.js.map