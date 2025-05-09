// Hand Pose Detection with ml5.js
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose

let video;
let handPose;
let hands = [];
let circleX, circleY; // Circle position
let circleRadius = 50; // Circle radius
let isDragging = false; // Flag to check if the circle is being dragged
let trail = []; // Array to store the trail of the circle's center (red trail for index finger)
let thumbTrail = []; // Array to store the trail of the circle's center (green trail for thumb)

function preload() {
  // Initialize HandPose model with flipped video input
  handPose = ml5.handPose({ flipped: true });
}

function mousePressed() {
  console.log(hands);
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  // Initialize circle position at the center of the canvas
  circleX = width / 2;
  circleY = height / 2;

  // Start detecting hands
  handPose.detectStart(video, gotHands);
}

function draw() {
  image(video, 0, 0);

  // Draw the red trail (index finger)
  stroke(255, 0, 0); // Red color for the trail
  strokeWeight(2);
  noFill();
  beginShape();
  for (let pos of trail) {
    vertex(pos.x, pos.y);
  }
  endShape();

  // Draw the green trail (thumb)
  stroke(0, 255, 0); // Green color for the trail
  strokeWeight(2);
  noFill();
  beginShape();
  for (let pos of thumbTrail) {
    vertex(pos.x, pos.y);
  }
  endShape();

  // Draw the circle
  fill(0, 0, 255, 100); // Semi-transparent blue
  noStroke();
  ellipse(circleX, circleY, circleRadius * 2);

  // Ensure at least one hand is detected
  if (hands.length > 0) {
    for (let hand of hands) {
      if (hand.confidence > 0.1) {
        // Get the positions of the index finger (keypoint 8) and thumb (keypoint 4)
        let indexFinger = hand.keypoints[8];
        let thumb = hand.keypoints[4];

        // Check if both the index finger and thumb are touching the circle's edge
        let indexDist = dist(indexFinger.x, indexFinger.y, circleX, circleY);
        let thumbDist = dist(thumb.x, thumb.y, circleX, circleY);

        if (
          indexDist <= circleRadius &&
          thumbDist <= circleRadius
        ) {
          // Set the dragging flag to true
          isDragging = true;

          // Move the circle to the midpoint between the index finger and thumb
          circleX = (indexFinger.x + thumb.x) / 2;
          circleY = (indexFinger.y + thumb.y) / 2;

          // Add the current position to the red trail
          trail.push({ x: circleX, y: circleY });
        } else if (thumbDist <= circleRadius) {
          // If only the thumb is touching, move the circle with the thumb
          isDragging = true;

          // Move the circle to the thumb's position
          circleX = thumb.x;
          circleY = thumb.y;

          // Add the current position to the green trail
          thumbTrail.push({ x: circleX, y: circleY });
        } else {
          // If fingers are not touching, stop dragging
          isDragging = false;
        }
      }
    }
  } else {
    // Clear the trails if no hands are detected
    isDragging = false;
  }

  // Clear the trails when dragging stops
  if (!isDragging) {
    trail = [];
    thumbTrail = [];
  }
}
