"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deferred = exports.uid = void 0;
require("array-flat-polyfill");
const md5_1 = __importDefault(require("md5"));
function uid() {
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
exports.uid = uid;
if (!Array.prototype.combination) {
    Array.prototype.combination = function (predicate) {
        for (let x = 0; x < this.length - 1; x++) {
            for (let y = x + 1; y < this.length; y++) {
                predicate(x, y);
            }
        }
    };
}
if (!Array.prototype.permutation) {
    Array.prototype.permutation = function (predicate) {
        for (let x = 0; x < this.length; x++) {
            for (let y = 0; y < this.length; y++) {
                if (x == y)
                    continue;
                predicate(x, y);
            }
        }
    };
}
if (!Array.prototype.equals) {
    Array.prototype.equals = function (other) {
        if (!other)
            return false;
        if (other.length == 0 && this.length == 0)
            return true;
        return this.every((v, i) => {
            let a = v;
            let b = other[i];
            if (a === null && b === null)
                return true;
            if (a === null || b === null)
                return false;
            if (typeof a == 'object') {
                if (a.equals) {
                    return a.equals(b);
                }
                return a.valueOf() == b.valueOf();
            }
            else {
                return a == b;
            }
        });
    };
}
function gcd(a, b) {
    return a ? gcd(b % a, a) : b;
}
function lcm(a, b) {
    return a * b / gcd(a, b);
}
if (!Math.lcm) {
    Math.lcm = function (...a) {
        return a.reduce(lcm);
    };
}
if (!Math.gcd) {
    Math.gcd = function (...a) {
        return a.reduce(gcd);
    };
}
if (!Math.angle) {
    Math.angle = function (y, x) {
        return Math.atan2(y, x) * 180 / Math.PI;
    };
}
if (!Math.clock) {
    Math.clock = function (angle) {
        if (angle == 90) {
            angle = 0;
        }
        else if (angle > 90) {
            angle = 360 - (angle - 90);
        }
        else {
            angle = -(angle - 90);
        }
        if (Math.abs(angle) == 0) {
            angle = 0;
        }
        return angle;
    };
}
if (!String.hash) {
    String.hash = function (text) {
        if (!text)
            return text;
        return md5_1.default(text);
    };
}
if (!String.uid) {
    String.uid = function () {
        return uid();
    };
}
if (!String.prototype.hash) {
    String.prototype.hash = function () {
        return this == '' ? '' : md5_1.default(this);
    };
}
if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (search, replacer) {
        var target = this;
        return target.split(search).join(replacer || "");
    };
}
if (!String.prototype.toNumber) {
    String.prototype.toNumber = function () {
        return new Number(this).valueOf();
    };
}
if (!Array.prototype.invert) {
    Array.prototype.invert = function () {
        return [...this].reverse();
    };
}
if (!Array.prototype.interleave) {
    Array.prototype.interleave = function (value) {
        if (this.length <= 1)
            return this;
        const result = [];
        for (let i = 0; i < this.length; i++) {
            result.push(this[i]);
            if (i + 1 == this.length)
                break;
            if (typeof value == 'function') {
                result.push(value());
            }
            else {
                result.push(value);
            }
        }
        return result;
    };
}
if (!Array.prototype.first) {
    Array.prototype.first = function () {
        return this.length ? this[0] : null;
    };
}
if (!Array.prototype.last) {
    Array.prototype.last = function () {
        if (this.length) {
            return this[this.length - 1];
        }
    };
}
if (!Array.prototype.except) {
    Array.prototype.except = function (array, predicate) {
        let self = this;
        if (self.length == 0)
            return [];
        if (array.length == 0)
            return this;
        let result = self.filter(x => {
            let hasEqual = true;
            if (predicate) {
                hasEqual = array.find(y => predicate(y) == predicate(x));
            }
            else {
                if (typeof x == 'object') {
                    hasEqual = array.find(y => ('equals' in y) ? y.equals(x) : y == x);
                }
                else {
                    hasEqual = array.find(y => y == x);
                }
            }
            if (hasEqual) {
                return false;
            }
            return true;
        });
        return result;
    };
}
if (!Array.prototype.firstValid) {
    Array.prototype.firstValid = function () {
        return this.filter((x) => x != null).first();
    };
}
if (!Array.prototype.group) {
    Array.prototype.group = function (predicate) {
        let map = {};
        let groups = [];
        for (let i of this) {
            let key = predicate(i);
            if (!(key in map)) {
                map[key] = {
                    key,
                    list: []
                };
                groups.push(map[key]);
            }
            let group = map[key];
            group.list.push(i);
        }
        return groups;
    };
}
if (!Array.prototype.orderBy) {
    Array.prototype.orderBy = function (predicate) {
        let self = this.slice();
        self.sort((a, b) => {
            let av = predicate(a);
            let bv = predicate(b);
            return av > bv ? 1 : av < bv ? -1 : 0;
        });
        return self;
    };
}
if (!Array.prototype.min) {
    Array.prototype.min = function (def) {
        let self = this;
        if (self.length == 0) {
            if (def !== undefined)
                return def;
        }
        else {
            return self.reduce((p, c) => p > c ? c : p);
        }
    };
}
if (!Array.prototype.max) {
    Array.prototype.max = function (def) {
        let self = this;
        if (self.length == 0) {
            if (def !== undefined)
                return def;
        }
        else {
            return self.reduce((p, c) => p > c ? p : c);
        }
    };
}
if (!Array.prototype.sum) {
    Array.prototype.sum = function (predicate) {
        let self = this;
        if (self.length == 0) {
            return 0;
        }
        if (predicate) {
            return self.reduce((p, c) => p + predicate(c), predicate(self[0]));
        }
        return self.reduce((p, c) => p + c);
    };
}
if (!Array.prototype.remove) {
    Array.prototype.remove = function (element) {
        let index = this.indexOf(element);
        if (index >= 0)
            this.splice(index, 1);
    };
}
if (!Array.prototype.removeAt) {
    Array.prototype.removeAt = function (index) {
        if (index >= 0)
            this.splice(index, 1);
    };
}
if (!Array.prototype.removeBy) {
    Array.prototype.removeBy = function (predicate) {
        let toRemove = this.filter(predicate);
        for (let item of toRemove) {
            this.remove(item);
        }
    };
}
if (!Array.prototype.distinct) {
    Array.prototype.distinct = function (predicate) {
        if (!predicate) {
            return [...new Set(this)];
        }
        let set = new Set();
        let self = this;
        let res = [];
        self.forEach(e => {
            let key = predicate(e);
            if (!set.has(key)) {
                res.push(e);
                set.add(key);
            }
        });
        return res;
    };
}
if (!Array.prototype.after) {
    Array.prototype.after = function (selector) {
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
    };
}
if (!Array.prototype.until) {
    Array.prototype.until = function (selector) {
        let result = [];
        for (let i = 0; i < this.length; i++) {
            if (selector(this[i], i)) {
                break;
            }
            result.push(this[i]);
        }
        return result;
    };
}
if (!Array.prototype.take) {
    Array.prototype.take = function (count) {
        if (count >= 0) {
            return this.slice(0, count);
        }
        else {
            return this.slice(0, this.length + count);
        }
    };
}
if (!Array.prototype.skip) {
    Array.prototype.skip = function (count) {
        return this.slice(count);
    };
}
if (!Array.prototype.chunk) {
    Array.prototype.chunk = function (chunkSize) {
        let result = [];
        let arr = this;
        for (var i = 0, len = arr.length; i < len; i += chunkSize)
            result.push(arr.slice(i, i + chunkSize));
        return result;
    };
}
class Deferred {
    constructor() {
        this._promise = new Promise((ok, fail) => {
            this._ok = ok;
            this._fail = fail;
        });
    }
    then(onfulfilled, onrejected) {
        return this._promise.then(onfulfilled, onrejected);
    }
    resolve(value) {
        if (this._ok)
            this._ok(value);
    }
    reject(reason) {
        if (this._fail)
            this._fail(reason);
    }
}
exports.Deferred = Deferred;
//# sourceMappingURL=index.js.map