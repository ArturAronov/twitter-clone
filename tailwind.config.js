module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      width: {
        'wp-14': '100%',
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'zinc-0': '#FFFFFF',
      'zinc-500': '#71717a',
      'zinc-700': '#3f3f46',
      'zinc-800': '#27272a',
      'zinc-900': '#18181b',
      'zinc-1000': '#000000',
      'slate-200': '#efe8f0',
      'slate-400': '#94a3b8',
      'slate-900': '#0f172a',
      'sky-500': '#0ea5e9',
      'sky-600': '#0284c7',
      'sky-900': '#0c4a6e',
      'stone-1000': '#16181c',
      'blue-50': '#eff6ff',
      'red-600': '#dc2626',
      'pink-600': '#db2777',
      'emerald-600': '#059669',
      'teal-600': '#14b8a6'
    },
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    styled: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
    themes: ['black']
  },
}
