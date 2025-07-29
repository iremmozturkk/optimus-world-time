import { createContext } from "react";
import type { Config, Theme } from "../config/configDefaults";
import { defaultConfig } from "../config/configDefaults";

export const ConfigContext = createContext<{
  config: Config;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  theme: Theme;
}>({
  config: defaultConfig,  
  setTheme: () => {},       
  toggleTheme: () => {},
  theme: defaultConfig.theme,
});
