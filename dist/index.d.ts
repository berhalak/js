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
export declare class Deferred<T> implements PromiseLike<T> {
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): PromiseLike<TResult1 | TResult2>;
    private _promise;
    private _ok?;
    private _fail?;
    constructor();
    resolve(value: T): void;
    reject(reason: any): void;
}
//# sourceMappingURL=index.d.ts.map