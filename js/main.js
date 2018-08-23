import Animation from './animation.js';


document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('canvas');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const animation = new Animation(canvas.width, canvas.height);

  document.getElementById('production').onchange = function() {
    animation.seedProduction = this.value;
  };

  document.getElementById('velocity').onchange = function() {
    animation.seedVelocity = this.value;
  };

  // document.getElementById('gravity').onchange = function() {
  //   animation.seedGravity = this.value;
  // };

  animation.render(canvas);
});
