


        let song;
        let particles = [];
        var cnvwidth
        var cnvheight   

        function setup() {
        song = loadSound('/1.m4a');
        cnvwidth = $("#sketch").outerWidth();
        cnvheight = $("#sketch").outerHeight();
        var cnv = createCanvas(cnvwidth, cnvheight   );
        // cnv.style('display', 'block');
        // cnv.style('position', 'relative');
        cnv.parent('sketch');
        // cnv.position(0, 0);
        // createCanvas(windowWidth, windowHeight);
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
        let count = Math.floor(frameCount/ 120) 
        console.log(sin(count))
        
        let levelmap = map(level, 0, .5, 0, cnvwidth);
        let levelmapheight = map(level, 0, .5, 0, cnvheight   );
        let levelsound = Math.floor(map(level, 0, .5, 3, 40));
        let spectrum = fft.analyze();
        let waveform = fft.waveform();
        var xmiddle = random(cnvwidth);
        var ymiddle = random(cnvheight   );
        var levelblue = map(level, 0, .5, 150, 255);
        background(0,0,10);
        
        for (let i = 0; i < levelsound; i++) {
            particles.push(new Particle(xmiddle, ymiddle, 3, random(100), random(50,100),levelblue));
        }

        for (let particle of particles) {
            let gravity = createVector(level*sin(count), level*cos(count));
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

    $("#02").click(function(){
        console.log("click")
        window.location.href = "/providenceriver/scape2/index.html"
    })


});

