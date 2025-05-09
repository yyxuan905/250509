// Hand Pose Detection with ml5.js
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose

let video;
let handPose;
let hands = [];
let circleX, circleY; // Circle position
let circleRadius = 50; // Circle radius
let isDragging = false; // Flag to check if the circle is being dragged

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
        } else {
          // If fingers are not touching, stop dragging
          isDragging = false;
        }

        // Draw circles for all keypoints
        for (let i = 0; i < hand.keypoints.length; i++) {
          let keypoint = hand.keypoints[i];

          // Color-code based on left or right hand
          if (hand.handedness == "Left") {
            fill(255, 0, 255);
          } else {
            fill(255, 255, 0);
          }

          noStroke();
          circle(keypoint.x, keypoint.y, 16);
        }

        // Draw lines connecting keypoints 0 to 4
        for (let i = 0; i < 4; i++) {
          let kp1 = hand.keypoints[i];
          let kp2 = hand.keypoints[i + 1];
          stroke(0, 255, 0);
          strokeWeight(2);
          line(kp1.x, kp1.y, kp2.x, kp2.y);
        }

        // Draw lines connecting keypoints 9 to 12
        for (let i = 9; i < 12; i++) {
          let kp1 = hand.keypoints[i];
          let kp2 = hand.keypoints[i + 1];
          stroke(0, 255, 0);
          strokeWeight(2);
          line(kp1.x, kp1.y, kp2.x, kp2.y);
        }

        // Draw lines connecting keypoints 13 to 16
        for (let i = 13; i < 16; i++) {
          let kp1 = hand.keypoints[i];
          let kp2 = hand.keypoints[i + 1];
          stroke(0, 255, 0);
          strokeWeight(2);
          line(kp1.x, kp1.y, kp2.x, kp2.y);
        }

        // Draw lines connecting keypoints 17 to 20
        for (let i = 17; i < 20; i++) {
          let kp1 = hand.keypoints[i];
          let kp2 = hand.keypoints[i + 1];
          stroke(0, 255, 0);
          strokeWeight(2);
          line(kp1.x, kp1.y, kp2.x, kp2.y);
        }
      }
    }
  }
}
