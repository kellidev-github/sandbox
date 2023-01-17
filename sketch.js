// let colors2 = "6cbbd4BF-9fc5e8BF-5282a1BF-76a5afBF-3d85c6BF".split("-").map((a) => "#" + a);
// let colors1 = "6cbbd4-9fc5e8-5282a1-76a5af-3d85c6".split("-").map((a) => "#" + a + "00");
var grad;
let filter;
let maxRadius = 35;
let maxNewDrops = 5;
let maxXmove = 5;
let gradOffset = 0.1;
let drops = [];
let drops2remove = [];

function preload() {
  soundFormats('ogg', 'mp3');
  sound1 = loadSound('2_Minute_Thunderstorm-Mike_Koenig-574654058.mp3');
}

function setup() {
  pixelDensity(1);
  // frameRate(10);
  let cnv = createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  //Filter
  filter = new makeFilter();

}

// function startSound() {
//   if ( sound1.isPlaying() )
//   {
//     sound1.pause(); //pauses audio if it's already playing
//   }
//   else
//   {
//     sound1.loop(); //loops audio if it isn't already playing
//   }
// }

function mousePressed() {
  if (sound1.isPlaying()) {
    sound1.stop();
  } else {
    sound1.loop();
  }
}


function draw() {
  //fill in watercolor paper bg to full window size
  background(windowWidth, windowHeight);

  //create new raindrops as long as drops < max
  for (let i = 0; i < random(maxNewDrops); i++) {
    drops.push(new raindrop());
  }

  // drops.push(new raindrop());


  for (let drop of drops) {
    push();
    translate(drop.x, drop.y)
    radialGradient(
      -gradOffset*drop.r, -gradOffset*drop.r, 0, 
      -gradOffset*drop.r, -gradOffset*drop.r, drop.r, 
      drop.color1, drop.color2
    );

    drop.update();
    drop.display();   
        
    pop();
  }

  image(overAllTexture, 0, 0);
//   print(drops.length);
}


// Raindrop Class
function raindrop(
  x = random(0, 600), y = random(0, 600), r = random(maxRadius/10, maxRadius/3)
) {
  this.x = x;
  this.y = y;
  this.r = r;
  // this.color1 = random(colors1);
  // this.color2 = random(colors2);

  this.color1 = #47abbaBF;
  this.color2 = #7fddeb;

  this.update = function() {

    for (let i = 0; i < drops.length; i++) {
      if ( i != drops.indexOf(this) ) {
        var d = maxRadius/10 + dist(this.x, this.y, drops[i].x, drops[i].y);
        if (d < this.r + drops[i].r) {
          let index;
          if (this.r > drops[i].r) {
            this.r += 0.5*drops[i].r;
            if (this.r > maxRadius) {
              this.r = maxRadius;
            } 
            this.x = (this.x + drops[i].x)/2;
            this.y = (this.y + drops[i].y)/2;
            index = drops.indexOf(drops[i]);
          } else {
            drops[i].r += 0.5*this.r;
            if (this.r > maxRadius) {
              drops[i].r = maxRadius;
            } 
            drops[i].x = (this.x + drops[i].x)/2;
            drops[i].y = (this.y + drops[i].y)/2;
            index = drops.indexOf(this);
          }
          drops.splice(index,1);
          break;
        }
      }
    }


    if (this.r > 0.5 * maxRadius) {
      this.y += pow(this.r, 0.75);
      // this.y ++;
      this.x += random(-1*maxXmove, maxXmove);
//       print(this.x);
      let newR = random(0.25*this.r);
      if (newR < 5) {
        newR = 5;
      }
      drops.push(new raindrop(this.x, this.y - this.r - newR, newR));
      this.r += -newR;

      if (this.r >= maxRadius) {
        let newR = this.r - maxRadius;
        drops.push(new raindrop(this.x, this.y - this.r - newR, newR));
        this.r = maxRadius;
      }
    }

    if ((this.y - this.r) > 600) {
      let index = drops.indexOf(this);
      drops.splice(index, 1);
      print("drop removed");
    }
  }

  this.display = function() {
    ellipse(0, 0, this.r);
  }
}


// Radial Gradient Color
// from Kazuki Umeda's https://www.youtube.com/watch?v=-MUOweQ6wac
function radialGradient(sX, sY, sR, eX, eY, eR, colorS, colorE) {
  let gradient = drawingContext.createRadialGradient(
    sX, sY, sR, eX, eY, eR
  );
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);
  drawingContext.fillStyle = gradient;
}


// Watercolor Appearance Filter
// from SamuelYAN's https://openprocessing.org/sketch/143323:1
function makeFilter() {
  // noise
  colorMode(HSB, 360, 100, 100, 100);
  drawingContext.shadowColor = color(0, 0, 5, 95);
  overAllTexture = createGraphics(600, 600);
  overAllTexture.loadPixels();
  for (var i = 0; i < width; i++) { // noprotect
    for (var j = 0; j < height; j++) {
      overAllTexture.set(
        i,
        j,
        color(
          0,
          0,
          0,
          noise(i / 3, j / 3, (i * j) / 50) * random(5, 15)
        )
      );
    }
  }
  overAllTexture.updatePixels();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
