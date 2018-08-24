class Bloom {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;

    this.radius = 1;
    this.lifespan = Math.random() * 100 + 200;
    this.size = 8;
    this.img = this.flowerImg();
    this.angle = 0;
    this.rotation = (Math.random() - 0.5) * 3;
  }

  flowerImg() {
    const img = new Image();
    const imgNum = Math.floor(Math.random() * 10 + 1);
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
    this.angle += this.rotation;

    if (this.lifespan > 10) {
      if (this.size <= this.img.width) this.size += 4;
    } else this.size *= 0.8;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle * (Math.PI/180));
    this.draw(ctx);
    ctx.restore();
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.drawImage(
      this.img,
      (0 - (this.size / 2)),
      (0 - (this.size / 2)),
      this.size,
      this.size
    );
    ctx.closePath();
  }
}

export default Bloom;
