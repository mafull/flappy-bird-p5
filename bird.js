function Bird() {
	this.x = CANVAS_WIDTH / 2;
	this.y = CANVAS_HEIGHT / 2;
	this.vx = 0;
	this.vy = 0;
	this.ax = 0;
	this.ay = -GRAVITY;//-9.81;
	this.radius = BIRD_RADIUS;
	this.colour = "#FFF";

	this.update = function() {
		this.vx += (this.ax * (1 / FPS));
		this.vy += (this.ay * (1 / FPS));
		this.x += this.vx;
		this.y -= this.vy; // Note minus sice y0 is at the top

		// Hit the floor
		if((this.y + this.radius) > CANVAS_HEIGHT) {
			this.y = CANVAS_HEIGHT - this.radius;
		}
	}

	this.show = function() {
		fill(this.colour);
		ellipse(this.x, this.y, (this.radius * 2));
	}

	this.flap = function() {
		this.vy = FLAP_SPEED;
	}
}