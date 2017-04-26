var fft, spectral_color, file_name, song;
var color1, color2, color3, duration, song_location;
function preload(){
  song = loadSound('give_me_back_tonight.mp3');
  song2 = loadSound('give_me_back_tonight.mp3'); //  this is a duplicate because later on in the code I have a for loop
  												 // iterating through different moments in the duplicate copy
}
function setup() {
   createCanvas(1920, 1080);
   background(100, 200, 200);
   noFill();
  
   duration = song2.duration(); // this is defining the duration of the song
   fft = new p5.FFT(.8);
   song.loop();
   fft.setInput(song);
  print(duration);
}

function draw() {
  background(200);
  fill(0);
  textSize(100);
  textAlign(CENTER);
  textStyle('Helvetica');
  text("AudioVision", width/2, 200);
  noFill();
  push();
  translate(0, -150);
  createTag(); // this creates the tag that will eventually be a visual representation of the audio file
  			   // right now it updates to the live input but eventually I want it to be a static image
  pop();
  
  push();
  translate(400, 400);
  soundSpectrum(); // this draws the sound spectrum on the bottom of the screen
  pop();
  
  //audioColor();
}

// in the future this will allow users to upload different music files
function gotFile(file) {

  
  var fileDiv = createDiv(file.name);
  fileDiv.class('file');
  songName = file.name;
}
function keyPressed(){
 if (key == 'r'){
  reset(); 
 }
 if (key =='f'){
   fileSelection();
 }
}
function createTag(){
 for (i = width/2.5; i < width - (width/2.5); i+= 4){
		for(j = height/2.5; j < height - (height/2.5); j+=4){
			//noStroke();
			fill(color1, color2, color3);
			rect(i, j, 4, 4);
          	// this is commented out because i'm not sure how to fix this
            // instead of every pixel updating live with the sound i want each
            // individual pixel to represent the average of different instances of the song
            //song2.jump(map(j, 0, 61344,  0, duration), duration);
	}
   }
  }

// I don't know if I will ever actually need this function
// I'm trying to get the program to iterate through different parts of the song
function audioColor(){
  for (i = 0; i < 61344; i++){
  j = i;
  song2.jump(map(j, 0, 61344,  0, song2.duration()), song2.duration());
  }

}
  

function soundSpectrum(){
  var spectrum = fft.analyze();
   beginShape();
   for (i = 0; i<spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height/2, 0) );
   }
   endShape();
  
  color1 = spectrum[100]; // sets the color to the different parts of the spectrum
  color2 = spectrum[300];
  color3 = spectrum[500];
  /*
  for (i = 0; i < 61344; i++){
  j = i;
  song2.jump(map(j, 0, 61344,  0, duration), duration);
  }
  */
}
function keyPressed() {
  // The spacebar toggles the song playback
  if (key == ' '){
  	if ( song.isPlaying() ) { // .isPlaying() returns a boolean
    song.pause();
    background(255,0,0);
  } else {
    song.play();
    background(0,255,0);
  }
 }
if (key === BACKSPACE){
  if (song.isPlaying() == false){
   song.stop(); 
  }
}
}
