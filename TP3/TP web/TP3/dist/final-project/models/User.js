// models/User.ts - Modèles pour les utilisateurs et administrateurs
export var Role;
(function (Role) {
    Role["User"] = "User";
    Role["Admin"] = "Admin";
})(Role || (Role = {}));
// Classe abstraite Person factorise User et Admin
export class Person {
    id;
    name;
    email;
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    /**
     * Obtient les informations de base de la personne
     */
    getInfo() {
        const emailPart = this.email ? ` (${this.email})` : "";
        return `${this.name}${emailPart} - ${this.getRole()}`;
    }
}
export class User extends Person {
    role = Role.User;
    borrowedBooks = [];
    maxBorrowedBooks = 5;
    constructor(id, name, email) {
        super(id, name, email);
    }
    getRole() {
        return this.role;
    }
    canPerformAction(action) {
        const allowedActions = ["borrow", "return", "search"];
        return allowedActions.includes(action);
    }
    /**
     * Ajoute un livre aux livres empruntés
     */
    borrowBook(bookId) {
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
    returnBook(bookId) {
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
    canBorrowMore() {
        return this.borrowedBooks.length < this.maxBorrowedBooks;
    }
    /**
     * Obtient le nombre de livres empruntés
     */
    getBorrowedCount() {
        return this.borrowedBooks.length;
    }
}
export class Admin extends Person {
    role = Role.Admin;
    borrowedBooks = [];
    permissions;
    constructor(id, name, permissions = [], email) {
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
    getRole() {
        return this.role;
    }
    canPerformAction(action) {
        return this.permissions.includes(action);
    }
    /**
     * Ajoute une permission
     */
    addPermission(permission) {
        if (!this.permissions.includes(permission)) {
            this.permissions.push(permission);
        }
    }
    /**
     * Retire une permission
     */
    removePermission(permission) {
        const index = this.permissions.indexOf(permission);
        if (index > -1) {
            this.permissions.splice(index, 1);
        }
    }
    /**
     * Vérifie si l'admin a une permission spécifique
     */
    hasPermission(permission) {
        return this.permissions.includes(permission);
    }
    /**
     * Les admins peuvent emprunter sans limite
     */
    borrowBook(bookId) {
        if (!this.borrowedBooks.includes(bookId)) {
            this.borrowedBooks.push(bookId);
            return true;
        }
        return false;
    }
    /**
     * Retire un livre des livres empruntés
     */
    returnBook(bookId) {
        const index = this.borrowedBooks.indexOf(bookId);
        if (index > -1) {
            this.borrowedBooks.splice(index, 1);
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=User.js.map