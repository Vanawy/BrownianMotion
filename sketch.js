// Aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Vector = Matter.Vector,
    Body = Matter.Body;

let cfg = {
  particlesCount: 50,
  showVelocity: true,
  showParticles: true,
};
let brownian;
let particles;
let cbVelocity;
let cbParticles;
let rsBg;
let paragraphEnergy;

let engine;
let world;
let lastDt = 100;

function setup() {

  createCanvas(400, 400);
  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 0.000001;
  Engine.run(engine);
  let options = {
    isStatic: true,
    frictionAir: 0,
    friction: 0,
    frictionStatic: 1,
    inertia: Infinity,
    restitution: 1,
    mass: Infinity,
  };
  let walls = [
    Bodies.rectangle(width / 2, -50, width + 100, 100, options),
    Bodies.rectangle(width / 2, height + 50, width + 100, 100, options),
    Bodies.rectangle(-50, height / 2, 100, height + 100, options),
    Bodies.rectangle(width + 50, height / 2, 100, height + 100, options),
  ];
  World.add(world, walls);

  noStroke();
  angleMode(DEGREES);
  rectMode(CENTER);
  
  brownian = new Brownian(cfg);
  particles = [];
  for(let i = 0; i < cfg.particlesCount; i++){
    particles[i] = new Particle(); 
  }

    // create a renderer
  var render = Render.create({
      element: document.body,
      engine: engine
  });
  render.options.showAngleIndicator = true;
  render.options.showDebug = true;

  // run the renderer
  Render.run(render);

  createP('Configurations');
  cbParticles = createCheckbox('show particles', cfg.showParticles);
  cbVelocity = createCheckbox('show velocity', cfg.showVelocity);
  rsBg = createSlider(0, 255, 255);
  paragraphEnergy = createP('');

}

function draw() {
  getInputs();
  update(getDeltaTime());
  background(220, cfg.backgroundAlpha);
  
  // brownian.draw();
  if(cfg.showParticles){
    particles.forEach((p, i) => {p.draw()});
  }
  drawFps();
  let totalEnergy = 0;
  // let totalEnergy = brownian.mass * Math.pow(brownian.vel.mag(), 2) / 2;
  particles.forEach((p, i) => {totalEnergy += p.mass * Math.pow(p.speed, 2) / 2});
  paragraphEnergy.html('E = ' + totalEnergy.toFixed(2));
}

function getInputs() {
  cfg.showVelocity = cbVelocity.checked();
  cfg.showParticles = cbParticles.checked();
  cfg.backgroundAlpha = rsBg.value();
}

function update(dt) {
  Engine.update(engine, dt);
  lastDt = dt;
}

function getDeltaTime() {
  return (frameRate() != 0 ? max(1/frameRate(), 0.1) : 0.1) * 1000;
}

function drawFps() {
  push();
  fill(0);
  rect(10,5, 20, 10);
  fill('#0f0');
  textAlign(LEFT, TOP);
  text(""+frameRate().toFixed(0), 0, 0);
  pop();
}