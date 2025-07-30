import { useEffect, useState } from "react";
import { getTimezones, getTime } from "../api/timeApi";

export const useFetchWorldTime = () => {
  const [timezones, setTimezones] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tz = await getTimezones();
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

  return { timezones, currentTime, loading, error };
};
