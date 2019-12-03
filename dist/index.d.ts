import "array-flat-polyfill";
export declare function UUID(): string;
declare global {
    type Dictionary<T> = {
        [key: string]: T;
    };
    type Constructor<T> = new (...args: any[]) => T;
    type Group<U, T> = {
        key: U;
        list: T[];
    };
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
        take(count: number): Array<T>;
        skip(count: number): Array<T>;
        chunk(size: number): Array<Array<T>>;
        until(predicate: (value: T) => boolean): Array<T>;
        after(predicate: (value: T) => boolean): Array<T>;
        flat(): Array<T>;
        flatMap(func: (x: T) => T): Array<T>;
    }
    interface String {
        toNumber(): number;
        replaceAll(search: string, replacer?: string): string;
    }
}
//# sourceMappingURL=index.d.ts.map