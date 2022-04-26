import './App.css';
import { Route } from 'react-router-dom';
import Games from './components/games/Games.jsx';
import GameDetail from './components/gameDetail/GameDetail.jsx';
import CreateGame from './components/createGame/createGame.jsx';
import LandingPage from './components/landingPage/LandingPage.jsx';
import NavBar from './components/navBar/navBar.jsx';

function App() {
  return (
    <div className="App">
      <Route exact path="/"><LandingPage /></Route>

      <Route exact path='/videogame/:id' render={({ match }) => (
        <GameDetail match={match} />)}
      />

      <Route exact path='/videogames'><NavBar /><Games /></Route>

      <Route exact path='/videogame/'><NavBar /><CreateGame /></Route>
    </div>
  );
}

export default App;
