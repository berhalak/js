export function UUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

declare global {
    type Dictionary<T> = { [key: string]: T };
    type Constructor<T> = new (...args: any[]) => T;
    type Group<U, T> = {
        key: U;
        list: T[]
    }

    interface Array<T> {
        distinct(predicate?: (value: T) => any): Array<T>;
        remove(element: any): void;
        removeBy(predicate: (value: T, index: number, list?: T[]) => boolean): void;
        removeAt(index: number): void;
        max(def?: number): number | undefined;
        min(def?: number): number | undefined;
        orderBy<U>(predicate: (value: T) => U): Array<T>;
        invert(): Array<T>;
        except(list: T[], predicate?: (value: T) => any): T[];
        sum(predicate?: (value: T) => number): number;
        first(): T;
        last(): T | undefined;
        firstValid(): T;
        group<U>(predicate: (value: T) => U): Group<U, T>[];
    }

    interface String {
        toNumber(): number;
        replaceAll(search: string, replacer?: string): string;
    }
}

if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (search: string, replacer: string): string {
        var target = this;
        return target.split(search).join(replacer || "");
    }
}

if (!String.prototype.toNumber) {
    String.prototype.toNumber = function (this: string): number {
        return new Number(this).valueOf();
    }
}

if (!Array.prototype.invert) {
    Array.prototype.invert = function (this: Array<any>) {
        return [...this].reverse();
    }
}

if (!Array.prototype.first) {
    Array.prototype.first = function () {
        return this.length ? this[0] : null;
    }
}

if (!Array.prototype.last) {
    Array.prototype.last = function () {
        if (this.length) {
            return this[this.length - 1];
        }
    }
}


if (!Array.prototype.except) {
    Array.prototype.except = function (array: Array<any>, predicate?: (value: any) => any): Array<any> {
        let self: Array<any> = this;
        if (self.length == 0) return [];
        if (array.length == 0) return this;
        let result = self.filter(x => {
            let hasEqual = true;

            if (predicate) {
                hasEqual = array.find(y => predicate(y) == predicate(x));
            } else {
                if (typeof x == 'object') {
                    hasEqual = array.find(y => ('equals' in y) ? y.equals(x) : y == x);
                } else {
                    hasEqual = array.find(y => y == x);
                }
            }

            if (hasEqual) {
                return false;
            }
            return true;
        });
        return result;
    }
}


if (!Array.prototype.firstValid) {
    Array.prototype.firstValid = function () {
        return this.filter((x: any) => x != null).first();
    }
}


if (!Array.prototype.group) {
    Array.prototype.group = function (predicate: any): any {
        let map: any = {};
        let groups = [];
        for (let i of this) {
            let key = predicate(i);
            if (!(key in map)) {
                map[key] = {
                    key,
                    list: []
                }
                groups.push(map[key]);
            }
            let group = map[key];
            group.list.push(i);
        }
        return groups;
    }
}

if (!Array.prototype.orderBy) {
    Array.prototype.orderBy = function (predicate: (value: any) => any): Array<any> {
        let self: Array<any> = this.slice();
        self.sort((a: any, b: any) => {
            let av = predicate(a);
            let bv = predicate(b);
            return av > bv ? 1 : av < bv ? -1 : 0;
        })
        return self;
    }
}

if (!Array.prototype.min) {
    Array.prototype.min = function (def?: number): number | undefined {
        let self: Array<number> = this;
        if (self.length == 0) {
            if (def !== undefined)
                return def;

        } else {
            return self.reduce((p: number, c: number) => p > c ? c : p);
        }
    }
}


if (!Array.prototype.max) {
    Array.prototype.max = function (def?: number): number | undefined {
        let self: Array<number> = this;
        if (self.length == 0) {
            if (def !== undefined)
                return def;

        } else {
            return self.reduce((p: number, c: number) => p > c ? p : c);
        }
    }
}

if (!Array.prototype.sum) {
    Array.prototype.sum = function (predicate?: (value: any) => number): number {
        let self: Array<number> = this;
        if (self.length == 0) {
            return 0;
        }
        if (predicate) {
            return self.reduce((p: number, c: number) => p + predicate(c), predicate(self[0]));
        }
        return self.reduce((p: number, c: number) => p + c);
    }
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function (element: any) {
        let index = this.indexOf(element);
        if (index >= 0)
            this.splice(index, 1);
    }
}

if (!Array.prototype.removeAt) {
    Array.prototype.removeAt = function (index: number) {
        if (index >= 0)
            this.splice(index, 1);
    }
}


if (!Array.prototype.removeBy) {
    Array.prototype.removeBy = function (predicate: (value: any, index: number, list?: any[]) => boolean) {
        let toRemove = this.filter(predicate);
        for (let item of toRemove) {
            this.remove(item);
        }
    }
}

if (!Array.prototype.distinct) {
    Array.prototype.distinct = function <T>(predicate?: (value: T) => any): Array<T> {
        if (!predicate) {
            return [...new Set<T>(this)];
        }
        let set = new Set();
        let self: Array<T> = this;
        let res: T[] = [];
        self.forEach(e => {
            let key = predicate(e);
            if (!set.has(key)) {
                res.push(e);
                set.add(key);
            }
        });
        return res;
    }
}