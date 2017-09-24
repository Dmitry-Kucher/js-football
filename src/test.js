/**
 * Created by dima on 18/05/2017.
 */
import Gameloop from './classes/Gameloop';

const width = 800;
const height = 600;

const gameloop = new Gameloop({ width, height });
gameloop.start();
