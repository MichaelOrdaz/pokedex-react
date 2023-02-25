import Pokedex from '../assets/pokedex.png'

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        border: 'solid',
        background: 'linear-gradient(180deg, rgba(51,104,177,1) 0%, rgba(255,255,255,1) 50%, rgba(51,104,177,1) 100%)'
      }}
    >
      <img 
        src={Pokedex}
        style={{
          width: '200px',
          height: '200px'
        }}
      />
      <div>
        Loading...
      </div>
    </div>
  )
}