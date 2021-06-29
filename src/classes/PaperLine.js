import * as PIXI from 'pixi.js'

export default class PaperLine {
  constructor({ startPoint = { x: 0, y: 0 }, endPoint = { x: 50, y: 50 }, lineStyle } = {}) {
    const line = new PIXI.Graphics();
    line.drawLine({ startPoint, endPoint, lineStyle });
    return line;
  }
}
