
class Particle {
  get vel(){ return this.body.GetLinearVelocity(); }
  get speed(){ return this.body.GetLinearVelocity().GetLength(); }
  
  constructor(options = {radius: 5, color: "#f14b7d", maxSpeed: 10}) {
    let pos = new createVector(random(width), random(height));


    this.radius = options.radius;
    this.color = options.color;
    this.maxSpeed = options.maxSpeed;
    
    let vel = new box2d.b2Vec2(random(this.maxSpeed), 0);
    let angle = random(TWO_PI);
    vel.SelfRotateRadians(angle);

    
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
    fd.shape.m_radius = scaleToWorld(this.radius);

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
    fill(this.color);

    let pos = scaleToPixels(this.body.GetPosition());
    let angle = this.body.GetAngleRadians();
    let velocity = scaleToPixels(this.body.GetLinearVelocity());
    translate(pos.x, pos.y);
    ellipse(0, 0,  this.radius * 2);
    stroke(0);
    if(cfg.showVelocity){
      line(velocity.x, velocity.y, 0, 0);
    }
    pop();
  }
}
