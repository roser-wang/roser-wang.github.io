let x = 0;
let y = 0;
let canvas1;
let saveButton;
let radio;
let option1;
let option2;


var s1 = function( sketch ) {
  sketch.setup = function() {
    let canvas1 = sketch.createCanvas(400, 400);
    canvas1.class('canvas1');
    sketch.background(220);
    saveButton = sketch.createButton('Save');
    saveButton.class('button');
    saveButton.mousePressed(sketch.download);
    radio = sketch.createRadio();
    radio.option('0', 'DNA Stylus');
    radio.option('220','Eraser');
    radio.position(sketch.windowWidth * 0.5 - 350, sketch.windowHeight * 0.5);
  }
  sketch.mouseDragged = function() {
    let val = slider.value();
    let colorval = radio.value();
    sketch.strokeWeight(val);
    sketch.stroke(colorval,colorval,colorval);
    sketch.noFill();
    sketch.line (sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
  }
  
  sketch.download = function() {
    sketch.save('CB-1.jpg');
  }
}

new p5(s1);

var s2 = function( sketch ) {
  sketch.setup = function() {
    slider = sketch.createSlider(5, 15, 5, 0);
    slider.class("slider");
  }
  sketch.draw = function() {
    let canvas2 = sketch.createCanvas(100, 25);
    canvas2.class('canvas2');
    // canvas2.position(100,0);
    sketch.background(0);
    sketch.fill(220);
    sketch.textSize(12);
    sketch.text('stroke size:', 2, 15);
    let val = slider.value();
    sketch.noFill();
    sketch.strokeWeight(val);
    sketch.stroke(145, 152, 229);
    sketch.point(80, 12.5, val);
  }
}

new p5(s2);
