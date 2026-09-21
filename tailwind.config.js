/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sand & Dune Clay Palette
        sand: {
          50: '#FAF7F2',
          100: '#F5EFEB',
          200: '#EADECF',
          300: '#D8C3AA',
          400: '#C7A583',
          500: '#B5875B',
          600: '#92633C',
          700: '#734B29',
        },
        // Water & River Clay Palette
        water: {
          50: '#F0F9FA',
          100: '#D7F0F3',
          200: '#AEE2E8',
          300: '#77CDDA',
          400: '#39B3C6',
          500: '#1A96AA',
          600: '#137586',
          700: '#105B69',
          800: '#0E4652',
          900: '#092E36',
        },
        // Lush Riverbank & Plantation Green
        riverbank: {
          50: '#F2F9F5',
          100: '#D8F0E2',
          500: '#2A8F62',
          600: '#1F6F4C',
          700: '#165338',
          800: '#0F3C28',
        },
        // Riverbed Slate & Pebble Dark Tones
        riverbed: {
          50: '#F4F7F6',
          100: '#E3EAE8',
          400: '#7E9491',
          500: '#586E6B',
          700: '#314240',
          800: '#1E2C2A',
          900: '#131E1C',
        },
        // Forest & Plantation Canopy
        forest: {
          800: '#165338',
          900: '#0F3C28',
          950: '#0B2C1E',
        },
        // Antique Muted Brass & Gold Accents
        brass: {
          400: '#C7A583',
          500: '#A3733E',
          600: '#8C5F2E',
          700: '#734B29',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        accent: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tight: '-0.02em',
        snug: '-0.01em',
        editorial: '0.03em',
        luxury: '0.12em',
        kicker: '0.22em',
        'wide-display': '0.32em',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'clay': '10px 14px 28px rgba(19, 117, 134, 0.08), -8px -8px 22px rgba(255, 255, 255, 0.9), inset 2px 2px 4px rgba(255, 255, 255, 0.8), inset -2px -2px 4px rgba(19, 117, 134, 0.04)',
        'clay-sand': '10px 14px 28px rgba(181, 135, 91, 0.12), -8px -8px 22px rgba(255, 255, 255, 0.95), inset 2px 2px 4px rgba(255, 255, 255, 0.9), inset -2px -2px 5px rgba(146, 99, 60, 0.06)',
        'clay-sm': '6px 8px 16px rgba(19, 117, 134, 0.06), -5px -5px 14px rgba(255, 255, 255, 0.85), inset 1.5px 1.5px 3px rgba(255, 255, 255, 0.9), inset -1.5px -1.5px 3px rgba(19, 117, 134, 0.03)',
        'clay-lg': '16px 24px 44px rgba(19, 117, 134, 0.12), -12px -12px 32px rgba(255, 255, 255, 0.95), inset 3px 3px 6px rgba(255, 255, 255, 0.85), inset -3px -3px 6px rgba(19, 117, 134, 0.05)',
        'clay-btn-water': '6px 10px 22px rgba(26, 150, 170, 0.35), inset 2px 2px 4px rgba(255, 255, 255, 0.5), inset -2px -2px 4px rgba(0, 0, 0, 0.15)',
        'clay-btn-sand': '6px 10px 22px rgba(181, 135, 91, 0.35), inset 2px 2px 4px rgba(255, 255, 255, 0.6), inset -2px -2px 4px rgba(0, 0, 0, 0.12)',
        'clay-pill': '4px 6px 14px rgba(19, 117, 134, 0.06), -3px -3px 10px rgba(255, 255, 255, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.9), inset -1px -1px 2px rgba(0, 0, 0, 0.03)',
        'clay-inset': 'inset 3px 3px 8px rgba(19, 117, 134, 0.12), inset -2px -2px 6px rgba(255, 255, 255, 0.7)',
        'clay-inset-sand': 'inset 3px 3px 8px rgba(146, 99, 60, 0.12), inset -2px -2px 6px rgba(255, 255, 255, 0.8)',
      }
    },
  },
  plugins: [],
}
