import colorMap from './ColorMap';

export default class PaperCell {
  constructor({ width = 50,
                height = 50,
                x = 3,
                y = 3,
                cellColor = colorMap.cellColor,
                cellLineColor = colorMap.cellLineColor,
                cellLineWidth = 1 } = {}) {
    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(cellColor);
    rectangle.lineStyle(cellLineWidth, cellLineColor);
    rectangle.drawRect(x + cellLineWidth, y + cellLineWidth, width, height);
    rectangle.endFill();
    return rectangle;
  }
}
