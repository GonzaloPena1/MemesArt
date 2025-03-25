import { useTheme } from "../contexts/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa"; // Import icons

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      {theme === "light" ? <FaMoon size={17} /> : <FaSun size={17} />}
    </button>
  );
};

export default ThemeToggle;