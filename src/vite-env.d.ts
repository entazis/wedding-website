/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SHEETS_URL: string;
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_CONTACT_PHONE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Type definitions for vite-imagetools
// Handle image imports with query parameters
declare module "*.jpg?*" {
  const src: string;
  export default src;
}

declare module "*.jpeg?*" {
  const src: string;
  export default src;
}

declare module "*.png?*" {
  const src: string;
  export default src;
}

declare module "*.webp?*" {
  const src: string;
  export default src;
}
