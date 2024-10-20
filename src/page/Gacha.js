// Gacha.js
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Shaker from "../components/Shaker"; // Shaker 컴포넌트 import
import Rotate from "../components/Rotate"; // 회전 컴포넌트 import
import useParticles from "../components/Particles"; // 파티클 관련 로직 import
import {
  animateShakerTocatching,
  animateCatchingTransition,
  startBallAnimation,
} from "../components/Animation"; // 애니메이션 관련 함수들 import

import "../css/gacha.scss";

function Gacha() {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate
  const shakerRef = useRef(null); // Shaker 컴포넌트의 ref
  const catchingRef = useRef(null); // Catching 영역의 ref
  const ballRef = useRef(null); // 공(ball)의 ref
  const [showParticles, setShowParticles] = useState(false); // 파티클 표시 여부를 관리하는 state
  const { particlesComponent } = useParticles(); // 파티클 컴포넌트 가져오기
  const [isBallClickable, setIsBallClickable] = useState(false); // 공 클릭 가능 여부를 관리하는 state

  // 셰이커에서 캡슐을 잡는 화면으로의 전환 애니메이션 처리 함수
  const handleTransition = () => {
    setShowParticles(true); // 파티클 표시
    const tl = animateShakerTocatching(shakerRef, catchingRef, ballRef); // 애니메이션 시작
    tl.add(() => {
      startBallAnimation(catchingRef, ballRef, setIsBallClickable); // 공 애니메이션 시작
    }, ">"); // 애니메이션 체인 추가
  };

  // 공 클릭 시 애니메이션과 함께 결과 페이지로 이동하는 함수
  const handleBallClick = () => {
    if (isBallClickable) {
      setIsBallClickable(false); // 클릭 가능 상태를 false로 설정
      animateCatchingTransition(catchingRef, () => {
        navigate("/result"); // 결과 페이지로 이동
      });
    }
  };

  return (
    <>
      {/* Shaker 영역 */}
      <div className="shaker full" ref={shakerRef}>
        <Shaker /> {/* Shaker 컴포넌트 렌더링 */}
        <div className="shaker-cover full">
          {/* 셰이커의 벽과 창 부분 */}
          <div className="shaker-top-wall"></div>
          <div className="shaker-left-wall"></div>
          <div className="shaker-right-wall"></div>
          <div className="shake-window"></div>
          <div className="shaker-bottom-wall">
            {/* 셰이커 내부의 버튼과 레버 */}
            {/* <div className="area-left">
              <h1>Gacha</h1>
              <h2>Turn the lever and pull out Sage!</h2>
            </div>
            <div className="area-right">
              <button className="btn-long"></button>
              <button className="btn-short"></button>
            </div> */}

            {/* 레버 */}
            <div className="shaker-con-lever">
              <Rotate handleTransition={handleTransition} />{" "}
              {/* 회전 컴포넌트 사용 */}
            </div>
          </div>
        </div>
      </div>
      {/* 파티클 컴포넌트 */}
      {/* 캡슐 잡는 화면 */}
      <div
        className="catching full"
        ref={catchingRef}
        style={{ display: "none" }} // 처음에는 보이지 않음
      >
        {showParticles && particlesComponent} {/* 파티클을 조건부로 표시 */}
        <div className="catching-road">
          <div
            className="ball" // 공(ball) 요소
            style={{ transform: "translateY(-100vh)" }} // 공이 위에서 떨어지도록 설정
            ref={ballRef} // 공의 ref
            onClick={handleBallClick} // 클릭 시 결과 페이지로 이동
          ></div>
          <h1>Touch Me!</h1> {/* 공을 터치하라는 메시지 */}
        </div>
      </div>
    </>
  );
}

export default Gacha;
