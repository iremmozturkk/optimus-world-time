import { css } from "@emotion/react";

export const container = (theme: string) => css`
  padding: 2%;
  max-width: 100%;
  margin: 0 auto;
  font-family: 'Montserrat', sans-serif;
  color: ${theme === "dark" ? "white" : "black"};
  background-color: ${theme === "dark" ? "#002359" : "#f5f5f5"};
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 4%;
  }
`;

export const header = (theme: string) => css`
  background: url('/src/assets/${theme === "dark" ? "header_dark.png" : "header_light.png"}');
  background-size: cover;
  background-position: center;
  color: ${theme === "dark" ? "white" : "black"};
  padding: 5% 3%;
  text-align: left;
  position: relative;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin: -16px -16px 16px -16px;

  h2 {
    font-size: clamp(18px, 5vw, 28px);
  }
`;

export const toggleBtn = css`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: clamp(30px, 8vw, 40px);
  height: clamp(30px, 8vw, 40px);
  border-radius: 50%;
  background-color: #ffffffff;
  box-shadow: 0 0 4px #00000033;
  border: none;
  cursor: pointer;
`;

export const searchStyle = css`
  width: 90%;
  margin: 16px auto;
  padding: 8px 8px 8px 36px;
  border-radius: 16px;
  border: 1px solid #ccc;
  background-color: #fff;
  background-image: url('/src/assets/search_icon.png');
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 16px;

  @media (max-width: 500px) {
    width: 95%;
  }
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
  width: 90%;
  min-height: 60px;
  overflow: visible; 
  font-size: clamp(14px, 3vw, 18px);

  &:hover {
    background-color: ${theme === "dark" ? "#293A89" : "#D4DEF1"};
  }
`;

export const arrowWrapper = (theme: string) => css`
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
  width: clamp(30px, 6vw, 40px);
  height: clamp(30px, 6vw, 40px);
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
  width: clamp(35px, 7vw, 50px);
  height: clamp(35px, 7vw, 50px);
  background: url('/src/assets/${
    theme === "dark" ? "arrow_background.png" : "arrow_background_light.png"
  }') no-repeat center/cover;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const arrowIcon = css`
  width: clamp(15px, 4vw, 25px);
  height: clamp(15px, 4vw, 25px);
`;

export const clockText = css`
  font-size: clamp(1.5rem, 2vw, 2.2rem);
  font-weight: bold;
`;


export const paginationContainer = css`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

export const paginationBtn = (active: boolean) => css`
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: ${active ? "#4a90e2" : "#fff"};
  color: ${active ? "#fff" : "#333"};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${active ? "#357abd" : "#f5f5f5"};
  }
`;

