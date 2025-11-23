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
export declare class Repository<T extends {
    id: number;
}> implements RepositoryInterface<T> {
    private items;
    /**
     * Ajoute un élément au repository
     */
    add(item: T): void;
    /**
     * Supprime un élément selon un prédicat
     */
    remove(predicate: (item: T) => boolean): boolean;
    /**
     * Supprime un élément par ID
     */
    removeById(id: number): boolean;
    /**
     * Trouve le premier élément correspondant au prédicat
     */
    find(predicate: (item: T) => boolean): T | undefined;
    /**
     * Trouve tous les éléments correspondant au prédicat
     */
    findAll(predicate?: (item: T) => boolean): T[];
    /**
     * Retourne tous les éléments
     */
    getAll(): T[];
    /**
     * Trouve un élément par son ID
     */
    getById(id: number): T | undefined;
    /**
     * Retourne le nombre d'éléments
     */
    count(): number;
    /**
     * Vide le repository
     */
    clear(): void;
    /**
     * Met à jour un élément
     */
    update(id: number, updateFn: (item: T) => T): boolean;
    /**
     * Vérifie si un élément existe
     */
    exists(predicate: (item: T) => boolean): boolean;
    /**
     * Transforme les éléments en utilisant une fonction de mapping
     */
    map<U>(mapper: (item: T) => U): U[];
    /**
     * Filtre et transforme les éléments
     */
    filterAndMap<U>(predicate: (item: T) => boolean, mapper: (item: T) => U): U[];
    /**
     * Trie les éléments selon un comparateur
     */
    sort(compareFn: (a: T, b: T) => number): T[];
    /**
     * Pagine les résultats
     */
    paginate(page: number, pageSize: number): {
        items: T[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    };
}
//# sourceMappingURL=Repository.d.ts.map