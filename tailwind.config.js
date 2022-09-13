module.exports = {
    content: [
        "./src/**/**/**/**/**/**/*.{js,ts,tsx}",
        "./src/**/**/**/**/**/*.{js,ts,tsx}",
        "./src/**/**/**/**/*.{js,ts,tsx}",
        "./src/**/**/**/*.{js,ts,tsx}",
        "./src/**/**/*.{js,ts,tsx}",
        "./src/**/*.{js,ts,tsx}",
    ],
    theme: {
        extend: {
            container: {
                padding: "2rem",
                screens: {
                    xs: "100%",
                    sm: "640px",
                    md: "768px",
                    lg: "1024px",
                    xl: "1280px",
                    "2xl": "1536px",
                },
            },
        },
        screens: {
            xs: "320px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
    },
    plugins: [require("daisyui")],
};
