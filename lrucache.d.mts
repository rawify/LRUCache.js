
declare class LRUCache<K = any, V = any> {
    constructor(limit: number);

    private _isExpired(entry: { value: V; expiresAt: number | null }): boolean;

    limit: number;
    cache: Map<K, { value: V; expiresAt: number | null }>;

    get(key: K): V | undefined;
    set(key: K, value: V, ttlMs?: number | null): void;
    has(key: K): boolean;
    delete(key: K): boolean;
    clear(): void;
    size(): number;
    keys(): K[];
    values(): V[];
    cleanup(): number;
}

export default LRUCache;