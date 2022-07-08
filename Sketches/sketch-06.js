const canvasSketch = require('canvas-sketch');

const settings = {
    dimensions: [1080, 1080]
};

let text = 'R';
let fontSize = 1200;
let fontFamily = 'Serif';

const sketch = () => {
    return ({context, width, height}) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        context.fillStyle = 'black';
        // context.font = fontSize + 'px ' + fontFamily; Best to use a Template Literal as follows
        context.font = `${fontSize}px ${fontFamily}`;
        context.textBaseline = 'top';

        const text = 'R';

        const metrics = context.measureText(text);
        const mx = metrics.actualBoundingBoxLeft * -1;
        const my = metrics.actualBoundingBoxAscent * -1;
        const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
        const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

        const x = (width - mw) * 0.5 - mx;
        const y = (height - mh) * 0.5 - my;

        context.save();
        context.translate(x, y);

        context.beginPath();
        context.rect(mx, my, mw, mh);
        context.stroke();

        context.fillText(text, 0, 0);
        context.restore();
    };
};

canvasSketch(sketch, settings);