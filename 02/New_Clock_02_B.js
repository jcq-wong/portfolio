function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}


function draw() {
  background(255);
  textAlign(CENTER);


  push();
  translate(width/2, height/2);
  fill(255);
  stroke(0)
  strokeWeight(2);
  strokeCap(SQUARE);
  //circle(0,0,170*2,170*2);
  //circle(0,0,135*2,135*2);
  //circle(0,0,90*2,90*2);

  push();
  strokeWeight(30);
  //stroke(180);
  strokeCap(SQUARE);

  let secondSize = 170;
  let secondCircle = 30
  let secondAngle = map(smoothSecond(),  0, 60,  0, 360);
  rotate(secondAngle);
  line(0, - secondSize + secondCircle/2, 0, + secondSize);
  
  strokeWeight(2);
  stroke(255);
  line(0, - secondSize + secondCircle/2, 0, + secondSize);
  
  noStroke();
  fill(0);
  ellipse(0,- secondSize, secondCircle, secondCircle);
  
  fill(255)
  textSize(12);
  textAlign(CENTER, CENTER);
  text(nf(second(), 2), 0, - secondSize);
  
  pop();

  push();
  strokeWeight(40);
  //stroke(150);  
   
  let minuteSize = 135;
  let minuteCircle = 40;
  let minuteAngle = map(minute(),  0, 60,  0, 360);
  rotate(minuteAngle);
  line(0, - minuteSize + minuteCircle/2, 0, +minuteSize);
  
  strokeWeight(2);
  stroke(255);
  line(0, - minuteSize + minuteCircle/2, 0, +minuteSize);
  
  noStroke();
  fill(0);
  ellipse(0, -minuteSize, minuteCircle, minuteCircle);
  
  strokeWeight(1);
  fill(255)
  textSize(18);
  textAlign(CENTER, CENTER);
  text(nf(minute(), 2), 0, - minuteSize);
  
  pop();

  push();
  strokeWeight(50);
  noFill();
  stroke(0);
  
  let hourSize = 90;
  let hourCircle = 50
  let hourAngle = map(hour() % 12,  0, 12,  0, 360);
  rotate(hourAngle);
  line(0, - hourSize +hourCircle/2, 0, +hourSize);
  
  strokeWeight(2);
  stroke(255);
  line(0, - hourSize +hourCircle/2, 0, +hourSize);
  
  noStroke();
  fill(0);
  ellipse(0, -hourSize, hourCircle, hourCircle);
  
  fill(255)
  textSize(18);
  textAlign(CENTER, CENTER);
  text(twelveHour(), 0, - hourSize);
  
  
  pop();
  
}

function twelveHour(){
  let h = hour() % 12;
  if(h===0){
    h = 12;
  }
  return h;
}

let prevSecond;
let millisOffset;

function smoothSecond() {
  let s = second();
  if (s != prevSecond) {
    millisOffset = millis()
    prevSecond = s;
  }
  let m = millis() - millisOffset;
  return s + (m / 1000.0);
}
