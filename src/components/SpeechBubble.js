export function showSpeechBubble(ball) {
  // 기존 말풍선이 있으면 제거
  const existingBubble = document.querySelector(
    `.speech-bubble[data-id="${ball.id}"]`
  );
  if (existingBubble) existingBubble.remove();

  // 말풍선 DOM 요소 생성
  const bubble = document.createElement("div");
  bubble.className = "speech-bubble";
  bubble.dataset.id = ball.id;
  bubble.innerText = "아야!";

  // 공의 위치에 말풍선 위치 설정
  bubble.style.position = "absolute";
  bubble.style.left = `${ball.position.x - 30}px`;
  bubble.style.top = `${ball.position.y - 160}px`;

  document.body.appendChild(bubble);

  // 1초 후 말풍선 제거
  setTimeout(() => {
    bubble.remove();
  }, 1000);
}

// 말풍선 스타일 추가
export function addBubbleStyle() {
  const style = document.createElement("style");
  style.innerHTML = `
      .speech-bubble {
        position: absolute;
        font-family: "LeeSeoyun";
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 32px;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
    `;
  document.head.appendChild(style);
}
