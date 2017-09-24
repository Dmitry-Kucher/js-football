import colorMap from './ColorMap';

export default class PaperCell {
  constructor({ width = 50,
                height = 50,
                cellColor = colorMap.cellColor,
                cellLineColor = colorMap.cellLineColor,
                cellLineWidth = 3 } = {}) {
    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(cellColor);
    rectangle.lineStyle(cellLineWidth, cellLineColor);
    rectangle.drawRect(cellLineWidth, cellLineWidth, width, height);
    rectangle.endFill();
    return rectangle;
  }
}
