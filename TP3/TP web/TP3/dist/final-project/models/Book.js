// models/Book.ts - Modèle pour les livres
export class BookImpl {
    id;
    title;
    author;
    year;
    available;
    isbn;
    category;
    constructor(id, title, author, year, isbn, category) {
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
    borrow() {
        if (this.available) {
            this.available = false;
            return true;
        }
        return false;
    }
    /**
     * Marque le livre comme retourné
     */
    return() {
        if (!this.available) {
            this.available = true;
            return true;
        }
        return false;
    }
    /**
     * Obtient une représentation string du livre
     */
    toString() {
        const status = this.available ? "Disponible" : "Emprunté";
        return `${this.title} par ${this.author} (${this.year}) - ${status}`;
    }
    /**
     * Clone le livre
     */
    clone() {
        const cloned = new BookImpl(this.id, this.title, this.author, this.year, this.isbn, this.category);
        cloned.available = this.available;
        return cloned;
    }
}
//# sourceMappingURL=Book.js.map