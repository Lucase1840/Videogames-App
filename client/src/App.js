import './App.css';
import { Route } from 'react-router-dom';
import Games from './components/games';
import GameDetail from './components/gameDetail';
import CreateGame from './components/createGame';

function App() {
  return (
    <div className="App">

        <h1>Henry Videogames</h1>

        <Route exact path='/videogames'> <Games/> </Route>

        <Route exact path='/videogame/:id' render= {({match}) =>(
            <GameDetail match={match}/>)}
        />

        <Route exact path='/videogame/'> <CreateGame/></Route>

    </div>
  );
}

export default App;
