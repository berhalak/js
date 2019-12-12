import "array-flat-polyfill";
export declare function UUID(): string;
declare global {
    interface Math {
        /**
         * Returns the angle (in degrees) from the X axis to a point.
         * @param y A numeric expression representing the cartesian y-coordinate.
         * @param x A numeric expression representing the cartesian x-coordinate.
         */
        angle(y: number, x: number): number;
        /**
         * Returns the clock angle (in degrees) from angle in cartesian. Example = Cartesian (90) = Clock(0)
         * @param angle Angle in cartesian
         */
        clock(angle: number): number;
        /**
         * Returns least common multiplier
         * @param x Array of numbers
         */
        lcm(...x: number[]): number;
        /**
         * Returns greatest common divider
         * @param x Array of numbers
         */
        gcd(...x: number[]): number;
    }
    interface Array<T> {
        /**
         * Tests if arrays are the same
         * @param other other Array
         */
        equals(other: Array<T>): boolean;
    }
}
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
        max(def?: T): T | undefined;
        min(def?: T): T | undefined;
        max(def: T): T;
        min(def: T): T;
        orderBy<U>(predicate: (value: T) => U): Array<T>;
        invert(): Array<T>;
        except(list: T[], predicate?: (value: T) => any): T[];
        sum(predicate?: (value: T) => number): number;
        first(): T | undefined;
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