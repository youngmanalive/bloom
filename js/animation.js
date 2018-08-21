import Seed from './seed.js';

class Animation {
  constructor(xDim, yDim) {
    this.xDim = xDim;
    this.yDim = yDim;
    this.seeds = [];
    this.rate = 7;
  }

  createSeed(e) {
    const { x, y } = e;
    const dx = ((Math.random() - 0.5) * 20) + 5;
    const dy = ((Math.random() - 0.5) * 20) + 5;
    const radius = Math.random() * 3 + 6;

    this.seeds.push(new Seed(x, y, dx, dy, radius));
  }



  render(canvas) {
    const ctx = canvas.getContext('2d');
    let counter = 1;

    // ctx.fillStyle = "blue";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

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
          this.seeds.splice(i, 1);
          i--;
        }
      }

      console.log(this.seeds)

      this.rate = document.getElementById('range').value;

      requestAnimationFrame(animate);
    };

    animate();
  }

}

export default Animation;
