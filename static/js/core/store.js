// Thin wrapper around localStorage. An optional prefix lets a future
// controller namespace its own keys; existing keys use no prefix so they
// keep reading the same localStorage entries as before this class existed.
export class Store {
  constructor(prefix = '') {
    this.prefix = prefix;
  }

  key(k) {
    return this.prefix + k;
  }

  get(k) {
    try { return JSON.parse(localStorage.getItem(this.key(k))); } catch(e) { return null; }
  }

  set(k, v) {
    try { localStorage.setItem(this.key(k), JSON.stringify(v)); } catch(e) {}
  }
}
