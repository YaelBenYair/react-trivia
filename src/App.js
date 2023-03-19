import './App.css';
import { useReducer } from 'react';
import QuestionsList from './QuestionsList';
import {GAME_ACTIONS, INITIAL_GAME_STATE, QuestionsContext, questionsReducer } from './TriviaContext';
import Results from './Results';
import axios from 'axios';


function App() {

  // const [questions, setQuestions] = useState([])
  const [gameState, dispatch] = useReducer(questionsReducer, INITIAL_GAME_STATE)

  const handleStartGame = async () => {
    
	dispatch({type: GAME_ACTIONS.QUESTIONS_FETCH_START})
	const response = await axios.get("https://the-trivia-api.com/api/questions?limit=5")
	if (response.status === 200) {
		// setQuestions(response.data)
		dispatch({
			type: GAME_ACTIONS.QUESTIONS_FETCH_SUCCESS,
			questionsReceived: response.data
		})
	} else {
		dispatch({ type: GAME_ACTIONS.QUESTIONS_FETCH_ERROR, msg: response.statusText})
	}


  }

  const handleSelectAnswer = (questionId, answer) => {
    dispatch({
      type: GAME_ACTIONS.SELECT_ANSWER,
      questionId: questionId,
      answer: answer
    })
  }

  const handleResetAnswers = () => {
    dispatch({
      type: GAME_ACTIONS.RESET_ANSWERS
    })
  }

  const handleSubmitGame = () => {
    dispatch({
		type: GAME_ACTIONS.SUBMIT_ANSWERS
	})
  }



  return (
      <div className='App'>
      <h3>TRIVIA GAME</h3>

	  <QuestionsContext.Provider value={{gameState, handleSelectAnswer, handleSubmitGame, handleResetAnswers}}>
		{gameState.loading ?
			<p>Loading...</p>
		:
			<>
				<QuestionsList />
				<Results />
			</>
		}

		{gameState.errorMsg &&
			<p style={{color: 'red'}}>{gameState.errorMsg}</p>
		}
          
		  
		{!gameState.gameInProcess &&
        	<button onClick={handleStartGame} disabled={gameState.loading}>NEW GAME</button>
		}

	  </QuestionsContext.Provider>
    </div>
  );
}

export default App;
