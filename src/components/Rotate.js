import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

// Rotate 컴포넌트 정의
const Rotate = ({ handleTransition }) => {
  // GSAP Draggable 플러그인 등록
  gsap.registerPlugin(Draggable);

  // 회전 상태를 저장하는 상태 변수
  const [rotation, setRotation] = useState(0);
  // 회전 스냅 값 설정 (4등분)
  const rotationSnap = 360 / 4;

  useEffect(() => {
    // 드래그할 요소 선택
    const knob = document.querySelector(".btn-lever");

    // Draggable 인스턴스 생성
    const draggable = Draggable.create(knob, {
      type: "rotation", // 회전 유형 설정
      bounds: { minRotation: 0, maxRotation: 270 }, // 회전 범위 설정
      snap: (endValue) => Math.round(endValue / rotationSnap) * rotationSnap, // 스냅 설정
      onDrag: function () {
        const newRotation = this.rotation; // 현재 회전 값 가져오기
        setRotation(newRotation); // 상태 업데이트

        // 회전 값이 270 이상일 경우 handleTransition 호출
        if (newRotation >= 270) {
          handleTransition(newRotation);
        }
      },
      onDragEnd: function () {
        const newRotation = this.rotation; // 드래그 종료 시 최종 회전 값 가져오기

        // 최종 회전 값이 270 미만이면 회전 값을 0으로 리셋
        if (newRotation < 270) {
          // 0도로 애니메이션 및 상태 업데이트
          gsap.to(knob, { rotation: 0 });
          setRotation(0); // 상태를 0으로 업데이트
        }
      },
    });

    // 컴포넌트 언마운트 시 Draggable 정리
    return () => {
      draggable[0].kill();
    };
  }, [handleTransition]); // handleTransition이 변경될 때만 useEffect 실행

  return (
    <div
      className="btn-lever"
      style={{
        transform: `rotate(${rotation}deg)`, // 회전 값을 적용
      }}
    >
      <div className="btn-lever-rotate" />
    </div>
  );
};

export default Rotate;
