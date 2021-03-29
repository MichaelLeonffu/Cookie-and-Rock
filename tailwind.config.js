module.exports = {
  // purge: [],
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      maxHeight: ['focus'],
      // opacity: ['disabled']
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
