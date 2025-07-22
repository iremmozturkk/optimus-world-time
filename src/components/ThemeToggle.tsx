import { useConfig } from "../contexts/ConfigContext";

const ThemeToggle = () => {
  const { config, setTheme } = useConfig();

  const toggle = () => {
    const next = config.theme === "light" ? "dark" : "light";
    setTheme(next);
  };

  return <button onClick={toggle}>Switch to {config.theme === "light" ? "dark" : "light"} theme</button>;
};

export default ThemeToggle;
