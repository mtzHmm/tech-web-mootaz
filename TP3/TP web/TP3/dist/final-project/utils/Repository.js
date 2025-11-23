// utils/Repository.ts - Repository générique pour gérer livres et utilisateurs
/**
 * Repository générique pour gérer les entités avec un ID
 */
export class Repository {
    items = [];
    /**
     * Ajoute un élément au repository
     */
    add(item) {
        // Vérifie si l'ID existe déjà
        if (this.getById(item.id)) {
            throw new Error(`Un élément avec l'ID ${item.id} existe déjà`);
        }
        this.items.push(item);
    }
    /**
     * Supprime un élément selon un prédicat
     */
    remove(predicate) {
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
    removeById(id) {
        return this.remove(item => item.id === id);
    }
    /**
     * Trouve le premier élément correspondant au prédicat
     */
    find(predicate) {
        return this.items.find(predicate);
    }
    /**
     * Trouve tous les éléments correspondant au prédicat
     */
    findAll(predicate) {
        if (predicate) {
            return this.items.filter(predicate);
        }
        return [...this.items];
    }
    /**
     * Retourne tous les éléments
     */
    getAll() {
        return [...this.items]; // Retourne une copie
    }
    /**
     * Trouve un élément par son ID
     */
    getById(id) {
        return this.items.find(item => item.id === id);
    }
    /**
     * Retourne le nombre d'éléments
     */
    count() {
        return this.items.length;
    }
    /**
     * Vide le repository
     */
    clear() {
        this.items = [];
    }
    /**
     * Met à jour un élément
     */
    update(id, updateFn) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items[index] = updateFn(this.items[index]);
            return true;
        }
        return false;
    }
    /**
     * Vérifie si un élément existe
     */
    exists(predicate) {
        return this.items.some(predicate);
    }
    /**
     * Transforme les éléments en utilisant une fonction de mapping
     */
    map(mapper) {
        return this.items.map(mapper);
    }
    /**
     * Filtre et transforme les éléments
     */
    filterAndMap(predicate, mapper) {
        return this.items.filter(predicate).map(mapper);
    }
    /**
     * Trie les éléments selon un comparateur
     */
    sort(compareFn) {
        return [...this.items].sort(compareFn);
    }
    /**
     * Pagine les résultats
     */
    paginate(page, pageSize) {
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
//# sourceMappingURL=Repository.js.map