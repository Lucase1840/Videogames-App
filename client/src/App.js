import './App.css';
import { Route } from 'react-router-dom';
import Games from './components/games/Games.jsx';
import GameDetail from './components/gameDetail/GameDetail.jsx';
import CreateGame from './components/createGame';
import LandingPage from './components/landingPage/LandingPage.jsx';

function App() {
  return (
    <div className="App">
        <Route exact path='/videogame/:id' render= {({match}) =>(
          <GameDetail match={match}/>)}
        />
        <Route exact path='/videogames'> <Games/> </Route>

        <Route exact path='/videogame/'> <CreateGame/></Route>
        
        <Route exact path="/"> <LandingPage/> </Route>
    </div>
  );
}

export default App;
