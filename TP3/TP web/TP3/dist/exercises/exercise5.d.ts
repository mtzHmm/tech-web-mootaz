declare function add(a: number, b: number): number;
declare function greet(name: string, age?: number): void;
declare function power(base: number, exp?: number): number;
declare function combine(a: number, b: number): number;
declare function combine(a: string, b: string): string;
declare const multiply: (a: number, b: number) => number;
declare const divide: (a: number, b: number) => number;
declare function applyOperation(a: number, b: number, operation: (x: number, y: number) => number): number;
declare function sum(...numbers: number[]): number;
type MathOperation = (a: number, b: number) => number;
declare const operations: Record<string, MathOperation>;
export { add, greet, power, combine, multiply, divide, applyOperation, sum, operations, type MathOperation };
//# sourceMappingURL=exercise5.d.ts.map