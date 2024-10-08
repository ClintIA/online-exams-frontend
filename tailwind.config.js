module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        imageHome: "url('./src/assets/logoClintia.png')",
      },
      fontFamily: {
        sans: ['Red Hat Display', 'sans-serif'],
      },
      colors: {
        skyBlue: '#05D2FF',
        celticBlue: '#055AAA',
        dodgerBlue: '#0578DC',
        yaleBlue: '#053C73',
        oxfordBlue: '#051E32',
      },
    },
  },
  plugins: [],
};
