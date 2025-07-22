/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const splashStyle = css`
  background-color: #293a89;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function SplashScreen() {
  return (
    <div css={splashStyle}>
      <img
        src="/src/assets/optimus_yazılım.png"
        alt="Optimus Yazılım"
        style={{ width: "200px" }}
      />
    </div>
  );
}
