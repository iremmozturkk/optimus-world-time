/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

// 🔹 Logo yukarı-aşağı hareket animasyonu
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0); }
`;

const splashStyle = css`
  background-color: #293a89;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 🔹 Logo stiline animasyon eklendi
const logoStyle = css`
  width: 200px;
  animation: ${float} 2.5s ease-in-out infinite;
`;

export default function SplashScreen() {
  return (
    <div css={splashStyle}>
      <img
        css={logoStyle}
        src="/src/assets/optimus_yazılım.png"
        alt="Optimus Yazılım"
      />
    </div>
  );
}
