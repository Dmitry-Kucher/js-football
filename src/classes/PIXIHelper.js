import colorMap from './ColorMap';

export default class PIXIHelper {
  static registerHelpers() {
    PIXI.Graphics.prototype.drawLine = function drawLine({ startPoint,
                                                           endPoint,
                                                           lineStyle = {
                                                             lineWidth: 1,
                                                             lineColor: colorMap.defaultColor,
                                                             lineAlpha: 1,
                                                           },
                                                          }) {
      const { lineWidth, lineColor, lineAlpha } = lineStyle;
      this.lineStyle(lineWidth, lineColor, lineAlpha);
      this.moveTo(startPoint.x, startPoint.y);
      this.lineTo(endPoint.x, endPoint.y);
    };
  }
}
