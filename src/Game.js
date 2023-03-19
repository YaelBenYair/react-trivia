import axios from "axios"
import QuestionsList from "./QuestionsList"
import Results from "./Results"
import { GAME_ACTIONS, useGame, useGameDispatch } from "./TriviaContext"
import { PARAMS, URL_QUESTIONS } from "./Urls"

export default function Game() {
    
    const gameState = useGame()
    const dispatch = useGameDispatch()

	const handleStartGame = async () => {
		dispatch({type: GAME_ACTIONS.QUESTIONS_FETCH_START})
		console.log(PARAMS)
		const response = await axios.get(URL_QUESTIONS , {params: {...PARAMS}})
		if (response.status === 200) {
			dispatch({
				type: GAME_ACTIONS.QUESTIONS_FETCH_SUCCESS,
				questionsReceived: response.data
			})
		} else {
			dispatch({ type: GAME_ACTIONS.QUESTIONS_FETCH_ERROR, msg: response.statusText})
		}
	}

	return (
		<div className='App'>
		<h3>TRIVIA GAME</h3>

        {gameState.loading ?
            <p>Loading...</p>
        :
            <>
                <QuestionsList />
                <Results />
            </>
        }

        {gameState.errorMsg &&
            <p style={{color: 'red'}}>{gameState.errorMsg}</p>
        }
        
        
        {!gameState.gameInProcess &&
            <button onClick={handleStartGame} disabled={gameState.loading}>NEW GAME</button>
        }

		</div>
	);
}