const PARTICLE_RADIUS = 5;
const PARTICLE_MASS = 10;
const PARTICLE_MAX_SPEED = 50;
const PARTICLE_COLOR = "#f14b7d";

class Particle {
  get radius(){ return PARTICLE_RADIUS; }
  get mass(){ return PARTICLE_MASS; }
  
  constructor(cfg) {
    this.cfg = cfg;
    this.pos = new createVector(random(width), random(height));
    this.vel = new createVector(random(PARTICLE_MAX_SPEED), 0);
    this.vel.rotate(random(TWO_PI));
  }
  
  update(delta) {
    this.pos.add(this.vel.copy().mult(delta));
    if(this.pos.x > width || this.pos.x  < 0){
      this.vel.x *= -1;
      this.pos.x = this.pos.x < 0 ? 0 : width;
    }
    if(this.pos.y > height || this.pos.y  < 0){
      this.vel.y *= -1;
      this.pos.y = this.pos.y < 0 ? 0 : height;
    }
  }
  
  draw() {
    push();
    noStroke();
    fill(PARTICLE_COLOR);
    translate(this.pos.x, this.pos.y);
    ellipse(0, 0,  PARTICLE_RADIUS * 2);
    stroke(0);
    if(this.cfg.showVelocity){
      line(this.vel.x, this.vel.y , 0, 0);
    }
    pop();
  }
}