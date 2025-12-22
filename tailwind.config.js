
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        nature: {
          primary: '#A8B5A0', // Soft sage green
          secondary: '#D4A59A', // Muted rose gold
          accent: '#C4B5A0', // Warm sand
          bg: '#FAFAF9', // Off-white
          surface: '#F5F2ED', // Warm cream
          'surface-light': '#FCFCFB', // Lighter surface
          text: {
            primary: '#2D3436', // Soft charcoal
            secondary: '#636E72', // Medium gray
            tertiary: '#95A3A8', // Light gray
          },
          error: '#E17B7B',
          success: '#8DC9A3',
          warning: '#E8C07D',
          info: '#89A8C5',
          divider: '#E5E2DD',
          'divider-light': '#F0EEEA',
        }
      },
      backgroundImage: {
        'nature-main': 'linear-gradient(165deg, #F5F2ED 0%, #FAFAF9 50%, #F0EBE3 100%)',
        'nature-header': 'linear-gradient(135deg, #A8B5A0 0%, #C4B5A0 100%)',
        'nature-gradient-soft': 'linear-gradient(to bottom right, #F5F2ED, #FAFAF9)',
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px rgba(0, 0, 0, 0.06)',
        'soft-xl': '0 20px 60px rgba(0, 0, 0, 0.08)',
        'inner-soft': 'inset 0 2px 10px rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        'soft': '12px',
        'softer': '16px',
      }
    },
  },
  plugins: [],
}
