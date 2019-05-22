let cfg = {
  particlesCount: 300,
  showVelocity: false,
  showParticles: true,
};
let canvas;

let cbVelocity;
let cbParticles;
let paragraphEnergy;

let brownian;
let particles;
let walls;

let world;
let traceGraphics;

function setup() {
  createCanvas(400, 400);
  traceGraphics = createGraphics(400 , 400);
  traceGraphics.clear();
  
  world = createWorld();

  const wallThickness = 100;
  walls = [
    new Wall(width / 2, -wallThickness / 2, width + wallThickness, wallThickness),
    new Wall(width / 2, height + wallThickness / 2, width + wallThickness, wallThickness),
    new Wall(-wallThickness / 2, height / 2, wallThickness, height + wallThickness),
    new Wall(width + wallThickness / 2, height / 2, wallThickness, height + wallThickness),
  ];

  noStroke();
  angleMode(DEGREES);
  rectMode(CENTER);
  
  brownian = new Brownian();
  particles = [];
  for(let i = 0; i < cfg.particlesCount; i++){
    particles[i] = new Particle(); 
  }
  createP('Configurations');
  cbParticles = createCheckbox('show particles', cfg.showParticles);
  cbVelocity = createCheckbox('show velocity', cfg.showVelocity);
  paragraphEnergy = createP('');

}

function draw() {
  getInputs();
  update(getDeltaTime());
  background(220, 255);
  
  if(cfg.showParticles){
    particles.forEach((p, i) => {p.draw()});
  }
  walls.forEach((w, i) => {w.draw()});
  brownian.draw();
  brownian.drawTrace(traceGraphics);

  image(traceGraphics, 0, 0);
  drawFps();
}

function getInputs() {
  cfg.showVelocity = cbVelocity.checked();
  cfg.showParticles = cbParticles.checked();
}

function update(dt) {
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);
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
