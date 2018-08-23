class Bloom {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.lifespan = Math.random() * 100 + 200;
    this.img = this.flowerImg();
    this.angle = 0;
    this.size = 8;
  }

  flowerImg() {
    const img = new Image();
    const imgNum = Math.floor(Math.random() * 12 + 1);
    img.src = `./assets/images/flowers/${imgNum}.png`;
    return img;
  }


  update(xDim, yDim, ctx) {
    if (this.x + this.radius > xDim || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > yDim || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.dx *= 0.95;
    this.dy *= 0.95;
    this.x += this.dx;
    this.y += this.dy;
    this.lifespan -= 1;

    if (this.lifespan > 10) {
      if (this.size <= this.img.width) this.size += 4;
    } else this.size *= 0.8;

    this.draw(ctx);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.drawImage(
      this.img,
      (this.x - (this.size / 2)),
      (this.y - (this.size / 2)),
      this.size,
      this.size
    );
    ctx.closePath();
  }
}

export default Bloom;
