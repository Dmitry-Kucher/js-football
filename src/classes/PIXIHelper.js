export default class PIXIHelper {
  static registerHelpers() {
    PIXI.Graphics.prototype.drawLine = function drawLine({ startPoint,
                                                           endPoint,
                                                           lineWidth,
                                                           lineColor }) {
      this.lineStyle(lineWidth, lineColor);
      this.moveTo(startPoint.x, startPoint.y);
      this.lineTo(endPoint.x, endPoint.y);
    };
  }
}
