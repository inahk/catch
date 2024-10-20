// Animation.js
import { gsap } from "gsap";

export const animateShakerTocatching = (shakerRef, catchingRef, ballRef) => {
  const tl = gsap.timeline();

  // catching를 보이게 한 후 애니메이션을 실행
  tl.set(catchingRef.current, { display: "block", y: "100%" }) // catching를 화면 아래에 보이도록 설정
    .to(shakerRef.current, { y: "-100%", duration: 1, ease: "power2.out" }) // Shaker가 위로 올라가는 애니메이션
    .to(catchingRef.current, { y: "0%", duration: 1, ease: "power2.out" }, 0) // catching가 아래에서 올라오는 애니메이션
    .set(shakerRef.current, { display: "none" }); // Shaker를 숨김

  return tl;
};

export const animateCatchingTransition = (catchingRef, callback) => {
  const tl = gsap.timeline();

  // catching을 보이게 한 후 애니메이션을 실행
  tl.set(catchingRef.current, { display: "block", scale: 1 }) // catching을 보이게 설정
    .to(catchingRef.current, { scale: 3, duration: 1, ease: "power2.out" }) // catching을 확대
    .call(callback); // 애니메이션이 끝난 후 callback 실행

  return tl;
};

export const startBallAnimation = (
  catchingRef,
  ballRef,
  setIsBallClickable // setIsBallClickable 콜백 추가
) => {
  if (catchingRef.current) {
    catchingRef.current.style.display = "block";
    gsap.set(ballRef.current, { y: "-80vh", scale: 0.01, opacity: 0 });

    gsap.to(ballRef.current, {
      y: "-100%",
      scale: 1.8,
      opacity: 1,
      duration: 4,
      ease: "expoScale",
      delay: 1,
      onComplete: () => {
        const textElement = catchingRef.current.querySelector("h1");
        gsap.fromTo(
          textElement,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          }
        );
        setIsBallClickable(true); // 클릭 가능하도록 설정
      },
    });
  }
};
