import {fileURLToPath, URL} from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import type {ImportMetaEnv} from "./env";
// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  let env: Record<keyof ImportMetaEnv, string> = loadEnv(mode, process.cwd())
  console.log(env.VITE_SERVER_URL, process.cwd())
  return {
    plugins: [
      vue(),
    ],
    envDir: "./",
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
