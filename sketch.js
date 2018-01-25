var script = document.createElement("script");
script.src = "./bird.js";
document.head.appendChild(script);
script = document.createElement("script");
script.src = "./obstacle.js";
document.head.appendChild(script);

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const FPS = 60;

const BIRD_RADIUS = 25;

const OBSTACLE_GAP = 150;
const OBSTACLE_WIDTH = 40;
const OBSTACLE_SPACING = 400;

const X_SPEED = 5;
const GRAVITY = 20;
const FLAP_SPEED = 8;

const GameState = {
	IDLE: 0,
	RUNNING: 1,
	FINISHED: 2
};

var pDx;
var pDy;

var bird;

var distance = 0;
var obstacles = [];

var gameState = GameState.IDLE;

function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	frameRate(FPS);
	
	bird = new Bird();

	gameState = GameState.RUNNING;
}

function draw() {
	background(51);

	switch(gameState) {
		case GameState.IDLE:

			break;

		case GameState.RUNNING:
			if((distance % OBSTACLE_SPACING) < 1) {
				obstacles.push(new Obstacle());
			}

			if(!obstacles[0].isOnScreen()) {
				obstacles.splice(0, 1);
			}

			bird.update();
			bird.show();

			obstacles.forEach(function(obstacle) {
				obstacle.update();
				obstacle.show();

				if(obstacle.collided(bird)) {
					console.log("COLLISION")
					gameState = GameState.FINISHED;
					
				}
			});
			

			distance += X_SPEED;
			break;

		default:

			break
	}

	
}


function keyPressed() {
	if(key === ' ') {
		bird.flap();
	}
}