
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        nature: {
          primary: '#7D8EE1', // Soft lavender-blue
          secondary: '#58C28A', // Fresh green
          accent: '#94E4B8', // Mint green
          'accent-warm': '#D2691E', // Earthy Orange/Terracotta
          'accent-muted': '#6B5E5E', // Muted brown
          bg: '#E8E7E0', // Warm cream
          surface: '#F2F1EC', // Light cream surface
          'surface-light': '#EDECE7', // Component surface
          'surface-disabled': '#D4D3CE', // Disabled surface
          text: {
            primary: '#0F172A', // Deep slate
            secondary: '#1E293B', // Dark gray-blue
            tertiary: '#334155', // Medium gray
            hint: '#64748B', // Light gray
          },
          error: '#DC2626',
          success: '#38A169',
          warning: '#D69E2E',
          info: '#3182CE',
          'pastel-green': '#66BB6A',
          divider: '#CBD5E0',
          selection: '#8B1538', // Deep burgundy
        }
      },
      backgroundImage: {
        'nature-main': 'linear-gradient(180deg, #7D8EE1 0%, #E8E7E0 30%, #94E4B8 70%, #58C28A 100%)',
        'nature-header': 'linear-gradient(135deg, #7D8EE1, #94E4B8)',
        'nature-gradient-soft': 'linear-gradient(to bottom right, #F2F1EC, #E8E7E0)',
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 10px 40px rgba(0, 0, 0, 0.12)',
        'soft-xl': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'inner-soft': 'inset 0 2px 10px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'soft': '12px',
        'softer': '16px',
      }
    },
  },
  plugins: [],
}
