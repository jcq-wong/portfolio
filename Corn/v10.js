let regularfont, regitalicfont, titlefont;
let scene;
let things;
let selection = null;
let cornDerivatives = ["cornstarch", "dextrins", "maltodextrins", "corn syrup", "high fructose corn syrup", "dextrose", "polyol", "lactic acid", "citric acid", "xanthan gums", "corn oil", "ethanol"];
let derivative = null;
let shiftX = -30;
let shiftY = 110;
let winX = 1200;
let winY = 675;
let buttons = [ ];
let bodyTextY = 155;
let table;
let cornNames = [];
let cornDefs = [];
let corn;
let cornX;
let cornY;
let angle;
let margin = 25;
let cornCount = 0;

function preload(){
  regularfont = loadFont("data/Karla-Medium.ttf");
  regitalicfont = loadFont("data/Spectral-Italic.ttf");
  titlefont = loadFont("data/Pacifico-Regular.ttf");
  scene = loadImage("assets/scene-shade.png");
  corn = loadImage("assets/corn.png");
  things = loadJSON("data/corn.json");
  table = loadTable("data/corndef.csv", "csv", "header");  
}
//--------------------------------end preload function--------------------------------//
  
function setup() {

  //createCanvas(1180,750);
  windowRatio(winX,winY);
  betterResize(scene, 800);
  betterResize(corn, 13);

  /////////////////////////////////////////////////////////////
  //                  set up corn parameters                 //
  /////////////////////////////////////////////////////////////
  
  cornX = random(10 + margin, 810 - margin);
  cornY = random(10 + margin, 585 - margin);
  angle = random(-75, 75);
  print(cornX,cornY); 
  angleMode(DEGREES);
  
  ////////////////////////////////////////////////////////////////
  //                  get corn definitions data                 //
  ////////////////////////////////////////////////////////////////
  
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');
  print(table.getColumn('name'));
  
  for (let r = 0; r < table.getRowCount(); r++){
    for (let c = 0; c < table.getColumnCount(); c++) {
      print(table.getString(r, c));
    }
  }  
  
  cornNames = table.getColumn("name");
  cornDefs = table.getColumn("definition");
  
    // make sure ratioX and ratioY work for updateButtonPositions() 
  updateRatio();  
  
  ///////////////////////////////////////////////////
  //                  make buttons                 //
  ///////////////////////////////////////////////////
  
  cornDerivatives.forEach(name => {
    let button = createButton(name);
    button.class("my-button");
    button.mouseOver(function() {
      derivative = name;
    });
    button.mouseOut(function() {
      derivative = null;
    });
    buttons.push(button);
  });
  updateButtonPositions();
  
  print(things);
  
  for (let i = 0; i < Object.keys(things).length; i++) {
    let path = `images/${things[i].type}.png`.replaceAll(' ', '-');    
    things[i].img = loadImage(path, img => {      // add an extra entry called 'img' to the json blob that we loaded  
      betterResize(img, things[i].r);      // as soon as the image is done loading, resize the image
      img.loadPixels();      // and load the pixel data so we can check transparency
    });
  }
}
//--------------------------------end setup function--------------------------------//

  ///////////////////////////////////////////////////////
  //                  position buttons                 //
  ///////////////////////////////////////////////////////

function updateButtonPositions() {
  let y = bodyTextY + 35;
  let x = 925;
  buttons.forEach(button => {
    //print(ratioX(850), ratioY(y));
    button.position(windowX(x), windowY(y));
    x += button.width + 5;
    if (x + button.width + 5 >= 1190){
      y += 30;
      x = 925;
    }    
  });
}
//--------------------------------end updateButtonPositions() function--------------------------------//

