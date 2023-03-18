import { createContext } from "react";

export const QuestionsContext = createContext(null)

export const INITIAL_GAME_STATE = {
    loading: false,
    errorMsg: null,
    gameInProcess: false,
    questions: []
}


export const GAME_ACTIONS = {
    QUESTIONS_FETCH_START: 'questionsFetchStart',
    QUESTIONS_FETCH_SUCCESS: 'questionsFetchSuccess',
    QUESTIONS_FETCH_ERROR: 'questionsFetchError',
    SELECT_ANSWER: 'selectAnswer',
    RESET_ANSWERS: 'resetAnswers',
    SUBMIT_ANSWERS: 'submitAnswers'
}

export function questionsReducer(gameState, action) {
    switch (action.type) {

        case GAME_ACTIONS.QUESTIONS_FETCH_START: {
            return {
                ...gameState,
                loading: true,
                errorMsg: null
            }
        }

        case GAME_ACTIONS.QUESTIONS_FETCH_SUCCESS: {
            action.questionsReceived.forEach(q => {
                q.selectedAnswer = ""
            });
            return {
                ...gameState,
                loading: false,
                errorMsg: null,
                gameInProcess: true,
                questions: action.questionsReceived
            }
        }

        case GAME_ACTIONS.QUESTIONS_FETCH_ERROR: {
            return {
                ...gameState,
                loading: false,
                errorMsg: action.msg
            }
        }

        case GAME_ACTIONS.SELECT_ANSWER: {
            const selectedQuestion = gameState.questions.filter(q => q.id === action.questionId)[0]
            selectedQuestion.selectedAnswer = action.answer
            return {
                ...gameState,
                questions: [...gameState.questions]
            }
        }

        case GAME_ACTIONS.SUBMIT_ANSWERS: {
            return {
                ...gameState,
                gameInProcess: false
            }
        }

        case GAME_ACTIONS.RESET_ANSWERS: {
            gameState.questions.forEach(q => {
                    q.selectedAnswer = ''
                })
            return {
                ...gameState,
                questions: [...gameState.questions]
            }
        }

        default: {
            throw Error('Unknown action: ' + action.type)
        }

    }
}