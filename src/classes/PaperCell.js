export default class PaperCell {
  constructor({ width = 50, height = 50, cellColor = '0xffffff', cellLine = '0xff33000' } = {}) {
    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(cellColor);
    rectangle.drawRect(0, 0, width, height);
    rectangle.endFill();
    return rectangle;
  }
}
