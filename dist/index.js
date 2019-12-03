"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function UUID() {
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
exports.UUID = UUID;
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
//# sourceMappingURL=index.js.map