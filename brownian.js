
class Brownian extends Particle {

  constructor(options) {

    options = {
      ...{
        radius: 30,
        color: "#8ef3ff",
        initialSpeed: 0,
        x: width / 2,
        y: height / 2,
        traceColor : "#250d59",
      }, 
      ...options
    };
    super(options);
    this.traceColor = options.traceColor;
  }

  draw() {
    super.draw();
  }

  // Draw trace of brownian particle
  drawTrace(canvas) {
    canvas.push();
    noStroke();
    fill(this.traceColor);
    canvas.ellipse(this.pos.x, this.pos.y, 1);
    canvas.pop();
  }

}