import { useContext } from "react"
import { QuestionsContext } from "./TriviaContext"

export default function Question({question}) {

    const {handleSelectAnswer} = useContext(QuestionsContext)

    const allAnswers = question.incorrectAnswers.concat([question.correctAnswer])
    const answerItems = allAnswers.map(
        (answer, index) => {
            return (
                <div key={index}>
                    <input 
                        type='radio' 
                        value={answer} 
                        checked={question.selectedAnswer === answer}
                        onChange={(event) => handleSelectAnswer(question.id, event.target.value)}/>
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