/**
 * @license LRUCache.js v0.0.2 8/13/2025
 * https://github.com/rawify/LRUCache.js
 *
 * Copyright (c) 2025, Robert Eisele (https://raw.org/)
 * Licensed under the MIT license.
 **/

function LRUCache(limit) {
    this['limit'] = limit;
    this['cache'] = new Map();
}

LRUCache.prototype = {

    'limit': 0,
    'cache': null,

    '_isExpired': function (entry) {
        return entry['expiresAt'] !== null && Date.now() > entry['expiresAt'];
    },

    'get': function (key) {

        if (!this['cache'].has(key)) return undefined;

        const entry = this['cache'].get(key);
        if (this['_isExpired'](entry)) {
            this['cache'].delete(key);
            return undefined;
        }

        // Move to most recently used
        this['cache'].delete(key);
        this['cache'].set(key, entry);

        return entry.value;
    },

    'set': function (key, value, ttlMs = null) {

        const entry = this['cache'].get(key);
        const isUpdate = entry !== undefined && !this['_isExpired'](entry);

        // Always remove key first (for updates: reposition to end, for expired/new: cleanup)
        this['cache'].delete(key);

        // Evict LRU if at capacity and this is a new insertion
        if (!isUpdate && this['cache'].size >= this['limit']) {
            this['cache'].delete(this['cache'].keys().next().value);
        }

        this['cache'].set(key, {
            value,
            expiresAt: ttlMs !== null ? Date.now() + ttlMs : null
        });
    },

    'has': function (key) {

        if (!this['cache'].has(key)) return false;

        const entry = this['cache'].get(key);
        if (this['_isExpired'](entry)) {
            this['cache'].delete(key);
            return false;
        }

        // Move to most recently used
        this['cache'].delete(key);
        this['cache'].set(key, entry);

        return true;
    },

    'delete': function (key) {
        return this['cache'].delete(key);
    },

    'clear': function () {
        this['cache'].clear();
    },

    'size': function () {
        let count = 0;
        for (const [_, entry] of this['cache']) {
            if (!this['_isExpired'](entry)) count++;
        }
        return count;
    },

    'keys': function () {
        const result = [];
        for (const [key, entry] of this['cache']) {
            if (!this['_isExpired'](entry)) result.push(key);
        }
        return result;
    },

    'values': function () {
        const result = [];
        for (const [, entry] of this['cache']) {
            if (!this['_isExpired'](entry)) result.push(entry.value);
        }
        return result;
    },

    'cleanup': function () {
        const keysToDelete = [];
        for (const [key, entry] of this['cache']) {
            if (this['_isExpired'](entry)) {
                keysToDelete.push(key);
            }
        }
        keysToDelete.forEach(key => this['cache'].delete(key));
        return keysToDelete.length;
    }
};
