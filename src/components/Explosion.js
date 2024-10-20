import Matter from "matter-js";

// 클릭 시 공들이 폭발하는 효과 함수
export const applyExplosionEffect = (event, engine) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  const bodies = Matter.Composite.allBodies(engine.world);

  bodies.forEach((body) => {
    if (body.label === "Circle Body") {
      const angle = Math.atan2(
        body.position.y - mouseY,
        body.position.x - mouseX
      );
      const forceMagnitude = 0.1 * body.mass; // 힘의 크기 조절
      Matter.Body.applyForce(body, body.position, {
        x: -forceMagnitude * Math.cos(angle), // 반대 방향으로 힘 적용
        y: -forceMagnitude * Math.sin(angle), // 반대 방향으로 힘 적용
      });
    }
  });
};
