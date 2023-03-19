import './App.css';
import {GameProvider} from './TriviaContext';
import Game from './Game';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import SettingForm from './Filter/SettingsForm';
import { useEffect } from 'react';



function App() {

	// useEffect(() =>

	// )
	
  
	return(
		<>

		<Routes>
			<Route path='/' element={<Layout/>}>
				<Route index element={<Game />}/>
				<Route path='setting/' element={<SettingForm/>}/>
				
			</Route>
		</Routes>

		</>

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
