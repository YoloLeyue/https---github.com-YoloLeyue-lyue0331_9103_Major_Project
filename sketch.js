let num = 32; // 方块数量，确保是一个平方数以创建一个平方阵列
let size; // 每个方块的大小
let step; // 方块之间的步进值
let vmin; // 画布的最小维度
let theScreamImage; // 用于加载图片的变量
let sampleSound; // 用于加载声音的变量
let pg; // 图形缓冲区

let button; // 播放按钮
let fft; // FFT分析对象
let song; // 歌曲对象

function preload() {
  theScreamImage = loadImage('assets/Edvard_Munch_The_Scream.jpg');
  sampleSound = loadSound('assets/sample.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  fft = new p5.FFT(0.8, 256); // 使用256个频段
  song = sampleSound;
  song.connect(fft);

  button = createButton('play');
  button.mousePressed(startAudio);

  vmin = min(width, height);
  size = vmin / num;
  step = size;

  theScreamImage.resize(num, num);
  pg = createGraphics(num, num);
  pg.image(theScreamImage, 0, 0, num, num);
}

function startAudio() {
  if (getAudioContext().state !== 'running') {
    userStartAudio();
  }
  if (song.isPlaying()) {
    song.pause();
    button.html('play');
  } else {
    song.loop();
    button.html('pause');
  }
}

function draw() {
  background(31, 19, 1);
  let spectrum = fft.analyze(); // 获取频谱数据

  // 根据频谱数据动态调整方块高度
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      // 根据距离中心的远近选择频谱中的数据
      let d = dist(i, j, num / 2, num / 2);
      let index = floor(map(d, 0, dist(0, 0, num / 2, num / 2), 0, spectrum.length - 1));
      let amp = spectrum[index]; // 频谱中的振幅值
      let sz = map(amp, 0, 256, size / 2, size * 2); // 映射振幅到方块的高度

      let x = map(i, 0, num - 1, -width / 2, width / 2);
      let y = map(j, 0, num - 1, -height / 2, height / 2);

      let c = pg.get(i, j); // 获取对应像素的颜色

      push();
      translate(x, y, -sz / 2);
      fill(c);
      box(size, size, sz);
      pop();
    }
  }
}
