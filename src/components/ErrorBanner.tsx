/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const bannerStyle = css`
  background-color: #ffdddd;
  color: #900;
  border: 1px solid #f00;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  margin: 20px auto;
  max-width: 400px;
  font-size: 16px;
`;

type ErrorBannerProps = {
  message: string;
};

const ErrorBanner = ({ message }: ErrorBannerProps) => {
  return <div css={bannerStyle}>❌ {message}</div>;
};

export default ErrorBanner;
