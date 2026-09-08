import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
export default defineConfig({plugins:[react()],css:{postcss:{plugins:[tailwindcss()]}},build:{outDir:'dist',copyPublicDir:false,lib:{entry:'offline.tsx',name:'PCSHandbook',formats:['iife'],fileName:()=> 'app.js'},cssCodeSplit:false}});
