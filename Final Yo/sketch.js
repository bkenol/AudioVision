//noprotect
p5.disableFriendlyErrors = true;
var songTag = [];
var file_name = ['untitled.mp3', 'flyin hi.mp3','Vicetone ft. Pia Toscano - Siren (SIVANCY Remix).mp3'];
var fft,fft2, spectral_color, file_name, song, song2, song3, ID, volumeSlider, canvas, songChoice;
var color1, color2, color3, duration, song_location;
var backcolor1, backcolor2, backcolor3;
var song1Button, song2Button, song3Button, song4Button, saveButton, pauseButton, buttonSize, songPlaying;
function preload(){
  songChoice = 2;
  song = loadSound(file_name[0]);
  song2 = loadSound(file_name[1]);
  song3 = loadSound(file_name[2]);
  pauseButton = loadImage('Pause-Button-PNG-File.png');
  ARDESTINE = loadFont('ARDESTINE.ttf');
  //song2 = loadSound('flyin hi.mp3'); //  this is a duplicate because later on in the code I have a for loop
  												 // iterating through different moments in the duplicate copy
}
function setup() {
   
   canvas = createCanvas(1000, 1000);
   ID = createGraphics(1000,1000);
   
  songPlaying = song; // sets the song that is going to play
   background(100, 200, 200);
   pixelDensity(1);
   drawGrid();
   noFill();
  
  volumeSlider = createSlider(0.0, 1.0, 0.8); // slider for the volume is bugged with decimal values
   
   buttonSize = 60;
   
   fft = new p5.FFT();
   songPlaying.loop();
  //song.setVolume(0.8);
  //song2.play();
   fft.setInput(songPlaying);
   //fft2.setInput(song2);
  print(duration);
  
  songPlaying.jump(songPlaying.duration()/4); // starts a quarter ways into the song
  push();
  createTag(); // creates the song ID Tag
  
  //translate(0, -250);
  pop();
  
  displayControls(); // shows controls
}


function draw() {
  
  print(mouseX);
  print(mouseY);
  songPlaying.setVolume(volumeSlider.value()); // sets the volume to the slider value
  volumeSlider.position(width/4, height - 80);
  
  push();
  translate(400, 400);
  soundSpectrum(); // this draws the sound spectrum on the bottom of the screen
  pop();
  
  push();
  fill(255);
  stroke(255);
  rectMode(CENTER);
  rect(width/2, 950, width, 120);
  pop();
  
  createBackground();
  
  
  
  fill(0);
  textSize(150);
  textAlign(CENTER);
  textStyle('Arial Black');
  fill(color1 -100, color2 -100, color3 -100);
  text("AudioVision", width/2, 200);
  noFill();
  
  imageMode(CENTER);
  image(pauseButton, width/2, height - 70, buttonSize, buttonSize);
}


function createBackground(){
  audioColor();
  push();
  strokeWeight(60);
  stroke(color1, color2, color3);
  noFill();
  
  rectMode(CENTER);
  rect(width/2, height/2, width, height);
  
  
  pop();
}

function createTag(){
  push();
  fill(255);
  rectMode(CENTER);
  rect(width/2, height/2, 350, 350, 20);
  pop();
 for (i = width/2.5; i < width - (width/2.5); i+= 4){
		for(j = height/2.5; j < height - (height/2.5); j+=4){
			stroke(1);
      audioColor();
			fill(color1, color2, color3);
			rect(i, j, 4, 4);  
	}
   }
  noFill(0);
  stroke(0);
  strokeWeight(10);
  rectMode(CENTER);
  rect(width/2, height/2, 350, 350, 20);
  stroke(100);
  rect(width/2, height/2, 300, 300, 20);
  stroke(200);
  rect(width/2, height/2, 250, 250, 20);
  stroke(0);
  rect(width/2, height/2, 200, 200, 10);
  fill(255);
  
  ID.push();
  ID.fill(255);
  ID.rectMode(CENTER);
  ID.rect(width/2, height/2, 350, 350, 20);
  ID.pop();
 for (ID.i = ID.width/2.5; ID.i < ID.width - (ID.width/2.5); ID.i+= 4){
		for(ID.j = ID.height/2.5; ID.j < ID.height - (ID.height/2.5); ID.j+=4){
			ID.stroke(1);
      audioColor();
			ID.fill(color1, color2, color3);
			ID.rect(ID.i, ID.j, 4, 4);  
	}
   }
  ID.noFill(0);
  ID.stroke(0);
  ID.strokeWeight(10);
  ID.rectMode(CENTER);
  ID.rect(width/2, height/2, 350, 350, 20);
  ID.stroke(100);
  ID.rect(width/2, height/2, 300, 300, 20);
  ID.stroke(200);
 ID.rect(width/2, height/2, 250, 250, 20);
  ID.stroke(0);
  ID.rect(width/2, height/2, 200, 200, 10);
  ID.fill(255);
  
  }


function audioColor(){
   
  var spectrum = fft.analyze();
  color1 = spectrum[1000];
  color2 = spectrum[500];
  color3 = spectrum[100];
  //noLoop();
}


  

function soundSpectrum(){
  push();
  var spectrum = fft.analyze();
  
  
  backcolor1 = spectrum[300]; // sets the color to the different parts of the spectrum
  backcolor2 = spectrum[400];
  backcolor3 = spectrum[500];
  pop();
  
}
function keyPressed() {
  // The spacebar toggles the song playback
  if (key == ' '){
    if (songPlaying.isPlaying()){
    songPlaying.pause();
    buttonSize += 10;
  	} else {
    songPlaying.play();
    buttonSize -= 10;
    
  	}
	}
}




function drawGrid(){
  for(i = 0; i < width; i+=20){
    for(j = 0; j < height; j+= 20){
      stroke(0);
      fill(80, 150, random(255));
      rect(i, j, 20, 20);
    }
  }
}

function keyTyped(){
 if (key == 's'){
   
   save(ID, 'ID.png');
   
 }
if (key == 'n'){
  setup();
}

if (key == '1'){
 songPlaying.stop();
 songPlaying = song2;
 songPlaying.loop();
 fft = new p5.FFT();
 fft.setInput(songPlaying);
 canvas = createCanvas(1000, 1000);
 ID = createGraphics(1000,1000);
background(100, 200, 200);
pixelDensity(1);
drawGrid();
 //drawGrid();
 //displayControls();
createTag();
draw();
 
}
}

function displayControls(){
 fill(255);
 rect(727, 320, 275, 300, 20);
 fill(0);
 textSize(40);
 text("CONTROLS", 740, 365);
 textSize(20);
 text("S: Save Tag", 750, 405);
 text("Spacebar: Play/Pause", 750, 445);
  
}


