const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const tweakpane = require('tweakpane');

const settings = {
    dimensions: [1080, 1080],
    animate: true
};

const params = {
    cols: 10,
    rows: 10,
    scaleMin: 1,
    scaleMax: 10,
    circleScale: 2,
    gradient: 60,
    rectSize: 1,
    speed: 10,
    freq: 0.001,
    amp: 0.2,
    frame: 0,
    animate: true,
    // rotate: angle;
    // lineCap: 'butt',
};

const sketch = () => {
    return ({ context, width, height, frame }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        // let color = selectRandom(["#20E007", "#85FF75", "#6DFA5A", "#AD1C7D", "#FA5AC5"]);

        // use for cirlces
        let a, b;
        let radius = 16;
        let circleLineScale = 2;

        const cols = params.cols;
        const rows = params.rows;
        const numCells = cols * rows;

        const gridw = width * 0.8;
        const gridh = height * 0.8;
        const cellw = gridw / cols;
        const cellh = gridh / rows;
        const margx = (width - gridw) * 0.5;
        const margy = (height - gridh) * 0.5;

        for (let i = 0; i < numCells; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);

            const x = col * cellw;
            const y = row * cellh;
            const w = cellw * 0.8;
            const h = cellh * 0.8;

            const f = params.animate ? frame : params.frame;

            const n = random.noise3D(x, y, f * params.speed, params.freq);

            const angle = n * Math.PI * params.amp;

            const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

            // context.strokeStyle = color;


            context.save();
            // context.moveTo(0, 0);


            context.translate(x, y);
            context.translate(margx, margy);
            // context.moveTo(w * 0.5, h * 0.5);
            context.rotate(angle);

            context.lineWidth = scale;
            // context.lineCap = params.lineCap;

            var gradient = context.createLinearGradient(0, 0, params.gradient, 0);
            gradient.addColorStop("0", "#20E007");
            gradient.addColorStop("0.5", "#6DFA5A");
            gradient.addColorStop("1.0", "#FA5AC5");
            context.strokeStyle = gradient;


            context.beginPath();
            context.rect(0, 0, w * params.rectSize, h * params.rectSize);
            context.stroke();


            context.beginPath();
            let a = w * 0.5;
            let b = h * 0.5;
            context.arc(a, b, radius, 0, 2 * Math.PI);
            context.strokeStyle = gradient;
            context.lineWidth = params.circleScale;
            context.stroke();



            // context.strokeStyle = "#20E007";



            context.restore();





        }

        function selectRandom(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }
    };
};

const createPane = () => {
    const pane = new tweakpane.Pane();
    let folder;

    folder = pane.addFolder({ title: 'Grid' });
    // folder.addInput(params, 'lineCap', { options: { butt: 'butt', round: 'round', square: 'square' } });
    folder.addInput(params, 'cols', { min: 2, max: 50, step: 1 });
    folder.addInput(params, 'rows', { min: 2, max: 50, step: 1 });
    folder.addInput(params, 'speed', { min: 1, max: 50, step: 1 });
    folder.addInput(params, 'scaleMin', { min: 1, max: 100 });
    folder.addInput(params, 'scaleMax', { min: 1, max: 100 });
    folder.addInput(params, 'gradient', { min: 1, max: 180 });
    folder.addInput(params, 'circleScale', { min: 1, max: 100 });
    folder.addInput(params, 'rectSize', { min: 0.1, max: 1 });

    folder = pane.addFolder({ title: 'Noise' });
    folder.addInput(params, 'freq', { min: -0.01, max: 0.01 });
    folder.addInput(params, 'amp', { min: 0, max: 1 });
    folder.addInput(params, 'animate');
    // folder.addInput(params, 'rotate');
    folder.addInput(params, 'frame', { min: 0, max: 999 });
};

createPane();
canvasSketch(sketch, settings);
