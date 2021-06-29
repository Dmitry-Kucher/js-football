import { Client } from 'boardgame.io/react';
import { TicTacToe } from './Game';
import Gameloop from './classes/Gameloop';

const width = 1200;
const height = 1200;

const gameloop = new Gameloop({ width, height });
gameloop.start();

const App = Client({
  game: TicTacToe,
  // board: new Gameloop({ width, height }),
});

export default App;
