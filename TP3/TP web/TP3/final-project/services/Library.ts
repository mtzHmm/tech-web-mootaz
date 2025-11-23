// services/Library.ts - Classe principale pour gérer la bibliothèque

import type { Book } from "../models/Book.js";
import { BookImpl } from "../models/Book.js";
import type { UserData } from "../models/User.js";
import { User, Admin, Role } from "../models/User.js";
import { Repository } from "../utils/Repository.js";
import { ApiService, type ApiResponse } from "./ApiService.js";

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
export class Library {
    private bookRepository: Repository<Book>;
    private userRepository: Repository<UserData>;
    private transactionRepository: Repository<BorrowTransaction>;
    private apiService: ApiService;
    private nextTransactionId: number = 1;

    constructor() {
        this.bookRepository = new Repository<Book>();
        this.userRepository = new Repository<UserData>();
        this.transactionRepository = new Repository<BorrowTransaction>();
        this.apiService = ApiService.getInstance();
    }

    // === GESTION DES LIVRES ===

    /**
     * Ajoute un livre à la bibliothèque
     */
    addBook(
        title: string, 
        author: string, 
        year: number, 
        isbn?: string | undefined, 
        category?: string | undefined
    ): Book {
        const id = this.generateBookId();
        const book = new BookImpl(id, title, author, year, isbn, category);
        this.bookRepository.add(book);
        console.log(`📚 Livre ajouté: ${book.toString()}`);
        return book;
    }

    /**
     * Retire un livre de la bibliothèque
     */
    removeBook(bookId: number): boolean {
        const book = this.bookRepository.getById(bookId);
        if (!book) {
            console.log(`❌ Livre avec l'ID ${bookId} non trouvé`);
            return false;
        }

        if (!book.available) {
            console.log(`❌ Impossible de supprimer le livre "${book.title}" car il est actuellement emprunté`);
            return false;
        }

        const removed = this.bookRepository.removeById(bookId);
        if (removed) {
            console.log(`🗑️ Livre supprimé: ${book.title}`);
        }
        return removed;
    }

    /**
     * Recherche des livres par titre, auteur ou catégorie
     */
    searchBooks(query: string): Book[] {
        const results = this.bookRepository.findAll(book => 
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase()) ||
            Boolean(book.category && book.category.toLowerCase().includes(query.toLowerCase()))
        );

