import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: 'rgba(64, 121, 70, 1)',
        bg_fon: 'rgba(245, 246, 251, 1)',
        bt_col: 'rgba(255, 117, 29, 1)',
        text_color: 'rgba(82, 85, 95, 1)',
        text_op: 'rgba(82, 85, 95, 0.7)',
        red_color: 'rgba(229, 57, 53, 1)',
        inp_col: 'rgba(166, 171, 185, 1)',
        tab_col: 'rgba(250, 251, 253, 1)',
        tab_checked: 'rgba(254, 254, 254, 1)',
        filter_col: 'rgba(199, 204, 220, 1)',
        menu_text: 'rgba(199, 204, 220, 1)',
        bg_graphs: 'rgba(255, 218, 192, 1)',
      },
      boxShadow: {
        shadow: '5px 10px 20px 0px #AAB2C566',
        shadow_bt: '1px 3px 5px 0 rgba(255, 107, 8, 0.35)',
        shadow_menu: '0px 3px 4px 0px rgba(170, 178, 197, 0.4)',
      },
        screens: {
      mob: '320px',
      tab: '768px',
      desk: '1280px'
      },
        
         
    },
  },
  plugins: [],
} satisfies Config;

