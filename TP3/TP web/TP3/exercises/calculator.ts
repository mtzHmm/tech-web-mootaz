// calculator.ts - Calculateur avancé avec export par défaut

import type { MathOperation, OperationType, CalculationResult } from './types.js';

class AdvancedCalculator {
    calculate(operation: OperationType, a: number, b: number): number {
        switch (operation) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b === 0) throw new Error("Division par zéro");
                return a / b;
            default:
                throw new Error(`Opération non supportée: ${operation}`);
        }
    }

    calculateWithDetails(operation: OperationType, a: number, b: number): CalculationResult {
        const result = this.calculate(operation, a, b);
        return {
            result,
            operation: `${a} ${operation} ${b}`,
            operands: [a, b]
        };
    }

    // Méthodes utilitaires
    add: MathOperation = (a, b) => a + b;
    subtract: MathOperation = (a, b) => a - b;
    multiply: MathOperation = (a, b) => a * b;
    divide: MathOperation = (a, b) => {
        if (b === 0) throw new Error("Division par zéro");
        return a / b;
    };
}

// Export par défaut
const defaultCalculator = new AdvancedCalculator();
export default defaultCalculator;

// Fonction exportée nommée
export function complexOperation(a: number, b: number, c: number): number {
    return (a + b) * c;
}

// Export de classe
export { AdvancedCalculator };