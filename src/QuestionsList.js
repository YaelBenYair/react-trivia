import Question from "./Question"
import { GAME_ACTIONS, useGame, useGameDispatch } from "./TriviaContext"

export default function QuestionsList() {

    // const {gameState, handleSubmitGame, handleResetAnswers} = useContext(QuestionsContext)

    const gameState = useGame()
    const dispatch = useGameDispatch()
    const {questions, gameInProcess} = gameState
    
    const items = questions.map(
        (q, index) => <Question key={index} question={q}/>)

    
    const hendleDisabled = (q) => {
        return q.selectedAnswer != ""
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch({type: GAME_ACTIONS.SUBMIT_ANSWERS})
    }

    const handleReset = () => {
        dispatch({type: GAME_ACTIONS.RESET_ANSWERS})
    }
    // (q) => !q.selectedAnswer
    if (gameInProcess && questions.length > 0) {
        return(
            <form onSubmit={handleSubmit} onReset={handleReset}>
                {items}
                <button type="submit" disabled={!questions.every(hendleDisabled)}>SUBMIT</button>
                <button type="reset">RESET</button>
            </form>
        )
    } else {
        return null;
    }
}