import colorMap from './ColorMap';

export default class InteractiveCircle extends PIXI.Graphics {
  constructor({ x = 0, y = 0, radius = 10, style } = {}) {
    super();
    if (style) {
      this.beginFill(style.color, style.alpha);
    }
    this.drawCircle(x, y, radius);
    this.interactive = true;
    this.getStyle = () => style;
  }

  mouseover() {
    this.keepState();
    this.clear();
    const { x, y } = this.previousState.shape;
    const radius = this.previousState.shape.radius + 2;
    const style = this.getStyle();
    if (style) {
      this.beginFill(style.color, 1);
    }
    this.tint = colorMap.pointMouseOverColor;
    this.drawCircle(x, y, radius);
  }

  mouseout() {
    this.keepState();
    this.clear();
    const { x, y } = this.previousState.shape;
    const radius = this.previousState.shape.radius - 2;
    this.tint = colorMap.pointColor;
    this.alpha = 1;
    const style = this.getStyle();
    if (style) {
      this.beginFill(style.color, style.alpha);
    }

    this.drawCircle(x, y, radius);
  }

  keepState() {
    this.previousState = this.graphicsData[0];
  }
}
