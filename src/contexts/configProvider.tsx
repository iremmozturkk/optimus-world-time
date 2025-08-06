import { useState, useEffect, useMemo } from "react";
import type { Config, Theme } from "../config/configDefaults";
import { defaultConfig } from "../config/configDefaults";
import { ConfigContext } from "./configContext";

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<Config>(defaultConfig);

  // Sayfa ilk kez yüklendiğinde localStorage'dan tema bilgisi okunur
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) setConfig(prev => ({ ...prev, theme: savedTheme }));
  }, []);

  // Tema değiştirme fonksiyonu
  const setTheme = (theme: Theme) => {
    localStorage.setItem("theme", theme);
    setConfig(prev => ({ ...prev, theme }));
  };

  // Light/Dark arasında geçiş
  const toggleTheme = () => {
    const newTheme = config.theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Provider value'yu useMemo ile memoize ediyoruz
  const providerValue = useMemo(
    () => ({
      config,
      setTheme,
      toggleTheme,
      theme: config.theme,
    }),
    [config] // config değiştiğinde value yeniden hesaplanır
  );

  return (
    <ConfigContext.Provider value={providerValue}>
      {children}
    </ConfigContext.Provider>
  );
};
