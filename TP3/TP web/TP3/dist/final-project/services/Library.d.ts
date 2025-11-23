import type { Book } from "../models/Book.js";
import type { UserData } from "../models/User.js";
import { User, Admin } from "../models/User.js";
export interface BorrowTransaction {
    id: number;
    userId: number;
    bookId: number;
    borrowDate: Date;
    dueDate: Date;
    returnDate?: Date | undefined;
}
export interface LibraryStats {
    totalBooks: number;
    availableBooks: number;
    borrowedBooks: number;
    totalUsers: number;
    totalAdmins: number;
    activeBorrows: number;
}
/**
 * Classe principale pour gérer la bibliothèque
 */
export declare class Library {
    private bookRepository;
    private userRepository;
    private transactionRepository;
    private apiService;
    private nextTransactionId;
    constructor();
    /**
     * Ajoute un livre à la bibliothèque
     */
    addBook(title: string, author: string, year: number, isbn?: string | undefined, category?: string | undefined): Book;
    /**
     * Retire un livre de la bibliothèque
     */
    removeBook(bookId: number): boolean;
    /**
     * Recherche des livres par titre, auteur ou catégorie
     */
    searchBooks(query: string): Book[];
    /**
     * Obtient tous les livres
     */
    getAllBooks(): Book[];
    /**
     * Obtient les livres disponibles
     */
    getAvailableBooks(): Book[];
    /**
     * Obtient les livres empruntés
     */
    getBorrowedBooks(): Book[];
    /**
     * Ajoute un utilisateur
     */
    addUser(name: string, email?: string | undefined): User;
    /**
     * Ajoute un administrateur
     */
    addAdmin(name: string, permissions?: string[], email?: string | undefined): Admin;
    /**
     * Trouve un utilisateur par ID
     */
    getUserById(userId: number): UserData | undefined;
    /**
     * Obtient tous les utilisateurs
     */
    getAllUsers(): UserData[];
    /**
     * Emprunte un livre
     */
    borrowBook(userId: number, bookId: number): boolean;
    /**
     * Retourne un livre
     */
    returnBook(userId: number, bookId: number): boolean;
    /**
     * Charge les livres depuis l'API fictive
     */
    loadBooksFromApi(): Promise<void>;
    /**
     * Obtient les statistiques de la bibliothèque
     */
    getStats(): LibraryStats;
    /**
     * Affiche les statistiques
     */
    displayStats(): void;
    private generateBookId;
    private generateUserId;
    /**
     * Affiche tous les livres
     */
    displayBooks(): void;
    /**
     * Affiche tous les utilisateurs
     */
    displayUsers(): void;
}
//# sourceMappingURL=Library.d.ts.map