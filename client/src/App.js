import './App.css';
import { Route } from 'react-router-dom';
import GameDetail from './components/allGames/gameCard';

function App() {
  return (
    <div className="App">
        <h1>Henry Videogames</h1>
      <Route exact path='/'> <GameDetail/> </Route>
    </div>
  );
}

export default App;
