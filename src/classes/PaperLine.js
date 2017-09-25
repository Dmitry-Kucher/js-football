import colorMap from './ColorMap';

export default class PaperLine {
  constructor({ startPoint = { x: 0, y: 0 },
                endPoint = { x: 50, y: 50 },
                lineColor = colorMap.cellLineColor,
                lineWidth = 1 } = {}) {
    const line = new PIXI.Graphics();
    line.drawLine({ startPoint, endPoint, lineColor, lineWidth });
    return line;
  }
}
