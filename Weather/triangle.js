let x1, y1, x2, y2, x3, y3;
let triangleSide = 90;

function drawTriangle(){
  x1 = triangleSide * cos(0);
  y1 = triangleSide * sin(0);
  x2 = triangleSide * cos(120);
  y2 = triangleSide * sin(120);
  x3 = triangleSide * cos(240);
  y3 = triangleSide * sin(240);
  noStroke();
  triangle(x1, y1, x2, y2, x3, y3);
  //ellipse(x1, y1, 10, 10);
  //ellipse(0, 0, 2, 2);
  push();
  stroke(c3);
  strokeWeight(2.5);
  line(0+60,0,x1-10,y1);
  point(0, 0);
  pop();
}
