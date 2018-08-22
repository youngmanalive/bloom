class Flower {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.lifespan = Math.random() * 100 + 300;
    this.img = this.flowerImg();
  }

  flowerImg() {
    const img = new Image();
    img.src = './assets/images/flowers/8.png';

    return img;
  }

  createFlowerCanvas() {
    const flower = document.createElement('canvas');
    flower.width = this.radius * 2;
    flower.height = this.radius * 2;

    const fctx = flower.getContext('2d');

    fctx.beginPath();
    fctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    fctx.fill();

    fctx.globalCompositeOperation = 'source-atop';
    fctx.drawImg(this.img, this.x, this.y);
    fctx.globalCompositeOperation = 'source-over';

    return flower;
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

    this.createFlowerCanvas(ctx);
  }

  // draw(ctx) {
  //   ctx.beginPath();
  //   ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  //   ctx.fill();
  //   ctx.closePath();
  // }
}

export default Flower;
