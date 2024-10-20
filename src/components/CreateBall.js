import Matter from "matter-js";
import { ballImages, imageSize } from "./constants"; // Import your constants

export const createBall = (x, y, ballSize) => {
  const randomImage = ballImages[Math.floor(Math.random() * ballImages.length)];
  const scaleFactor = ballSize / imageSize;
  return Matter.Bodies.circle(x, y, ballSize / 2, {
    restitution: 1,
    label: "Circle Body",
    render: {
      sprite: {
        texture: randomImage,
        xScale: scaleFactor,
        yScale: scaleFactor,
      },
    },
  });
};

export const createBalls = (numBalls, world) => {
  const canvasHeight = window.innerHeight;
  const ballSize = canvasHeight * 0.3; // Set ball size to 30% of canvas height
  const balls = [];

  for (let i = 0; i < numBalls; i++) {
    const x = Math.random() * (window.innerWidth - ballSize) + ballSize / 2;
    const y = Math.random() * (canvasHeight - ballSize) + ballSize / 2;
    const ball = createBall(x, y, ballSize); // imageSize를 전달하지 않음
    balls.push(ball);
    Matter.World.add(world, ball);
  }

  return balls;
};
