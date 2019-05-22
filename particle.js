
class Particle {
  get vel(){ return this.body.GetLinearVelocity(); }
  get speed(){ return this.body.GetLinearVelocity().GetLength(); }
  
  constructor(options = {}) {
    options = {
      ...{
        radius: 5, 
        color: "#f14b7d", 
        initialSpeed: 20
      }, 
      ...options
    };
    let pos = new createVector(
      options.x ? options.x : random(width), 
      options.y ? options.y : random(height)
    );

    this.radius = options.radius;
    this.color = options.color;
    this.initialSpeed = options.initialSpeed;
    this.pos = {x: pos.x, y: pos.y };
    
    // Define initial velocity of the body
    let vel = new box2d.b2Vec2(randomGaussian(this.initialSpeed, this.initialSpeed * 0.3), 0);
    let angle = random(TWO_PI);
    vel.SelfRotateRadians(angle);

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
    // Set initial velocity
    this.body.SetLinearVelocity(vel);
  }
  
  draw() {
    push();
    noStroke();
    fill(this.color);

    let pos = scaleToPixels(this.body.GetPosition());
    this.pos = {x: pos.x, y: pos.y };
    let angle = this.body.GetAngleRadians();
    let velocity = scaleToPixels(this.body.GetLinearVelocity());
    translate(pos.x, pos.y);
    ellipse(0, 0,  this.radius * 2);
    pop();
  }
}
