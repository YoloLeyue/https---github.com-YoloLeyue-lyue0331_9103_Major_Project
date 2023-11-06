// let url = 'https://coolors.co/072ac8-1e96fc-a2d6f9-fcf300-ffc600';
// let palette = url.replace('https://coolors.co/', '').split('-').map(c => '#' + c);
let num = 32;
let size;
let step;
let colorArr = [];
let sizeArr = [];
let vmin;
let img;
let pg;

function preload() {
  img = loadImage('lion.png');
  // img = loadImage('assets/Edvard_Munch_The_Scream.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
	pixelDensity(1);
  ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 2000);
  
  vmin = (width < height) ? width : height;
  size = vmin / (num * 4);
  step = size * 4;
  img.resize(num, num);
  pg = createGraphics(num, num);
  pg.image(img, 0, 0, pg.width, pg.height);
  pg.loadPixels();
  
  for (let i = 0; i < num * num; i++) {
    let r = pg.pixels[i * 4 + 0];
    let g = pg.pixels[i * 4 + 1];
    let b = pg.pixels[i * 4 + 2];
    let a = pg.pixels[i * 4 + 3];
    colorArr.push(color(r, g, b));
    sizeArr.push(map(r+g+b, 0, 255*2, 0, 4, true) * (a / 255));
  }
}

function draw() {
  background(31, 19, 1);
  let fc = frameCount * 0.02;
  let sn = sin(fc) * 0.5 + 0.5;
  rotateX(PI * (0.5 - sn * 0.35));
  rotateY(PI * (sn * 0.25));
  
  ambientLight(160, 160, 160);
  directionalLight(200, 200, 200, 1, -1, -1);
  
  noStroke();
  
  for (let i = 0; i < num; i++) {
    let z = i * step;
    let pz = (i - num / 2 + 0.5) * step;
    for (let j = 0; j < num; j++) {
      let x = j * step;
      let px = (j - num / 2 + 0.5) * step;
      let idx = i * num + j;
      let sz = size * sizeArr[idx];
      let s = floor(sizeArr[idx] * 2 * sn * 2) / 2;
      if (s < 0.5) continue;
      fill(colorArr[idx]);
      push();
      {
        translate(px, sz * s / 2, pz);
        
        push();
        {
          translate(-sz / 4, sz * s / 2, -sz / 4);
          scale(sz, sz, sz);
          cylinder(0.15, 0.2, 6);
        }
        pop();
        push();
        {
          translate(sz / 4, sz * s / 2, -sz / 4);
          scale(sz, sz, sz);
          cylinder(0.15, 0.2, 6);
        }
        pop();
        push();
        {
          translate(sz / 4, sz * s / 2, sz / 4);
          scale(sz, sz, sz);
          cylinder(0.15, 0.2, 6);
        }
        pop();
        push();
        {
          translate(-sz / 4, sz * s / 2, sz / 4);
          scale(sz, sz, sz);
          cylinder(0.15, 0.2, 6);
        }
        pop();
        
        scale(sz, sz * s, sz);
        box(1);
      }
      pop();
    }
  }
}