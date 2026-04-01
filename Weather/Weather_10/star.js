function star(posX, posY, radius1, radius2, npoints) {
  let angle = 360 / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < 360; a += angle) {
    let sx = posX + cos(a) * radius2;
    let sy = posY + sin(a) * radius2;
    vertex(sx, sy);
    sx = posX + cos(a + halfAngle) * radius1;
    sy = posY + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
