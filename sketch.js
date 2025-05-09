// Hand Pose Detection with ml5.js
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose

let video;
let handPose;
let hands = [];
let rectX, rectY; // Rectangle position
let rectSize = 100; // Rectangle size

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

  // Initialize rectangle position at the center of the canvas
  rectX = width / 2 - rectSize / 2;
  rectY = height / 2 - rectSize / 2;

  // Start detecting hands
  handPose.detectStart(video, gotHands);
}

function draw() {
  image(video, 0, 0);

  // Draw the rectangle
  fill(0, 0, 255, 100); // Semi-transparent blue
  noStroke();
  rect(rectX, rectY, rectSize, rectSize);

  // Ensure at least one hand is detected
  if (hands.length > 0) {
    for (let hand of hands) {
      if (hand.confidence > 0.1) {
        // Get the position of the index finger (keypoint 8)
        let indexFinger = hand.keypoints[8];

        // Check if the index finger is touching the rectangle
        if (
          indexFinger.x > rectX &&
          indexFinger.x < rectX + rectSize &&
          indexFinger.y > rectY &&
          indexFinger.y < rectY + rectSize
        ) {
          // Move the rectangle to follow the index finger
          rectX = indexFinger.x - rectSize / 2;
          rectY = indexFinger.y - rectSize / 2;
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
