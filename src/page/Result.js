import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin"; // TextPlugin 임포트

// GSAP의 TextPlugin을 등록합니다.
gsap.registerPlugin(TextPlugin);

const Result = () => {
  const textRef = useRef(null);
  const resultRef = useRef(null); // catch-result에 대한 참조 추가
  const [showImage, setShowImage] = useState(false); // 이미지 표시 상태
  const images = ["/images/result.png"]; // 이미지 경로 배열

  useEffect(() => {
    const text = "Welcome to the Result Page!";

    // GSAP 애니메이션 생성
    gsap.fromTo(
      textRef.current,
      { text: "" },
      {
        text: text,
        duration: 2,
        ease: "none",
        onComplete: () => {
          setShowImage(true); // 애니메이션이 완료되면 이미지를 표시
          gsap.to(textRef.current, { opacity: 0, duration: 0.5 }); // 텍스트를 서서히 숨김

          setTimeout(() => {
            if (textRef.current) {
              textRef.current.parentElement.style.display = "none"; // .texting을 none으로 설정
            }

            // catch-result에 있는 요소들에 애니메이션 추가
            if (resultRef.current) {
              const resultImages = resultRef.current.querySelectorAll("img");
              const circle = resultRef.current.querySelector(".catch-circle");
              const title = resultRef.current.querySelector("h1");

              gsap.fromTo(
                resultImages,
                { opacity: 0, x: 50 },
                { opacity: 1, x: 0, duration: 1, stagger: 0.2 }
              );

              gsap.fromTo(circle, { opacity: 0 }, { opacity: 1, duration: 1 });

              gsap.fromTo(title, { opacity: 0 }, { opacity: 1, duration: 1 });
            }
          }, 500);
        },
      }
    );
  }, []);

  // 랜덤으로 이미지를 선택하는 함수
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  return (
    <div className="result full">
      <div className="texting full">
        <h1 ref={textRef}></h1>
      </div>
      {showImage && (
        <div className="catch-result" ref={resultRef}>
          <img className="result-bg-1" src={getRandomImage()} alt="Random" />
          <img className="result-bg-2" src={getRandomImage()} alt="Random" />
          <div className="bg-grad full"></div>
          <div className="catch-circle"></div>
          <h1>SAGE</h1>
          <img className="result-img" src={getRandomImage()} alt="Random" />
        </div>
      )}
    </div>
  );
};

export default Result;
