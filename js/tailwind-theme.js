tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "deep-navy": "#1B2B3A",
        "warm-grey": "#F5F5F3",
        "accent-gold": "#D4AF37",
        "surface-container": "#eeeeee",
        "surface-container-high": "#e8e8e8",
        "on-surface-variant": "#444748",
        "surface-variant": "#e2e2e2",
        secondary: "#1B2B3A",
        "on-secondary-container": "#4b617d",
        background: "#ffffff",
        "on-primary": "#ffffff",
        "primary-container": "#fafafa",
        "surface-tint": "#5d5f5f",
        "primary-fixed-dim": "#c6c6c7",
        primary: "#5d5f5f",
        "surface-bright": "#f9f9f9",
        "on-primary-container": "#717373",
        "on-primary-fixed": "#1a1c1c",
        "on-secondary-fixed": "#021c36",
        "secondary-fixed": "#d2e4ff",
        "secondary-fixed-dim": "#b1c8e9",
        "inverse-primary": "#c6c6c7",
        "on-surface": "#1a1c1c",
        "surface-dim": "#dadada",
        surface: "#ffffff",
        "surface-container-lowest": "#ffffff",
        "error-container": "#ffdad6",
        "on-tertiary-container": "#8e6e2c",
        "outline-variant": "#c4c7c8",
        "on-error-container": "#93000a",
        "tertiary-fixed-dim": "#e9c176",
        "on-tertiary": "#ffffff",
        "on-secondary": "#ffffff",
        "on-primary-fixed-variant": "#454747",
        "on-error": "#ffffff",
        error: "#ba1a1a",
        "tertiary-fixed": "#ffdea5",
        "on-background": "#1a1c1c",
        "surface-container-low": "#f3f3f3",
        tertiary: "#775a19",
        "on-tertiary-fixed-variant": "#5d4201",
        "secondary-container": "#c5dcfd",
        "inverse-on-surface": "#f1f1f1",
        "tertiary-container": "#fff9f5",
        "surface-container-highest": "#e2e2e2",
        "primary-fixed": "#e2e2e2",
        "inverse-surface": "#2f3131",
        outline: "#747878",
        "on-secondary-fixed-variant": "#324863",
        "on-tertiary-fixed": "#261900"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        gutter: "24px",
        "section-gap": "128px",
        "container-max": "1440px",
        "margin-desktop": "64px",
        "margin-mobile": "20px",
        unit: "8px"
      },
      fontFamily: {
        "headline-md": ['"Newsreader"', "Georgia", "serif"],
        "body-md": ['"DM Sans"', "system-ui", "sans-serif"],
        "display-lg": ['"Newsreader"', "Georgia", "serif"],
        "title-lg": ['"DM Sans"', "system-ui", "sans-serif"],
        "label-caps": ['"DM Sans"', "system-ui", "sans-serif"],
        "display-lg-mobile": ['"Newsreader"', "Georgia", "serif"],
        "body-lg": ['"DM Sans"', "system-ui", "sans-serif"]
      },
      fontSize: {
        "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "display-lg": [
          "64px",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "300" }
        ],
        "title-lg": [
          "20px",
          { lineHeight: "1.4", letterSpacing: "0.02em", fontWeight: "500" }
        ],
        "label-caps": [
          "12px",
          { lineHeight: "1", letterSpacing: "0.1em", fontWeight: "600" }
        ],
        "display-lg-mobile": [
          "40px",
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "300" }
        ],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }]
      }
    }
  }
};
