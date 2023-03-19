import './App.css';
import { useReducer, useState } from 'react';
import QuestionsList from './QuestionsList';
import {QuestionsContext, questionsReducer } from './TriviaContext';
import Results from './Results';
import axios from 'axios';


function App() {

  // const [questions, setQuestions] = useState([])
  const [questions, dispatch] = useReducer(questionsReducer, [])

  const [gameInProgress, setGameInProgress] = useState(false)


  const handleStartGame = async () => {
      const response = await axios.get("https://the-trivia-api.com/api/questions?limit=5")
      if (response.status === 200) {
              // setQuestions(response.data)
              dispatch({
                  type: 'start',
                  questionsReceived: response.data
              })
              setGameInProgress(true)
      }


  }

  const handleSelectAnswer = (questionId, answer) => {
    dispatch({
      type: 'selectAnswer',
      questionId: questionId,
      answer: answer
    })
  }



  // const handleResetAnswers = () => {
  //   questions.forEach(q => {
  //     q.selectedAnswer = ''
  //   })
  //   setQuestions([...questions])
  // }

  const handleResetAnswers = () => {
    dispatch({type: 'resetAnswers'})
  }

  const handleSubmitGame = () => {
    setGameInProgress(false)
  }

  return (
      <div className='App'>
      <h3>TRIVIA GAME</h3>

      {questions.length > 0 &&
        <QuestionsContext.Provider value={{questions, handleSelectAnswer, handleSubmitGame, handleResetAnswers}}>
          
          {gameInProgress ?
          	<QuestionsList />
          :
          	<Results />
		  }
          
        </QuestionsContext.Provider>
      }

      {!gameInProgress &&
        <button onClick={handleStartGame}>NEW GAME</button>
      }
    </div>
  );
}

export default App;
