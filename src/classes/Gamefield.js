import PaperCell from './PaperCell';

export default class Gamefield {
  constructor(options) {
    if (!options.stage || !options.stage.addChild) {
      throw new Error('Unsupported instance of stage. Please, specify PIXI.Container as a stage');
    }
    const defaultOptions = { width: 50, height: 50, cols: 17, rows: 20 };
    this.getOptions = () => ({ ...options, ...defaultOptions });
  }

  build() {
    const { width, height, stage } = this.getOptions();
    let { cols, rows } = this.getOptions();
    while (cols > 0) {
      while (rows > 0) {
        rows -= 1;
        const paperCell = new PaperCell({ width, height });
        paperCell.x = cols * width;
        paperCell.y = rows * height;
        stage.addChild(paperCell);
      }
      cols -= 1;
    }
  }
}
