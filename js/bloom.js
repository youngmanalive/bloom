class Bloom {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = this.randomColor();
    this.lifespan = Math.random() * 100 + 300;
  }

  randomColor() {
    const colors = [
      '#D6D666',
      '#AC8CF7',
      '#B8336A',
      '#FF4F5D',
      '#09BEE2'
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
    }

    this.dx = this.dx * 0.95;
    this.dy = this.dy * 0.95;

    this.x += this.dx;
    this.y += this.dy;
    this.lifespan -= 1;

    if (this.radius < 25) {
      this.radius += 1;
    }

    this.draw(ctx);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Bloom;
