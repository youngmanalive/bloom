import Animation from "./animation.js";

document.addEventListener("DOMContentLoaded", () => {
  // Modal Functions
  const modal = document.getElementById("modal");

  const openModal = () => {
    modal.style.display = "block";
    setTimeout(() => (modal.style.opacity = "1"));
  };

  const closeModal = () => {
    modal.style.opacity = "0";
    setTimeout(() => (modal.style.display = "none"), 300);
  };

  modal.onclick = closeModal;
  document.getElementById("close-modal").onclick = closeModal;
  document.getElementById("open-modal").onclick = openModal;

  initializeAnimation();
});


const initializeAnimation = () => {
  // Grab Canvas
  const canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Create Animation
  let animation = new Animation(canvas.width, canvas.height);

  // Animation Controls
  const production = document.getElementById("production");
  const velocity = document.getElementById("velocity");

  production.onchange = e => (animation.seedProduction = e.target.value);
  velocity.onchange = e => (animation.seedVelocity = e.target.value);

  const resize = e => {
    animation.reset();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    animation = new Animation(canvas.width, canvas.height);
    animation.seedProduction = production.value;
    animation.seedVelocity = velocity.value;
    animation.render(canvas);
  };

  window.onresize = resize;

  // Begin Animation
  animation.render(canvas);
};
