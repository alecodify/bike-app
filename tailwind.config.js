/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "rubik": ["Rubik-Regular", "sans-serif"],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
      },
      colors: {
        primary: '#005792', // Deep blue for trust and reliability
        secondary: '#8B939E', // Metallic gray for a professional feel
        white: '#FFFFFF', // Neutral white for background
        dark: '#0A0A0A', // Dark black for text and accents
        gray: '#F5F5F5', // Light gray for secondary backgrounds
        errorColor: '#D32F2F', // Red for errors and warnings
        weakColor: '#FF6F61', // Light orange for weak signals
        averageColor: '#FFB74D', // Yellow for average indicators
        strongColor: '#388E3C', // Green for success/strong signals
        darkColor: '#1F2933', // Deep gray for modern UI
        lightGray: '#E0E0E0', // Light gray for borders/secondary elements
        lightDark: '#2C3A47', // Muted dark blue-gray for side panels
        googleButton: '#F5F5F5', // Subtle off-white for buttons
        highlight: '#F9A825', // Bright yellow for CTAs or highlights
      }
    },
  },
  plugins: [],
}