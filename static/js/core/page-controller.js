// Base class for a page's render lifecycle. `once: true` mirrors pages that
// were eagerly built a single time at startup and never rebuilt on revisit
// (rutinas, musculos, tests, dashboard); `once: false` mirrors pages that
// re-read localStorage and rebuild every time they're shown (tracker,
// progreso, smartwatch, nutricion).
export class PageController {
  constructor({ once = false } = {}) {
    this.once = once;
    this.mounted = false;
  }

  async activate() {
    if (this.once && this.mounted) return;
    await this.render();
    this.mounted = true;
  }

  async render() {
    throw new Error('render() must be implemented by a subclass');
  }
}
