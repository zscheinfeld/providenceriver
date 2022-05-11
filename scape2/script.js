let song;
let particles = [];
var cnvwidth
var cnvheight



function preload(){
  song = loadSound('1.m4a');
}

function setup() {
  cnvwidth = $("#sketch").outerWidth();
  cnvheight = $("#sketch").outerHeight();
  console.log(cnvwidth)
  var cnv = createCanvas(cnvwidth, cnvheight);
  cnv.parent('sketch');
  background(255, 0, 0);
  fft = new p5.FFT();
  amplitude = new p5.Amplitude();
}

function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
    background(255, 0, 0);
  } else {
    song.play();
    background(0, 255, 0);
  }
}


function draw() {
  let level = 5 * amplitude.getLevel()
  console.log(level)
  let levelmap = map(level, 0, .5, 0, cnvwidth);
  let levelmapheight = map(level, 0, .5, 0, cnvheight);
  let levelsound = map(level, 0, .5, 3, 40);
  let spectrum = fft.analyze();
  let waveform = fft.waveform();
  var xmiddle = cnvwidth/2;
  var ymiddle = cnvheight/2;
  var levelblue = map(level, 0, .5, 150, 255);
  background(0);
  
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(xmiddle, ymiddle, levelsound, 100,200,levelblue));
  }

  for (let particle of particles) {
    let gravity = createVector(level, level);
    particle.applyForce(gravity);
    particle.update();
    particle.show();
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}

function windowResized() {
  cnvwidth = $("#sketch").outerWidth();
  cnvheight = $("#sketch").outerHeight();
  resizeCanvas(cnvwidth, cnvheight);
}

$( document ).ready(function() {



  $("#01").click(function(){
    console.log("click")
    window.location.href = "/providenceriver"
})

});