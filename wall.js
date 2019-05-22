class Wall {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    let fd = new box2d.b2FixtureDef();
    fd.density = 1.0;
    fd.friction = 0;
    fd.restitution = 1;

    let bd = new box2d.b2BodyDef();

    bd.type = box2d.b2BodyType.b2_staticBody;
    bd.position.x = scaleToWorld(this.x);
    bd.position.y = scaleToWorld(this.y);
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(scaleToWorld(this.w)/2, scaleToWorld(this.h)/2);
    this.body = world.CreateBody(bd).CreateFixture(fd);
  }

  draw() {
    fill(100);
    stroke(0);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }
}