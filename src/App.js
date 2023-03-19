import './App.css';
import {GameProvider} from './TriviaContext';
import Game from './Game';


function App() {
  
	return(
		<GameProvider>
			<Game />
		</GameProvider>

    // <MyBox>
    //   <MyHeader></MyHeader>
    //   <MyBody />
    // </MyBox>
    
	)

}

// function MyHeader() {
//   return(
//     <h1>HEADER</h1>
//   )
// }

// function MyBody() {
//   return(
//     <p>Body of the page</p>
//   )
// }

// function MyBox({children}) {
//   return(
//     <div style={{border: 'solid 3px green'}}>
//       {children}
//     </div>
//   )
// }

export default App;
