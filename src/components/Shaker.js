import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { createBalls } from "./CreateBall"; // 경로를 맞춰주세요
import { applyExplosionEffect } from "./Explosion"; // 새로운 폭발 효과 임포트
import { BALL_COUNT } from "./constants"; // 상수 임포트

const CatchShaker = () => {
  const scene = useRef(null);
  const engine = useRef(Matter.Engine.create());
  const runner = useRef(Matter.Runner.create());
  const balls = useRef([]);
  const boundaries = useRef([]);
  const boundaryThickness = useRef(30);
  const imageSize = useRef(window.innerHeight * 0.4); // 이미지 사이즈를 초기화

  const createBoundaries = (width, height) => {
    const { World, Bodies } = Matter;

    if (boundaries.current.length > 0) {
      Matter.World.remove(engine.current.world, boundaries.current);
    }

    const newBoundaries = [
      Bodies.rectangle(
        width / 2,
        -boundaryThickness.current / 2,
        width,
        boundaryThickness.current,
        { isStatic: true }
      ), // 위쪽 경계
      Bodies.rectangle(
        width / 2,
        height + boundaryThickness.current / 2,
        width,
        boundaryThickness.current,
        { isStatic: true }
      ), // 아래쪽 경계
      Bodies.rectangle(
        -boundaryThickness.current / 2,
        height / 2,
        boundaryThickness.current,
        height,
        { isStatic: true }
      ), // 왼쪽 경계
      Bodies.rectangle(
        width + boundaryThickness.current / 2,
        height / 2,
        boundaryThickness.current,
        height,
        { isStatic: true }
      ), // 오른쪽 경계
    ];

    Matter.World.add(engine.current.world, newBoundaries);
    boundaries.current = newBoundaries;
  };

  const updateBalls = (world) => {
    balls.current.forEach((ball) => {
      Matter.World.remove(world, ball);
    });

    balls.current = createBalls(BALL_COUNT, world, imageSize.current); // imageSize를 전달
  };

  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function (...args) {
      if (!lastRan) {
        func.apply(this, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func.apply(this, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  };

  useEffect(() => {
    const { Render } = Matter;

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    createBoundaries(window.innerWidth, window.innerHeight);
    balls.current = createBalls(
      BALL_COUNT,
      engine.current.world,
      imageSize.current
    ); // imageSize를 전달

    const clickHandler = (event) => applyExplosionEffect(event, engine.current);
    render.canvas.addEventListener("click", clickHandler);

    Matter.Runner.run(runner.current, engine.current);
    Render.run(render);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      createBoundaries(width, height);
      render.options.width = width;
      render.options.height = height;
      Render.setPixelRatio(render, window.devicePixelRatio);
      Render.setSize(render, width, height);

      imageSize.current = height * 0.4; // 이미지 사이즈를 업데이트
      updateBalls(engine.current.world); // 공 업데이트
    };

    const throttledHandleResize = throttle(handleResize, 100);
    window.addEventListener("resize", throttledHandleResize);

    return () => {
      Render.stop(render);
      window.removeEventListener("click", clickHandler);
      window.removeEventListener("resize", throttledHandleResize);
      Matter.World.clear(engine.current.world, false);
      Matter.Engine.clear(engine.current);
      boundaries.current = []; // 경계 초기화
      balls.current = []; // 공 초기화
    };
  }, []);

  return (
    <div
      ref={scene}
      id="canvas-container"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default CatchShaker;
