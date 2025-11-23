// main.ts - Fichier principal pour tester les imports (demandé dans l'exercice)
import { add } from './math.js';
console.log("=== main.ts - Test d'import ===");
console.log(`Test de la fonction add importée: add(10, 20) = ${add(10, 20)}`);
// Import et test d'autres fonctions
import { subtract, multiply, divide } from './math.js';
import defaultSquare from './math.js';
console.log(`subtract(30, 10) = ${subtract(30, 10)}`);
console.log(`multiply(5, 6) = ${multiply(5, 6)}`);
console.log(`divide(100, 4) = ${divide(100, 4)}`);
console.log(`defaultSquare(8) = ${defaultSquare(8)}`);
export { add, subtract, multiply, divide };
//# sourceMappingURL=main.js.map