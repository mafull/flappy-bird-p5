const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const FPS = 60;

const GRAVITY = 20;
const FLAP_SPEED = 8;

var bird;

function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	frameRate(FPS);
	
	bird = new Bird();
}

function draw() {
	background(51);

	stroke(255);

	bird.update();
	bird.show();
}


function keyPressed() {
	if(key === ' ') {
		bird.flap();
	}
}




function Bird() {
	this.x = CANVAS_WIDTH / 2;
	this.y = CANVAS_HEIGHT / 2;
	this.vx = 0;
	this.vy = 0;
	this.ax = 0;
	this.ay = -GRAVITY;//-9.81;

	this.update = function() {
		this.vx += (this.ax * (1 / FPS));
		this.vy += (this.ay * (1 / FPS));
		this.x += this.vx;
		this.y -= this.vy; // Note minus sice y0 is at the top
	}

	this.show = function() {
		fill(255);
		ellipse(this.x, this.y, 10, 10);
	}

	this.flap = function() {
		this.vy = FLAP_SPEED;
	}
}