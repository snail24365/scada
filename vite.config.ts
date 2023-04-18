/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      plugins: [
        [
          '@swc/plugin-emotion',
          {
            // default is true. It will be disabled when build type is production.
            sourceMap: true,
            // default is 'dev-only'.
            autoLabel: 'dev-only',
            // default is '[local]'.
            // Allowed values: `[local]` `[filename]` and `[dirname]`
            labelFormat: 'filename',
          },
        ],
      ],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
