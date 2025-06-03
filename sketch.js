let flowers = [];
let budImg, bloomImg, rotImg;
let video;
let started = false;

function preload() {
  console.log('Starting to load assets...');
  
  budImg = loadImage('bud.png', 
    () => console.log('bud.png loaded successfully'),
    () => console.log('Error loading bud.png')
  );
  
  bloomImg = loadImage('bloom.png',
    () => console.log('bloom.png loaded successfully'),
    () => console.log('Error loading bloom.png')
  );
  
  rotImg = loadImage('rot.png',
    () => console.log('rot.png loaded successfully'),
    () => console.log('Error loading rot.png')
  );
  
  video = createVideo('Sequence01.mp4',
    () => console.log('Video loaded successfully'),
    () => console.log('Error loading video')
  );
  video.hide();
  console.log('Preload function completed');
}

function setup() {
  console.log('Setup starting...');
  createCanvas(windowWidth, windowHeight);

  video.volume(0);
  video.elt.muted = true;
  video.loop();
  video.hide();

  const startBtn = document.getElementById('startBtn');
  startBtn.addEventListener('click', () => {
    console.log('Start button clicked');
    started = true;
    startBtn.style.display = 'none';
    video.play().then(() => console.log('Video playback started'))
      .catch(err => console.log('Video playback error:', err));
  });
  console.log('Setup completed');
}

function draw() {
  background(0);

  if (started) {
    image(video, 0, 0, width, height);  // 🎥 draw the video on canvas

    // 🌸 draw and update all flowers
    for (let i = flowers.length - 1; i >= 0; i--) {
      flowers[i].update();
      flowers[i].display();
      if (flowers[i].isDone()) {
        flowers.splice(i, 1);
      }
    }
  } else {
    // Optional: loading screen or background
    fill(255);
    textSize(20);
    text("Loading...", 10, 30);
  }
}

function mousePressed() {
  if (started) {
    flowers.push(new Flower(mouseX, mouseY));
  }
}

class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.createdAt = millis();
  }

  getStage() {
    const age = millis() - this.createdAt;
    if (age < 1000) return 'bud';
    else if (age < 4000) return 'bloom';
    else if (age < 6000) return 'rot';
    else return 'dead';
  }

  update() {
    // You could add movement or fade logic here
  }

  display() {
    let stage = this.getStage();
    let img;

    if (stage === 'bud') img = budImg;
    else if (stage === 'bloom') img = bloomImg;
    else if (stage === 'rot') img = rotImg;
    else return;

    imageMode(CENTER);
    image(img, this.x, this.y, 50, 50);
  }

  isDone() {
    return this.getStage() === 'dead';
  }
}
