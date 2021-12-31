const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/pages/**/*.js', './src/components/**/*.js', './src/layouts/**/*.js', './src/ lib/**/*.js'],
  daisyui: {
    themes: [
      {
        'cyber': {
          "fontFamily": "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
          "primary": "#4b6bfb",
          "primary-focus": "#1942fa",
          "primary-content": "#181a2a",
          "secondary": "#7b92b2",
          "secondary-focus": "#5c789d",
          "secondary-content": "#181a2a",
          "accent": "#67cba0",
          "accent-focus": "#41be88",
          "accent-content": "#181a2a",
          "neutral": "#181a2a",
          "neutral-focus": "#06060a",
          "neutral-content": "#edf2f7",
          "base-100": "#ffffff",
          "base-200": "#f7fafd",
          "base-300": "#edf2f7",
          "base-content": "#181a2a",
          "info": "#2094f3",
          "success": "#009485",
          "warning": "#ff9900",
          "error": "#ff5724",
          "--border-color": "var(--b3)",
          "--rounded-box": "0",
          "--rounded-btn": "0",
          "--rounded-badge": "0",
          "--animation-btn": "0.25s",
          "--animation-input": ".2s",
          "--btn-text-case": "uppercase",
          "--btn-focus-scale": "0.95",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0",
        }
      }
    ]
  },
  plugins: [ require('@tailwindcss/typography'),
  require('daisyui'),
  ],
}
