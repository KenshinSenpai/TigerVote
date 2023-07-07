/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/forms"),
        require('@tailwindcss/aspect-ratio'),
        require("daisyui"),
        require("tw-elements/dist/plugin.cjs"),
    ],

    daisyui: {
        themes: [{
            mytheme: {

                "primary": "#14532d",

                "secondary": "#f59e0b",

                "accent": "#9ca3af",

                "neutral": "#191a3e",

                "base-100": "#ffffff",

                "info": "#60a5fa",

                "success": "#16a34a",

                "warning": "#ea580c",

                "error": "#dc2626",
            },
        }, ],
    },
}
