// Replaces the old showPage()/pageMeta globals: switches which .page/.nav-item
// is active, updates the topbar, and activates that page's controller.
export class Router {
  constructor(pageControllers, pageMeta) {
    this.pageControllers = pageControllers;
    this.pageMeta = pageMeta;
  }

  showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(`page-${id}`).classList.add('active');
    document.querySelector(`[data-action="show-page"][data-page="${id}"]`).classList.add('active');
    document.getElementById('topbar-title').textContent = this.pageMeta[id].title;
    document.getElementById('topbar-sub').textContent = this.pageMeta[id].sub;
    this.pageControllers[id].activate();
  }
}
