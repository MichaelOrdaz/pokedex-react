export async function getPokemon(url: string) {
  return fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed fetch pokemons')
    }
    return response.json()
  })
}