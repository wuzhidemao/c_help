/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          50: '#e6f4f9',
          100: '#b3dfee',
          200: '#80c8e3',
          300: '#4db2d8',
          400: '#1a9ccd',
          500: '#0080b3',
          600: '#00668c',
          700: '#004d66',
          800: '#003340',
          900: '#001a20',
        },
        accent: {
          50: '#f0fcff',
          100: '#c7f7ff',
          200: '#94f0ff',
          300: '#5ce9ff',
          400: '#25e1ff',
          500: '#00d4ff',
          600: '#00adb8',
          700: '#008794',
          800: '#00606b',
          900: '#003a41',
        },
        dark: {
          50: '#e6e8eb',
          100: '#b3b8bf',
          200: '#808894',
          300: '#4d576a',
          400: '#1a2740',
          500: '#1e3a5f',
          600: '#182f4d',
          700: '#12253b',
          800: '#0c1b29',
          900: '#061117',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
