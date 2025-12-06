import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import pluginRewriteAll from "vite-plugin-rewrite-all";
import { plugin } from 'mongoose';

export default defineConfig({
    plugin: [react(), pluginRewriteAll()],
})