import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CityDetail from "./pages/CityDetail";
import SplashScreen from "./pages/SplashScreen";
import { ConfigProvider } from "./contexts/configProvider";
import { useQuery } from "@tanstack/react-query";
import { getTimezones } from "./api/timeApi";

export default function App() {
  
  // API'den timezone verisini al
  const { isLoading } = useQuery({
    queryKey: ["timezones"],
    queryFn: getTimezones,
    staleTime: Infinity, // Tek sefer çek, sürekli fetch etmesin
  });

  // SplashScreen veri yüklenene kadar gösterilsin
  if (isLoading) { return <SplashScreen />;}

  return (
    <ConfigProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:zone" element={<CityDetail />} />
      </Routes>
    </ConfigProvider>
  );
}
