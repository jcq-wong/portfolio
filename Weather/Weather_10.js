let wt;
let grdTemp;
let grdTempC1, grdTempC2;
let tempBarW, tempBarH;
let rainX = 0;
let rainY = 0;
let shift;
let windSpeedAngle = 0;
let windDirShift = 0;
let raindrops = [];
let rectWidth;
let rectHeight;
let attractors = [];
let particles = [];
let precipDecimal;
let precip;
let precipT;
let c1, c2, c3, c4, c5, c6, c7;


const places = [
  { 'name': 'boston', 'lat': 42.3604, 'lon': -71.0579667 },
  { 'name': 'antarctica', 'lat': 82.8628, 'lon': 135.0000 },
  { 'name': 'austin', 'lat': 30.2672, 'lon': -97.7431 },
  { 'name': 'brno', 'lat': 49.1951, 'lon': 16.6068 },
  { 'name': 'capetown', 'lat': -33.9249, 'lon': 18.4241 },
  { 'name': 'copacabana', 'lat': -22.970722, 'lon': -43.1853 },
  { 'name': 'haifa', 'lat': 32.7940, 'lon': 32.7940 },
  { 'name': 'isle of man', 'lat': 54.2361, 'lon': 4.5481 },
  { 'name': 'istanbul', 'lat': 41.0082, 'lon': 28.9784 },
  { 'name': 'jakarta', 'lat': - 6.200, 'lon': 106.817 },
  { 'name': 'kandahar', 'lat': 31.6289, 'lon': 65.7372 },
  { 'name': 'machu picchu', 'lat': 13.1631, 'lon': -72.5450 },
  { 'name': 'mount washington', 'lat': 44.2706, 'lon': -71.3033 },
  { 'name': 'moscow', 'lat': 55.754093, 'lon': 37.620407 },
  { 'name': 'nairobi', 'lat': -1.2921, 'lon': 36.8219 },
  { 'name': 'north pole', 'lat': 90.0000, 'lon': 0.0000 },
  { 'name': 'oslo', 'lat': 59.9139, 'lon': 10.7522 },
  { 'name': 'paris', 'lat': 48.8566, 'lon': 2.3533 },
  { 'name': 'riga', 'lat': 59.9496, 'lon': 24.1052 },
  { 'name': 'sahara desert', 'lat': 23.4126, 'lon': 25.6628 },
  { 'name': 'standing rock', 'lat': 45.7503, 'lon': -101.2004 },
  { 'name': 'siberia', 'lat': 45.7503, 'lon': 99.1967 },
  { 'name': 'svalbard', 'lat': 77.8750, 'lon': 20.9752 },
  { 'name': 'tierra del fuego', 'lat': 54.000, 'lon': 70.000 },
  { 'name': 'washington, dc', 'lat': 38.9072, 'lon': -77.0369 },
  { 'name': 'wellington', 'lat': -41.2865, 'lon': 174.7762 },
  { 'name': 'xi\'an', 'lat': 34.3416, 'lon': 108.9396 },
  { 'name': 'yuma', 'lat': 32.6927, 'lon': -114.6277 },
  { 'name': 'zagazig', 'lat': 30.5765, 'lon': 31.5041 }
];
let place;
let placeIndex = 0;

function preload() {
  font = loadFont("data/CHIVOMONO-SEMIBOLD.ttf");
}

function setup() {
  //createCanvas(375, 812);
  windowRatio(375,812);
  setPlace(0);  
  
  c1 = color(0, 106, 71);
  c2 = color(132, 148, 205);  
  c3 = color(255, 221, 52);
  c4 = color(150, 180, 82);
  c5 = color(166, 74, 44);
  c6 = color(51, 56, 97);
  c7 = color(135, 142, 161);
  
  grdTempC1 = c2;
  grdTempC2 = c3;
  tempBarW = 180-3;
  tempBarH = 2;
  
  //setInterval(drawSprinkle, 1000);
  
  for (var i = 0; i < 100; i++) {
    particles.push(new Particle(random(35-200/2, 35+200/2),random(-335-60/2,-335+60/2)));
  }    

  attractors.push(createVector(35, -335+20/2));
  attractors.push(createVector(35-190/2, -335+20/2));
  attractors.push(createVector(35-190/4, -335-20/2));    
  attractors.push(createVector(35+190/2, -335+20/2)); 
  attractors.push(createVector(35+190/4, -335-20/2));
}

