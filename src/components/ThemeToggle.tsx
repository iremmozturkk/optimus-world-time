
import { useConfig } from "../contexts/ConfigContext";

// ThemeToggle adında fonksiyonel bir bileşen tanımla
const ThemeToggle = () => {
  // useConfig hook'u ile mevcut config ve setTheme fonksiyonunu al
  const { config, setTheme } = useConfig();

  // Tema değiştirmek için bir fonksiyon tanımla
  const toggle = () => {
    // Mevcut tema light ise dark yap, değilse light yap
    const next = config.theme === "light" ? "dark" : "light";
    // Yeni temayı güncelle
    setTheme(next);
  };

  // JSX: Buton döndür, tıklanınca toggle fonksiyonunu çağır
  return (
    <button onClick={toggle}>
      Switch to {config.theme === "light" ? "dark" : "light"} theme 
    </button>
  );
};

// Bileşeni dışa aktarılır
export default ThemeToggle;
