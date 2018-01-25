
function Obstacle() {
	this.x = CANVAS_WIDTH;
	this.y = CANVAS_HEIGHT;
	this.width = OBSTACLE_WIDTH;
	this.height = 100 + (Math.random() * 400);
	this.gap = OBSTACLE_GAP;
	this.colour = "#FFF";

	this.update = function() {
		this.x -= X_SPEED;
	}

	this.show = function() {
		fill(this.colour);
		rect(this.x, this.y, this.width, -this.height);
		rect(this.x, 0, this.width, (this.y - this.height - this.gap));
	}

	this.isOnScreen = function() {
		return (this.x + this.width) > 0;
	}

	this.collided = function(bird) {		
		if(circleRectCollision(
				bird.x, bird.y, bird.radius,
				this.x, this.y - this.height, this.width, this.height) ||
			circleRectCollision(
				bird.x, bird.y, bird.radius,
				this.x, 0, this.width, CANVAS_HEIGHT - (this.height + this.gap))) {
			this.colour = "#F00";
			return true;
		}

		this.colour = "#FFF";
		return false;
	}
}



function circleRectCollision(
	cx, cy, radius,
	rx, ry, rw, rh) {

	var tx = cx;
	var ty = cy;

	if(cx < rx) {
		tx = rx;
	} else if(cx > (rx + rw)) {
		tx = rx + rw;
	}
	if(cy < ry) {
		ty = ry;
	} else if(cy > (ry + rh)) {
		ty = ry + rh;
	}

	var dx = cx - tx;
	var dy = cy - ty;
	var ds = Math.sqrt((dx*dx) + (dy*dy));

	return (ds <= radius);
}