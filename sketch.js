let cfg = {
  particlesCount: 100,
  showVelocity: false,
  showParticles: false,
};
let brownian;
let particles;
let cbVelocity;
let cbParticles;
let rsBg;

function setup() {
  createCanvas(400, 400);
  noStroke();
  angleMode(DEGREES);
  particles = [];
  direction = createVector(0, 0);
  
  brownian = new Brownian(cfg);
  for(let i = 0; i < cfg.particlesCount; i++){
    particles[i] = new Particle(cfg); 
  }
  createP('Configurations');
  cbParticles = createCheckbox('show particles', true);
  cbVelocity = createCheckbox('show velocity', false);
  rsBg = createSlider(0, 255, 60);
}

function draw() {
  getInputs();
  update(getDeltaTime());
  background(220, cfg.backgroundAlpha);
  
  brownian.draw();
  if(cfg.showParticles){
    particles.forEach((p, i) => {p.draw()});
  }
  drawFps();
}

function getInputs() {
  cfg.showVelocity = cbVelocity.checked();
  cfg.showParticles = cbParticles.checked();
  cfg.backgroundAlpha = rsBg.value();
}

function update(dt) {
  particles.forEach((p, i) => {p.update(dt)});
  particles.forEach((p, i) => {brownian.push(p)});
  brownian.update(dt);
}

function getDeltaTime() {
  return frameRate() != 0 ? max(1/frameRate(), 0.1) : 0.1;
}

function drawFps() {
  push();
  fill(0);
  rect(0,0, 20, 10);
  fill('#0f0');
  textAlign(LEFT, TOP);
  text(""+frameRate().toFixed(0), 0, 0);
  pop();
}