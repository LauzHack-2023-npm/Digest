/** @type {import('tailwindcss').Config} */

import { darken, lighten } from 'polished';

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
  theme: {
    extend: {
      colors: {
        // Main call-to-action color (determines the overall look and feel)
        primary: {  
          DEFAULT: '#058ED9',         
          dark: darken(0.1, '#058ED9'), 
          light: lighten(0.1, '#058ED9'),
        },
        // Optional secondary call-to-action color (accent color)
        secondary: {  
          DEFAULT: '#DE6449',         
          dark: darken(0.1, '#DE6449'), 
          light: lighten(0.1, '#DE6449'),
        },
        
        // Optional tertiary call-to-action color
        tertiary: {  
          DEFAULT: '#57737A',         
          dark: darken(0.1, '#57737A'), 
          light: lighten(0.1, '#57737A'),
        }, 
        // Background color
        bgColor: {  
          DEFAULT: '#F4EBD9',  
          dark: darken(0.1, '#F4EBD9'), 
          light: lighten(0.1, '#F4EBD9'),
        },
        // Text color
        textColor: {  
          DEFAULT: '#121113',         
          dark: darken(0.1, '#121113'), 
          light: lighten(0.1, '#121113'),
        },
        // Border color
        borderColor: {  
          DEFAULT: '#121113',         
          dark: darken(0.1, '#121113'), 
          light: lighten(0.1, '#121113'),
        },
        // Feedback colors
        successColor: '#679436',   // green
        errorColor: '#E3170A',     // red
        warningColor: '#F08700',   // yellow
      },
    },
  },
  plugins: [],
}

