export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }
  load() {
    this.entries = [
      {
        login: "maykbrito",
        name: "Mayk Brito",
        publicRepositorys: 20,
        followers: 1000,
      },
      {
        login: "diego3g",
        name: "Diego Fernandes",
        publicRepositorys: 20,
        followers: 1000,
      },
    ]
  }
}
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector("table tbody")
    this.update()
  }

  update() {
    this.removeAllTr()

    this.entries.forEach( userInfo =>{
      const row = this.createRow()
      row.querySelector('td img').src = `https://github.com/${userInfo.login}.png`
      row.querySelector('td img').alt = `Imagem de ${userInfo.name}`
      row.querySelector('td a').href = `https://github.com/${userInfo.login}`
      row.querySelector('td a p').textContent = `${userInfo.name}`
      row.querySelector('td.repositories').textContent = `${userInfo.publicRepositorys}`
      row.querySelector('td.followers').textContent = `${userInfo.followers}`

      this.tbody.append(row)
    })
    
  }
  createRow() {
    const tr = document.createElement("tr")

    tr.innerHTML = `
          <td class="user">
            <img src="https://github.com/maykbrito.png" alt="Imagem de Mayk Brito" />
            <a href="https://github.com/maykbrito" target="_blank">
              <p>Mayk Brito</p>
              <span>maykbrito</span>
            </a>
          </td>
          <td class="repositories">100</td>
          <td class="followers">100</td>
          <td>
            <button class="remove">&times;</button>
          </td>
        `
    return tr
  }
  removeAllTr() {
    


    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove()
    })
  }
}
