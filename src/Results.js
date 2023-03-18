import { useContext } from "react"
import { QuestionsContext } from "./TriviaContext"

export default function Results() {

    const {questions} = useContext(QuestionsContext)

    const totalQuestions = questions.length
    let correctAnswers = 0
    questions.forEach(q => {
        if (q.selectedAnswer === q.correctAnswer) {
            correctAnswers++
        }
    });

    return(
        <h5>{correctAnswers}/{totalQuestions}</h5>
    )
}