function draw() {
  updateRatio();

  ////////////////////////////////////////////
  //              define colors             //
  ////////////////////////////////////////////
    
  let green1 = color(0, 106, 71);
  let green2 = color(0, 175, 113);
  let lightblue = color(174, 248, 255);
  let yellow = color(255, 236, 106);
  let lightgreen = color(184, 222, 184);
  let sagegreen = color(45, 91, 79);
  let maroon = color(49, 32, 30);
  let filter = color(240, 20);  

  ///////////////////////////////////////////////////
  //              background and scene             //
  ///////////////////////////////////////////////////
  
  background(215);
  cursor(CROSS);  
  image(scene, 40 + shiftX, 120 - shiftY);
  
  /////////////////////////////////////////
  //              draw title             //
  /////////////////////////////////////////
  
  push();
  let titleX = 820;
  let titleY = 10;
  let diffY = 120;
  textSize(46.4);
  fill(sagegreen);
  textFont(titlefont);
  textLeading(70);
  textAlign(LEFT, TOP);
  text("where's the corn ?", titleX, titleY, 360, 100);
  //text("corn ?", titleX, titleY + diffY, 360, 500);
  pop();

  push();
  textSize(12.4);
  noStroke();
  textFont(regitalicfont);
  textAlign(LEFT);
  fill(sagegreen);
  text("a visualization showing the reach of the corn industrial complex and how corn makes its way into everything we consume", titleX + 5, 93, 340, 100);  
  pop();
  
  //////////////////////////////////////
  //            draw images           //
  //////////////////////////////////////
    
  for (let i = 0; i < Object.keys(things).length; i++) {
    let t = things[i];
    //console.log(t.img);
    let dim = (derivative != null) && !t.cornContent.includes(derivative);
      if (dim) {
      tint(255, 100);
      } else {
        noTint();
      }
    let offset = 0;
      if (t == selection) {
      offset = -2;
    }
    image(t.img, t.x + shiftX, t.y - shiftY + offset);  
    //image(t.img, t.x, t.y);
  }
  noTint();
  
  /////////////////////////////////////////
  //              draw corn              //
  /////////////////////////////////////////
  
  push();
  translate(cornX, cornY);
  imageMode(CENTER);
  rotate(angle); 
  image(corn, 0, 0);
  translate(-cornX,-cornY);
  pop();
  
  ///////////////////////////////////////
  //            image filter           //
  ///////////////////////////////////////
  
  push();
  fill(filter);
  noStroke();
  //rect(0, 0, rwidth, rheight, 0);
  rect(20, 20, 780, 568, 0);
  pop();

  ///////////////////////////////////////////
  //            draw cursor text           //
  ///////////////////////////////////////////
  
  textSize(10);
  fill(0);
  noStroke();
  //if ((rmouseX > 53 + shiftX) && (rmouseX < 53 + 774 + shiftX) && 
  //    (rmouseY > 130 - shiftY) && (rmouseY < 130 + 566 - shiftY)) {
  //      text("["+floor(rmouseX - shiftX)+", "+floor(rmouseY + shiftY)+"]", rmouseX+5, rmouseY+20);
  //    }

  ///////////////////////////////////////////
  //            draw object text           //
  ///////////////////////////////////////////

  push();
  textSize(12);
  fill(sagegreen);
  textFont(regularfont);
  
  let writeObject = "object:";
  let widthObject = textWidth(writeObject);
  text(writeObject, 820, bodyTextY);
  
  let writeCornD = "corn derivative:";
  let widthCornD = textWidth(writeCornD);
  text(writeCornD, 820, bodyTextY + 50);
  
  let writeDescription = "description:";
  let widthDescription = textWidth(writeDescription);
  text(writeDescription, 820, bodyTextY + 210);
  //text('[category]', 950, 490);
  pop();
  
  push();
  textSize(12);
  strokeWeight(0.5);
  stroke(sagegreen);
  fill(sagegreen);
  textFont(regularfont);
  textAlign(LEFT, TOP);
  //line(810, bodyTextY + 419, 810 + 116, bodyTextY + 419);
  noStroke();
  text(". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ", 818, bodyTextY + 412, 375, 300);
  if (cornCount == 0) {
    text("Can you find the corn?", 1030, bodyTextY + 414, 375, 300);
  }
  if (cornCount == 1) {
    text("you found the corn  " + cornCount + "  time.", 1030, bodyTextY + 414, 375, 300);
  }
  if (cornCount > 1) {
    text("you found the corn  " + cornCount + "  times.", 1030, bodyTextY + 414, 370, 300);
  }
  pop();
  
  //////////////////////////////////////////////////////
  //            corn derivative definitions           //
  //////////////////////////////////////////////////////
  
  push();
  noStroke();
  textSize(12);
  textFont(regularfont);
  fill(maroon);
  for (let j = 0; j < cornNames.length; j++) {
    let n = cornNames[j];
    let defs = cornDefs[j];
    let d = (derivative != null) && (n == derivative);
      if (d) {
        text(defs, 905, bodyTextY + 210, 275, 1000);
      }
  }
  pop();
  
  
  //////////////////////////////////////////
  //            draw rectangles           //
  //////////////////////////////////////////

  stroke(172);
  strokeWeight(0.35);
  noFill();
  //rect(0,0,winX,winY);    // window box
  //rect(53 + shiftX, 130 - shiftY, 774, 566, 0);      // scene box
  //rect(850 + shiftX, 130 - shiftY, 300, 566, 0);      // description box
  rect(875, bodyTextY - 17, 295, 26);      // text box
 
  /////////////////////////////////////////////////////
  //            hovering over scene images           //
  ////////////////////////////////////////////////////
 
  selection = null;
  
  for (let i = 0; i < Object.keys(things).length; ++i) {  
    let t = things[i];
    if (isSelected(t)) {
      selection = t;
    }
  }
  
  push();
  noStroke();
  textSize(12);
  textFont(regularfont);
  fill(maroon);
  if (selection != null) {
    text(selection.type, 835 + widthObject + 10, bodyTextY);
    
    push();
    noStroke();
    textSize(12);
    textFont(regularfont);
    fill(maroon);
    text(selection.description, 835 + widthDescription + 2, bodyTextY + 210, 280, 566);
    //text(selection.cornContent, 850, 290);
    //text(selection.category, 875, 520);
    pop();
    
    buttons.forEach((button, index) => {
      let derivative = cornDerivatives[index]; 
      if (selection.cornContent.includes(derivative)) {
        button.addClass('highlight');
      } else {
        button.removeClass('highlight');
      }
    });
  } else {
    // remove the highlight from all the buttons
    buttons.forEach(button => {
      button.removeClass('highlight');
    });
  }
  pop();
}
//--------------------------------end draw function--------------------------------//

