//https://www.youtube.com/watch?v=OAcXnzRNiCY

function Particle(x,y) {
  this.pos = createVector(x,y);

  this.vel = p5.Vector.random2D();
  this.vel.setMag(random(1,3));
  this.acc = createVector();
  
  this.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
  }
  
  this.show = function() {
    push();
    stroke(c7);
    strokeWeight(8);
    point(this.pos.x,this.pos.y);
    pop();
  }
  
  this.attracted = function(target) {
    // F = G / d^2 * (m1*m2)
    // F = mA
    //var dir = target - this.pos
    var force = p5.Vector.sub(target, this.pos);
    var dsquared = force.magSq();
    dsquared = constrain(dsquared, 25, 500);
    var G = 3;
    var strength = G / dsquared;
    force.setMag(strength);
    this.acc = force
    this.pos.x = constrain(this.pos.x, 35-200/2+8, 35+200/2-4);
    this.pos.y = constrain(this.pos.y, -335-60/2+8, -335+60/2-4);    
  }
}
