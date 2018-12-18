import Seed from './seed.js';
import Bloom from './bloom.js';

class Animation {
  constructor(xDim, yDim) {
    this.xDim = xDim;
    this.yDim = yDim;

    this.objects = [];
    this.seedProduction = 3;
    this.seedVelocity = 10;
    this.counter = 1;
    this.run = true;
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  reset() {
    this.run = false;
    this.objects = [];
  }

  createSeed(e) {
    const { x, y } = e;
    const dx = ((Math.random() - 0.5) * this.seedVelocity);
    const dy = ((Math.random() - 0.5) * this.seedVelocity);
    const radius = Math.random() * 3 + 2;

    this.objects.push(new Seed(x, y, dx, dy, radius));
  }

  createBloom(seed) {
    return new Bloom(seed.x, seed.y, seed.dx, seed.dy);
  }

  onMouseMove(e) {
    if (this.counter % this.seedProduction === 0) {
      this.createSeed(e);
      this.counter = 0;
    }
    this.counter++;
  }

  render(canvas) {
    const ctx = canvas.getContext('2d');

    canvas.addEventListener('mousemove', this.onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, this.xDim, this.yDim);

      const grad = ctx.createLinearGradient(0, 0, 0, this.xDim/2);
      grad.addColorStop(0, '#7DCDF6');
      grad.addColorStop(1, '#2DB6ED');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, this.xDim, this.yDim);

      for (let i = 0; i < this.objects.length; i++) {
        let object = this.objects[i];
        if (object.lifespan > 0) {
          object.update(this.xDim, this.yDim, ctx);
        } else {
          if (object instanceof Seed) {
            this.objects[i] = this.createBloom(object);
          } else {
            this.objects.splice(i, 1);
            i--;
          }
        }
      }

      if (this.run) {
        requestAnimationFrame(animate);
      } else {
        canvas.removeEventListener('mousemove', this.onMouseMove);
      }
    };

    animate();
  }
}

export default Animation;
