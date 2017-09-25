/**
 * Created by dima on 18/05/2017.
 */
import Gameloop from './classes/Gameloop';

const width = 1200;
const height = 800;

const gameloop = new Gameloop({ width, height });
gameloop.start();
