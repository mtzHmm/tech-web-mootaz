// calculator.ts - Calculateur avancé avec export par défaut
class AdvancedCalculator {
    calculate(operation, a, b) {
        switch (operation) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b === 0)
                    throw new Error("Division par zéro");
                return a / b;
            default:
                throw new Error(`Opération non supportée: ${operation}`);
        }
    }
    calculateWithDetails(operation, a, b) {
        const result = this.calculate(operation, a, b);
        return {
            result,
            operation: `${a} ${operation} ${b}`,
            operands: [a, b]
        };
    }
    // Méthodes utilitaires
    add = (a, b) => a + b;
    subtract = (a, b) => a - b;
    multiply = (a, b) => a * b;
    divide = (a, b) => {
        if (b === 0)
            throw new Error("Division par zéro");
        return a / b;
    };
}
// Export par défaut
const defaultCalculator = new AdvancedCalculator();
export default defaultCalculator;
// Fonction exportée nommée
export function complexOperation(a, b, c) {
    return (a + b) * c;
}
// Export de classe
export { AdvancedCalculator };
//# sourceMappingURL=calculator.js.map