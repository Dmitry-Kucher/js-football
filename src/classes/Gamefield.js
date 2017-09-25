import PaperLine from './PaperLine';
import colorMap from './ColorMap';

export default class Gamefield {
  constructor(options) {
    if (!options.stage || !options.stage.addChild) {
      throw new Error('Unsupported instance of stage. Please, specify PIXI.Container as a stage');
    }
    const defaultOptions = { width: 25, height: 25, cols: 30, rows: 40, lineWidth: 2 };
    this.getOptions = () => ({ ...options, ...defaultOptions });
  }

  build() {
    const { width, height, stage, cols, rows, lineWidth } = this.getOptions();
    const lineStyle = {
      lineWidth,
      lineColor: colorMap.cellLineColor,
      lineAlpha: 0.2,
    };
    // draw vertical lines
    for (let column = 0; column <= cols; column += 1) {
      const x = (column * width) + lineWidth;
      const startPoint = { x, y: lineWidth };
      const endPoint = { x, y: (rows * height) + lineWidth };
      const line = new PaperLine({ startPoint, endPoint, lineStyle });
      stage.addChild(line);
    }

    // draw horizontal lines
    for (let row = 0; row <= rows; row += 1) {
      const y = (row * height) + lineWidth;
      const startPoint = { x: lineWidth, y };
      const endPoint = { x: (cols * width) + lineWidth, y };
      const line = new PaperLine({ startPoint, endPoint, lineStyle });
      stage.addChild(line);
    }
  }
}
