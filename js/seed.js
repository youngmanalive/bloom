class Seed {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.lifespan = Math.random() * 100 + 200;
    this.color = this.seedColor();
  }

  seedColor() {
    const colors = [
      '#a1805d',
      '#3b5c50',
      '#627356',
      '#aa9f74',
      '#d49a4a'
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }

  update(xDim, yDim, ctx) {
    const gravity = .1;

    if (this.x + this.radius > xDim || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > yDim || this.y - this.radius < 0) {
      this.dy = -this.dy;
    } else {
      this.dy += gravity;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.lifespan -= 1;

    this.draw(ctx);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Seed;
