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
  word-break: break-word;
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
  unknown: "❗ Beklenmeyen bir hata oluştu",
};

const ErrorBanner: React.FC<ErrorBannerProps> = ({
  type = "unknown",
  message,
  error,
  onRetry,
}) => {
  // ✅ Hata mesajını her durumda string’e çeviriyoruz
  const errorMsg =
    error instanceof Error
      ? error.message
      : typeof error === "string"
      ? error
      : error
      ? JSON.stringify(error, null, 2)
      : "Bilinmeyen bir hata oluştu";

  // ✅ DNS / ağ hatasını algılama
  const isDNSIssue =
    errorMsg.toLowerCase().includes("failed to fetch") ||
    errorMsg.toLowerCase().includes("err_name_not_resolved");

  return (
    <div css={bannerStyle}>
      {/* Başlık */}
      <h3>{isDNSIssue ? "🌐 DNS / Ağ Bağlantı Hatası" : messages[type]}</h3>

      {/* Açıklama */}
      <p>{message || "Bir sorun oluştu. Lütfen tekrar deneyin."}</p>

      {/* Hata Detayları */}
      <pre css={errorDetail}>{errorMsg}</pre>

      {/* Retry Butonu */}
      {onRetry && (
        <button css={retryBtn} onClick={onRetry}>
          🔄 Tekrar Dene
        </button>
      )}
    </div>
  );
};

export default ErrorBanner;
