import { GAME_ACTIONS, useGameDispatch } from "./TriviaContext"

export default function Question({question}) {

    const dispatch = useGameDispatch()
    const handleSelectAnswer = (answer) => {
        dispatch({
            type: GAME_ACTIONS.SELECT_ANSWER,
            questionId: question.id,
            answer: answer
          })
    }

    const allAnswers = question.incorrectAnswers.concat([question.correctAnswer])
    const answerItems = allAnswers.map(
        (answer, index) => {
            return (
                <div key={index}>
                    <input 
                        type='radio' 
                        value={answer} 
                        checked={question.selectedAnswer === answer}
                        onChange={(event) => handleSelectAnswer(event.target.value)}/>
                    <label>{answer}</label>
                    <br/>
                </div>
            )
        })
    
    return(
        <>
            <p>{question.question}</p>
            {answerItems}
            <br/>
        </>
    )
}