import Animation from './animation.js';


document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const animation = new Animation(canvas.width, canvas.height);

  const seedRate = document.getElementById('range');
  seedRate.onchange = () => {
    animation.rate = seedRate.value;
  };

  animation.render(canvas);
});
