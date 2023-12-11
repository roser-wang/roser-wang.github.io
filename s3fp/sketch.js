let cone1, cone2, cone3, cone4, cone5, cone6; //cone1 for treble, cone2 for highmid, cone3 for mid, cone4 for lowmid, cone5 for bass, cone6 for bass
let trb, highmd, md, lowmd, bs;

let amp;
let fft;
let mic;
let song;
let button, button2;
let input;
let listening = false;
let drawing = false;


function preload() {
  song = loadSound('highTower.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  button = createButton('START');
  button.class('button');
  button.position(width/2 - 180, height - 100);
  button.mousePressed(toggleMode);
  button2 = createButton('DRAW');
  button2.class('button');
  button2.position(width/2 + 25, height - 100);
  button2.mousePressed(toggleBg);
  
  let titlediv = createDiv('Turn on your microphone and speaker, and enjoy!');
  titlediv.class('wrapper');
  titlediv.position(0, height/12);
  
  fft = new p5.FFT();
  amp = new p5.Amplitude();
  mic = new p5.AudioIn();
}


function draw() {
  
//To draw or not
  if(drawing === false){
    // clear();
    background(10,50,150);
  } else {
  
  }
  
//2 modes amplitude input change
  if(song.isPlaying()){
    input = amp.getLevel();
  } else {
    input = mic.getLevel();
  }

  y = map(input, 0, 1, 50, 200);
  y2 = map(input, 0, 1, 0, 255);
  y3 = map(input, 0, 1, 50, 100);
  count = floor(map(input, 0, 1, 6, 24));
  
  //ambient light
  colorMode(RGB);
  ambientLight(y2, y2/2, y2/3);
  pointLight(180, y2, y2, width/2, height/2, 1000);
  

  
  //3D Shape Setup
  rotateX(frameCount * 0.005);
  rotateZ(frameCount * 0.005);
  colorMode(HSB);
  // ambientMaterial(50,200,0);
  noStroke();
  coneColor = random(0,359);
  
  //FFT analysis
  fft.analyze();
  trb = fft.getEnergy('treble');
  highmd = fft.getEnergy(4200, 4500);
  md = fft.getEnergy('mid');
  lowmd = fft.getEnergy('lowMid');
  bs = fft.getEnergy('bass');

  trbMap = map(trb, 40, 110, 5, 50);
  highmdMap = map(highmd, 50, 120, 5, 50);
  mdMap = map(md, 60, 120, 5, 50);
  lowmdMap = map(lowmd, 100, 220, 5, 50);
  bsMap = map(bs, 100, 200, 5, 50);
  
  mvX = mouseX;
  mvY = mouseY;
  //sound viz
  push();
  translate(0, y/2,-y/2);
  rotateY(1.5);
  rotateZ(1.5);
  ambientMaterial(coneColor, 100, y3);
  cone1 = cone(trbMap, y, count, 6);
  pop();
  
  push();
  translate(0,0,0);
  ambientMaterial(60, 100, y3);
  cone3 = cone(mdMap, y, count, 6);
  pop();
  
  push();
  translate(0,y,0);
  rotateX(135);
  ambientMaterial(coneColor + 120, 100, y3);
  cone2 = cone(highmdMap, y, count, 1);
  pop();
  
  push();
  translate(y/2,y/2,0);
  rotateZ(-30);
  ambientMaterial(180, 100, y3);
  cone4 = cone(lowmdMap, y, count, 1);
  pop();
  
  push();
  translate(-y/2,y/2,0);
  rotateZ(80);
  ambientMaterial(coneColor + 240, 100, y3);
  cone5 = cone(bsMap, y, count, 1);
  pop();
  
  push();
  translate(0, y/2, y/2);
  rotateY(-1.5);
  rotateZ(1.5);
  ambientMaterial(300, 100, y3);
  cone6 = cone(bsMap, y, count, 1);
  pop();
}


//Mode Change 
function toggleMode() {
  if(listening === false){
    mic.stop();
    song.play();
    button.html('Mic Mode');
    rotateX(frameCount * 0.05);
    rotateZ(frameCount * 0.05);
    listening = true;
  } else {
    song.pause();
    mic.start();
    button.html('Song Mode');
    listening = false;
  }
}

//Start or pause draw
function toggleBg() {
  if(drawing === false) {
    button2.html('DRAWING...');
    drawing = true;
  } else {
    button2.html('DRAW');
    drawing = false;
  }
}








