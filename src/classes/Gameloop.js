import Gamefield from './Gamefield';
import ColorMap from './ColorMap';

export default class Gameloop {
  constructor(options) {
    this.getOptions = () => options;
  }

  start() {
    const options = this.getOptions();
    window.addEventListener('load', () => {
      const backgroundColor = ColorMap.backgroundColor;
      const app = new PIXI.Application(options.width, options.height, { backgroundColor });
      document.body.appendChild(app.view);

      const gamefield = new Gamefield({ stage: app.stage });
      gamefield.build();
    });
  }
}
