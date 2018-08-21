class Seed {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.lifespan = Math.random() * 5000 + 10000;
    this.color = this.randomColor();
  }

  randomColor() {
    const colors = [
      '#a1805d',
      '#3b5c50',
      '#627356',
      '#aa9f74',
      '#d49a4a'
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }

  update(innerWidth, innerHeight, ctx) {
    const gravity = .1;

    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    } else {
      this.dy += gravity;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.lifespan -= 50;

    // if (this.radius < 100) {
    //   this.radius += 1;
    // }

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
