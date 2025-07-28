/** @jsxImportSource @emotion/react */
import { useQuery } from "@tanstack/react-query";
import { getTimezones, getTime } from "../api/timeApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useConfig } from "../contexts/ConfigContext";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import * as styles from "../styles/Home.styles";

dayjs.locale("tr");

export default function Home() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useConfig();
  const [search, setSearch] = useState("");

  const { data: timezones } = useQuery({ queryKey: ["timezones"], queryFn: getTimezones });
  const { data: currentTime } = useQuery({
    queryKey: ["time", "Europe/Istanbul"],
    queryFn: () => getTime("Europe/Istanbul"),
    refetchInterval: 1000,
  });

  if (!timezones || !currentTime) return null;

  const filteredZones = timezones.filter((zone: string) =>
    zone.toLowerCase().includes(search.toLowerCase())
  );

  const hour = currentTime.hour;
  const dateObj = dayjs(`${currentTime.year}-${currentTime.month}-${currentTime.day}`);
  const formattedDate = dateObj.format("D MMMM, dddd");

  let greeting = "Merhaba";

  if (hour >= 6 && hour < 12) {
    greeting = "Günaydın";
  } else if (hour >= 12 && hour < 18) {
    greeting = "İyi günler";
  } else if (hour >= 18 && hour < 24) {
    greeting = "İyi akşamlar";
  } else {
    greeting = "İyi geceler";
  }

  const iconPath = theme === "light" ? "/src/assets/moon.png" : "/src/assets/sunny.png";

  return (
    <div css={styles.container(theme)}>
      <div css={styles.header(theme)}>
        <button css={styles.toggleBtn} onClick={toggleTheme}>
          <img src={iconPath} alt="theme" width={20} />
        </button>

        <div>{greeting}!</div>

        <div css={{ fontSize: "32px", fontWeight: "bold", margin: "8px 0" }}>
          {String(currentTime.hour).padStart(2, "0")}:
          {String(currentTime.minute).padStart(2, "0")}
        </div>

        <div>{formattedDate}</div>
      </div>

      <input
        css={styles.searchStyle}
        type="text"
        placeholder="Arama"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        {filteredZones.map((zone: string) => (
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
    </div>
  );
}
