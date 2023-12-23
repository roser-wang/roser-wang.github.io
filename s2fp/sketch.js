var stringLeng = 200;
let milkDrop;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS);
  ellipseMode(CENTER);
  pitcher = loadImage('pitcher.png');
  mug = loadImage('coffeemug.png');
  mugfront = loadImage('coffeemugfront.png');
  milkDrop = new particle;
}

function draw() {
  
  // BACKGROUND COMPOSITION
  background(120,80,60);
  
  // PENDULUM PITCHER DEFINITION
  let angle = map(millis() % 4000, 0, 4000, 0, PI * 2);
  translate(width/2, 0);
  push ();
    translate(0, -height/7);
    rotate(sin(angle) * 0.35);
    drawPeriod (hour);
  pop ();
  // DRAW MINUTED DISPLAY
  push ();
    drawCoffee (minute);
  pop ();
  // DRAW HOUR DISPLAY
  push ();
    drawNumber (hour);
  pop ();
  // DRAW POURING MILK
  push ();
    milkDrop.update();
    milkDrop.show();
  pop ();
}

function drawPeriod(hour) {
  rotate(-0.045 * PI);
  image(pitcher, 0, stringLeng);
  
}

// CREATE POURING MILK OBJECT
class particle {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.history = [];
  }

  update () {
    let angle = map(millis() % 4000, 0, 4000, 0, PI * 2);
    let a = -sin(angle) * 0.5;
    this.x = stringLeng * sin (a);
    this.y = (-height/7 + 45) + stringLeng * cos (a) + millis () % 4000 * 0.08;

    let v = createVector(this.x, this.y);
    this.history.push(v);

    if (this.history.length > 70) {
      this.history.splice(0, 1);
    }
  }

  show() {
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      let strk = 20 - millis () % 4000 * 0.005;
      if (millis () % 4000 < 1200 ) {
        stroke (55, 255, 250, 0);
      } else {
        stroke (255, 255, 250, 255);
      }

      noFill();
      strokeWeight (strk);
      vertex(pos.x * 0.5, pos.y); 
    }
    endShape();
  }
}

function drawCoffee(minute) {
  image(mug, -105, 350);
  push();
  // change to minute for final
    m = minute(); 
    minutemap = map(m, 0, 60, 20, 50);
    minutemap2 = map(m, 60, 0, 25, 50);
    minutemap3 = map(m, 0, 60, 0, 50);
    minutemap4 = map(m, 0, 60, 0.75, 1);
  pop();
  colorMode(HSL);
  fill(20, minutemap2, minutemap);
  stroke (20,25,50);
  strokeWeight (1.5);
  push ();
    translate (0, 470 - minutemap3);
    scale (minutemap4, 1)
    arc(0, 0, 155, 50, 0, PI*2);
  pop ();
  
  image(mugfront, -105, 350);

  stroke(0,200, 200);
  strokeWeight(1);
  textSize(16);
  textFont("Gochi Hand");
  text (minute() +"ml", -10, 430 - minutemap3, 300, 300);
}

function drawNumber(hour) {
  stroke(255, 255, 245);
  strokeWeight(0);
  fill(77, 17, 13);
  textFont("Gochi Hand");
  textAlign (CENTER);
  textSize(24);
  text ("This is your...           cup of coffee.", -width/2, 560, width, 300);
  textSize(48);
  strokeWeight(4);
  text (hour(), -width/2, 550, width, 300);
}
