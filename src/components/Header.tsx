import styles from '../styles/header.module.css'

type HeaderProps = {
  query: string
  setQuery: (query: string) => void
}

export default function Header({
  query,
  setQuery
}: HeaderProps) {
  return <header className={styles.header}>
    <input 
      placeholder="search pokemon" 
      type="text" 
      className={styles.input}
      value={query}
      onInput={event => setQuery((event.target as HTMLInputElement).value)}
    />
  </header>
}

