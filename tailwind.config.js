module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "rotate-word":
          "kfRotateWord var(--rotate-animation-duration, 18s) linear infinite",
      },
      keyframes: {
        kfRotateWord: {
          "0%": {
            opacity: "0",
            transform: "translateY(calc(-1 * var(--rotate-word-height, 30px)))",
          },
          "5%": { opacity: "1", transform: "translateY(0px)" },
          "17%": { opacity: "1", transform: "translateY(0px)" },
          "20%": {
            opacity: "0",
            transform: "translateY(var(--rotate-word-height, 30px))",
          },
          "80%": { opacity: "0" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
