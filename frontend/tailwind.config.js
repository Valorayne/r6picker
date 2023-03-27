/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'rainbow-low': '#1e2445',
                'rainbow-high': '#253d5e',
                'selected-operator': '#2ba0e5'
            }
        },
    },
    plugins: [],
}
