import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CityDetail from "./pages/CityDetail";
import { ConfigProvider } from "./contexts/configProvider";
import SplashScreen from "./pages/SplashScreen";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTimezones } from "./api/timeApi";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const { isLoading } = useQuery({
    queryKey: ["timezones"],
    queryFn: getTimezones,
    select: (res)=>  res[0],
    staleTime: Infinity
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1000); 
    return () => clearTimeout(timer);
  }, []);

  const stillLoading = showSplash || isLoading; //Veri yüklenene kadar splashScreen kalsın

  return (
    <ConfigProvider>
      {stillLoading ? (
        <SplashScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city/:zone" element={<CityDetail />} />
          <Route path="*" element={<div>404 - Sayfa Bulunamadı</div>} />
        </Routes>
      )}
    </ConfigProvider>
  );
}
