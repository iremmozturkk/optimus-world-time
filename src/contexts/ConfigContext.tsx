import { createContext, useContext, useState, useEffect } from "react";

//Tema türleri
type Theme = "light" | "dark";

//Config yapısı
type Config = {
  timezone: string;
  theme: Theme;
  is24Hour: boolean;
  dateFormat: string;
};

//Varsayılan Config 
const defaultConfig: Config = {
  timezone: "Europe/Istanbul",
  theme: "dark",
  is24Hour: true,
  dateFormat: "DD/MM/YYYY",
};

const mergedConfig: Config = defaultConfig;

const ConfigContext = createContext<{
  config: Config;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  theme: Theme;
}>( {
  config: mergedConfig,
  setTheme: () => {},
  toggleTheme: () => {},
  theme: mergedConfig.theme,
});

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
 
  const [config, setConfig] = useState<Config>(mergedConfig);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setConfig((prev) => ({ ...prev, theme: savedTheme }));
    }
  }, []);

  const setTheme = (theme: Theme) => {
    localStorage.setItem("theme", theme);
    setConfig((prev) => ({ ...prev, theme }));
  };

  const toggleTheme = () => {
    const newTheme = config.theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <ConfigContext.Provider
      value={{
        config,
        setTheme,
        toggleTheme,
        theme: config.theme,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
