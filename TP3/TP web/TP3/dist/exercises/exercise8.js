// Exercice 8 : Modules & Organisation du code
// 1. Crée un fichier math.ts avec une fonction add.
// 2. Importe cette fonction dans main.ts et teste-la.
// 3. Crée un fichier index.ts qui ré-exporte plusieurs fonctions (add, subtract).
// 4. Utilise import type pour importer uniquement des types depuis un fichier types.ts.
// Import de fonctions depuis math.js
import { add, subtract, multiply, divide } from './math.js';
// Import de tout depuis l'index
import * as MathUtils from './index.js';
// Import avec alias
import { add as addNumbers, PI } from './math.js';
// Import par défaut et nommé
import defaultCalculator, { complexOperation } from './calculator.js';
console.log("=== Exercice 8 : Modules & Organisation du code ===");
console.log("\n--- Import de fonctions mathématiques ---");
console.log(`add(5, 3) = ${add(5, 3)}`);
console.log(`subtract(10, 4) = ${subtract(10, 4)}`);
console.log(`multiply(6, 7) = ${multiply(6, 7)}`);
console.log(`divide(15, 3) = ${divide(15, 3)}`);
console.log("\n--- Import avec alias ---");
console.log(`addNumbers(8, 2) = ${addNumbers(8, 2)}`);
console.log(`PI = ${PI}`);
console.log("\n--- Import depuis index (ré-export) ---");
console.log(`MathUtils.add(12, 8) = ${MathUtils.add(12, 8)}`);
console.log(`MathUtils.subtract(20, 5) = ${MathUtils.subtract(20, 5)}`);
console.log("\n--- Import par défaut et fonctions ---");
console.log(`defaultCalculator.calculate('+', 15, 25) = ${defaultCalculator.calculate('+', 15, 25)}`);
console.log(`complexOperation(2, 3, 4) = ${complexOperation(2, 3, 4)}`);
console.log("\n--- Utilisation de types importés ---");
// Utilisation du type MathOperation importé
const operation = (a, b) => a ** b; // Puissance
console.log(`operation(2, 8) = ${operation(2, 8)}`);
// Utilisation du type Calculator importé
const myCalculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : 0
};
console.log(`myCalculator.add(100, 50) = ${myCalculator.add(100, 50)}`);
console.log(`myCalculator.divide(100, 4) = ${myCalculator.divide(100, 4)}`);
// Démonstration de l'import conditionnel
async function conditionalImport() {
    if (true) { // Condition pour importer dynamiquement
        const { factorial } = await import('./math.js');
        console.log(`\n--- Import dynamique ---`);
        console.log(`factorial(5) = ${factorial(5)}`);
    }
}
conditionalImport();
export { add, subtract, multiply, divide, defaultCalculator };
//# sourceMappingURL=exercise8.js.map