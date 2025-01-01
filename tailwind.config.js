/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: "#2196F3",
          "3BA8FF": "#3BA8FF",
          "99B9D3": "#99B9D3",
          ECF7FF: "#ECF7FF",
          "81C7FF": "#81C7FF",
          A2D4FB: "#A2D4FB",
        },
        gray: {
          DEFAULT: "#BABABA",
          838383: "#838383",
          "9F9F9F": "#9F9F9F",
          "6D6D6D": "#6D6D6D",
          E6E6E6: "#E6E6E6",
          D5D5D5: "#D5D5D5",
          808080: "#808080",
          F1F1F1: "#F1F1F1",
          EEEEEE: "#EEEEEE",
          D9D9D9: "#D9D9D9",
          E3E3E3: "#E3E3E3",
        },
        white: {
          DEFAULT: "#FFFFFF",
          F7F7F7: "#F7F7F7",
        },
        black: {
          DEFAULT: "#000000",
          333333: "#333333",
        },
        red: {
          DEFAULT: "#FF0000",
          FF6161: "#FF6161",
        },
      },
      spacing: {
        header: "129px",
        navbar: "86px",
        sideGap: "20px",
      },
      maxWidth: {
        content: "394px",
      },
      borderWidth: {
        3: "3px",
        5: "5px",
        7: "7px",
      },
      fontSize: {
        "9px": "9px",
        "10px": "10px",
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
  plugins: [],
};
