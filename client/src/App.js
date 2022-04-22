import './App.css';
import { Route } from 'react-router-dom';
import Games from './components/games';
import GameDetail from './components/gameDetail';
import CreateGame from './components/createGame';
import LandingPage from './components/landingPage';

function App() {
  return (
    <div className="App">

        <Route exact path='/videogames'> <Games/> </Route>

        <Route exact path='/videogame/:id' render= {({match}) =>(
          <GameDetail match={match}/>)}
        />

        <Route exact path='/videogame/'> <CreateGame/></Route>
        
        <Route exact path="/"> <LandingPage/> </Route>
    </div>
  );
}

export default App;
