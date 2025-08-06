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
  const { zone } = useParams<{ zone?: string }>();
  const navigate = useNavigate();
  const { theme } = useConfig();

if (!zone) {
  return(
    <ErrorBanner 
    type="api"
    message="Geçersiz şehir parametresi" 
    onRetry={() => navigate(-1)} />
    )
  }
    const { currentTime: cityTime, loading, refetch } = useFetchWorldTime(zone);

    if (loading) return <SplashScreen />;
    
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


const formatTimeUnit = (unit: number) => unit.toString().padStart(2, "0");

const parseZone = (zone?: string) => {
  const [country, city] = (zone || "Unknown/Unknown").split("/");
  return { country, city };
};

const formatDate = (year: number, month: number, day: number) =>
  dayjs(`${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`);


const { country, city } = parseZone(zone);

const dateObj = formatDate(cityTime.year, cityTime.month, cityTime.day);
const dayOfWeek = dateObj.format("dddd");
const formattedDate = cityTime.date || dateObj.format("YYYY-MM-DD");
const utcOffset = dayjs().format("Z");


return (
  <div css={styles.container(theme)}>

    {/* Header */}
    <div css={styles.header(theme)}>
      <button onClick={() => navigate(-1)} css={styles.backBtn}>←</button>
      <h2>WORLD TIME</h2>
    </div>

    {/* Saat Gösterimi */}
    <div css={styles.timeWrapper}>
      <div css={styles.timeBox(theme)}>{formatTimeUnit(cityTime.hour)}</div>
      <div css={styles.colon}>:</div>
      <div css={styles.timeBox(theme)}>{formatTimeUnit(cityTime.minute)}</div>
    </div>

    {/* Şehir Bilgileri */}
    <div css={styles.infoWrapper}>
      <h3>{city}</h3>
      <p>{country}</p>
      <p>{dayOfWeek}, GMT {utcOffset}</p>
      <p>{formattedDate}</p>
    </div>
  </div>
)};
