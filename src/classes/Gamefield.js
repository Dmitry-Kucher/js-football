import PaperLine from './PaperLine';

export default class Gamefield {
  constructor(options) {
    if (!options.stage || !options.stage.addChild) {
      throw new Error('Unsupported instance of stage. Please, specify PIXI.Container as a stage');
    }
    const defaultOptions = { width: 20, height: 20, cols: 30, rows: 6 };
    this.getOptions = () => ({ ...options, ...defaultOptions });
  }

  build() {
    const { width, height, stage, cols, rows } = this.getOptions();
    // draw vertical lines
    // for (let column = 0; column < cols; column += 1) {
    //   const x = column * width;
    //   const startPoint = { x, y: 0 };
    //   const endPoint = { x, y: rows * height };
    //   const line = new PaperLine({ startPoint, endPoint });
    //   stage.addChild(line);
    // }

    // draw horizontal lines
    for (let row = 0; row < rows; row += 1) {
      const y = row * height;
      const startPoint = { x: 0, y };
      const endPoint = { x: cols * width, y };
      const line = new PaperLine({ startPoint, endPoint });
      stage.addChild(line);
    }
  }
}
