import type { MathOperation, OperationType, CalculationResult } from './types.js';
declare class AdvancedCalculator {
    calculate(operation: OperationType, a: number, b: number): number;
    calculateWithDetails(operation: OperationType, a: number, b: number): CalculationResult;
    add: MathOperation;
    subtract: MathOperation;
    multiply: MathOperation;
    divide: MathOperation;
}
declare const defaultCalculator: AdvancedCalculator;
export default defaultCalculator;
export declare function complexOperation(a: number, b: number, c: number): number;
export { AdvancedCalculator };
//# sourceMappingURL=calculator.d.ts.map