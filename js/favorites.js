export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
  }
}
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.update(this.root)
  }

  update() {
    this.removeAllTr(this.root)
  }
  removeAllTr(root) {
    const tbody = root.querySelector("table tbody")

    tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove()
    })
  }
}
