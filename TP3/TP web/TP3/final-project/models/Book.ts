// models/Book.ts - Modèle pour les livres

export interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    available: boolean;
    isbn?: string | undefined;
    category?: string | undefined;
}

export class BookImpl implements Book {
    public id: number;
    public title: string;
    public author: string;
    public year: number;
    public available: boolean;
    public isbn?: string | undefined;
    public category?: string | undefined;

    constructor(
        id: number,
        title: string,
        author: string,
        year: number,
        isbn?: string | undefined,
        category?: string | undefined
    ) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.available = true; // Par défaut disponible
        this.isbn = isbn;
        this.category = category;
    }

    /**
     * Marque le livre comme emprunté
     */
    borrow(): boolean {
        if (this.available) {
            this.available = false;
            return true;
        }
        return false;
    }

    /**
     * Marque le livre comme retourné
     */
    return(): boolean {
        if (!this.available) {
            this.available = true;
            return true;
        }
        return false;
    }

    /**
     * Obtient une représentation string du livre
     */
    toString(): string {
        const status = this.available ? "Disponible" : "Emprunté";
        return `${this.title} par ${this.author} (${this.year}) - ${status}`;
    }

    /**
     * Clone le livre
     */
    clone(): BookImpl {
        const cloned = new BookImpl(
            this.id,
            this.title,
            this.author,
            this.year,
            this.isbn,
            this.category
        );
        cloned.available = this.available;
        return cloned;
    }
}