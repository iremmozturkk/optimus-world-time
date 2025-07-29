import { useState, useEffect } from "react";
import type { Config, Theme } from "../config/configDefaults";
import { defaultConfig } from "../config/configDefaults";
import { ConfigContext } from "./configContext";

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<Config>(defaultConfig);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) setConfig(prev => ({ ...prev, theme: savedTheme }));
  }, []);

  const setTheme = (theme: Theme) => {
    localStorage.setItem("theme", theme);
    setConfig(prev => ({ ...prev, theme }));
  };

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
