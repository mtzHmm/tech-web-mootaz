// math.ts - Fichier avec fonctions mathématiques de base
// Fonction add demandée dans l'exercice
export function add(a, b) {
    return a + b;
}
export function subtract(a, b) {
    return a - b;
}
export function multiply(a, b) {
    return a * b;
}
export function divide(a, b) {
    if (b === 0) {
        throw new Error("Division par zéro impossible");
    }
    return a / b;
}
export function power(base, exponent) {
    return Math.pow(base, exponent);
}
export function factorial(n) {
    if (n < 0)
        return 0;
    if (n === 0 || n === 1)
        return 1;
    return n * factorial(n - 1);
}
// Constante
export const PI = Math.PI;
export const E = Math.E;
// Fonction par défaut
export default function square(x) {
    return x * x;
}
//# sourceMappingURL=math.js.map