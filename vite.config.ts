import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        define: {
            'process.env': env,
        },
        plugins: [react(), tsconfigPaths()],
        // 其他配置...
    }
})
