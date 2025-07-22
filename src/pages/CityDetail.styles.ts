/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const container = (theme: string) => css`
  padding: 16px;
  max-width: 500px;
  margin: 0 auto;
  font-family: 'Montserrat', sans-serif;
  color: ${theme === "dark" ? "white" : "black"};
  background-color: ${theme === "dark" ? "#002359" : "#ffffffff"};
  min-height: 100vh;
  text-align: center;
`;

export const header = (theme: string) => css`
  background: url('/src/assets/${
    theme === "dark" ? "header_dark.png" : "header_light.png"
  }');
  background-size: cover;
  background-position: center;
  color: ${theme === "dark" ? "white" : "black"};
  padding: 40px 16px 32px 16px;
  text-align: center;
  position: relative;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  margin: -16px -16px 16px -16px;

  h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 800;
  }
`;

export const backBtn = css`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: inherit;
  font-size: 30px;
  cursor: pointer;
`;

export const timeWrapper = css`
  margin: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const timeBox = (theme: string) => css`
  width: 200px;
  height: 250px;
  border: 2px solid ${theme === "dark" ? "#293A89" : "#000"};
  background-color: ${theme === "dark" ? "#293A89" : "#fff"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  font-weight: bold;
  border-radius: 8px;
  color: ${theme === "dark" ? "#fff" : "#000"};
`;



export const colon = css`
  font-size: 100px;
  font-weight: bold;
`;

export const infoWrapper = css`
  h3 {
    margin: 20px 0 4px 0;
    font-size: 30px;
    font-weight: 500;
  }

  p {
    margin: 10px 0;
  }
`;
