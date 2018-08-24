# Bloom
[Live Site](https://youngmanalive.github.io/bloom)

Bloom is a mouseover visualization written in HTML5 Canvas and Vanilla JavaScript. Scatter seeds with a pan of your cursor and watch the blooms come to life! Prepare to be mesmerized!

![1](assets/gifs/1.gif)


## Implementation

Bloom was inspired by a love of floral combinations and simple animations.

##### Object Oriented Programming


A Seed and Bloom class are used to initialize and track each object's values. A Randomized lifespan determines how long each object will live on the canvas. Once a Seed lifecycle has ended, we pass in the seed's values to create a new Bloom. Objects are stored in an array, updating each object using a `for` loop in our animate function. As a Bloom ends it's lifecycle, we splice it out of the array.

```JavaScript
// animation.js

render(canvas) {
  // ...
  const animate = () => {
    // ...

    for (let i = 0; i < this.objects.length; i++) {
      let object = this.objects[i];

      // Check the object's remaining lifespan
      if (object.lifespan > 0) {
        // Update to canvas
        object.update(this.xDim, this.yDim, ctx);
      } else {
        if (object instanceof Seed) {
          // Initialize bloom using seed values
          this.objects[i] = this.createBloom(object);
        } else {
          // Remove bloom
          this.objects.splice(i, 1);
          i--;
        }
      }
    }

    // ...
  }
}
```


A mousemove event listener is added to our Animation class to initialize the Seed objects.

```JavaScript
// animation.js

// Listen for mouse movement
render(canvas) {
  // ...
  canvas.addEventListener('mousemove', e => {
    this.createSeed(e);
  });
  // ...
}

// Using the event coordinates, we create a seed at that location.
createSeed(e) {
  const { x, y } = e;
  const dx = ((Math.random() - 0.5) * this.seedVelocity);
  const dy = ((Math.random() - 0.5) * this.seedVelocity);
  const radius = Math.random() * 3 + 2;

  this.objects.push(new Seed(x, y, dx, dy, radius));
}
```

##### Control Settings

![1](assets/gifs/2.gif)

Control settings can be adjusted to change the seed production rate and velocity in which they are ejected. This is accomplished by obtaining the value of each input range and updating the properties in our Animation.

```JavaScript
// main.js

document.getElementById('production').onchange = function() {
  animation.seedProduction = this.value;
};

document.getElementById('velocity').onchange = function() {
  animation.seedVelocity = this.value;
};
```

Since we cannot control the firing rate of a mousemove listener, we'll use a simple counter to determine how often to create a Seed.

```JavaScript
// animation.js

// Declare a counter variable.
let counter = 1;

// Using the current seedProduction value, we can mod the counter
// and production value to create the Seed at specified intervals.
// After initializing a Seed, we'll reset the counter to start
// the cycle over again.
canvas.addEventListener('mousemove', e => {
  if (counter % this.seedProduction === 0) {
    this.createSeed(e);
    counter = 1;
  }
  counter++;
});
```

---
Bloom PNGs provided by [freepik](https://www.freepik.com).
