import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="fixed top-5 right-4 z-50">
      <motion.button
        onClick={toggleTheme}
        className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg
                   transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={false}
        animate={{
          rotate: theme === "dark" ? 0 : 360,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <motion.div
          initial={false}
          animate={{
            scale: theme === "dark" ? 1 : 0,
            opacity: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <Sun className="w-6 h-6 text-yellow-500" />
        </motion.div>
        <motion.div
          className="absolute"
          initial={false}
          animate={{
            scale: theme === "light" ? 1 : 0,
            opacity: theme === "light" ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <Moon className="w-6 h-6 text-blue-500" />
        </motion.div>
      </motion.button>
    </div>
  );
}
