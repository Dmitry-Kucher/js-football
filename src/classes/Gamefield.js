import PaperCell from './PaperCell';

export default class Gamefield {
  constructor(options) {
    if (!options.stage || !options.stage.addChild) {
      throw new Error('Unsupported instance of stage. Please, specify PIXI.Container as a stage');
    }
    const defaultOptions = { width: 20, height: 20, cols: 30, rows: 40 };
    this.getOptions = () => ({ ...options, ...defaultOptions });
  }

  build() {
    const { width, height, stage, cols, rows } = this.getOptions();
    for (let column = 0; column < cols; column += 1) {
      for (let row = 0; row < rows; row += 1) {
        const x = column * width;
        const y = row * height;
        const paperCell = new PaperCell({ x, y, width, height });
        stage.addChild(paperCell);
      }
    }
  }
}
