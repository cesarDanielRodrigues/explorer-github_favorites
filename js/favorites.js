export class GithubUser {
  static search(userName) {
    const url = `https://api.github.com/users/${userName}`

    // const data = await fetch(url);
    // const{ login, name, public_repos, followers } = await data.json()

    // return { login, name, public_repos, followers}

    return fetch(url)
      .then((data) => data.json())
      .then(({ login, name, public_repos, followers }) => ({ login, name, public_repos, followers }))
  }
}

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }
  load() {
    this.entries = JSON.parse(localStorage.getItem("@github-favorites")) || []
  }
  save(){
    localStorage.setItem('@github-favorites',JSON.stringify(this.entries))
  }

  async add(userName) {
    try {
      const user = await GithubUser.search(userName)
      if(user.login === undefined){
        throw new Error("Usuário não encontrado");
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()

    } catch (error) {
      alert(error.message)
    }
  }

  delete(user) {
    const filteredEntries = this.entries.filter((entry) => entry.login !== user.login)

    this.entries = filteredEntries
    this.update()
    this.save()
  }
}
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector("table tbody")
    this.update()
    this.onadd()
  }

  onadd() {
    const addButton = this.root.querySelector(".search button")
    addButton.onclick = () => {
      const { value } = this.root.querySelector(".search input")
      this.add(value)
    }
  }
  update() {
    this.removeAllTr()

    this.entries.forEach((userInfo) => {
      const row = this.createRow()
      row.querySelector("td img").src = `https://github.com/${userInfo.login}.png`
      row.querySelector("td img").alt = `Imagem de ${userInfo.name}`
      row.querySelector("td a").href = `https://github.com/${userInfo.login}`
      row.querySelector("td a p").textContent = `${userInfo.name}`
      row.querySelector("td.repositories").textContent = `${userInfo.public_repos}`
      row.querySelector("td.followers").textContent = `${userInfo.followers}`

      row.querySelector(".remove").onclick = () => {
        const isOK = confirm("Deseja mesmo excluir esse favorites?")
        if (isOK) {
          this.delete(userInfo)
        }
      }

      this.tbody.append(row)
    })
  }
  createRow() {
    const tr = document.createElement("tr")

    tr.innerHTML = `
          <td class="user">
            <img src="https://github.com/maykbrito.png" alt'="Imagem de Mayk Brito" />
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
