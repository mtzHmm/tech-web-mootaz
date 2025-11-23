// services/ApiService.ts - Service API fictif pour récupérer des livres
/**
 * Service API fictif pour simuler des appels réseau
 */
export class ApiService {
    static instance;
    // private readonly baseUrl: string = "https://api.library.example.com";
    constructor() { }
    static getInstance() {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }
    /**
     * Simule un délai réseau
     */
    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    /**
     * Simule la récupération d'une liste de livres depuis une API
     */
    async fetchBooks() {
        console.log("📡 Récupération des livres depuis l'API...");
        await this.delay(1000); // Simule une latence réseau
        try {
            // Données fictives de livres
            const books = [
                {
                    id: 1,
                    title: "TypeScript Handbook",
                    author: "Microsoft",
                    year: 2023,
                    available: true,
                    isbn: "978-0123456789",
                    category: "Programming"
                },
                {
                    id: 2,
                    title: "Clean Code",
                    author: "Robert C. Martin",
                    year: 2008,
                    available: true,
                    isbn: "978-0132350884",
                    category: "Programming"
                },
                {
                    id: 3,
                    title: "Design Patterns",
                    author: "Gang of Four",
                    year: 1994,
                    available: false,
                    isbn: "978-0201633612",
                    category: "Programming"
                },
                {
                    id: 4,
                    title: "The Pragmatic Programmer",
                    author: "David Thomas",
                    year: 1999,
                    available: true,
                    isbn: "978-0201616224",
                    category: "Programming"
                },
                {
                    id: 5,
                    title: "JavaScript: The Good Parts",
                    author: "Douglas Crockford",
                    year: 2008,
                    available: true,
                    isbn: "978-0596517748",
                    category: "Programming"
                }
            ];
            return {
                data: books,
                success: true,
                message: `${books.length} livres récupérés avec succès`
            };
        }
        catch (error) {
            return {
                data: [],
                success: false,
                error: "Erreur lors de la récupération des livres",
                message: "Impossible de contacter le serveur"
            };
        }
    }
    /**
     * Simule la récupération d'un livre par son ID
     */
    async fetchBookById(id) {
        console.log(`📡 Récupération du livre ID ${id}...`);
        await this.delay(500);
        try {
            const allBooksResponse = await this.fetchBooks();
            if (!allBooksResponse.success) {
                return {
                    data: null,
                    success: false,
                    error: allBooksResponse.error
                };
            }
            const book = allBooksResponse.data.find(b => b.id === id);
            if (book) {
                return {
                    data: book,
                    success: true,
                    message: "Livre trouvé"
                };
            }
            else {
                return {
                    data: null,
                    success: false,
                    error: `Livre avec l'ID ${id} non trouvé`
                };
            }
        }
        catch (error) {
            return {
                data: null,
                success: false,
                error: "Erreur lors de la récupération du livre"
            };
        }
    }
    /**
     * Simule la recherche de livres par critères
     */
    async searchBooks(query) {
        console.log(`📡 Recherche de livres: "${query}"...`);
        await this.delay(800);
        try {
            const allBooksResponse = await this.fetchBooks();
            if (!allBooksResponse.success) {
                return {
                    data: [],
                    success: false,
                    error: allBooksResponse.error
                };
            }
            const filteredBooks = allBooksResponse.data.filter(book => book.title.toLowerCase().includes(query.toLowerCase()) ||
                book.author.toLowerCase().includes(query.toLowerCase()) ||
                (book.category && book.category.toLowerCase().includes(query.toLowerCase())));
            return {
                data: filteredBooks,
                success: true,
                message: `${filteredBooks.length} livre(s) trouvé(s)`
            };
        }
        catch (error) {
            return {
                data: [],
                success: false,
                error: "Erreur lors de la recherche"
            };
        }
    }
    /**
     * Simule l'ajout d'un livre via API
     */
    async addBook(book) {
        console.log(`📡 Ajout d'un nouveau livre: "${book.title}"...`);
        await this.delay(600);
        try {
            // Simule la génération d'un ID par le serveur
            const newId = Math.floor(Math.random() * 10000) + 1000;
            const newBook = {
                ...book,
                id: newId
            };
            return {
                data: newBook,
                success: true,
                message: `Livre "${book.title}" ajouté avec succès`
            };
        }
        catch (error) {
            return {
                data: {},
                success: false,
                error: "Erreur lors de l'ajout du livre"
            };
        }
    }
    /**
     * Simule la mise à jour du statut d'un livre
     */
    async updateBookStatus(bookId, available) {
        console.log(`📡 Mise à jour du statut du livre ID ${bookId}...`);
        await this.delay(400);
        try {
            // Simule une mise à jour réussie
            return {
                data: true,
                success: true,
                message: `Statut du livre mis à jour: ${available ? "disponible" : "emprunté"}`
            };
        }
        catch (error) {
            return {
                data: false,
                success: false,
                error: "Erreur lors de la mise à jour du statut"
            };
        }
    }
}
//# sourceMappingURL=ApiService.js.map