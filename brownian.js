const BROWNIAN_MASS = 1000;
const BROWNIAN_COLOR = "#8ef3ff";

class Brownian {
  get radius(){ return this.r; }
  get mass(){ return BROWNIAN_MASS; }
  constructor(cfg) {
    this.cfg = cfg;
    this.pos = new createVector(width / 2, height / 2);
    this.vel = new createVector(0.0000001, 0);
    this.r = 40;
  }
  
  update(delta) {
    this.pos.add(this.vel.copy().mult(delta));
    if(this.pos.x + this.r > width || this.pos.x - this.r < 0){
      this.vel.x *= -1;
      this.pos.x = this.pos.x - this.r < 0 ? this.r : width - this.r;
    }
    if(this.pos.y +this.r > height || this.pos.y - this.r < 0){
      this.vel.y *= -1;
      this.pos.y = this.pos.y - this.r < 0 ? this.r : height - this.r;
      
    }
  }
  
  draw() {
    push();
    noStroke();
    fill(BROWNIAN_COLOR);
    translate(this.pos.x, this.pos.y);
    ellipse(0, 0,  this.r * 2);
    stroke(0);
    if(this.cfg.showVelocity){
      line(this.vel.x, this.vel.y, 0, 0);
    }
    pop();
  }
  
  push(particle) { 
    let deltaR = particle.pos.copy().sub(this.pos);
    if(deltaR.mag() < this.r){
      particle.pos.set(this.pos.copy().add(deltaR.setMag(this.r)));
      let va = particle.vel.mag();
      let ma = particle.mass;
      let vb = this.vel.mag();
      let mb = this.mass;
      let vaf = ((ma - mb)/(ma + mb)) * va + ((2 * mb)/(ma + mb)) * vb;
      let vbf = ((2 * ma)/(ma + mb)) * va + ((mb - ma)/(ma + mb)) * vb;
      // console.log(abs(vaf) - abs(va));
      // console.log(degrees());
      let deltaA = 180 - particle.vel.angleBetween(deltaR);
      // console.log(deltaA);
      particle.vel.rotate(deltaA);
      // particle.vel.mag(vaf);
      this.vel.rotate(-deltaA);
      this.vel.setMag(vbf);
      particle.vel.setMag(vaf);
    }
  }
}