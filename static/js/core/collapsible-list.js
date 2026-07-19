// Shared behavior for the exercise-row / muscle-card / test-block lists:
// render a list of items into a container and toggle an item's detail panel
// open/closed on click. Replaces three near-identical build*/toggle* pairs.
export class CollapsibleList {
  constructor(containerId, items, renderItem, { toggleMode = 'class', detailClass = 'open' } = {}) {
    this.containerId = containerId;
    this.items = items;
    this.renderItem = renderItem;
    this.toggleMode = toggleMode; // 'class' toggles detailClass on the detail element; 'style' toggles display:block/none
    this.detailClass = detailClass;
  }

  render() {
    const container = document.getElementById(this.containerId);
    if (!container) return;
    container.innerHTML = this.items.map((item, i) => this.renderItem(item, i)).join('');
  }

  toggle(rowId, detailId) {
    const row = document.getElementById(rowId);
    const detail = document.getElementById(detailId);
    if (!row || !detail) return;
    row.classList.toggle('open');
    if (this.toggleMode === 'style') {
      detail.style.display = row.classList.contains('open') ? 'block' : 'none';
    } else {
      detail.classList.toggle(this.detailClass);
    }
  }
}
