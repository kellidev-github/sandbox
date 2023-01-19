let textInstructions = "click to start rain";
let displayText = true;
let filter; //created water color paper effect
let maxNewDrops = 5; //maximum # of newdrops generated in a draw cycle
let dropOverlap = 1;
let toRemove = []; //store indices of drops to remove

let makeDrops = false;

let maxRadius = 20;

//furthest distance to the right or left a falling drops moves
let maxXmove = 1;
let gradOffset = 0.1;
let drops = [];
let drops2remove = [];

let cycle = 0;

function preload() {
  soundFormats('ogg', 'mp3');
  sound1 = loadSound('2_Minute_Thunderstorm-Mike_Koenig-574654058.mp3');
}

function setup() {
  pixelDensity(1);
//   frameRate(10);
  let cnv = createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  
  textAlign(CENTER, CENTER);

//   //Filter
//   filter = new makeFilter();
  
}


function mousePressed() {
  if (sound1.isPlaying()) {
    sound1.stop();
  } else {
    sound1.loop();
  }
  makeDrops = !makeDrops;
  displayText = false;
}


function draw() {
  //fill in watercolor paper bg to full window size
  background('white');
  if( displayText) {
    fill('black');
    textSize(windowHeight / 3);
    text(textInstructions);
    print(textInstructions);
  }
  
//   image(overAllTexture, 0, 0, windowWidth, windowHeight);
}

// function makeFilter() {
//   // noise
//   colorMode(HSB, 360, 100, 100, 100);
//   drawingContext.shadowColor = color(0, 0, 5, 95);
//   overAllTexture = createGraphics(windowWidth, windowHeight);
//   overAllTexture.loadPixels();
//   for (var i = 0; i < width; i++) { // noprotect
//     for (var j = 0; j < height; j++) {
//       overAllTexture.set(
//         i,
//         j,
//         color(
//           0,
//           0,
//           0,
//           noise(i / 3, j / 3, (i * j) / 50) * random(5, 15)
//         )
//       );
//     }
//   }
//   overAllTexture.updatePixels();
// }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
