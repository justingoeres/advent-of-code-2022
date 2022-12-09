type Hashable = { hashCode(): number }

export class HashSet<T extends Hashable> {
    #map: Map<number, T> = new Map()

    add(item: T): void {
        if (!this.has(item)) {
            this.#map.set(item.hashCode(), item)
        }
    }

    has(item: T): boolean {
        return this.#map.has(item.hashCode())
    }

    delete(item: T): void {
        this.#map.delete(item.hashCode())
    }

    get size(): number {
        return this.#map.size
    }
}
