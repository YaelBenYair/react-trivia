import { useGame } from "./TriviaContext"

export default function Results() {

    const gameState = useGame()
    const {questions, gameInProcess} = gameState

    const totalQuestions = questions.length
    let correctAnswers = 0
    questions.forEach(q => {
        if (q.selectedAnswer === q.correctAnswer) {
            correctAnswers++
        }
    });

    if (gameInProcess === false && questions.length > 0) {
        return(
            <h5>Your result: {correctAnswers}/{totalQuestions}</h5>
        )   
    } else {
        return null
    }
}