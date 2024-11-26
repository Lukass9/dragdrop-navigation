import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kolory obramowania
        border: {
          primary: "#D0D5DD",
          secondary: "#EAECF0",
        },

        // Kolory tła
        background: {
          primary: "#FFFFFF",
          secondary: "#F9FAFB",
        },

        // Kolory tekstu
        text: {
          primary: {
            900: "#101828",
          },
          secondary: {
            700: "#344054",
          },
          tertiary: {
            600: "#475467",
          },
          placeholder: "#667085",
        },

        // Kolory przycisków
        button: {
          primary: {
            fg: "#FFFFFF",
            bg: "#7F56D9",
            border: "#7F56D9",
          },
          secondary: {
            fg: "#344054",
            border: "#D0D5DD",
            bg: "#FFFFFF",
            colorFg: "#6941C6",
            colorBorder: "#D6BBFB",
          },
          tertiary: {
            fg: "#475467",
          },
        },

        // Kolory pomocnicze (utility)
        utility: {
          brand: {
            700: "#6941C6",
            200: "#E9D7FE",
            50: "#F9F5FF",
          },
          gray: {
            700: "#344054",
            200: "#EAECF0",
            50: "#F9FAFB",
          },
        },

        // Kolory wfg
        fg: {
          quaternary: {
            500: "#667085",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

/*
Colors/Border/border-primary: #D0D5DD
Colors/Background/bg-primary: #FFFFFF
Colors/Text/text-secondary (700): #344054
Colors/Border/border-secondary: #EAECF0
Component colors/Components/Buttons/Tertiary/button-tertiary-fg: #475467
Colors/Text/text-primary (900): #101828
Colors/Text/text-tertiary (600): #475467
Component colors/Components/Buttons/Secondary/button-secondary-fg: #344054
Component colors/Utility/Brand/utility-brand-700: #6941C6
Component colors/Components/Buttons/Secondary/button-secondary-border: #D0D5DD
Component colors/Utility/Brand/utility-brand-200: #E9D7FE
Component colors/Utility/Brand/utility-brand-50: #F9F5FF
Component colors/Components/Buttons/Secondary/button-secondary-bg: #FFFFFF
Colors/Text/text-placeholder: #667085
Colors/Background/bg-secondary: #F9FAFB
Component colors/Utility/Gray/utility-gray-700: #344054
Component colors/Utility/Gray/utility-gray-200: #EAECF0
Component colors/Utility/Gray/utility-gray-50: #F9FAFB
Colors/Foreground/fg-quaternary (500): #667085
Component colors/Components/Buttons/Secondary color/button-secondary-color-fg: #6941C6
Component colors/Components/Buttons/Secondary color/button-secondary-color-border:#D6BBFB
Component colors/Components/Buttons/Secondary color/button-secondary-color-bg: #FFFFFF
Component colors/Components/Buttons/Primary/button-primary-fg: #FFFFFF
Component colors/Components/Buttons/Primary/button-primary-bg: #7F56D9
Component colors/Components/Buttons/Primary/button-primary-border: #7F56D9
*/
