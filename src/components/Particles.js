import { useCallback, useMemo, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadImageShape } from "@tsparticles/shape-image";

export default function useParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // slim 패키지 로드
      await loadImageShape(engine); // 이미지 로드
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback((container) => {
    if (container) {
      container.refresh(); // 파티클 상태 새로고침
    }
  }, []);

  const options = useMemo(
    () => ({
      fpsLimit: 120,
      fullScreen: false,
      particles: {
        number: {
          value: 20,
          density: {
            enable: true,
            area: 10,
          },
        },
        links: { enable: false },
        move: {
          direction: "top",
          enable: true,
          outModes: { default: "out", bottom: "none" },
          random: true,
          speed: 20,
          straight: false,
        },
        opacity: { value: 0.5, random: true },
        shape: {
          type: "images",
          options: {
            images: [
              { src: "/images/capsule_3.png", width: 100, height: 100 },
              // 필요한 경우 다른 이미지를 추가할 수 있습니다.
            ],
          },
        },
        size: { value: { min: 100, max: 400 } },
        zIndex: {
          value: { min: 0, max: 100 },
          opacityRate: 0,
          velocityRate: 2,
        },
      },
      detectRetina: true,
    }),
    []
  );

  const particlesComponent = useMemo(
    () => (
      <Particles
        particlesLoaded={particlesLoaded}
        options={options}
        className="particles full"
      />
    ),
    [init]
  );

  return { init, particlesComponent }; // particlesComponent를 반환
}
