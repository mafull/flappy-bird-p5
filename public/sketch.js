const CANVAS_WIDTH = 650;
const CANVAS_HEIGHT = 650;
const FPS = 60;

const P_BIRD_RADIUS = 0.05;

const P_OBSTACLE_GAP = 0.3;
const P_OBSTACLE_WIDTH = 0.08;
const P_OBSTACLE_SPACING = 400;

const X_SPEED = 5;
const P_GRAVITY = 2.5;
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


var sketch;
$(document).ready(function() {
	sketch = new p5(sketch, "container");
});
var sketch = function(p) {
	p.setup = function() {
		p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
		p.frameRate(FPS);
		
		bird = new Bird(
			CANVAS_WIDTH, CANVAS_HEIGHT,
			P_BIRD_RADIUS,
			P_GRAVITY,
			"#FFF",
			FLAP_SPEED);

		gameState = GameState.RUNNING;
	}

	p.draw = function() {
		p.background(51);

		switch(gameState) {
			case GameState.IDLE:

				break;

			case GameState.RUNNING:
				if((distance % P_OBSTACLE_SPACING) < 1) {
					obstacles.push(new Obstacle(
						CANVAS_WIDTH, CANVAS_HEIGHT,
						P_OBSTACLE_WIDTH,
						P_OBSTACLE_GAP,
						"#FFF",
						X_SPEED));
				}

				if(!obstacles[0].isOnScreen()) {
					obstacles.splice(0, 1);
				}

				bird.update();
				bird.draw(p);

				obstacles.forEach(function(obstacle) {
					obstacle.update();
					obstacle.draw(p);

					if(obstacle.collided(bird)) {
						//gameState = GameState.FINISHED;
						
					}
				});
				
				$("#scoreText")[0].textContent = "Score: " + Math.round(distance / 10);
				distance += X_SPEED;
				break;

			default:

				break
		}	
	}


	p.keyPressed = function() {
		if(p.key === ' ') {
			bird.flap();
		}
	}
}