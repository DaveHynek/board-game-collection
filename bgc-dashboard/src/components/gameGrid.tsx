import { useGames } from '../game_context/game_context'
import { GameCard } from './gameCard'

export function GameGrid() {
    const { games, loading, error } = useGames();

    if(loading) return <p>Loading...</p>
    if(error) return <p style={{ color: 'red' }}>{error}</p>
    if(!games?.length) return <p>No games found.</p>

    return (
        <div>
            {games.map((game, index) => (
                <GameCard
                    key={index}
                    name={game.name}
                    minPlayers={game.minPlayers}
                    maxPlayers={game.maxPlayers}
                    imgUrl={game.imgUrl}
                />
            ))}
        </div>
    )
}