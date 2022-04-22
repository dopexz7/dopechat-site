module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-purple": "var(--main-purple)",
        "accent-purple": "var(--accent-purple)",
        "darker-purple": "var(--darker-purple)",
        "accent-white": "var(--accent-white)",
        "main-black": "var(--main-black)",
        "main-white": "var(--main-white)",
        "border-white": "var(--border-white)",
        "accent-gray": "var(--accent-gray)",
      },
      backgroundImage: {
        "header-bg": "var(--header-bg)",
        "first-feature":
          "url(https://yt3.ggpht.com/ytc/AKedOLRc_LJeSrh2Mo5PUSgGRnVmQ776qAhrzTzGsVho=s900-c-k-c0x00ffffff-no-rj)",
      },
      screens: {
        lxl: "2000px",
        winScl: { raw: "(-webkit-device-pixel-ratio: 1.25)" },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