function draw() {
  updateRatio()
  background(c1)
  translate(rwidth/2, rheight/2);
  textFont(font);
  ellipseMode(CENTER);
  rectMode(CENTER);
  angleMode(DEGREES);
  stroke(c3);
  strokeWeight(2.5);
  noFill();
  
  for (var i = 0; i < 100; i++) {
    raindrops.push(new Raindrop(random(35-200/2, 35+200/2),random(-335-60/2,-335+60/2)));
  }   
  
  if (wt.ready){
      push();
      drawTemperature();
      drawWindSpeed();
      drawWindDirection();
      drawPrecipitation();
      drawSprinkle();
      drawHumidity();
      writeText();
      pop();
    }  
  
  push();
  noStroke();
  for (var i = 0; i < attractors.length; i++) {
    point(attractors[i].x, attractors[i].y);
  }
  pop();
  
  //circle indicating temperature
  push();
  translate(-75, -185);
  rotate(0);
  setGradient(0 - tempBarW/2, 0 - tempBarH/2, tempBarW, tempBarH, grdTempC1, grdTempC2, 1);
  stroke(c4);
  ellipse(0, 0, 180,180);  
  pop();  
  
  //ellipse indicating humidity
  push();
  translate(40, 250);
  rotate(-15);
  ellipse(0,0,220,120);
  pop(); 
}

function drawTemperature() {
  push();
  translate(-75, -185);   
  let hourCount = 24;
  let tempNow = wt.getTemperature();
    
  let minTemp = 10;
  let maxTemp = 90;

  let amount = map(tempNow, minTemp, maxTemp, 0, 1);
  let c = lerpColor(grdTempC1, grdTempC2, amount);
  fill(c);
  noStroke();
  ellipse(0,0,173,173);
    
  pop();
}

function drawWindSpeed(){
  windSpeed = wt.getWindSpeed();
  push(); 
  translate(-65, 90);
  stroke(c6);
  fill(c6);
  rotate(windSpeedAngle);
  star(0, 0, 50, 100, 5)
  //rect(0,0,150,150)  
  windSpeedAngle += windSpeed/12;  
  pop();  
}

function drawWindDirection(){
  let ws = wt.getWindSpeed();
  push();
  translate(75, -60);
  if (ws != 0) {
    let windDir = wt.getWindDirection();
    if (windDirShift <= windDir){
      rotate(windDirShift-90);
    } else if (windDirShift >= windDir){
      rotate(windDir-90)
    }
    windDirShift += 2.5;
  }
  fill(c7);
  drawTriangle();
  pop();
}

function drawPrecipitation(){
  let precip1 = round((wt.getPrecipitationChance('hours')[0])*100);
  rectWidth = 200;
  rectHeight = 60;
  
  push();
  fill(c1);
  translate(35, -335);
  rotate(0);  
  if (rainX > 4){
    shift = -1
  }  else if (rainX <= 0){
    shift = 1
  }
  rainX += shift
  rainY += shift
  rect(rainX, rainY, rectWidth, rectHeight);
  pop();
  
  for (var i = 0; i < precip1+1; i++) {
    var  particle = particles[i];
    for (var j = 0; j < attractors.length; j++) {
    particle.attracted(attractors[j]);
    particle.update();
    particle.show();
    }
  }  
}

function drawSprinkle(){
  precipDecimal = (wt.getPrecipitationChance('hours')[0]);
  precip = round((wt.getPrecipitationChance('hours')[0])*100);  
  push();
  
  for (var i = 0; i < 100; i++) {
    raindrops.push(new Raindrop(random(35-200/2, 35+200/2),random(-335-60/2,-335+60/2)));
  }
  for (let i = 0; i < precip; i++){
    dots = raindrops[i];
    dots.move();
    dots.update();
    dots.show();
  }
      
  pop();  
}

function drawHumidity(){
  let hum = round(wt.getHumidity()*100)
  let humAngle = map(hum,0,100,0,360)
  
  push();
  translate(40, 250);
  rotate(-15);
  fill(c5);
  noStroke();
  arc(0, 0, 220, 120, 0-90, humAngle-90, PIE);
  pop();   
  
  //text(hum, 0,0);
}

function writeText(){
  let tempTx = wt.getTemperature();
  tempTx = formatDegrees(tempTx);
  let aTempTx = wt.getApparentTemperature();
  aTempTx = formatDegrees(aTempTx);
  let windTx = wt.getWindSpeed();
  let prTypeTx = (wt.getPrecipitationType('hours')[0]);
  let rainTx = round((wt.getPrecipitationChance('hours')[0])*100);
  let windDirTx = round(wt.getWindDirection());
  let humTx = round(wt.getHumidity()*100);
  
  push();
  fill(c3);
  textAlign(LEFT, CENTER);
  textSize(10);
  noStroke();
  text(place.name + ' / ' + tempTx + ', feels like ' + aTempTx + ' / ' + nf(windTx,0,1)+' mph / '+windDirTx+'°', -rwidth/2 + 15, rheight/2-50);
  text(humTx + '% humidity / ' + rainTx +'% precipitation / '+prTypeTx, -rwidth/2 + 15, rheight/2-35);
  pop();
}

function mousePressed() {
  // % is the "modulo" operator, so this line increments nextPlace,
  // but automatically bounces it back to zero if we hit places.length
  let nextPlace = (placeIndex + 1) % places.length;
  setPlace(nextPlace); 
  
}

function setPlace(index) {
  placeIndex = index;
  place = places[placeIndex];
  wt = requestWeather(place.lat, place.lon);
}
  
