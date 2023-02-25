import { Link } from 'react-router-dom'
import styles from '../styles/footer.module.css'

import PokemonPic from '../assets/pikachu.png'
import PokemonPoi from '../assets/pointer.png'
import PokemonPok from '../assets/pokeball.png'

export default function Header() {
  return <footer className={styles.footer}>
    <Link to="/pokemons" className={styles.link}>
      <img src={PokemonPic} className={styles.img} />
    </Link>
    <Link to="/pokemons" className={styles.link}>
      <img src={PokemonPok} className={styles.img} />
    </Link>
    <Link to="/pokemons" className={styles.link}>
      <img src={PokemonPoi} className={styles.img} />
    </Link>
  </footer>
}

