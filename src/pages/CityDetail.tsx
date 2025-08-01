/** @jsxImportSource @emotion/react */
import { useParams, useNavigate } from "react-router-dom";
import { useConfig } from "../hooks/useConfig";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import * as styles from "../styles/CityDetail.styles";
import ErrorBanner from "../components/ErrorBanner";
import SplashScreen from "../pages/SplashScreen";
import { useFetchWorldTime } from "../hooks/useFetchWorldTime";

dayjs.locale("tr");

export default function CityDetail() {
  const { zone } = useParams<{ zone: string }>();
  const navigate = useNavigate();
  const { theme } = useConfig();

  // CityTime verisi custom hook ile
  const { currentTime: cityTime, loading, error, refetch } = useFetchWorldTime(zone);

  //  Yüklenme durumu
  if (loading) return <SplashScreen />;

  //  Hata durumu
  if (error) {
    return (
      <ErrorBanner
        type="api"
        message="⚠️ API isteği başarısız oldu."
        error={error}
        onRetry={refetch}
      />
    );
  }

  //  Veri yoksa
  if (!cityTime) {
    return (
      <ErrorBanner
        type="unknown"
        message="Veri bulunamadı."
        onRetry={refetch}
      />
    );
  }

  //  Tarih Formatlama
  const dateObj = dayjs(`${cityTime.year}-${String(cityTime.month).padStart(2, "0")}-${String(cityTime.day).padStart(2, "0")}`);
  const dayOfWeek = dateObj.format("dddd");
  const utcOffset = dayjs().format("Z");

  //  Zone güvenli parçalama
  const [countryName, cityName] = (zone || "Unknown/Unknown").split("/");

  return (
    <div css={styles.container(theme)}>
      {/* Header */}
      <div css={styles.header(theme)}>
        <button onClick={() => navigate(-1)} css={styles.backBtn}>←</button>
        <h2>WORLD TIME</h2>
      </div>

      {/* Saat Gösterimi */}
      <div css={styles.timeWrapper}>
        <div css={styles.timeBox(theme)}>{String(cityTime.hour).padStart(2, "0")}</div>
        <div css={styles.colon}>:</div>
        <div css={styles.timeBox(theme)}>{String(cityTime.minute).padStart(2, "0")}</div>
      </div>

      {/* Şehir Bilgileri */}
      <div css={styles.infoWrapper}>
        <h3>{cityName}</h3>
        <p>{countryName}</p>
        <p>{dayOfWeek}, GMT {utcOffset}</p>
        <p>{cityTime.date || dateObj.format("YYYY-MM-DD")}</p>
      </div>
    </div>
  );
}
