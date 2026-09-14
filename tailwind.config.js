/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "spidey-red": "#E62429",
        "spidey-blue": "#1D4ED8",
        "web-white": "#F5F5F5",
        "web-black": "#0A0A0F",
        "web-gray": "#A1A1AA",
      },
      fontFamily: {
        brand: ["var(--font-samarkan)", "Samarkan", "cursive"],
        display: ["var(--font-ironman)", "var(--font-bangers)", "cursive"],
        accent: ["var(--font-satoshi)", "sans-serif"],
        body: ["var(--font-poppins)", "sans-serif"],
        // Backwards compatibility alias
        samarkan: ["var(--font-samarkan)", "Samarkan", "cursive"],
      },
      // Consistent 8px spacing scale across the entire system
      spacing: {
        0: "0px",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        12: "48px",
        14: "56px",
        16: "64px",
        18: "72px",
        20: "80px",
        24: "96px",
        28: "112px",
        32: "128px",
        36: "144px",
        40: "160px",
        48: "192px",
        56: "224px",
        64: "256px",
      },
      // Full defined typographic scale
      fontSize: {
        // System Type Scale
        "display-2xl": ["clamp(5rem, 10vw, 12rem)", { lineHeight: "1.0", letterSpacing: "0.08em" }],
        "display-xl": ["clamp(3rem, 7vw, 6rem)", { lineHeight: "1.0", letterSpacing: "0.08em" }],
        "display-lg": ["clamp(2.2rem, 4.5vw, 3.75rem)", { lineHeight: "1.08", letterSpacing: "0.10em" }],
        "display-md": ["clamp(1.35rem, 2.5vw, 1.85rem)", { lineHeight: "1.2", letterSpacing: "0.06em" }],
        "body-lg": ["18px", { lineHeight: "28px", letterSpacing: "0.01em" }],
        "body-md": ["16px", { lineHeight: "24px", letterSpacing: "0em" }],
        "body-base": ["16px", { lineHeight: "24px", letterSpacing: "0em" }],
        "body-sm": ["14px", { lineHeight: "20px", letterSpacing: "0.01em" }],
        "label": ["12px", { lineHeight: "16px", letterSpacing: "0.22em" }],
        // Aliases for compatibility
        "caption-xs": ["11px", { lineHeight: "16px", letterSpacing: "0.08em" }],
        "caption-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.05em" }],
        "heading-sm": ["20px", { lineHeight: "28px", letterSpacing: "0.05em" }],
        "heading-md": ["24px", { lineHeight: "32px", letterSpacing: "0.06em" }],
        "heading-lg": ["32px", { lineHeight: "38px", letterSpacing: "0.08em" }],
        "heading-xl": ["44px", { lineHeight: "48px", letterSpacing: "0.1em" }],
        "heading-2xl": ["56px", { lineHeight: "60px", letterSpacing: "0.12em" }],
        "display-hero": ["76px", { lineHeight: "80px", letterSpacing: "0.14em" }],
        "display-hero-lg": ["96px", { lineHeight: "96px", letterSpacing: "0.16em" }],
      },
      borderRadius: {
        "card": "16px",
      },
      boxShadow: {
        "card": "0 8px 32px rgba(0, 0, 0, 0.5)",
        "card-hover": "0 12px 40px rgba(230, 36, 41, 0.25)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};
