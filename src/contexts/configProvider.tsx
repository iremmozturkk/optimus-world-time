/* eslint-disable react-refresh/only-export-components */

import { useContext, useState, useEffect } from "react";
import type { Config, Theme } from "../config/configDefaults";
import { defaultConfig } from "../config/configDefaults";
import { ConfigContext } from "./configContext";

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<Config>(defaultConfig);

  // 🔹 Uygulama yüklendiğinde localStorage'daki tema ayarı okunur
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setConfig(prev => ({ ...prev, theme: savedTheme }));
    }
  }, []);

  // 🔹 Temayı manuel olarak değiştiren fonksiyon
  const setTheme = (theme: Theme) => {
    localStorage.setItem("theme", theme);
    setConfig(prev => ({ ...prev, theme }));
  };

  // 🔹 Light/Dark geçişi yapan fonksiyon
  const toggleTheme = () => {
    const newTheme = config.theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <ConfigContext.Provider value={{ config, setTheme, toggleTheme, theme: config.theme }}>
      {children}
    </ConfigContext.Provider>
  );
};

// 🔹 Context verisini kolayca almak için custom hook
export const useConfig = () => useContext(ConfigContext);
