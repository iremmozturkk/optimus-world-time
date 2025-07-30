/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useConfig } from "../hooks/useConfig";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import * as styles from "../styles/Home.styles";
import ErrorBanner from "../components/ErrorBanner";
import SplashScreen from "../pages/SplashScreen";
import { getTimezones, getTime } from "../api/timeApi";

dayjs.locale("tr");

const ITEMS_PER_PAGE = 20;

const getGreeting = (hour: number) => {
  if (hour >= 6 && hour < 12) return "Günaydın";
  if (hour >= 12 && hour < 18) return "İyi günler";
  if (hour >= 18 && hour < 24) return "İyi akşamlar";
  return "İyi geceler";
};

const paginateData = (data: string[], currentPage: number, itemsPerPage: number) => {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return data.slice(start, end);
};

export default function Home() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useConfig();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timezones, setTimezones] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState<any>(null);

  // API çağrıları manuel yapılıyor
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tz = await getTimezones(); // ❌ DNS hatasında throw edecek
        const ct = await getTime("Europe/Istanbul");
        setTimezones(tz);
        setCurrentTime(ct);
      } catch (err: any) {
        setError(err.message || "Bilinmeyen bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // İnternet offline
  if (!navigator.onLine) {
    return (
      <ErrorBanner
        type="network"
        message="İnternet bağlantınız yok. Bağlantınızı kontrol edin."
        onRetry={() => window.location.reload()}
      />
    );
  }

  // Hata varsa ErrorBanner’ı ZORLA göster
  if (error) {
    const isDNS = error.toLowerCase().includes("dns") || error.toLowerCase().includes("failed to fetch") || error.toLowerCase().includes("err_name_not_resolved");
    return (
      <ErrorBanner
        type={isDNS ? "network" : "api"}
        message={isDNS ? "🌐 DNS / Ağ bağlantısı hatası algılandı." : "⚠️ API isteği başarısız oldu."}
        error={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  // Yükleniyor
  if (loading) return <SplashScreen />;

  // Veri yoksa
  if (!timezones.length || !currentTime) {
    return (
      <ErrorBanner
        type="unknown"
        message="Veri alınamadı."
        onRetry={() => window.location.reload()}
      />
    );
  }

  // Normal UI
  const dateObj = dayjs(`${currentTime.year}-${currentTime.month}-${currentTime.day}`);
  const formattedDate = dateObj.format("D MMMM, dddd");
  const greeting = getGreeting(currentTime.hour);
  const iconPath = theme === "light" ? "/src/assets/moon.png" : "/src/assets/sunny.png";

  const filteredZones = timezones.filter((zone) =>
    zone.toLowerCase().includes(search.toLowerCase())
  );
  const currentZones = paginateData(filteredZones, currentPage, ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredZones.length / ITEMS_PER_PAGE);

  return (
    <div css={styles.container(theme)}>
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

      <input
        css={styles.searchStyle}
        type="text"
        placeholder="Arama"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      <div>
        {currentZones.map((zone) => (
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

      <div css={styles.paginationContainer}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        css={styles.paginationBtn(currentPage === i + 1)}
        >
         {i + 1}
        </button>

        ))}
      </div>
    </div>
  );
}
