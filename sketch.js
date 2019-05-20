let cfg = {
  particlesCount: 100,
  showVelocity: true,
  showParticles: true,
};
let canvas;

let cbVelocity;
let cbParticles;
let rsBg;
let paragraphEnergy;

let brownian;
let particles;
let walls;

let world;

function setup() {
  createCanvas(400, 400);
  
  world = createWorld();

  walls = [
    new Wall(width / 2, -50, width + 100, 100),
    new Wall(width / 2, height + 50, width + 100, 100),
    new Wall(-50, height / 2, 100, height + 100),
    new Wall(width + 50, height / 2, 100, height + 100),
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
  rsBg = createSlider(0, 255, 255);
  paragraphEnergy = createP('');

}

function draw() {
  getInputs();
  update(getDeltaTime());
  background(220, cfg.backgroundAlpha);
  
  brownian.draw();
  if(cfg.showParticles){
    particles.forEach((p, i) => {p.draw()});
  }
  walls.forEach((w, i) => {w.draw()});

  drawFps();
  // let totalEnergy = 0;
  // let totalEnergy = brownian.mass * Math.pow(brownian.vel.mag(), 2) / 2;
  // particles.forEach((p, i) => {totalEnergy += p.mass * Math.pow(p.speed, 2) / 2});
  // paragraphEnergy.html('E = ' + totalEnergy.toFixed(2));
}

function getInputs() {
  cfg.showVelocity = cbVelocity.checked();
  cfg.showParticles = cbParticles.checked();
  cfg.backgroundAlpha = rsBg.value();
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
