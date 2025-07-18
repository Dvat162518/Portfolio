// src/hooks/useTheme.ts
import { useState, useEffect } from "react";

const useTheme = () => {
    const [theme, setTheme] = useState<"dark" | "light">(
        () => localStorage.getItem("theme") === "light" ? "light" : "dark" //Use a function here and avoid errors from re renders
    );

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]); // Ensure `theme` is a dependency

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return { theme, toggleTheme };
};

export default useTheme;