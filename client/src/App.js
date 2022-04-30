import './App.css';
import { Route } from 'react-router-dom';
import Games from './components/games/Games.jsx';
import GameDetail from './components/gameDetail/GameDetail.jsx';
import CreateGame from './components/createGame/createGame.jsx';
import LandingPage from './components/landingPage/LandingPage.jsx';
import NavBar from './components/navBar/navBar.jsx';
import GamesSearched from './components/GamesSearched/GamesSearched.jsx';

function App() {
  return (
    <div className="App">

      <Route exact path='/videogame/:id' render={({ match }) => (
        <GameDetail match={match} />)}
      />
      
      <Route exact path='/videogame/'><NavBar /><CreateGame /></Route>
      
      <Route exact path='/videogames/results'><NavBar/><GamesSearched /></Route>

      <Route exact path='/videogames'><NavBar/><Games/></Route>


      <Route exact path="/"><LandingPage /></Route>
    </div>
  );
}

export default App;
