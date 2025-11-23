export declare enum Role {
    User = "User",
    Admin = "Admin"
}
export interface UserData {
    id: number;
    name: string;
    role: Role;
    email?: string | undefined;
    borrowedBooks?: number[] | undefined;
}
export declare abstract class Person {
    id: number;
    name: string;
    email?: string | undefined;
    constructor(id: number, name: string, email?: string | undefined);
    abstract getRole(): Role;
    /**
     * Obtient les informations de base de la personne
     */
    getInfo(): string;
    /**
     * Vérifie si la personne peut effectuer une action
     */
    abstract canPerformAction(action: string): boolean;
}
export declare class User extends Person implements UserData {
    role: Role;
    borrowedBooks: number[];
    readonly maxBorrowedBooks: number;
    constructor(id: number, name: string, email?: string | undefined);
    getRole(): Role;
    canPerformAction(action: string): boolean;
    /**
     * Ajoute un livre aux livres empruntés
     */
    borrowBook(bookId: number): boolean;
    /**
     * Retire un livre des livres empruntés
     */
    returnBook(bookId: number): boolean;
    /**
     * Vérifie si l'utilisateur peut emprunter plus de livres
     */
    canBorrowMore(): boolean;
    /**
     * Obtient le nombre de livres empruntés
     */
    getBorrowedCount(): number;
}
export declare class Admin extends Person implements UserData {
    role: Role;
    borrowedBooks: number[];
    permissions: string[];
    constructor(id: number, name: string, permissions?: string[], email?: string | undefined);
    getRole(): Role;
    canPerformAction(action: string): boolean;
    /**
     * Ajoute une permission
     */
    addPermission(permission: string): void;
    /**
     * Retire une permission
     */
    removePermission(permission: string): void;
    /**
     * Vérifie si l'admin a une permission spécifique
     */
    hasPermission(permission: string): boolean;
    /**
     * Les admins peuvent emprunter sans limite
     */
    borrowBook(bookId: number): boolean;
    /**
     * Retire un livre des livres empruntés
     */
    returnBook(bookId: number): boolean;
}
//# sourceMappingURL=User.d.ts.map