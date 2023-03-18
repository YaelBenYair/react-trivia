import { useContext } from "react"
import Question from "./Question"
import { QuestionsContext } from "./TriviaContext"

export default function QuestionsList() {

    const {gameState, handleSubmitGame, handleResetAnswers} = useContext(QuestionsContext)
    const {questions, gameInProcess} = gameState
    
    const items = questions.map(
        (q, index) => <Question key={index} question={q}/>)


    const handleSubmit = (event) => {
        event.preventDefault()
        handleSubmitGame()
    }

    const handleReset = () => {
        handleResetAnswers()
    }

    if (gameInProcess && questions.length > 0) {
        return(
            <form onSubmit={handleSubmit} onReset={handleReset}>
                {items}
                <button type="submit">SUBMIT</button>
                <button type="reset">RESET</button>
            </form>
        )
    } else {
        return null;
    }
}