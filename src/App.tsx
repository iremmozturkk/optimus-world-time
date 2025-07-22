import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CityDetail from "./pages/CityDetail";
import { ConfigProvider } from "./contexts/ConfigContext";
import SplashScreen from "./pages/SplashScreen";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTimezones } from "./api/timeApi";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const { isLoading: tzLoading } = useQuery({
    queryKey: ["timezones"],
    queryFn: getTimezones,
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000); // 300ms hızlı açılır
    return () => clearTimeout(timer);
  }, []);

  const stillLoading = showSplash || tzLoading;

  return (
    <ConfigProvider>
      {stillLoading ? (
        <SplashScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city/:zone" element={<CityDetail />} />
        </Routes>
      )}
    </ConfigProvider>
  );
}
