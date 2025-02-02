import type { Config } from "tailwindcss";
// import flowbite from "flowbite-react/tailwind";
// const flowbite = require("flowbite-react/tailwind");

// eslint-disable-next-line @typescript-eslint/no-require-imports
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",

    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("flowbite/plugin")],
} satisfies Config;
