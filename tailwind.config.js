
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
          bg: '#E8E7E0', // Warm cream
          surface: '#F2F1EC', // Light cream surface
          text: {
            primary: '#0F172A', // Deep slate
            secondary: '#1E293B', // Dark gray-blue
            tertiary: '#334155', // Stronger medium gray
          },
          error: '#DC2626',
          success: '#38A169',
          warning: '#D69E2E',
          info: '#3182CE',
          divider: '#CBD5E0',
        }
      },
      backgroundImage: {
        'nature-main': 'linear-gradient(180deg, #7D8EE1 0%, #E8E7E0 30%, #94E4B8 70%, #58C28A 100%)',
        'nature-header': 'linear-gradient(135deg, #7D8EE1, #94E4B8)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
