/// <reference types="vite/client" />

/** ISO date (YYYY-MM-DD) of the build, injected by vite.config.ts. */
declare const __BUILD_DATE__: string;

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_GATEWAY_API_KEY?: string;
}
