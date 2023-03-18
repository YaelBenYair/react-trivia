import './App.css';
import {GameProvider} from './TriviaContext';
import Game from './Game';


function App() {
	return(
		<GameProvider>
			<Game />
		</GameProvider>
	)

}

export default App;
