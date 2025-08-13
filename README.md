# LRUCache.js - A LRU Cache implementation in JavaScript

[![NPM Package](https://img.shields.io/npm/v/@rawify/lrucache.svg?style=flat)](https://www.npmjs.com/package/@rawify/lrucache "View this project on npm")
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

`LRUCache.js` is a lightweight and efficient **Least Recently Used (LRU) cache** implementation for JavaScript.
It stores a fixed number of items, automatically evicting the least recently used entry when the cache reaches its limit.
Optional **per-item TTL (time-to-live)** support allows for automatic expiration of stale entries.

## Features

* **LRU eviction** — least recently used entries are removed first
* **Optional TTL** — each entry can expire automatically
* **Fast lookups, insertions, and deletions** using `Map`
* **Size-limited** — configurable maximum number of entries
* **Utility methods** for keys, values, and cache cleanup
* **Zero dependencies** — works in Node.js and browsers

## Installation

Install via npm:

```bash
npm install @rawify/lrucache
```

Or with yarn:

```bash
yarn add @rawify/lrucache
```

Or clone the repository:

```bash
git clone https://github.com/rawify/LRUCache.js
```

## Usage

Include the `lrucache.min.js` file in your project:

```html
<script src="path/to/lrucache.min.js"></script>
```

Or in a Node.js / ES module project:

```javascript
const LRUCache = require('@rawify/lrucache');
// or
import LRUCache from '@rawify/lrucache';
```

### Creating a Cache

```javascript
const cache = new LRUCache(3); // limit = 3 entries
```

### `set(key, value, ttlMs?)`

Adds or updates a cache entry.
`ttlMs` is optional; if given, the entry expires after `ttlMs` milliseconds.

```javascript
cache.set('a', 1);
cache.set('b', 2, 1000); // expires after 1s
```

### `get(key)`

Retrieves the value for `key` and marks it as most recently used.
Returns `undefined` if the key is not found or has expired.

```javascript
cache.get('a'); // 1
```

### `has(key)`

Checks if the key exists and is not expired, and marks it as most recently used.

```javascript
cache.has('a'); // true
```

### `delete(key)`

Removes the entry for `key`.

```javascript
cache.delete('a');
```

### `clear()`

Removes all entries.

```javascript
cache.clear();
```

### `size()`

Returns the number of **non-expired** entries.

```javascript
cache.size(); // 2
```

### `keys()`

Returns an array of keys for **non-expired** entries.

```javascript
cache.keys(); // ['b', 'c']
```

### `values()`

Returns an array of values for **non-expired** entries.

```javascript
cache.values(); // [2, 3]
```

### `cleanup()`

Removes expired entries and returns the number of removed keys.

```javascript
cache.cleanup(); // 1
```

## Example

```javascript
const cache = new LRUCache(2);

cache.set('x', 42);
cache.set('y', 99);
cache.get('x'); // access x so it's most recent
cache.set('z', 123); // y gets evicted because it's least recent

console.log(cache.keys()); // ['x', 'z']
```


## Coding Style

As every library I publish, LRUCache.js is also built to be as small as possible after compressing it with Google Closure Compiler in advanced mode. Thus the coding style orientates a little on maxing-out the compression rate. Please make sure you keep this style if you plan to extend the library.

## Building the library

After cloning the Git repository run:

```
npm install
npm run build
```

## Copyright and Licensing

Copyright (c) 2025, [Robert Eisele](https://raw.org/)
Licensed under the MIT license.
