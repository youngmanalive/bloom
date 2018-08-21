import Animation from './animation.js';


document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const animation = new Animation(canvas.width, canvas.height);

  animation.render(canvas);
});
