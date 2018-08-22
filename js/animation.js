import Seed from './seed.js';
import Bloom from './bloom.js';
import Flower from './test.js';

class Animation {
  constructor(xDim, yDim) {
    this.xDim = xDim;
    this.yDim = yDim;
    this.seeds = [];
    this.blooms = [];
    this.rate = 7;
  }

  createSeed(e) {
    const { x, y } = e;
    const dx = ((Math.random() - 0.5) * 20) + 5;
    const dy = ((Math.random() - 0.5) * 20) + 5;
    const radius = Math.random() * 3 + 6;

    this.seeds.push(new Seed(x, y, dx, dy, radius));
  }

  createBloom(seed) {
    this.blooms.push(new Bloom(
      seed.x,
      seed.y,
      seed.dx,
      seed.dy,
      seed.radius
    ));
  }

  render(canvas) {
    const ctx = canvas.getContext('2d');
    let counter = 1;

    canvas.addEventListener('mousemove', e => {
      if (counter % this.rate === 0) this.createSeed(e);
      counter++;
    });

    const animate = () => {
      ctx.clearRect(0, 0, this.xDim, this.yDim);

      for (let i = 0; i < this.seeds.length; i++) {
        let seed = this.seeds[i];
        if (seed.lifespan > 0) {
          seed.update(this.xDim, this.yDim, ctx);
        } else {
          this.createBloom(seed);
          this.seeds.splice(i, 1);
          i--;
        }
      }

      for (let i = 0; i < this.blooms.length; i++) {
        let bloom = this.blooms[i];
        if (bloom.lifespan > 0) {
          bloom.update(this.xDim, this.yDim, ctx);
        } else {
          this.blooms.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
  }

}

export default Animation;
