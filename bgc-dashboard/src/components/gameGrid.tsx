import { useGames } from '../game_context/game_context'
import { GameCard } from './gameCard'

import styles from '../styles/gameGrid.module.css'

export function GameGrid() {
    const { games, loading, error } = useGames();

    if(loading) return <p>Loading...</p>
    if(error) return <p style={{ color: 'red' }}>{error}</p>

    return (
        <div className={styles.gameGrid}>
            {games.map((game, index) => (
                <GameCard
                    key={index}
                    name={game.name}
                    minPlayers={game.minPlayers}
                    maxPlayers={game.maxPlayers}
                    minTime={game.minTime}
                    maxTime={game.maxTime}
                    imgUrl={game.imgUrl}
                />
            ))}
        </div>
    )
}