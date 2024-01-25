declare namespace NodeJS {
    interface ProcessEnv {
      AUTH_GOOGLE_ID: string;
      AUTH_GOOGLE_SECRET: string;
      BUNNY_STORAGE_API_KEY: string;
      BUNNY_TOKEN_KEY: string;
      NEXT_PUBLIC_BUNNY_CDN_URL: string;
      NEXT_PUBLIC_BUNNY_STORAGE_URL: string;
      NEXT_PUBLIC_BUNNY_STORAGE_ZONE: string;
    }
}