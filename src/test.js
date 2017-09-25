/**
 * Created by dima on 18/05/2017.
 */
import Gameloop from './classes/Gameloop';

const width = 1200;
const height = 1200;

const gameloop = new Gameloop({ width, height });
gameloop.start();
