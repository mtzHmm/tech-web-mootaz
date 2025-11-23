// utils/Repository.ts - Repository générique pour gérer livres et utilisateurs

export interface RepositoryInterface<T> {
    add(item: T): void;
    remove(predicate: (item: T) => boolean): boolean;
    find(predicate: (item: T) => boolean): T | undefined;
    findAll(predicate?: (item: T) => boolean): T[];
    getAll(): T[];
    getById(id: number): T | undefined;
    count(): number;
    clear(): void;
}

/**
 * Repository générique pour gérer les entités avec un ID
 */
export class Repository<T extends { id: number }> implements RepositoryInterface<T> {
    private items: T[] = [];

    /**
     * Ajoute un élément au repository
     */
    add(item: T): void {
        // Vérifie si l'ID existe déjà
        if (this.getById(item.id)) {
            throw new Error(`Un élément avec l'ID ${item.id} existe déjà`);
        }
        this.items.push(item);
    }

    /**
     * Supprime un élément selon un prédicat
     */
    remove(predicate: (item: T) => boolean): boolean {
        const index = this.items.findIndex(predicate);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Supprime un élément par ID
     */
    removeById(id: number): boolean {
        return this.remove(item => item.id === id);
    }

    /**
     * Trouve le premier élément correspondant au prédicat
     */
    find(predicate: (item: T) => boolean): T | undefined {
        return this.items.find(predicate);
    }

    /**
     * Trouve tous les éléments correspondant au prédicat
     */
    findAll(predicate?: (item: T) => boolean): T[] {
        if (predicate) {
            return this.items.filter(predicate);
        }
        return [...this.items];
    }

    /**
     * Retourne tous les éléments
     */
    getAll(): T[] {
        return [...this.items]; // Retourne une copie
    }

    /**
     * Trouve un élément par son ID
     */
    getById(id: number): T | undefined {
        return this.items.find(item => item.id === id);
    }

    /**
     * Retourne le nombre d'éléments
     */
    count(): number {
        return this.items.length;
    }

    /**
     * Vide le repository
     */
    clear(): void {
        this.items = [];
    }

    /**
     * Met à jour un élément
     */
    update(id: number, updateFn: (item: T) => T): boolean {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items[index] = updateFn(this.items[index]!);
            return true;
        }
        return false;
    }

    /**
     * Vérifie si un élément existe
     */
    exists(predicate: (item: T) => boolean): boolean {
        return this.items.some(predicate);
    }

    /**
     * Transforme les éléments en utilisant une fonction de mapping
     */
    map<U>(mapper: (item: T) => U): U[] {
        return this.items.map(mapper);
    }

    /**
     * Filtre et transforme les éléments
     */
    filterAndMap<U>(
        predicate: (item: T) => boolean,
        mapper: (item: T) => U
    ): U[] {
        return this.items.filter(predicate).map(mapper);
    }

    /**
     * Trie les éléments selon un comparateur
     */
    sort(compareFn: (a: T, b: T) => number): T[] {
        return [...this.items].sort(compareFn);
    }

    /**
     * Pagine les résultats
     */
    paginate(page: number, pageSize: number): {
        items: T[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    } {
        const total = this.items.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const items = this.items.slice(startIndex, endIndex);

        return {
            items,
            total,
            page,
            pageSize,
            totalPages
        };
    }
}