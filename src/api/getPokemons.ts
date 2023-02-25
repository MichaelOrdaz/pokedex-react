export async function getPokemons(offset: number, limit = 20) {
  return fetch('https://pokeapi.co/api/v2/pokemon/?offset=' + offset + '&limit=' + limit)
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed fetch pokemons')
    }

    return response.json()
  })
}