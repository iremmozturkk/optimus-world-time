/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const bannerStyle = css`
  background: #ffefef;
  color: #900;
  border: 1px solid #e00;
  border-radius: 8px;
  padding: 16px;
  margin: 20px auto;
  max-width: 420px;
  text-align: center;
  font-size: 15px;
`;

const errorDetail = css`
  font-size: 13px;
  color: #600;
  margin-top: 6px;
  background: #fff5f5;
  padding: 8px;
  border-radius: 6px;
  white-space: pre-wrap;
`;

const retryBtn = css`
  margin-top: 10px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: #b00;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: #d00;
  }
`;

export type ErrorBannerProps = {
  type?: "network" | "api" | "unknown";
  message?: string;
  error?: unknown;
  onRetry?: () => void;
};

const messages = {
  network: "🌐 Ağ veya DNS hatası",
  api: "⚠️ API isteği başarısız oldu",
  unknown: "❗ Beklenmeyen bir hata oluştu"
};

const ErrorBanner: React.FC<ErrorBannerProps> = ({ type = "unknown", message, error, onRetry }) => {
  const errorMsg =
    error instanceof Error
      ? error.message
      : typeof error === "string"
      ? error
      : JSON.stringify(error, null, 2);

  const isDNSIssue =
    errorMsg?.toLowerCase().includes("failed to fetch") ||
    errorMsg?.toLowerCase().includes("err_name_not_resolved");

  return (
    <div css={bannerStyle}>
      <h3>{isDNSIssue ? "🌐 DNS / Ağ Bağlantı Hatası" : messages[type]}</h3>
      {message && <p>{message}</p>}
      {errorMsg && <pre css={errorDetail}>{errorMsg}</pre>}
      {onRetry && <button css={retryBtn} onClick={onRetry}>🔄 Tekrar Dene</button>}
    </div>
  );
};

export default ErrorBanner;
