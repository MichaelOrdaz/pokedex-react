import { useNavigate, useParams } from "react-router-dom"
import style from '../styles/pokemon.module.css'
import pokeball from '../assets/pokeball.png'
import { useEffect, useState } from "react"
import { getPokemon } from "../api/getPokemon"
import { Loading } from "../components"

export default function Pokemon() {
  const {id} = useParams()
  const navigate = useNavigate()

  const [pokemon, setPokemon] = useState<any>(undefined)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getPokemon('https://pokeapi.co/api/v2/pokemon/' + id)
    .then(response => {
      setPokemon(response)
      setLoading(false)
    })
  }, [id])

  if (isLoading || pokemon === undefined) {
    return <Loading />
  }

  return <>
    <div style={{

    }}
    >
      <button onClick={() => navigate(-1) }>
        <img src={pokeball} alt="pokebola" className={style['go-back']} />
        Go Back
      </button>
    </div>
    <div className="text-center">
      <main>
        <h1 className="text-uppercase">{pokemon.name}</h1>
        <h3><small>{pokemon.id}</small></h3>
        <div>
          {
            Object.keys(pokemon.sprites).filter(i => typeof pokemon.sprites[i] === 'string').map(key => {
              return <img src={pokemon.sprites[key]} key={key} style={{
                width: '200px',
              }} alt={key} />
            })
          }
        </div>
        <div>height: {pokemon.height}</div>
        <div>weight: {pokemon.weight}</div>
        <div>type: {pokemon.types.map((i: any) => i.type.name).join(', ')}</div>
        <div>weight: {pokemon.weight}</div>

        <div>
          <h6>Stats</h6>
          {
            pokemon.stats.map((i: any, j: any) => {
              return <div key={j}>
                {i.stat.name}: {i.base_stat}
              </div>
            })
          }
        </div>
      </main>
    </div>
  </>
}