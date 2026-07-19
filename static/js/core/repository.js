// Data-access seam: every page consumes its data via `await repository.get()`,
// regardless of where that data actually comes from. Today everything is a
// StaticRepository wrapping an in-memory value; swapping a page onto a real
// backend (e.g. a smartwatch endpoint proxied through Flask) later means
// only changing that one repository instance to an ApiRepository — the
// calling code never changes shape.
export class Repository {
  async get() {
    throw new Error('Repository.get() must be implemented by a subclass');
  }
}

export class StaticRepository extends Repository {
  constructor(data) {
    super();
    this.data = data;
  }

  async get() {
    return this.data;
  }
}

export class ApiRepository extends Repository {
  constructor(url) {
    super();
    this.url = url;
  }

  async get() {
    const res = await fetch(this.url);
    if (!res.ok) throw new Error(`Failed to fetch ${this.url}: ${res.status}`);
    return res.json();
  }
}
