import { createContext, useContext, useReducer } from "react";


const INITIAL_GAME_STATE = {
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

function gameReducer(gameState, action) {
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

const GameContext = createContext(INITIAL_GAME_STATE)
const GameDispatchContext = createContext(null)


export function GameProvider({ children }) {
    const [gameState, dispatch] = useReducer(
        gameReducer,
        INITIAL_GAME_STATE
    );
  
    return (
        <GameContext.Provider value={gameState}>
            <GameDispatchContext.Provider value={dispatch}>
                {children}
            </GameDispatchContext.Provider>
        </GameContext.Provider>
    );
  }

export function useGame() {
    return useContext(GameContext);
}
  
export function useGameDispatch() {
    return useContext(GameDispatchContext);
}

