let num = 26; // Reduce the number of cubes
let size; // Size of each cube
let vmin; // Smallest dimension of the canvas
let theScreamImage; // Variable for loading the image
let sampleSound; // Variable for loading the sound
let pg; // Graphics buffer
let button; // Play button
let fft; // FFT analysis object
let song; // Song object

function preload() {
  theScreamImage = loadImage('assets/Edvard_Munch_The_Scream.jpg'); // Preload the image
  sampleSound = loadSound('assets/scream.mp3'); // Preload the sound
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  fft = new p5.FFT(0.8, 256); // Use 256 frequency bands
  song = sampleSound; // Assign the preloaded sound to the song variable
  song.connect(fft); // Connect the song to the FFT

  setupButton();
  calculateSizes();
  setupGraphics();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas size when the window is resized
  calculateSizes(); // Recalculate sizes for responsive design
  setupGraphics(); // Resetup graphics according to new sizes
}

function setupButton() {
  button = createButton('-PLAY-'); // Create the play button with label
  button.mousePressed(startAudio); // Function to call when button is pressed
  // Set responsive font size based on window width
  button.style('font-size', `${windowWidth / 20}px`); 
  button.style('padding', '1% 2%'); // Padding around the button
  button.style('border', 'none'); // No border for the button
  button.style('border-radius', '5px'); // Rounded corners for the button
  button.style('background-color', '#000000'); // Button background color
  button.style('color', 'white'); // Text color of the button
  button.style('cursor', 'pointer'); // Cursor to display on hover
  button.position(windowWidth / 2 - button.width * 5, 10); // Position button at the top center of the screen
}

function calculateSizes() {
  vmin = min(width, height); // Compute the minimum of width and height
  size = vmin / num; // Calculate the size of the cubes based on vmin
  // Additional calculations for other sizes and positions can be done here
}

function setupGraphics() {
  // Adjust and redraw the background graphics according to the new size
  theScreamImage.resize(num, num); // Resize the image to match the number of cubes
  pg = createGraphics(num, num); // Setup the graphics buffer
  pg.image(theScreamImage, 0, 0, num, num); // Draw the image onto the graphics buffer
}

function startAudio() {
  if (getAudioContext().state !== 'running') {
    userStartAudio(); // Start the audio context if not already running
  }
  if (song.isPlaying()) {
    song.pause(); // Pause the song if it is playing
    button.html('_PLAY_'); // Update the button label to 'PLAY'
  } else {
    song.loop(); // Loop the song if it is not playing
    button.html('PAUSE'); // Update the button label to 'PAUSE'
  }
}