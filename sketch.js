let ghost;
let score = 0;
let duration = 20;
let startTime;
let state = "start";
let spawnEvery = 60;
let stars = [];

function setup() {
  createCanvas(480, 360);
  spawnGhost();
}

function draw() {
  background(15, 10, 45);

  if (state === "start") {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(32);
    textFont("monospace");
    text("Click to start", width / 2, height / 2 - 50);
    textSize(10.5);
    text("Welcome to my SPOOOOOOOOOOOky game!", width / 2, height / 2 + 25);
    text(
      "Click to capture the ghosts, but do not click randomly - you lose points!",
      width / 2,
      height / 2 + 50
    );
    return;
  }

  if (state === "over") {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    textFont("monospace");
    text(
      "DUN DUN DUHHHHHH! Game over\nScore: " + score + "\nClick to retry",
      width / 2,
      height / 2
    );
    return;
  }
  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);
  if (timeLeft <= 0) {
    state = "over";
    return;
  }
  if (frameCount % spawnEvery === 0) spawnGhost();
  drawGhost(ghost.x, ghost.y);
  if (frameCount % 15 === 0) {
    stars.push({ x: random(width), y: random(height) });
  }
  for (let s of stars) {
    drawStar(s.x, s.y);
  }

  textAlign(LEFT, TOP);
  fill(255);
  textSize(16);
  textFont("monospace");
  text("Score: " + score, 12, 10);
  textAlign(RIGHT, TOP);
  textFont("monospace");
  text("Time: " + ceil(timeLeft), width - 12, 10);
}

function mousePressed() {
  if (state === "start" || state === "over") {
    state = "play";
    score = 0;
    startTime = millis();
    spawnGhost();
    return;
  }
  if (dist(mouseX, mouseY, ghost.x, ghost.y) < 30) {
    score++;
    spawnGhost();
  } else {
    score--;
  }
}

function spawnGhost() {
  ghost = { x: random(40, width - 40), y: random(40, height - 40) };
}

function drawGhost(x, y) {
  noStroke();
  fill(220, 255, 230);
  ellipse(x, y, 60, 68);
  fill(20);
  ellipse(x - 12, y - 5, 10);
  ellipse(x + 12, y - 5, 10);
  ellipse(x, y + 15, 12, 18);
}

function drawStar(x, y) {
  noStroke();
  fill(255, 255, 210);
  ellipse(x, y, 3, 3);
}
