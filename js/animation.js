import Seed from './seed.js';
import Bloom from './bloom.js';

class Animation {
  constructor(xDim, yDim) {
    this.xDim = xDim;
    this.yDim = yDim;
    this.objects = [];
    this.seedProduction = 7;
    this.seedVelocity = 20;
    this.seedGravity = 0.1;
    // this.bloomSound = new Audio('assets/sounds/bloom.mp3');
  }

  createSeed(e) {
    const { x, y } = e;
    const dx = ((Math.random() - 0.5) * this.seedVelocity);
    const dy = ((Math.random() - 0.5) * this.seedVelocity);
    const radius = Math.random() * 3 + 2;

    this.objects.push(new Seed(x + 15, y + 5, dx, dy, radius));
  }

  createBloom(seed) {
    return new Bloom(
      seed.x,
      seed.y,
      seed.dx,
      seed.dy,
      seed.radius
    );
  }

  render(canvas) {
    const ctx = canvas.getContext('2d');
    let counter = 1;

    canvas.addEventListener('mousemove', e => {
      if (counter % this.seedProduction === 0) {
        this.createSeed(e);
        counter = 1;
      }
      counter++;
    });

    const animate = () => {
      ctx.clearRect(0, 0, this.xDim, this.yDim);

      for (let i = 0; i < this.objects.length; i++) {
        let object = this.objects[i];
        if (object.lifespan > 0) {
          object.update(this.xDim, this.yDim, ctx);
        } else {
          if (object instanceof Seed) {
            this.objects[i] = this.createBloom(object);
            // this.bloomSound.play();
          } else {
            this.objects.splice(i, 1);
            i--;
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
  }
}

export default Animation;
