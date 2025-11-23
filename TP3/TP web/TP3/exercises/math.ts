// math.ts - Fichier avec fonctions mathématiques de base

// Fonction add demandée dans l'exercice
export function add(a: number, b: number): number {
    return a + b;
}

export function subtract(a: number, b: number): number {
    return a - b;
}

export function multiply(a: number, b: number): number {
    return a * b;
}

export function divide(a: number, b: number): number {
    if (b === 0) {
        throw new Error("Division par zéro impossible");
    }
    return a / b;
}

export function power(base: number, exponent: number): number {
    return Math.pow(base, exponent);
}

export function factorial(n: number): number {
    if (n < 0) return 0;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// Constante
export const PI = Math.PI;
export const E = Math.E;

// Fonction par défaut
export default function square(x: number): number {
    return x * x;
}