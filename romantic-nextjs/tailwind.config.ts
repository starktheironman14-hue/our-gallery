import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Premium Romantic Palette
                romantic: {
                    50: '#fdf4f5',
                    100: '#fce7eb',
                    200: '#f9d0d9',
                    300: '#f5a8b8',
                    400: '#ff758c', // Primary gradient start
                    500: '#ff7eb3', // Accent pink
                    600: '#e5476f',
                    700: '#d1295d',
                    800: '#b01e4d',
                    900: '#931c47',
                },
                midnight: {
                    50: '#f4f6fb',
                    100: '#e8ecf6',
                    200: '#cbd6eb',
                    300: '#9fb4da',
                    400: '#6c8dc4',
                    500: '#4a6fae',
                    600: '#385792',
                    700: '#2e4676',
                    800: '#293c63',
                    900: '#1a2540',
                    950: '#0B0F1A', // Background dark
                },
                lavender: {
                    light: '#cdb4db',
                    DEFAULT: '#cdb4db',
                },
                glass: {
                    white: 'rgba(255, 255, 255, 0.08)',
                }
            },
            fontFamily: {
                'display': ['Playfair Display', 'serif'],
                'sans': ['Inter', 'system-ui', 'sans-serif'],
                'handwriting': ['Dancing Script', 'cursive'],
            },
            animation: {
                'fade-in': 'fadeIn 1s ease-in',
                'fade-up': 'fadeUp 0.8s ease-out',
                'slide-in': 'slideIn 0.6s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'breathe': 'breathe 4s ease-in-out infinite',
                'twinkle': 'twinkle 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideIn: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                breathe: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                },
                twinkle: {
                    '0%, 100%': { opacity: '0.2' },
                    '50%': { opacity: '1' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
};

export default config;
