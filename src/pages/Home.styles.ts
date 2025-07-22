/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const container = (theme: string) => css`
  padding: 16px;
  max-width: 500px;
  margin: 0 auto;
  font-family: 'Montserrat', sans-serif;
  color: ${theme === "dark" ? "white" : "black"};
  background-color: ${theme === "dark" ? "#002359" : "#f5f5f5"};
  min-height: 100vh;
`;

export const header = (theme: string) => css`
  background: url('/src/assets/${theme === "dark" ? "header_dark.png" : "header_light.png"}');
  background-size: cover;
  background-position: center;
  color: ${theme === "dark" ? "white" : "black"};
  padding: 40px 16px 32px 16px;
  text-align: left;
  position: relative;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  margin: -16px -16px 16px -16px;
`;

export const toggleBtn = css`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffffff;
  box-shadow: 0 0 4px #00000033;
  border: none;
  cursor: pointer;
`;

export const searchStyle = css`
  width: 90%;
  margin: 16px 0;
  padding: 8px 8px 8px 36px;
  border-radius: 16px;
  border: 1px solid #ccc;
  background-color: #fff;
  background-image: url('/src/assets/search_icon.png');
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 16px;
`;

export const listItemStyle = (theme: string) => css`
  position: relative;
  background-color: ${theme === "dark" ? "#293A89" : "#fff"};
  margin: 12px auto;
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: calc(90% - 40px);
  min-height: 60px;
  overflow: visible; 
  &:hover {
    background-color: ${theme === "dark" ? "#293A89" : "#D4DEF1"};
  }
`;

export const arrowWrapper = (theme: string) => css`
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: url('/src/assets/${
    theme === "dark" ? "arrow_background_dark.png" : "arrow_background_light.png"
  }') no-repeat center/cover;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const arrowCircle = (theme: string) => css`
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: url('/src/assets/${
    theme === "dark" ? "arrow_background.png" : "arrow_background_light.png"
  }') no-repeat center/cover;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const arrowIcon = css`
  width: 25px;
  height: 25px;
`;
