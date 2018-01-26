
function Obstacle(maxX, maxY, pWidth, pGap, colour, vx) {
	this.maxX = maxX;
	this.maxY = maxY;
	this.x = maxX;
	this.y = maxY;
	this.width = pWidth * maxX;
	this.height = (0.05 * maxY) + (Math.random() * ((0.9 - pGap) * maxY));
	this.gap = pGap * maxY;
	this.colour = colour;
	this.vx = vx;

	this.update = function() {
		this.x -= this.vx;
	}

	this.draw = function(p) {
		p.fill(this.colour);
		p.rect(this.x, this.y, this.width, -this.height);
		p.rect(this.x, 0, this.width, (this.y - this.height - this.gap));
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
				this.x, 0, this.width, this.maxY - (this.height + this.gap))) {
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