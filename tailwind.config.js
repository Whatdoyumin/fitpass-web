/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          100: "#ECF7FF",
          250: "#A2D4FB",
          300: "#99B9D3",
          350: "#81C7FF",
          400: "#3BA8FF",
          500: "#2196F3",
        },
        gray: {
          200: "#F1F1F1",
          250: "#EEEEEE",
          275: "#E3E3E3",
          300: "#E6E6E6",
          325: "#D9D9D9",
          350: "#D5D5D5",
          400: "#BABABA",
          450: "#9F9F9F",
          500: "#838383",
          550: "#808080",
          600: "#6D6D6D",
        },
        white: {
          100: "#FFFFFF",
          200: "#F7F7F7",
        },
        black: {
          600: "#333333",
          700: "#000000",
        },
        red: {
          400: "#FF6161",
          500: "#FF0000",
          600: "#F34421",
        },
      },
      spacing: {
        header: "79px",
        navbar: "86px",
        sideGap: "20px",
        sideNavbar: "266px",
        overpadding: "-129px",
      },
      maxWidth: {
        content: "390px",
      },
      minWidth: {
        admin: "1280px",
      },
      borderRadius: {
        3: "3px",
        5: "5px",
        7: "7px",
        15: "15px",
      },
      fontSize: {
        "9px": "9px",
        "10px": "10px",
        "11px": "11px",
        "12px": "12px",
        "13px": "13px",
        "14px": "14px",
        "15px": "15px",
        "16px": "16px",
        "18px": "18px",
        "22px": "22px",
        "24px": "24px",
        "25px": "25px",
        "50px": "50px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
