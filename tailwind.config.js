/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "da-purple": "var(--da-purple)",
        "li-purple": "var(--li-purple)",
        "ma-pink": "var(--ma-pink)"
      },
      // backgroundImage: {
      //   "header-bg": "var(--header-bg)",
      //   "first-feature":
      //     "url(https://yt3.ggpht.com/ytc/AKedOLRc_LJeSrh2Mo5PUSgGRnVmQ776qAhrzTzGsVho=s900-c-k-c0x00ffffff-no-rj)",
      //   "custom-emotes": "url(https://i.imgur.com/GW9KkYP.jpg)",
      //   "popout-chat": "url(https://i.imgur.com/3ACzjqb.jpg)",
      //   "theatre-mode": "url(https://i.imgur.com/RGkdxSm.jpg)",
      // },
    },
  },
  plugins: [require("tailwind-scrollbar")],
}

