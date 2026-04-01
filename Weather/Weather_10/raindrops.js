function Raindrop(x,y) {
  this.pos = createVector(x,y);
  this.vel = p5.Vector.random2D();
  this.vel.setMag(random(1,2));
  this.acc = createVector();
  
  this.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
  }
  
  this.show = function() {
    push();
    stroke(c2);
    strokeWeight(4);
    point(this.pos.x,this.pos.y);
    pop();
  }
  
  this.move = function() {
    // F = G / d^2 * (m1*m2)
    // F = mA
    //var dir = target - this.pos
    var force = createVector(0,1);
    var dsquared = force.magSq();
    dsquared = constrain(dsquared, 25, 500);
    var G = 2;
    var strength = G / dsquared;
    force.setMag(strength);
    this.acc = force;    
  }
}
