// types.ts - Fichier de types pour démontrer import type

export type MathOperation = (a: number, b: number) => number;

export interface Calculator {
    add: MathOperation;
    subtract: MathOperation;
    multiply: MathOperation;
    divide: MathOperation;
}

export type OperationType = '+' | '-' | '*' | '/';

export interface AdvancedCalculator extends Calculator {
    power: MathOperation;
    modulo: MathOperation;
}

export type CalculationResult = {
    result: number;
    operation: string;
    operands: [number, number];
};