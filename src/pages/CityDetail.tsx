/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import searchIcon from "../assets/search_icon.png";
import arrowDark from "../assets/arrow_background_dark.png";
import arrowLight from "../assets/arrow_background_light.png";
import headerDark from "../assets/header_dark.png";
import headerLight from "../assets/header_light.png";

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
  background: url(${theme === "dark" ? headerDark : headerLight});
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

export const searchStyle = css`
  width: 90%;
  margin: 16px 0;
  padding: 8px 8px 8px 36px;
  border-radius: 16px;
  border: 1px solid #ccc;
  background-color: #fff;
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 16px;
`;

export const arrowWrapper = (theme: string) => css`
  background: url(${theme === "dark" ? arrowDark : arrowLight}) no-repeat center/cover;
  /* diğer stiller */
`;
