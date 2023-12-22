let cone1, cone2, cone3, cone4, cone5, cone6; //cone1 for treble, cone2 for highmid, cone3 for mid, cone4 for lowmid, cone5 for bass, cone6 for bass
let trb, highmd, md, lowmd, bs;

let amp;
let fft;
let mic;
let song;
let button, button2;
let input;
let c1, c2, c3;
let oldColor1 = 0, newColor1 = 60;
let oldColor2 = 100, newColor2 = 160;
let oldColor3 = 200, newColor3 = 260;
let listening = false;
let drawing = false;
let change = 0;
let counter = 0;
let counter2 = 0;


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
    clear();
    background(224,100,60);
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
  colorMode(HSB);
  // ambientLight(y2, y2/2, y2/3);
  ambientLight(60, 50, 75 + y3);
  colorMode(RGB);
  pointLight(180, y2, y2, width/2, height/2, 1000);
  

  
  //3D Shape Setup
  translate(mouseX - width/2, mouseY - height/2, 0);
  rotateX(frameCount * 0.075);
  rotateZ(frameCount * 0.075);
  colorMode(HSB);
  noStroke();
  
  
  if (counter > 100) {
    oldColor1 = newColor1;
    oldColor2 = newColor2;
    oldColor3 = newColor3;
    counter = 0;
    newColor1 = random(0,90);
    newColor2 = random(91,180);
    newColor3 = random(181,270);
    change = 0;
  }
  counter = counter + 1;
  
  c1a = color(oldColor1, 100, y3);
  c1b = color(newColor1, 100, y3);
  let c1 = lerpColor(c1a, c1b, change);
  c2a = color(oldColor2, 100, y3);
  c2b = color(newColor2, 100, y3);
  let c2 = lerpColor(c2a, c2b, change);
  c3a = color(oldColor3, 100, y3);
  c3b = color(newColor3, 100, y3);
  let c3 = lerpColor(c3a, c3b, change);
  
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
  
   // Degree * Math.PI/180
  //sound viz
  push();
  translate(0, y/2,-y/2); 
  rotateY(90 * Math.PI/180);
  rotateZ(90 * Math.PI/180);
  ambientMaterial(c1);
  cone1 = cone(trbMap, y, 24, 6);
  change += 0.01;
  pop();
  
  push();
  translate(0,0,0);
  ambientMaterial(60, 100, y3);
  cone3 = cone(mdMap, y, 24, 6);
  pop();
  
  push();
  translate(0,y,0);
  rotateX(180 * Math.PI/180);
  ambientMaterial(c2);
  cone2 = cone(highmdMap, y, 24, 1);
  pop();
  
  push();
  translate(y/2,y/2,0);
  rotateZ(90 * Math.PI/180);
  ambientMaterial(180, 100, y3);
  cone4 = cone(lowmdMap, y, 24, 1);
  pop();
  
  push();
  translate(-y/2,y/2,0);
  rotateZ(270 * Math.PI/180);
  ambientMaterial(c3);
  cone5 = cone(bsMap, y, 24, 1);
  pop();
  
  push();
  translate(0, y/2, y/2);
  rotateY(-90 * Math.PI/180);
  rotateZ(90 * Math.PI/180);
  ambientMaterial(300, 100, y3);
  cone6 = cone(bsMap, y, 24, 1);
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








