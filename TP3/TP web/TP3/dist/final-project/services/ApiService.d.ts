import type { Book } from "../models/Book.js";
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string | undefined;
    error?: string | undefined;
}
/**
 * Service API fictif pour simuler des appels réseau
 */
export declare class ApiService {
    private static instance;
    private constructor();
    static getInstance(): ApiService;
    /**
     * Simule un délai réseau
     */
    private delay;
    /**
     * Simule la récupération d'une liste de livres depuis une API
     */
    fetchBooks(): Promise<ApiResponse<Book[]>>;
    /**
     * Simule la récupération d'un livre par son ID
     */
    fetchBookById(id: number): Promise<ApiResponse<Book | null>>;
    /**
     * Simule la recherche de livres par critères
     */
    searchBooks(query: string): Promise<ApiResponse<Book[]>>;
    /**
     * Simule l'ajout d'un livre via API
     */
    addBook(book: Omit<Book, "id">): Promise<ApiResponse<Book>>;
    /**
     * Simule la mise à jour du statut d'un livre
     */
    updateBookStatus(bookId: number, available: boolean): Promise<ApiResponse<boolean>>;
}
//# sourceMappingURL=ApiService.d.ts.map