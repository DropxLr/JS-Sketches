import paper from 'paper';
import Seed from "./Seed";

export default class Drawing {
    constructor() {
        this._canvas = null;
        this._createCanvas();
        this.init();

        this._seed = new Seed("ricky");

        for (let i = 0; i < 100; i++) {
            var myCircle = new paper.Path.Circle(new paper.Point(window.innerWidth * this._seed.random(i), window.innerHeight * this._seed.random(i * 1.5)), 20);
            myCircle.fillColor = 'black';
        }
    }

    init() {
        paper.setup(this._canvas);
    }

    _createCanvas() {
        this._canvas = document.getElementById("view");
        this._canvas.style.width = window.innerWidth;
        this._canvas.style.height = window.innerHeight;
        console.log(this._canvas);
    }
}