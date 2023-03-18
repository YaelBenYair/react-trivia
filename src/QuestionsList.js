import { useContext } from "react"
import Question from "./Question"
import { QuestionsContext } from "./TriviaContext"

export default function QuestionsList() {

    const {questions, handleSubmitGame, handleResetAnswers} = useContext(QuestionsContext)
    
    const items = questions.map(
        (q, index) => <Question key={index} question={q}/>)


    const handleSubmit = (event) => {
        event.preventDefault()
        handleSubmitGame()
    }

    const handleReset = () => {
        handleResetAnswers()
    }

    return(
        <form onSubmit={handleSubmit} onReset={handleReset}>
            {items}
            <button type="submit">SUBMIT</button>
            <button type="reset">RESET</button>
        </form>
    )
}