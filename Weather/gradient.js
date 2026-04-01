let x, y, w, h, ca, cb, axis;

function setGradient(x, y, w, h, ca, cb, axis) {
  noFill();
  if (axis === 2) {
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(ca, cb, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === 1) {
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(ca, cb, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

//class Gradient {
//  constructor(posX, posY, gradientWidth, gradientHeight, color1, color2, axis) {
//    this.x = posX;
//    this.y = posY;
//    this.w = gradientWidth;
//    this.h = gradientHeight;
//    this.ca = color1;
//    this.cb = color2;
//    this.axis = axis; // 1 = horizontal, 2 = vertical
//  }
  
//  show() {
//    noFill();
//    if (this.axis === 2) {
//    for (let i = this.y; i <= this.y + this.h; i++) {
//      let inter = map(i, this.y, this.y + this.h, 0, 1);
//      let c = lerpColor(this.ca, this.cb, inter);
//      stroke(c);
//      line(this.x, i, this.x + this.w, i);
//    }
//  } else if (this.axis === 1) {
//    for (let i = this.x; i <= this.x + this.w; i++) {
//      let inter = map(i, this.x, this.x + this.w, 0, 1);
//      let c = lerpColor(this.ca, this.cb, inter);
//      stroke(c);
//      line(i, this.y, i, this.y + this.h);
//    }
//  }
//}
