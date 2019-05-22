
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
    this.trace = [];
    this.trace.push(this.pos);
  }

  draw() {
    super.draw();

    if(frameCount % 60 == 0) {
      this.trace.push(this.pos);
    }
  }

  // Draw trace of brownian particle
  drawTrace() {
    push();
    stroke(this.traceColor);
    const pointsCount = this.trace.length;
    for(let i = 1; i < pointsCount; i++){
      line(this.trace[i].x, this.trace[i].y, this.trace[i - 1].x, this.trace[i - 1].y);
    }
    line(this.trace[pointsCount - 1].x, this.trace[pointsCount - 1].y, this.pos.x, this.pos.y)
    pop();
  }

}