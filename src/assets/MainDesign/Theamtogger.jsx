import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
        >
            {theme === "light" ? (
                <span role="img" aria-label="Dark Mode">
                    🌙
                </span>
            ) : (
                <span role="img" aria-label="Light Mode">
                    ☀️
                </span>
            )}
        </button>
    );
};

export default ThemeToggle;
