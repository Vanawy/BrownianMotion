
// Constants
const PARTICLE_RADIUS = 5;
const PARTICLE_MASS = 10;
const PARTICLE_MAX_SPEED = 1;
const PARTICLE_COLOR = "#f14b7d";

class Particle {
  get radius(){ return PARTICLE_RADIUS; }
  get mass(){ return PARTICLE_MASS; }
  get vel(){ return this.body.velocity; }
  get speed(){ return this.body.speed; }
  
  constructor() {
    this.cfg = cfg;
    let pos = new createVector(random(width), random(height));
    // let vel = new createVector(random(PARTICLE_MAX_SPEED), 0);
    let options = {
      mass: PARTICLE_MASS,
      frictionAir: 0,
      friction: 0,
      frictionStatic: 1,
      inertia: Infinity,
      restitution: 1,
    };
    this.body = Bodies.circle(pos.x, pos.y, PARTICLE_RADIUS, options);
    World.add(world, this.body);

    var vx = 0.1 * (Math.random() - 0.5)
    var vy = 0.1 * (Math.random() - 0.5)
    Engine._bodiesApplyGravity([this.body], { x: vx, y: vy })

    // let vel = Vector.create(random(PARTICLE_MAX_SPEED));
    // let angle = random(TWO_PI);
    // vel = Vector.rotate(vel, angle);
    
    // Body.setVelocity(this.body, vel);
    // Body.setAngle(this.body, angle);
  }
  
  // update(delta) {
  //   this.pos.add(this.vel.copy().mult(delta));
  //   if(this.pos.x > width || this.pos.x  < 0){
  //     this.vel.x *= -1;
  //     this.pos.x = this.pos.x < 0 ? 0 : width;
  //   }
  //   if(this.pos.y > height || this.pos.y  < 0){
  //     this.vel.y *= -1;
  //     this.pos.y = this.pos.y < 0 ? 0 : height;
  //   }
  // }
  
  draw() {
    push();
    noStroke();
    fill(PARTICLE_COLOR);

    let pos = this.body.position;
    let angle = this.body.angle;
    translate(pos.x, pos.y);
    rotate(angle);
    ellipse(0, 0,  PARTICLE_RADIUS * 2);
    stroke(0);
    if(this.cfg.showVelocity){
      line(this.body.velocity.x, this.body.velocity.y, 0, 0);
    }
    pop();
  }
}