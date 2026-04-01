function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  strokeWeight(4);
  stroke(255);
  textAlign(CENTER,CENTER);
  textStyle(BOLD);

  // where to start drawing boxes
  let y;
  let x = 0;

  let hourWidth = (width / 13)*2;
  let hourHeight = height / 6;
  let h = hour() % 12;
  y = 0;
  for (let i = 1; i <= 12; i++) {
    if (i == h && second()%2==0) {
      noFill();
    } 
    if (i == h && second()%2==1) {
      fill(100, 30);
    } 
   if (i != h) {
      fill(80);
    }
       
    push();
    fill(80);
    noStroke();
    textSize(14);
    text(nf(i,2), x + hourWidth/2, y + hourHeight/2+2);
    pop();
    
    rect(x, y, hourWidth, hourHeight);
    
    y += hourHeight;
    if (y >= height) {
      y = 0;
      x += hourWidth;
    }
  }

  let minuteWidth = width / 13;
  let minuteHeight = height / 10;
  y = 0;
  for (let j = 1; j <= 60; j++) {
    if (j == minute() && second()%2==0) {
      noFill();
    } 
    if (j == minute() && second()%2==1) {
      fill(100, 30);
    } 
   if (j != minute()) {
      fill(80);
    }
    
    push();
    fill(80);
    noStroke();
    textSize(14);
    text(nf(j,2), x + minuteWidth/2, y + minuteHeight/2);
    pop();
    
    rect(x, y, minuteWidth, minuteHeight);
    
    y += minuteHeight;
    if (y >= height-1) {
      y = 0;
      x += minuteWidth;
    }
  }

  // nearly identical to minutes loop
  let secondWidth = width / 13;
  let secondHeight = height / 20;
  y = 0;
  for (var k = 1; k <= 60; k++) {
    if (k == second() && second()%2==0) {
      noFill();
    } 
    if (k == second() && second()%2==1) {
      fill(100, 30);
    } 
   if (k != second()) {
      fill(80);
    }
    push();
    fill(80);
    noStroke();
    textSize(14)
    text(nf(k,2), x + secondWidth/2, y + secondHeight/2+2);
    pop();  
    
    rect(x, y, secondWidth, secondHeight);
    
    y += secondHeight;
    if (y >= height) {
      y = 0;
      x += secondWidth;
    }
  }
  noStroke();
  fill(100);
  textSize(20);
  textAlign(CENTER, CENTER);
  //text(nf(twelveHour(), 2), width/13 * 3, height - (height/20));
  //text(nf(minute(), 2), width/26 * 19 , height- (height/20));
  //text(nf(second(), 2), width/26 * 25 , height- (height/20));
}

function twelveHour() {
  let h = hour() % 12;
  if (h === 0) {
    h = 12;
  }
  return h;
}
