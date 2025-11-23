// index.ts - Fichier qui ré-exporte plusieurs fonctions
// Ré-export de fonctions depuis math.ts
export { add, subtract, multiply, divide, power, PI } from './math.js';
// Ré-export avec alias
export { factorial as fact } from './math.js';
// Export de nouvelles fonctions
export function average(...numbers) {
    if (numbers.length === 0)
        return 0;
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}
export function max(a, b) {
    return a > b ? a : b;
}
export function min(a, b) {
    return a < b ? a : b;
}
//# sourceMappingURL=index.js.map