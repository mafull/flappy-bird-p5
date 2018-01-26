function Bird(maxX, maxY, pRadius, pGravity, colour, flapSpeed) {
	this.maxX = maxX;
	this.maxY = maxY;
	this.x = maxX / 2;
	this.y = maxY / 2;
	this.vx = 0;
	this.vy = 0;
	this.ax = 0;
	this.ay = pGravity * -9.81;
	this.radius = pRadius * maxX;
	this.colour = colour;
	this.flapSpeed = flapSpeed;

	this.update = function() {
		// Velocity
		this.vx += (this.ax * (1 / FPS));
		this.vy += (this.ay * (1 / FPS));

		// Position
		this.x += this.vx;
		this.y -= this.vy; // Note minus sice y0 is at the top

		// Hit the floor
		if((this.y + this.radius) > this.maxY) {
			this.y = this.maxY - this.radius;
		}
	}

	this.draw = function(p) {
		p.fill(this.colour);
		p.ellipse(this.x, this.y, (this.radius * 2));
	}

	this.flap = function() {
		this.vy = this.flapSpeed;
	}
}