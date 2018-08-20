const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

canvas.addEventListener('mousemove', (e) => {
  const { x, y } = e;
  ctx.fillRect(x, y, 50, 50);
  console.log(x, y);
});


console.log(canvas);
