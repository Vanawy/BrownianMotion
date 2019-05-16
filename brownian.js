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
    // Расстояние между частицами
    let deltaR = particle.pos.copy().sub(this.pos);
    if(deltaR.mag() < this.r){
      particle.pos.set(this.pos.copy().add(deltaR.copy().setMag(this.r)));

      let v1 = this.vel.copy();
      let v2 = particle.vel.copy();

      // нормальная составляющая вектора расстояния
      let n = deltaR.normalize();

      // Проекции вектора скорости на вектор n 
      const a1 = v1.copy().dot(n);
      const a2 = v2.copy().dot(n);

      // optP =  2(a1 - a2)
      //         -----------
      //           m1 + m2
      const optP = (2.0 * (a1 - a2)) / (this.mass + particle.mass);

      // v1' = v1 - optP * m2 * n
      const v1_ = v1.sub(n.mult(optP * particle.mass));

      // v2' = v2 + optP * m1 * n
      const v2_ = v2.add(n.mult(optP * this.mass));

      this.vel = v1_;
      particle.vel = v2_; 
    }
  }
}