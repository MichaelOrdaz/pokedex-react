import { createBrowserRouter } from "react-router-dom"
import { Items, Pokemon, Pokemons } from "../pages"

const routers = createBrowserRouter([
  {
    path: '/',
    element: <Pokemons />
  },
  {
    path: '/pokemons',
    element: <Pokemons />
  },
  {
    path: '/pokemons/:id',
    element: <Pokemon />
  },
  {
    path: '/items',
    element: <Items />
  },
])

export default routers