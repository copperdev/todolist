const colors = require("tailwindcss/colors")

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                blue: colors.blue,
                gray: colors.gray,
                orange: colors.orange,
                white: colors.white
            },
            container: {
                center: true
            }
        }
    },
    important: true,
    variants: {
        extend: {}
    },
    plugins: []
}
