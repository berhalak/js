import "array-flat-polyfill"

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
		permutation(predicate: (a: T, b: T) => void): void;
		combination(predicate: (a: T, b: T) => void): void;
	}
}

if (!Array.prototype.combination) {
	Array.prototype.combination = function (this: Array<any>, predicate: (a: any, b: any) => void): void {
		for (let x = 0; x < this.length - 1; x++) {
			for (let y = x + 1; y < this.length; y++) {
				predicate(x, y);
			}
		}
	}
}

if (!Array.prototype.permutation) {
	Array.prototype.permutation = function (this: Array<any>, predicate: (a: any, b: any) => void): void {
		for (let x = 0; x < this.length; x++) {
			for (let y = 0; y < this.length; y++) {
				if (x == y) continue;
				predicate(x, y);
			}
		}
	}
}


if (!Array.prototype.equals) {
	Array.prototype.equals = function (this: Array<any>, other: any) {
		if (!other) return false;
		if (other.length == 0 && this.length == 0) return true;
		return this.every((v, i) => {
			let a = v;
			let b = other[i];

			if (a === null && b === null) return true;
			if (a === null || b === null) return false;

			if (typeof a == 'object') {
				if (a.equals) {
					return a.equals(b);
				}
				return a.valueOf() == b.valueOf();
			} else {
				return a == b;
			}
		})
	}
}

function gcd(a: number, b: number): number {
	return a ? gcd(b % a, a) : b;
}

function lcm(a: number, b: number): number {
	return a * b / gcd(a, b);
}

if (!Math.lcm) {
	Math.lcm = function (...a: number[]): number {
		return a.reduce(lcm);
	}
}

if (!Math.gcd) {
	Math.gcd = function (...a: number[]): number {
		return a.reduce(gcd);
	}
}

if (!Math.gcd) {
	Math.angle = function (y: number, x: number) {
		return Math.atan2(y, x) * 180 / Math.PI;
	}
}

if (!Math.gcd) {
	Math.clock = function (angle: number) {
		if (angle == 90) {
			angle = 0;
		} else if (angle > 90) {
			angle = 360 - (angle - 90);
		} else {
			angle = - (angle - 90);
		}
		if (Math.abs(angle) == 0) {
			angle = 0;
		}
		return angle;
	}
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

		// polified by external lib
		flat(): Array<T>;
		flatMap(func: (x: T) => T): Array<T>;
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

if (!Array.prototype.after) {
	Array.prototype.after = function (this: Array<any>, selector: (value: any, index?: number) => boolean) {
		let result = [];
		let can = false;
		for (let i = 0; i < this.length; i++) {
			if (selector(this[i], i)) {
				can = true;
				continue;
			}
			if (can) {
				result.push(this[i]);
			}

		}
		return result;
	}
}

if (!Array.prototype.until) {
	Array.prototype.until = function (this: Array<any>, selector: (value: any, index?: number) => boolean) {
		let result = [];
		for (let i = 0; i < this.length; i++) {
			if (selector(this[i], i)) {
				break;
			}
			result.push(this[i]);

		}
		return result;
	}
}


if (!Array.prototype.take) {
	Array.prototype.take = function (count: number) {
		if (count >= 0) {
			return this.slice(0, count);
		} else {
			return this.slice(0, this.length + count);
		}
	}
}

if (!Array.prototype.skip) {
	Array.prototype.skip = function (count: number) {
		return this.slice(count);
	}
}

if (!Array.prototype.chunk) {
	Array.prototype.chunk = function (this: Array<any>, chunkSize: number) {
		let result = [];
		let arr = this;
		for (var i = 0, len = arr.length; i < len; i += chunkSize)
			result.push(arr.slice(i, i + chunkSize));
		return result;
	}
}