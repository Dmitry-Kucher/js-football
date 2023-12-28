import * as PIXI from 'pixi.js'
import colorMap from './ColorMap';

export default class InteractiveCircle extends PIXI.Graphics {
    constructor({x = 0, y = 0, radius = 10, style, mouseDownCallback, col, row} = {}) {
        super();
        if (style) {
            this.beginFill(style.color, style.alpha);
        }
        this.col = col;
        this.row = row;
        this.mousedownCallback = mouseDownCallback;
        this.drawCircle(x, y, radius);
        this.interactive = true;
        this.getStyle = () => style;
        this.highlighted = false;
        this.isActive = false;
        this.isBusy = false;
    }

    mouseover() {
        if (this.highlighted) {
            return;
        }
        this.keepState();
        this.clear();
        const {x, y} = this.previousState.shape;
        const radius = this.previousState.shape.radius + 2;
        const style = this.getStyle();
        if (style) {
            this.beginFill(style.color, 1);
        }
        this.tint = colorMap.pointMouseOverColor;
        this.drawCircle(x, y, radius);
    }

    mouseout() {
        if (this.highlighted) {
            return;
        }
        this.keepState();
        this.clear();
        const {x, y} = this.previousState.shape;
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

    mousedown(event) {
        this.mousedownCallback({event, col: this.col, row: this.row, highlighted: this.highlighted});
        this.isActive = true;
        if (this.highlighted) {
            this.isBusy = true;
            return;
        }
    }

    highlight() {
        if (this.highlighted || this.isBusy) {
            return;
        }
        this.keepState();
        this.clear();
        const {x, y} = this.previousState.shape;
        const radius = this.previousState.shape.radius + 2;
        const style = this.getStyle();
        if (style) {
            this.beginFill(colorMap.highlightColor, 0.4);
        }
        this.tint = colorMap.highlightColor;
        this.drawCircle(x, y, radius);
        this.highlighted = true;

    }

    unhighlight() {
        if (!this.highlighted) {
            return;
        }
        this.keepState();
        this.clear();
        const {x, y} = this.previousState.shape;
        const radius = this.previousState.shape.radius - 2;
        const style = this.getStyle();
        if (style) {
            this.beginFill(style.color, style.alpha);
        }
        this.tint = colorMap.pointColor;
        this.drawCircle(x, y, radius);
        this.highlighted = false;
    }
}
