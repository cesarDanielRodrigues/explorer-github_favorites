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