import PaperLine from './PaperLine';
import colorMap from './ColorMap';
import InteractiveCircle from './InteractiveCircle';

export default class Gamefield {
    constructor(options) {
        if (!options.stage || !options.stage.addChild) {
            throw new Error('Unsupported instance of stage. Please, specify PIXI.Container as a stage');
        }
        const defaultOptions = {width: 25, height: 25, cols: 30, rows: 40, lineWidth: 2};
        this.getOptions = () => ({...options, ...defaultOptions});
    }

    build() {
        const highlightNearestPoint = ({event, col, row, highlighted}) => {
            const {stage} = this.getOptions();

            if (!highlighted) {
                this.highlight(stage, col, row);
            } else {
                this.drawStep(stage, col, row);
                this.highlight(stage, col, row);
            }
            const circles = stage.children.filter(child => child.constructor.name === 'InteractiveCircle');
            const startPointCircle = circles.find(child => child.isActive);
            if (startPointCircle) {
                startPointCircle.isActive = false;
            }
        }
        const {width, height, stage, cols, rows, lineWidth} = this.getOptions();
        const lineStyle = {
            lineWidth,
            lineColor: colorMap.cellLineColor,
            lineAlpha: 0.7,
        };
        // draw vertical lines
        for (let column = 0; column <= cols; column += 1) {
            const x = (column * width) + lineWidth;
            const startPoint = {x, y: lineWidth};
            const endPoint = {x, y: (rows * height) + lineWidth};
            const line = new PaperLine({startPoint, endPoint, lineStyle});
            stage.addChild(line);
        }

        // draw horizontal lines
        for (let row = 0; row <= rows; row += 1) {
            const y = (row * height) + lineWidth;
            const startPoint = {x: lineWidth, y};
            const endPoint = {x: (cols * width) + lineWidth, y};
            const line = new PaperLine({startPoint, endPoint, lineStyle});
            stage.addChild(line);
        }

        // draw points
        for (let row = 1; row < rows; row += 1) {
            for (let col = 1; col < cols; col += 1) {
                const x = (col * width) + lineWidth;
                const y = (row * height) + lineWidth;
                const radius = 5;
                const style = {color: colorMap.pointColor, alpha: 0.3};
                const hoverableCircle = new InteractiveCircle({x, y, radius, style, mouseDownCallback: highlightNearestPoint, col, row});
                stage.addChild(hoverableCircle);
            }
        }
    }

    highlight(stage, col, row) {
        const {cols, rows} = this.getOptions();
        const nearestPoints = [];
        if (col > 1) {
            nearestPoints.push({col: col - 1, row});
            if (row > 1) {
                nearestPoints.push({col: col - 1, row: row - 1});
            }
        }
        if (col < cols - 1) {
            nearestPoints.push({col: col + 1, row});
            if (row < rows - 1) {
                nearestPoints.push({col: col + 1, row: row + 1});
            }
        }
        if (row > 1) {
            nearestPoints.push({col, row: row - 1});
            if(col < cols - 1) {
                nearestPoints.push({col: col + 1, row: row - 1});
            }
        }
        if (row < rows - 1) {
            nearestPoints.push({col, row: row + 1});
            if (col > 1) {
                nearestPoints.push({col: col - 1, row: row + 1});
            }
        }

        const circles = stage.children.filter(child => child.constructor.name === 'InteractiveCircle');
        const highlightedCircles = circles.filter(child => child.highlighted);
        highlightedCircles.forEach(child => child.unhighlight());
        nearestPoints.forEach(({col, row}) => {
            const child = circles.find(child => child.col === col && child.row === row);
            console.log(stage.children);
            console.log(child);
            if (child) {
                child.highlight();
            }
        });
    }

    drawStep(stage, col, row) {
        const {width, height, lineWidth} = this.getOptions();
        const startPointCircle = stage.children.find(child => child.constructor.name === 'InteractiveCircle' && child.isActive);
        console.log('startpoint: ', startPointCircle);
        const startPoint = {x: startPointCircle.graphicsData[0].shape.x, y: startPointCircle.graphicsData[0].shape.y};
        const endPoint = {x: (col * width) + lineWidth, y: (row * height) + lineWidth};
        const lineStyle = {
            lineWidth,
            lineColor: colorMap.stepColor,
            lineAlpha: 0.7,
        };
        const line = new PaperLine({startPoint, endPoint, lineStyle});
        stage.addChild(line);
    }
}
