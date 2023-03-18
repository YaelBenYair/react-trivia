import { createContext } from "react";


export const QuestionsContext = createContext(null)

export function questionsReducer(questions, action) {
    switch (action.type) {

        case 'start': {
            action.questionsReceived.forEach(q => {
                q.selectedAnswer = ""
            });
            console.log('returning from start', action.questionsReceived)
            return action.questionsReceived
        }
        case 'selectAnswer': {
            const selectedQuestion = questions.filter(q => q.id === action.questionId)[0]
            selectedQuestion.selectedAnswer = action.answer
            return [...questions]
        }

        case 'resetAnswers': {
            questions.forEach(q => {
                q.selectedAnswer = ''
              })
            return [...questions]
        }

        default: {
            throw Error('Unknown action: ' + action.type)
        }

    }
}