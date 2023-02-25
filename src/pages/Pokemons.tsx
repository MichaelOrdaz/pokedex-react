import { ChangeEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Footer, Header, Loading } from "../components"
import { getPokemons } from "../api/getPokemons"
import { getPokemon } from "../api/getPokemon"
import { calcularPaginas } from "../helpers"

interface Pokemon {
  id: number
  name: string
  img: string
  types: string[]
}

interface TypesPokemon {
  slot: number
  type: {
    name: string
  }
}

const LIMIT = 20

export default function Pokemons() {
  const [query, setQuery] = useState('')
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [isLoading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(LIMIT)
  const [totalPages, setTotalPage] = useState(0)

  useEffect(() => {
    setLoading(true)
    getPokemons(offset, limit)
    .then(response => {
      setTotalPage(Math.ceil(response.count / limit))

      Promise.all(
        response.results.map((item: {name: string, url: string}) => {
          return getPokemon(item.url)
        })
      ).then((result) => {
        setPokemons(result.map(i => ({
          id: i.id,
          name: i.name,
          img: i.sprites.front_default,
          types: i.types.map((_: TypesPokemon) => _.type.name)
        })))
        setLoading(false)
      })
      
    })
  }, [offset, limit])

  if (isLoading) {
    return <Loading />
  }

  return <>
    <Header 
      query={query}
      setQuery={setQuery}
    />
    <main className="container-fluid">

      <form>
        <div className="row">
          <label className="col-sm-auto col-form-label">Item per page</label>
          <div className="col-sm-1">
            <select className="form-control" value={limit} onChange={(event: ChangeEvent) => {
              const value = (event.target as HTMLSelectElement).value
              setOffset(0)
              setLimit(Number(value))
            }}>
              {
                [20,50,100,500].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))
              }
            </select>
          </div>
        </div>
      </form>
      <nav className="row">
        {
          pokemons.filter(item => !query || item.name.toLowerCase().match(query.toLowerCase())).map(item => (
            <div
              key={item.id}
              className="col-12 col-sm-6 col-md-4 my-2"
            >
              <Link
                
                to={`/pokemons/${item.id}`}
                style={{
                  textDecoration: 'none',
                  display: 'block',
                  borderRadius: '8px',
                  boxShadow: '0 0 20px #aaa'
                }}
              >
                <div 
                  style={{
                    display: "flex",
                    columnGap: '12px',
                    padding: '4px 12px',
                  }}
                >
                  <img src={item.img} alt={item.name} style={{width: '120px', height: 'auto', alignSelf: 'center'}} />
                  <div>
                    <>
                      <h5 style={{color: 'skyblue'}} className="uppercase">{item.name}</h5>
                      {
                        item.types.map((type, idx) => (
                          <span key={idx} className="pokemon-type">{type}</span>
                        ))
                      }
                      <div>#{item.id}</div>
                    </>
                  </div>
                </div>
              </Link>
            </div>
          ))
        }
      </nav>

      <nav className="row justify-content-center my-5">
        <div className="col col-auto">
      {
        totalPages && <ul className="pagination pagination-sm">
          <li className="page-item">
            <button className="page-link" onClick={() => setOffset(0)} disabled={offset === 0}>&lt;&lt;</button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={() => {
              setOffset(prev => prev - limit)
            }}
            disabled={offset === 0}
            >&lt;</button>
          </li>
          {
            calcularPaginas(totalPages, offset / limit + 1).map((page) => {
              const pageOffset = limit * (page - 1)
              return <li
                className={`page-item ${offset === pageOffset ? 'active' : ''}`}
                key={page}

              >
                <button 
                  className="page-link"
                  onClick={() => {
                  setOffset(pageOffset)
                }}
                disabled={offset === pageOffset}
                >
                  {page}
                </button>
              </li>
            })
          }
          <li className="page-item">
            <button className={`page-link`} onClick={() => {
              setOffset(prev => prev + limit)
            }}
            disabled={((totalPages - 1) * limit) === offset}
            >&gt;</button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={() => setOffset((totalPages - 1) * limit)} disabled={((totalPages - 1) * limit) === offset}>&gt;&gt;</button>
          </li>
        </ul>
      }
      </div>
      </nav>
    </main>
    <Footer />
  </>
}