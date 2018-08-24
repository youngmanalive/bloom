import Animation from './animation.js';


document.addEventListener('DOMContentLoaded', () => {
  // Modal Functions
  const modal = document.getElementById('modal');
  document.getElementById('close-modal').onclick = () => {
    modal.style.display = 'none';
  };
  document.getElementById('open-modal').onclick = () => {
    modal.style.display = 'block';
  };
  window.onclick = e => {
    if (e.target === modal) modal.style.display = 'none';
  };

  // Grab Canvas
  const canvas = document.querySelector('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Create Animation
  const animation = new Animation(canvas.width, canvas.height);

  document.getElementById('production').onchange = function() {
    animation.seedProduction = this.value;
  };
  document.getElementById('velocity').onchange = function() {
    animation.seedVelocity = this.value;
  };

  // Begin Animation
  animation.render(canvas);
});
