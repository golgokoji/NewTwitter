"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { LogOut, User as UserIcon, Sun, Moon } from "lucide-react";

export const Header = () => {
  const { user, loading, signInWithGoogle, logout } = useAuth();
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-color)] bg-[var(--bg)]/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-2xl">
        <h1 className="text-xl font-bold font-sans tracking-tight text-[var(--text)] cursor-pointer">
          NewTwitter
        </h1>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 text-[var(--text)] hover:bg-[var(--border-color)] rounded-full transition-colors"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          )}

          {!loading && (
            user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-8 h-8 rounded-full border border-[var(--border-color)]"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-[var(--text)]" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-[var(--text)] hidden sm:block">
                    {user.displayName}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 dark:bg-blue-600 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                Sign in
              </button>
            )
          )}
        </div>
      </div>
    </header>
  );
};
