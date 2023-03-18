import './App.css';
import { useState } from 'react';
import axios from 'axios';
import QuestionsList from './QuestionsList';
import { QuestionsContext } from './TriviaContext';
import Results from './Results';

function App() {

  const [questions, setQuestions] = useState([])
  const [gameInProgress, setGameInProgress] = useState(false)

  const handleStartGame = async () => {
    const response = await axios.get("https://the-trivia-api.com/api/questions?limit=5")
    if (response.status === 200) {

      // add selectedAnswer field to store user's answer
      response.data.forEach(q => {
        q.selectedAnswer = ""
      });
      setQuestions(response.data)
      setGameInProgress(true)
    }
  }

  const handleSelectAnswer = (questionId, answer) => {
    const selectedQuestion = questions.filter(q => q.id === questionId)[0]
    selectedQuestion.selectedAnswer = answer
    setQuestions([...questions])
  }

  const handleSubmitGame = () => {
    setGameInProgress(false)
  }

  const handleResetAnswers = () => {
    questions.forEach(q => {
      q.selectedAnswer = ''
    })
    setQuestions([...questions])
  }

  return (
    <div className='App'>
      <h3>TRIVIA GAME</h3>

      <QuestionsContext.Provider value={{questions, handleSelectAnswer, handleSubmitGame, handleResetAnswers}}>
        {gameInProgress &&
          <QuestionsList />
        }
        {!gameInProgress && questions.length > 0 &&
          <Results />
        }
      </QuestionsContext.Provider>

      {!gameInProgress &&
        <button onClick={handleStartGame}>NEW GAME</button>
      }
    </div>
  );
}

export default App;
