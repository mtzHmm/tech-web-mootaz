declare function identity<T>(value: T): T;
declare function getFirst<T>(arr: T[]): T | undefined;
declare function getLast<T>(arr: T[]): T | undefined;
declare function getLength<T extends {
    length: number;
}>(item: T): number;
declare class Repository<T> {
    private items;
    add(item: T): void;
    remove(predicate: (item: T) => boolean): boolean;
    getAll(): T[];
    find(predicate: (item: T) => boolean): T | undefined;
    count(): number;
    clear(): void;
    map<U>(mapper: (item: T) => U): U[];
}
interface ApiResponse<T> {
    data: T;
    error?: string;
    success: boolean;
    timestamp: Date;
}
interface User {
    id: number;
    name: string;
    email: string;
}
interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}
declare function createSuccessResponse<T>(data: T): ApiResponse<T>;
declare function createErrorResponse<T>(error: string, fallbackData: T): ApiResponse<T>;
type Comparator<T> = (a: T, b: T) => number;
declare function sort<T>(arr: T[], comparator: Comparator<T>): T[];
declare class Cache<K extends string | number, V> {
    private cache;
    set(key: K, value: V): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    clear(): void;
    size(): number;
}
export { identity, getFirst, getLast, getLength, Repository, Cache, sort, createSuccessResponse, createErrorResponse, type ApiResponse, type User, type Product, type Comparator };
//# sourceMappingURL=exercise7.d.ts.map