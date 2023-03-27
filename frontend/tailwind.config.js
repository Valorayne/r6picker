/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'rainbow-low': '#1e2445',
                'rainbow-high': '#253d5e',
                'selected-operator': '#2ba0e5'
            },
            backgroundImage: {
                'bank-0': "url('/assets/maps/bank/bank-0.jpg')",
                'bank-1': "url('/assets/maps/bank/bank-1.jpg')",
                'bank-2': "url('/assets/maps/bank/bank-2.jpg')",
                'bank-3': "url('/assets/maps/bank/bank-3.jpg')",
            }
        },
    },
    plugins: [],
}