function isSelected(t) {
  
  if ((rmouseX > t.x + shiftX) && (rmouseX < t.x + shiftX + t.img.width) && 
      (rmouseY > t.y - shiftY) && (rmouseY < t.y - shiftY + t.img.height)) {        
    // get the coordinates of the mouse inside the image
    let ix = floor((rmouseX - (t.x + shiftX)) * ratioScale);
    let iy = floor((rmouseY - (t.y - shiftY)) * ratioScale);     
    let offset = iy*t.img.width*4 + ix*4; 
    // https://p5js.org/reference/#/p5.Image/pixels
    let alpha = t.img.pixels[offset + 3];  // +3 gives you the alpha value
    //return alpha > 128;  // if more than 50% opaque, return true
    return alpha > 100;
  }
  return false;
}
//--------------------------------end isSelected() function--------------------------------//

function mousePressed() {
  if (selection != null) {
    print(`${selection.type} was clicked`);
  }
  if (
      rmouseX > cornX - corn.width/2 &&
      rmouseX < cornX + corn.width/2  &&
      rmouseY > cornY - corn.height/2 &&
      rmouseY < cornY + corn.height/2
    ) {
      angle = random(-75, 75);
      cornX = random(10 + margin, 810 - margin);
      cornY = random(10 + margin, 585 - margin);
      cornCount += 1;
      print(cornX,cornY);
    }
}
//--------------------------------end mousePressed() function--------------------------------//

  // Resizing from a very large image to a small image can make it blocky.
  // The solution is to resize in multiple steps, decreasing it by half each time,
  // until we're close enough to the target size that we can just resize it directly.
function betterResize(img, targetWidth) {
  // as long as the image size is more than 2x the target width,
  // keep cutting the size down by half
  while (img.width / targetWidth > 2) {
    // cut it down by half
    img.resize(img.width / 2, 0);
  }
  // finally, resize to the exact size we want
  img.resize(targetWidth, 0);
}
//--------------------------------end betterResize() function--------------------------------//
