
import { useConfig } from "../hooks/useConfig";

// ThemeToggle adında fonksiyonel bir bileşen tanımladım
const ThemeToggle = () => {
  // useConfig hook'u ile mevcut config ve setTheme fonksiyonunu aldım
  const { config, setTheme } = useConfig();


  
  // console.log("🔄 ThemeToggle rendered");  optimizasyon gerekli mi diye kontrol


  // Tema değiştirmek için bir fonksiyon tanımladım
  const toggle = () => {
    // Mevcut tema light ise dark yap, değilse light yap
    const next = config.theme === "light" ? "dark" : "light";
    // Yeni temayı güncelle
    setTheme(next);
  };

  return (
    <button onClick={toggle}>
      Switch to {config.theme === "light" ? "dark" : "light"} theme 
    </button>
  );
};


export default ThemeToggle;
