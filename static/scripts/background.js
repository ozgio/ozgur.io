function startBgAnimation(p5) {
    const numDegrees = 362;

    let frameRate = 40;
    let width = 600;
    let height = 600;
    let center = {
        x: width / 2,
        y: height / 2
    };

    let params = {
        radius: 320,
        numShapes: 20,
        lineSpacingFactor: 5,
        alpha: 50,
        noiseXFactor: 1 / 60,
        noiseYFactor: 1 / 120,
        strokeWeight: 1,
        degreeMultiplier: 1
    }

    let sketch = function (p) {
        p.setup = function () {
            p.frameRate(frameRate);
            p.createCanvas(width, height);
            p.angleMode(p.DEGREES);
        };

        p.draw = function () {
            p.noFill();
            p.background(p.color("#202226"));

            for (let i = 0; i < params.numShapes; i++) {
                drawShape(i);
            }

        };

        function drawShape(index) {
            p.strokeWeight(params.strokeWeight);
            p.stroke(30 + index * 10, 230 - index * 12, 0 + index * 1, params.alpha);

            let xs = Array(numDegrees);
            let ys = Array(numDegrees);
            p.beginShape();
            let endDegree = numDegrees * params.degreeMultiplier
            for (let i = 0; i < endDegree; i++) {
                let noiseX = i * params.noiseXFactor;
                let noiseY = (p.frameCount + index * params.lineSpacingFactor) * params.noiseYFactor + 0.02;
                var noiseFactor = p.noise(noiseX, noiseY);
                let y = p.sin(i) * (params.radius * noiseFactor);
                let x = (i > endDegree / 2) ? xs[endDegree - i] : p.cos(i) * (params.radius * noiseFactor);
                p.curveVertex(center.x + x, center.y + y);
                xs[i] = x;
                ys[i] = y;
            }
            p.endShape(p.CLOSE);
        }
    };



    function avg(a, b) {
        return (a + b) / 2;
    }

    function start() {
        let id = "bg";
        let elm = document.getElementById(id)
        elm.setAttribute("style", "position: absolute; left: 50%;  top: 50%; z-index: -1;");
        elm.style.width = width + 'px';
        elm.style.height = height + 'px';
        elm.style.marginTop = '-' + (height / 2) + 'px'
        elm.style.marginLeft = '-' + (width / 2) + 'px'

        new p5(sketch, id);
    }


    start();
}