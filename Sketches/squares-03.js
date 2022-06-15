const canvasSketch = require('canvas-sketch');

const settings = {
    dimensions: [1700, 900]
};

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        let color = selectRandom(["#20E007", "#85FF75", "#6DFA5A", "#AD1C7D", "#FA5AC5"]);
        let size = 20;
        let aspectOffset = 10;

        context.lineWidth = 4;
        context.beginPath();
        context.rect(50, 50, 200, 200);
        context.strokeStyle = color;

        // used for Squares
        const w = 60;
        const h = 60;
        const gap = 20;
        let x, y;

        // use for cirlces
        let a, b;
        let radius = 16;


        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size - aspectOffset; j++) {

                color = selectRandom(["#20E007", "#85FF75", "#6DFA5A", "#AD1C7D", "#FA5AC5"]);

                x = 60 + (w + gap) * i;
                y = 60 + (h + gap) * j;

                a = 82 + (w + gap) * i;
                b = 82 + (h + gap) * j;

                // outer squares
                if (Math.random() > 0.5) // set to zero to always show
                {
                    context.beginPath();
                    context.rect(x, y, w, h);
                    context.stroke();
                    context.strokeStyle = color;
                }

                // inside squares					
                if (Math.random() > 0.5) {
                    context.beginPath();
                    context.rect(x + 8, y + 8, w - 16, h - 16);
                    context.stroke();
                    context.strokeStyle = color;

                }

                //  outer circles
                if (Math.random() > 0.5) {
                    context.beginPath();
                    context.arc(a + 8, b + 8, radius, 0, 2 * Math.PI);
                    context.stroke();
                    context.strokeStyle = color;
                }


                // inner cirlces
                if (Math.random() > 0.5) {
                    context.beginPath();
                    context.arc(a + 8, b + 8, radius / 2, 0, 2 * Math.PI);
                    context.stroke();
                    context.strokeStyle = color;
                }





            }

        }


        // top left line 
        context.moveTo(60, 60);
        context.lineTo(840, 840);
        context.stroke();

        // top right line
        context.moveTo(1640, 60);
        context.lineTo(860, 840);
        context.stroke();

        // bottom left line 
        context.moveTo(60, 840);
        context.lineTo(840, 60);
        context.stroke();

        // bottom right line
        context.moveTo(1640, 840);
        context.lineTo(860, 60);
        context.stroke();

        function selectRandom(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

    };
};

canvasSketch(sketch, settings);
