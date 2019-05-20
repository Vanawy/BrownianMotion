
class Brownian extends Particle {

  constructor(options) {
    super({...{
      radius: 50,
      color: "#8ef3ff",
      maxSpeed: 0,
      x: width / 2,
      y: height / 2,
    }, ...options});
  }

 
  
  // draw() {
  //   push();
  //   noStroke();
  //   fill(BROWNIAN_COLOR);
  //   translate(this.pos.x, this.pos.y);
  //   ellipse(0, 0,  this.r * 2);
  //   stroke(0);
  //   if(this.cfg.showVelocity){
  //     line(this.vel.x, this.vel.y, 0, 0);
  //   }
  //   pop();
  // }
}