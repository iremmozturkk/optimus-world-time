/** @jsxImportSource @emotion/react */
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTime } from "../api/timeApi";
import { useConfig } from "../hooks/useConfig";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import * as styles from "../styles/CityDetail.styles";
import ErrorBanner from "../components/ErrorBanner";
import SplashScreen from "../pages/SplashScreen";

import { useNetworkStatus } from "../hooks/useNetworkStatus";
dayjs.locale("tr");



export default function CityDetail() {
  const { zone } = useParams<{ zone: string }>();
  const navigate = useNavigate();
  const { theme } = useConfig();

const isOnline = useNetworkStatus();
if (!isOnline) {
  return <ErrorBanner type="network" message="İnternet bağlantınız kesildi." onRetry={() => window.location.reload()} />;
}
  // ✅ API Çağrısı
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cityTime", zone],
    queryFn: () => getTime(zone || ""),
    refetchInterval: 1000,
  });

  // ✅ Hata & Yüklenme Kontrolleri
  if (isLoading) return <SplashScreen />;
  if (isError) return <ErrorBanner type="api" error={error} onRetry={() => window.location.reload()} />;
  if (!data) return <ErrorBanner type="unknown" message="Veri bulunamadı." />;

  const dateObj = dayjs(`${data.year}-${data.month}-${data.day}`);
  const dayOfWeek = dateObj.format("dddd");
  const utcOffset = dayjs().format("Z");

  return (
    <div css={styles.container(theme)}>
      <div css={styles.header(theme)}>
        <button onClick={() => navigate(-1)} css={styles.backBtn}>←</button>
        <h2>WORLD TIME</h2>
      </div>

      <div css={styles.timeWrapper}>
        <div css={styles.timeBox(theme)}>{String(data.hour).padStart(2, "0")}</div>
        <div css={styles.colon}>:</div>
        <div css={styles.timeBox(theme)}>{String(data.minute).padStart(2, "0")}</div>
      </div>

      <div css={styles.infoWrapper}>
        <h3>{zone?.split("/")[1]}</h3>
        <p>{zone?.split("/")[0]}</p>
        <p>{dayOfWeek}, GMT {utcOffset}</p>
        <p>{data.date}</p>
      </div>
    </div>
  );
}
