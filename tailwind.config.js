/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                midnight: {
                    900: '#0B0F1A',
                    950: '#05080F',
                },
                romantic: {
                    50: '#fff0f5',
                    100: '#ffe3ec',
                    200: '#ffc7d9',
                    300: '#ff9bb9',
                    400: '#ff6492',
                    500: '#ff336f',
                    600: '#ed1250',
                    700: '#c8083b',
                    800: '#a60a33',
                    900: '#8b0d2f',
                    950: '#4f0216',
                },
                lavender: {
                    light: '#cdb4db',
                    DEFAULT: '#b185db',
                    dark: '#a267ac',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Playfair Display', 'serif'],
                handwriting: ['Dancing Script', 'cursive'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
