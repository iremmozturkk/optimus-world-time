/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useConfig } from "../hooks/useConfig";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import * as styles from "../styles/Home.styles";
import ErrorBanner from "../components/ErrorBanner";
import SplashScreen from "../pages/SplashScreen";
import { usePagination } from "../hooks/usePagination";
import { useFetchWorldTime } from "../hooks/useFetchWorldTime";

dayjs.locale("tr");

const ITEMS_PER_PAGE = 20;

const getGreeting = (hour: number) => {
  if (hour >= 6 && hour < 12) return "Günaydın";
  if (hour >= 12 && hour < 18) return "İyi günler";
  if (hour >= 18 && hour < 24) return "İyi akşamlar";
  return "İyi geceler";
};

export default function Home() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useConfig();
  const [search, setSearch] = useState("");

  // API verisi
  const { timezones, currentTime, loading, error } = useFetchWorldTime();

  //  Her zaman koşulsuz filteredZones hesapla
  const filteredZones = useMemo(() => 
    timezones.filter((zone) => zone.toLowerCase().includes(search.toLowerCase())),
    [timezones, search]
  );

  //  usePagination her zaman koşulsuz çağrılır
  const { currentPage, goToPage, paginatedData, totalPages } = usePagination(
    ITEMS_PER_PAGE,
    filteredZones
  );

  //  Offline kontrolü
  if (!navigator.onLine) {
    return <ErrorBanner type="network" message="İnternet bağlantınız yok." onRetry={() => window.location.reload()} />;
  }

  //  Yüklenme & Hata kontrolleri
  if (loading) return <SplashScreen />;
  if (error) return <ErrorBanner type="api" message={error} onRetry={() => window.location.reload()} />;
  if (!timezones.length || !currentTime) return <ErrorBanner type="unknown" message="Veri alınamadı." />;

  //  Tarih ve saat formatlama
  const dateObj = dayjs(`${currentTime.year}-${currentTime.month}-${currentTime.day}`);
  const formattedDate = dateObj.format("D MMMM, dddd");
  const greeting = getGreeting(currentTime.hour);
  const iconPath = theme === "light" ? "/src/assets/moon.png" : "/src/assets/sunny.png";

  return (
    <div css={styles.container(theme)}>
      {/* Header */}
      <div css={styles.header(theme)}>
        <button css={styles.toggleBtn} onClick={toggleTheme}>
          <img src={iconPath} alt="theme" width={20} />
        </button>
        <div>{greeting}!</div>
        <div css={styles.clockText}>
          {String(currentTime.hour).padStart(2, "0")}:{String(currentTime.minute).padStart(2, "0")}
        </div>
        <div>{formattedDate}</div>
      </div>

      {/* Arama Kutusu */}
      <input
        css={styles.searchStyle}
        type="text"
        placeholder="Arama"
        name="timezoneSearch"
        id="timezoneSearch"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          goToPage(1);
        }}
      />

      {/* Liste */}
      <div>
        {paginatedData.map((zone) => (
          <div
            key={zone}
            css={styles.listItemStyle(theme)}
            onClick={() => navigate(`/city/${encodeURIComponent(zone)}`)}
          >
            <span>{zone}</span>
            <div css={styles.arrowCircle(theme)}>
              <img src="/src/assets/arrow.png" alt="arrow" css={styles.arrowIcon} />
            </div>
          </div>
        ))}
      </div>

      {/* Sayfa Geçişleri */}
      <div>
        <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>Önceki</button>
        <span> Sayfa {currentPage} / {totalPages} </span>
        <button disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>Sonraki</button>
      </div>
    </div>
  );
}
