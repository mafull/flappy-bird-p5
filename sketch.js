const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const FPS = 60;

const BIRD_SIZE = 30;

const OBSTACLE_WIDTH = 40;
const OBSTACLE_SPACING = 400;

const X_SPEED = 5;
const GRAVITY = 20;
const FLAP_SPEED = 8;

var bird;

var distance = 0;
var obstacles = [];

function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	frameRate(FPS);
	
	bird = new Bird();

	obstacles[0] = new Obstacle();
}

function draw() {
	background(51);
	stroke(255);

	bird.update();
	bird.show();

	if((distance % OBSTACLE_SPACING) < 1) {
		obstacles.push(new Obstacle());
		console.log("NEW OBSTACLE - " + obstacles.length + " total");
	}

	if(!obstacles[0].isOnScreen()) {
		obstacles.splice(0, 1);
	}

	obstacles.forEach(function(obstacle) {
		obstacle.update();
		obstacle.show();
	});
	

	distance += X_SPEED;
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
	this.size = BIRD_SIZE;

	this.update = function() {
		this.vx += (this.ax * (1 / FPS));
		this.vy += (this.ay * (1 / FPS));
		this.x += this.vx;
		this.y -= this.vy; // Note minus sice y0 is at the top
	}

	this.show = function() {
		fill(255);
		ellipse(this.x, this.y, this.size, this.size);
	}

	this.flap = function() {
		this.vy = FLAP_SPEED;
	}
}




function Obstacle() {
	this.x = CANVAS_WIDTH;
	this.y = CANVAS_HEIGHT;
	this.width = OBSTACLE_WIDTH;
	this.height = 100 + (Math.random() * 400);

	this.update = function() {
		this.x -= X_SPEED;
	}

	this.show = function() {
		fill(255);
		rect(this.x, this.y, this.width, -this.height);
	}

	this.isOnScreen = function() {
		return (this.x + this.width) > 0;
	}
}