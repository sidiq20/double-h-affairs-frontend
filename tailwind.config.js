/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Elegant wedding color palette - soft and romantic
        champagne: {
          50: '#fefcf9',   // lightest champagne
          100: '#fef8f0',  // soft champagne
          200: '#fdeee0',  // warm champagne
          300: '#f9d9c1',  // light champagne
          400: '#f1bd8e',  // medium champagne
          500: '#e69a5b',  // golden champagne
          600: '#d4803b',  // deep champagne
          700: '#b8682b',  // rich champagne
          800: '#925320',  // dark champagne
          900: '#6b3e18',  // deepest champagne
        },
        blush: {
          50: '#fef7f7',   // softest blush
          100: '#fdeaea',  // lightest blush
          200: '#f9d2d2',  // soft blush
          300: '#f2aaaa',  // gentle blush
          400: '#e87575',  // warm blush
          500: '#d44545',  // rose blush
          600: '#b83535',  // deep blush
          700: '#952a2a',  // rich blush
          800: '#762121',  // dark blush
          900: '#5a1a1a',  // deepest blush
        },
        lavender: {
          50: '#faf9ff',   // softest lavender
          100: '#f3f1ff',  // lightest lavender
          200: '#e6e0ff',  // gentle lavender
          300: '#d1c2ff',  // soft lavender
          400: '#b595ff',  // medium lavender
          500: '#9966ff',  // lavender
          600: '#7c47e6',  // deep lavender
          700: '#6236cc',  // rich lavender
          800: '#4d2b99',  // dark lavender
          900: '#392066',  // deepest lavender
        },
        cream: {
          50: '#fffef9',   // purest cream
          100: '#fffcf0',  // soft cream
          200: '#fff8e1',  // warm cream
          300: '#ffefc2',  // light cream
          400: '#ffe085',  // golden cream
          500: '#ffcc33',  // rich cream
          600: '#e6b82e',  // deep cream
          700: '#cc9f29',  // bronze cream
          800: '#998024',  // dark cream
          900: '#66541f',  // deepest cream
        },
        dustyrose: {
          50: '#fef8f8',   // softest dusty rose
          100: '#fdeaea',  // lightest dusty rose
          200: '#f7c8c8',  // gentle dusty rose
          300: '#ef9f9f',  // soft dusty rose
          400: '#e57070',  // warm dusty rose
          500: '#d44242',  // dusty rose
          600: '#b83333',  // deep dusty rose
          700: '#9e2929',  // rich dusty rose
          800: '#7a2020',  // dark dusty rose
          900: '#5c1a1a',  // deepest dusty rose
        },
        sage: {
          50: '#f8f9f7',   // softest sage
          100: '#f0f2ee',  // lightest sage
          200: '#e1e6dc',  // gentle sage
          300: '#c9d1c2',  // soft sage
          400: '#a8b49d',  // medium sage
          500: '#899578',  // sage
          600: '#6f7d5f',  // deep sage
          700: '#596549',  // rich sage
          800: '#454f39',  // dark sage
          900: '#363b2d',  // deepest sage
        },
        // Backward compatibility alias
        wedding: {
          50: '#fefcf9',   // champagne 50
          100: '#fef8f0',  // champagne 100
          200: '#fdeee0',  // champagne 200
          300: '#f9d9c1',  // champagne 300
          400: '#f1bd8e',  // champagne 400
          500: '#e69a5b',  // champagne 500
          600: '#d4803b',  // champagne 600
          700: '#b8682b',  // champagne 700
          800: '#925320',  // champagne 800
          900: '#6b3e18',  // champagne 900
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        'script': ['Dancing Script', 'Brush Script MT', 'cursive'],
        'elegant': ['Cormorant Garamond', 'Georgia', 'serif'],
        'sans': ['Inter', 'Montserrat', 'system-ui', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'gentle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.02)',
        'dreamy': '0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.875rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}