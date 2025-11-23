// Exercice 6 : Programmation Orientée Objet
// 1. Crée une classe Person avec les propriétés name et age, et une méthode greet().
// 2. Crée une classe Student qui hérite de Person et ajoute une propriété school.
// 3. Crée une classe abstraite Shape avec une méthode abstraite area(), puis implémente Circle et Rectangle.
// 4. Crée une interface Drivable avec une méthode drive(), puis une classe Car qui l'implémente.

// 1. Classe Person de base
class Person {
    public name: string;
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet(): void {
        console.log(`Bonjour, je m'appelle ${this.name} et j'ai ${this.age} ans.`);
    }

    // Méthode supplémentaire
    getInfo(): string {
        return `${this.name} (${this.age} ans)`;
    }
}

// 2. Classe Student qui hérite de Person
class Student extends Person {
    public school: string;
    public studentId: string;

    constructor(name: string, age: number, school: string, studentId: string) {
        super(name, age); // Appel du constructeur parent
        this.school = school;
        this.studentId = studentId;
    }

    // Override de la méthode greet
    override greet(): void {
        console.log(`Bonjour, je m'appelle ${this.name}, j'ai ${this.age} ans et j'étudie à ${this.school}.`);
    }

    // Méthode spécifique à Student
    study(subject: string): void {
        console.log(`${this.name} étudie ${subject}.`);
    }
}

// 3. Classe abstraite Shape
abstract class Shape {
    protected color: string;

    constructor(color: string) {
        this.color = color;
    }

    // Méthode abstraite - doit être implémentée dans les classes dérivées
    abstract area(): number;

    // Méthode concrète partagée
    getColor(): string {
        return this.color;
    }

    // Méthode concrète utilisant la méthode abstraite
    describe(): string {
        return `Une forme ${this.color} avec une aire de ${this.area()} unités carrées.`;
    }
}

// Implémentation de Circle
class Circle extends Shape {
    private radius: number;

    constructor(color: string, radius: number) {
        super(color);
        this.radius = radius;
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }

    getRadius(): number {
        return this.radius;
    }
}

// Implémentation de Rectangle
class Rectangle extends Shape {
    private width: number;
    private height: number;

    constructor(color: string, width: number, height: number) {
        super(color);
        this.width = width;
        this.height = height;
    }

    area(): number {
        return this.width * this.height;
    }

    getDimensions(): { width: number; height: number } {
        return { width: this.width, height: this.height };
    }
}

// 4. Interface Drivable
interface Drivable {
    drive(): void;
    stop(): void;
    getSpeed(): number;
}

// Interface supplémentaire pour les véhicules
interface Vehicle {
    brand: string;
    model: string;
    year: number;
}

// Classe Car qui implémente Drivable et Vehicle
class Car implements Drivable, Vehicle {
    public brand: string;
    public model: string;
    public year: number;
    private speed: number = 0;
    private isRunning: boolean = false;

    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    drive(): void {
        if (!this.isRunning) {
            this.start();
        }
        this.speed = 50;
        console.log(`${this.getCarInfo()} roule à ${this.speed} km/h.`);
    }

    stop(): void {
        this.speed = 0;
        this.isRunning = false;
        console.log(`${this.getCarInfo()} s'arrête.`);
    }

    getSpeed(): number {
        return this.speed;
    }

    private start(): void {
        this.isRunning = true;
        console.log(`${this.getCarInfo()} démarre.`);
    }

    private getCarInfo(): string {
        return `${this.brand} ${this.model} (${this.year})`;
    }
}

// Classe supplémentaire pour démonstration
class Motorcycle implements Drivable {
    private speed: number = 0;

    drive(): void {
        this.speed = 80;
        console.log(`La moto roule à ${this.speed} km/h.`);
    }

    stop(): void {
        this.speed = 0;
        console.log("La moto s'arrête.");
    }

    getSpeed(): number {
        return this.speed;
    }
}

// Tests et démonstrations
console.log("=== Exercice 6 : Programmation Orientée Objet ===");

console.log("\n--- Classes Person et Student ---");
const person = new Person("Alice Dupont", 30);
person.greet();
console.log(`Info: ${person.getInfo()}`);

const student = new Student("Bob Martin", 20, "Université de Paris", "STU001");
student.greet();
student.study("TypeScript");

console.log("\n--- Classes abstraites et héritage ---");
const circle = new Circle("rouge", 5);
const rectangle = new Rectangle("bleu", 4, 6);

console.log(`Cercle: ${circle.describe()}`);
console.log(`Rectangle: ${rectangle.describe()}`);

console.log("\n--- Interfaces et implémentation ---");
const car = new Car("Toyota", "Corolla", 2023);
car.drive();
console.log(`Vitesse actuelle: ${car.getSpeed()} km/h`);
car.stop();

const motorcycle = new Motorcycle();
motorcycle.drive();
motorcycle.stop();

// Polymorphisme avec l'interface Drivable
console.log("\n--- Polymorphisme ---");
const vehicles: Drivable[] = [car, motorcycle];

vehicles.forEach((vehicle, index) => {
    console.log(`Véhicule ${index + 1}:`);
    vehicle.drive();
    vehicle.stop();
});

export { 
    Person, 
    Student, 
    Shape, 
    Circle, 
    Rectangle, 
    Car, 
    Motorcycle,
    type Drivable,
    type Vehicle
};