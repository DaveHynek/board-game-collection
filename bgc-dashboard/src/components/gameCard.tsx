import styles from '../styles/gameCard.module.css'

interface GameCardProps {
    name: string
    minPlayers: number
    maxPlayers: number
    imgUrl: string
}

export function GameCard({name, minPlayers, maxPlayers, imgUrl}: GameCardProps) {
    return (
        <div className={styles.card}>
            <img src={imgUrl} alt={name} className={styles.image} />
            <h3>{name}</h3>
            <p>{minPlayers} - {maxPlayers} players</p>
        </div>
    )
}