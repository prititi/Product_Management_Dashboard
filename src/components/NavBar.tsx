"use client";

import { Navbar } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import { useState } from "react";

export function Demo() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle theme between dark and light
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <Navbar fluid rounded className="bg-white border border-gray-200 dark:bg-gray-900 p-4 w-full mt-6">
      <div className="w-full flex flex-col md:flex-row md:justify-between md:gap-10 p-2">
        {/* Brand Logo */}
        <Navbar.Brand className="flex items-center gap-2">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="text-xl font-semibold dark:text-white">Product Dashboard</span>
        </Navbar.Brand>

        {/* Search Bar - Always Visible, Moves Below Navbar on Mobile */}
        <div className="w-full md:w-auto mt-2 md:mt-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <HiSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
          
        </div>

      </div>
    </Navbar>
  );
}
