import styles from '../styles/gameCard.module.css'
import PlayerSvg from '../assets/player.svg?react'
import TimeSvg from '../assets/time.svg?react'

interface GameCardProps {
    name: string
    minPlayers: number
    maxPlayers: number
    minTime: number
    maxTime: number
    imgUrl: string
}

export function GameCard({name, minPlayers, maxPlayers, minTime, maxTime, imgUrl}: GameCardProps) {
    return (
        <div className={styles.card}>
            <img src={imgUrl} alt={name} className={styles.image} />
            <div className={styles.cardDetails}>
                <div className={styles.gameTitle}>{name}</div>
                <div className={styles.gameInfo}>
                    <PlayerSvg className={styles.playerIcon} />
                    <span>{minPlayers === maxPlayers ? minPlayers : `${minPlayers} - ${maxPlayers}`} players</span>
                </div>
                <div className={styles.gameInfo}>
                    <TimeSvg className={styles.timeIcon} />
                    <span>{minTime === maxTime ? minTime : `${minTime} - ${maxTime}`} minutes</span>
                </div>
            </div>
        </div>
    )
}