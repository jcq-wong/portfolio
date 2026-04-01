function setup() {
  createCanvas(400,400)
}


function draw() {
  background(200);
  translate(width/2, height/2);
  noFill();
  stroke(0);
  circle(0,0,240,240);
  circle(0,0,2,2);
  angleMode(DEGREES);
    
  push();
  let minuteAngle = map(minute(), 0, 60, 0, 360);
  rotate(minuteAngle);  
  
  let secondGap = 4;
  let secondExtend = (secondGap * 59) / 58 * .5;
  
  let y1;
  let y2;
  let x1 = 1;
  let x2 = secondExtend * 58 * 1/2;  
  
  let ss = second();
  let mE = minute()%2;
  y1 = -120+secondGap;
  y2 = +120-secondGap;
  for (let i=0; i < 60; i++) {
    if (i < ss && mE > 0) {
      stroke(0);
      line(-x1, y1, x1, y1);
      y1 += secondGap;
      x1 += secondExtend;
    } 
    if (i > ss && mE < 1) {
      stroke(0);
      line(-x1, y1, x1, y1);
      y1 += secondGap;
      x1 += secondExtend;
    } 
    if (i < ss && mE < 1) {
     noStroke();
     line(-x2, y2, x2, y2);
     y2 -= secondGap;
     x2 -= secondExtend;      
    } 
  }
  
  push();
  let mAngle = map(smoothSecond(), 0, 60, 0, 360);
  rotate(mAngle);
  stroke(0);
  line(0, -120-5, 0, -120+5);
  pop();
    
  fill(0);
  textAlign(CENTER, CENTER);
  stroke(200);
  strokeWeight(0);
  text(nf(second() + ' SEC', 2), 0, 133);
  noStroke();
  text(nf(minute(), 2) + ' MIN', 0, -131);
  
  pop();
  
  push();
  let hourAngle = map(hour() % 12, 0, 12, 0, 360);
  rotate(hourAngle);

  
  ellipse(0, -162, 40, 40);
  line(0, -141, 0, 120);
  textAlign(CENTER, CENTER);
  noStroke();
  fill(0);
  text(nf((hour()%12),2) + ' HR', 0, -162);
  
  pop();
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
