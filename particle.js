
// Constants
const PARTICLE_RADIUS = 5;
const PARTICLE_MASS = 10;
const PARTICLE_MAX_SPEED = 10;
const PARTICLE_COLOR = "#f14b7d";

class Particle {
  get radius(){ return PARTICLE_RADIUS; }
  get mass(){ return PARTICLE_MASS; }
  get vel(){ return this.body.GetLinearVelocity(); }
  get speed(){ return this.body.GetLinearVelocity().GetLength(); }
  
  constructor() {
    let pos = new createVector(random(width), random(height));

    let vel = new box2d.b2Vec2(random(PARTICLE_MAX_SPEED), 0);
    let angle = random(TWO_PI);
    
    // Body.setVelocity(this.body, vel);
    // Body.setAngle(this.body, random(TWO_PI));

    // Define a body
    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(pos.x, pos.y);

    // Define a fixture
    let fd = new box2d.b2FixtureDef();
    // Fixture holds shape
    fd.shape = new box2d.b2CircleShape();
    fd.shape.m_radius = scaleToWorld(PARTICLE_RADIUS);

    // Some physics
    fd.density = 1.0;
    fd.friction = 0;
    fd.restitution = 1;

    // Create the body
    this.body = world.CreateBody(bd);
    // Attach the fixture
    this.body.CreateFixture(fd);

    // Some additional stuff
    this.body.SetLinearVelocity(vel);
    // this.body.SetAngularVelocity(angle);
  }
  
  draw() {
    push();
    noStroke();
    fill(PARTICLE_COLOR);

    let pos = scaleToPixels(this.body.GetPosition());
    let angle = this.body.GetAngleRadians();
    let velocity = scaleToPixels(this.body.GetLinearVelocity());
    translate(pos.x, pos.y);
    ellipse(0, 0,  PARTICLE_RADIUS * 2);
    stroke(0);
    if(cfg.showVelocity){
      line(velocity.x, velocity.y, 0, 0);
    }
    pop();
  }
}