        console.log(`🔍 Recherche "${query}": ${results.length} résultat(s) trouvé(s)`);
        return results;
    }

    /**
     * Obtient tous les livres
     */
    getAllBooks(): Book[] {
        return this.bookRepository.getAll();
    }

    /**
     * Obtient les livres disponibles
     */
    getAvailableBooks(): Book[] {
        return this.bookRepository.findAll(book => book.available);
    }

    /**
     * Obtient les livres empruntés
     */
    getBorrowedBooks(): Book[] {
        return this.bookRepository.findAll(book => !book.available);
    }

    // === GESTION DES UTILISATEURS ===

    /**
     * Ajoute un utilisateur
     */
    addUser(name: string, email?: string | undefined): User {
        const id = this.generateUserId();
        const user = new User(id, name, email);
        this.userRepository.add(user);
        console.log(`👤 Utilisateur ajouté: ${user.getInfo()}`);
        return user;
    }

    /**
     * Ajoute un administrateur
     */
    addAdmin(
        name: string, 
        permissions: string[] = [], 
        email?: string | undefined
    ): Admin {
        const id = this.generateUserId();
        const admin = new Admin(id, name, permissions, email);
        this.userRepository.add(admin);
        console.log(`👨‍💼 Administrateur ajouté: ${admin.getInfo()}`);
        return admin;
    }

    /**
     * Trouve un utilisateur par ID
     */
    getUserById(userId: number): UserData | undefined {
        return this.userRepository.getById(userId);
    }

    /**
     * Obtient tous les utilisateurs
     */
    getAllUsers(): UserData[] {
        return this.userRepository.getAll();
    }

    // === GESTION DES EMPRUNTS ===

    /**
     * Emprunte un livre
     */
    borrowBook(userId: number, bookId: number): boolean {
        const user = this.userRepository.getById(userId);
        const book = this.bookRepository.getById(bookId);

        if (!user) {
            console.log(`❌ Utilisateur avec l'ID ${userId} non trouvé`);
            return false;
        }

        if (!book) {
            console.log(`❌ Livre avec l'ID ${bookId} non trouvé`);
            return false;
        }

        if (!book.available) {
            console.log(`❌ Le livre "${book.title}" n'est pas disponible`);
            return false;
        }

        // Vérifie les limites d'emprunt pour les utilisateurs normaux
        if (user.role === Role.User) {
            const userObj = new User(user.id, user.name, user.email);
            userObj.borrowedBooks = user.borrowedBooks || [];
            
            if (!userObj.canBorrowMore()) {
                console.log(`❌ ${user.name} a atteint la limite d'emprunts`);
                return false;
            }
        }

        // Effectue l'emprunt
        book.available = false;
        if (!user.borrowedBooks) {
            user.borrowedBooks = [];
        }
        user.borrowedBooks.push(bookId);

        // Enregistre la transaction
        const transaction: BorrowTransaction = {
            id: this.nextTransactionId++,
            userId,
            bookId,
            borrowDate: new Date(),
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 jours
        };
        this.transactionRepository.add(transaction);

        console.log(`📖 ${user.name} a emprunté "${book.title}"`);
        return true;
    }

    /**
     * Retourne un livre
     */
    returnBook(userId: number, bookId: number): boolean {
        const user = this.userRepository.getById(userId);
        const book = this.bookRepository.getById(bookId);

        if (!user || !book) {
            console.log(`❌ Utilisateur ou livre non trouvé`);
            return false;
        }

        if (!user.borrowedBooks || !user.borrowedBooks.includes(bookId)) {
            console.log(`❌ ${user.name} n'a pas emprunté ce livre`);
            return false;
        }

        // Effectue le retour
        book.available = true;
        const index = user.borrowedBooks.indexOf(bookId);
        user.borrowedBooks.splice(index, 1);

        // Met à jour la transaction
        const transaction = this.transactionRepository.find(t => 
            t.userId === userId && t.bookId === bookId && !t.returnDate
        );
        if (transaction) {
            transaction.returnDate = new Date();
        }

        console.log(`📚 ${user.name} a retourné "${book.title}"`);
        return true;
    }

    // === CHARGEMENT DEPUIS L'API ===

    /**
     * Charge les livres depuis l'API fictive
     */
    async loadBooksFromApi(): Promise<void> {
        try {
            const response: ApiResponse<Book[]> = await this.apiService.fetchBooks();
            
            if (response.success) {
                response.data.forEach(bookData => {
                    try {
                        const book = new BookImpl(
                            bookData.id,
                            bookData.title,
                            bookData.author,
                            bookData.year,
                            bookData.isbn,
                            bookData.category
                        );
                        book.available = bookData.available;
                        
                        // Vérifie si le livre existe déjà
                        if (!this.bookRepository.getById(book.id)) {
                            this.bookRepository.add(book);
                        }
                    } catch (error) {
                        console.log(`⚠️ Erreur lors de l'ajout du livre "${bookData.title}": ${error}`);
                    }
                });
                console.log(`✅ ${response.data.length} livres chargés depuis l'API`);
            } else {
                console.log(`❌ Erreur API: ${response.error}`);
            }
        } catch (error) {
            console.log(`❌ Erreur lors du chargement: ${error}`);
        }
    }

    // === STATISTIQUES ===

    /**
     * Obtient les statistiques de la bibliothèque
     */
    getStats(): LibraryStats {
        const totalBooks = this.bookRepository.count();
        const availableBooks = this.getAvailableBooks().length;
        const borrowedBooks = this.getBorrowedBooks().length;
        const users = this.userRepository.getAll();
        const totalUsers = users.filter(u => u.role === Role.User).length;
        const totalAdmins = users.filter(u => u.role === Role.Admin).length;
        const activeBorrows = this.transactionRepository.findAll(t => !t.returnDate).length;

        return {
            totalBooks,
            availableBooks,
            borrowedBooks,
            totalUsers,
            totalAdmins,
            activeBorrows
        };
    }

    /**
     * Affiche les statistiques
     */
    displayStats(): void {
        const stats = this.getStats();
        console.log("\n📊 === STATISTIQUES DE LA BIBLIOTHÈQUE ===");
        console.log(`📚 Total des livres: ${stats.totalBooks}`);
        console.log(`✅ Livres disponibles: ${stats.availableBooks}`);
        console.log(`📖 Livres empruntés: ${stats.borrowedBooks}`);
        console.log(`👤 Utilisateurs: ${stats.totalUsers}`);
        console.log(`👨‍💼 Administrateurs: ${stats.totalAdmins}`);
        console.log(`🔄 Emprunts actifs: ${stats.activeBorrows}`);
    }

    // === MÉTHODES UTILITAIRES ===

    private generateBookId(): number {
        const existingIds = this.bookRepository.map(book => book.id);
        return existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    }

    private generateUserId(): number {
        const existingIds = this.userRepository.map(user => user.id);
        return existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    }

    /**
     * Affiche tous les livres
     */
    displayBooks(): void {
        const books = this.getAllBooks();
        console.log(`\n📚 === LISTE DES LIVRES (${books.length}) ===`);
        books.forEach(book => {
            const status = book.available ? "✅ Disponible" : "❌ Emprunté";
            console.log(`${book.id}. ${book.title} par ${book.author} (${book.year}) - ${status}`);
        });
    }

    /**
     * Affiche tous les utilisateurs
     */
    displayUsers(): void {
        const users = this.getAllUsers();
        console.log(`\n👥 === LISTE DES UTILISATEURS (${users.length}) ===`);
        users.forEach(user => {
            const borrowedCount = user.borrowedBooks ? user.borrowedBooks.length : 0;
            console.log(`${user.id}. ${user.name} (${user.role}) - ${borrowedCount} livre(s) emprunté(s)`);
        });
    }
}