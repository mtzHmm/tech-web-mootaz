declare class Person {
    name: string;
    age: number;
    constructor(name: string, age: number);
    greet(): void;
    getInfo(): string;
}
declare class Student extends Person {
    school: string;
    studentId: string;
    constructor(name: string, age: number, school: string, studentId: string);
    greet(): void;
    study(subject: string): void;
}
declare abstract class Shape {
    protected color: string;
    constructor(color: string);
    abstract area(): number;
    getColor(): string;
    describe(): string;
}
declare class Circle extends Shape {
    private radius;
    constructor(color: string, radius: number);
    area(): number;
    getRadius(): number;
}
declare class Rectangle extends Shape {
    private width;
    private height;
    constructor(color: string, width: number, height: number);
    area(): number;
    getDimensions(): {
        width: number;
        height: number;
    };
}
interface Drivable {
    drive(): void;
    stop(): void;
    getSpeed(): number;
}
interface Vehicle {
    brand: string;
    model: string;
    year: number;
}
declare class Car implements Drivable, Vehicle {
    brand: string;
    model: string;
    year: number;
    private speed;
    private isRunning;
    constructor(brand: string, model: string, year: number);
    drive(): void;
    stop(): void;
    getSpeed(): number;
    private start;
    private getCarInfo;
}
declare class Motorcycle implements Drivable {
    private speed;
    drive(): void;
    stop(): void;
    getSpeed(): number;
}
export { Person, Student, Shape, Circle, Rectangle, Car, Motorcycle, type Drivable, type Vehicle };
//# sourceMappingURL=exercise6.d.ts.map