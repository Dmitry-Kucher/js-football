import PaperCell from './PaperCell';

export default class Gamefield {
  constructor(options = { width: 50, height: 50, cols: 17, rows: 20, stage }) {
    this.getOptions = () => options;
    const paperCell = new PaperCell({ width, height });
    stage.addChild(paperCell);
  }

  build() {
    console.log('test');
  }
}
