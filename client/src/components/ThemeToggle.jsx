import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      {theme === "light" ? "🌙 Switch to Dark Mode" : "☀️ Switch to Light Mode"}
    </button>
  );
};

export default ThemeToggle;