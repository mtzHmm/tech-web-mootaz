// models/User.ts - Modèles pour les utilisateurs et administrateurs

export enum Role {
    User = "User",
    Admin = "Admin"
}

export interface UserData {
    id: number;
    name: string;
    role: Role;
    email?: string | undefined;
    borrowedBooks?: number[] | undefined; // IDs des livres empruntés
}

// Classe abstraite Person factorise User et Admin
export abstract class Person {
    public id: number;
    public name: string;
    public email?: string | undefined;

    constructor(id: number, name: string, email?: string | undefined) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    abstract getRole(): Role;
    
    /**
     * Obtient les informations de base de la personne
     */
    getInfo(): string {
        const emailPart = this.email ? ` (${this.email})` : "";
        return `${this.name}${emailPart} - ${this.getRole()}`;
    }

    /**
     * Vérifie si la personne peut effectuer une action
     */
    abstract canPerformAction(action: string): boolean;
}

export class User extends Person implements UserData {
    public role: Role = Role.User;
    public borrowedBooks: number[] = [];
    public readonly maxBorrowedBooks: number = 5;

    constructor(id: number, name: string, email?: string | undefined) {
        super(id, name, email);
    }

    getRole(): Role {
        return this.role;
    }

    canPerformAction(action: string): boolean {
        const allowedActions = ["borrow", "return", "search"];
        return allowedActions.includes(action);
    }

    /**
     * Ajoute un livre aux livres empruntés
     */
    borrowBook(bookId: number): boolean {
        if (this.borrowedBooks.length >= this.maxBorrowedBooks) {
            return false;
        }
        if (!this.borrowedBooks.includes(bookId)) {
            this.borrowedBooks.push(bookId);
            return true;
        }
        return false;
    }

    /**
     * Retire un livre des livres empruntés
     */
    returnBook(bookId: number): boolean {
        const index = this.borrowedBooks.indexOf(bookId);
        if (index > -1) {
            this.borrowedBooks.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Vérifie si l'utilisateur peut emprunter plus de livres
     */
    canBorrowMore(): boolean {
        return this.borrowedBooks.length < this.maxBorrowedBooks;
    }

    /**
     * Obtient le nombre de livres empruntés
     */
    getBorrowedCount(): number {
        return this.borrowedBooks.length;
    }
}

export class Admin extends Person implements UserData {
    public role: Role = Role.Admin;
    public borrowedBooks: number[] = [];
    public permissions: string[];

    constructor(
        id: number, 
        name: string, 
        permissions: string[] = [], 
        email?: string | undefined
    ) {
        super(id, name, email);
        this.permissions = permissions.length > 0 ? permissions : [
            "add_book",
            "remove_book", 
            "manage_users",
            "view_reports",
            "borrow",
            "return",
            "search"
        ];
    }

    getRole(): Role {
        return this.role;
    }

    canPerformAction(action: string): boolean {
        return this.permissions.includes(action);
    }

    /**
     * Ajoute une permission
     */
    addPermission(permission: string): void {
        if (!this.permissions.includes(permission)) {
            this.permissions.push(permission);
        }
    }

    /**
     * Retire une permission
     */
    removePermission(permission: string): void {
        const index = this.permissions.indexOf(permission);
        if (index > -1) {
            this.permissions.splice(index, 1);
        }
    }

    /**
     * Vérifie si l'admin a une permission spécifique
     */
    hasPermission(permission: string): boolean {
        return this.permissions.includes(permission);
    }

    /**
     * Les admins peuvent emprunter sans limite
     */
    borrowBook(bookId: number): boolean {
        if (!this.borrowedBooks.includes(bookId)) {
            this.borrowedBooks.push(bookId);
            return true;
        }
        return false;
    }

    /**
     * Retire un livre des livres empruntés
     */
    returnBook(bookId: number): boolean {
        const index = this.borrowedBooks.indexOf(bookId);
        if (index > -1) {
            this.borrowedBooks.splice(index, 1);
            return true;
        }
        return false;
    }
}