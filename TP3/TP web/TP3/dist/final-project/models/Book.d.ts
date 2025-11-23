export interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    available: boolean;
    isbn?: string | undefined;
    category?: string | undefined;
}
export declare class BookImpl implements Book {
    id: number;
    title: string;
    author: string;
    year: number;
    available: boolean;
    isbn?: string | undefined;
    category?: string | undefined;
    constructor(id: number, title: string, author: string, year: number, isbn?: string | undefined, category?: string | undefined);
    /**
     * Marque le livre comme emprunté
     */
    borrow(): boolean;
    /**
     * Marque le livre comme retourné
     */
    return(): boolean;
    /**
     * Obtient une représentation string du livre
     */
    toString(): string;
    /**
     * Clone le livre
     */
    clone(): BookImpl;
}
//# sourceMappingURL=Book.d.ts.map