// Shared behavior for the rutinas / musculos / tests tab switchers: within a
// given page root, deactivate all tabs/panels and activate the chosen pair.
export class TabGroup {
  constructor(rootId) {
    this.root = document.getElementById(rootId);
  }

  activate(panelId, btn) {
    this.root.querySelectorAll('.rutina-panel').forEach(p => p.classList.remove('active'));
    this.root.querySelectorAll('.rtab').forEach(b => b.classList.remove('active'));
    document.getElementById(panelId).classList.add('active');
    btn.classList.add('active');
  }
}
