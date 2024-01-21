export const i18n = {
    // Default locale should always be included in the locales array
    defaultLocale: "en",
    locales: ["en", "fr"],
} as const;

export type Locale = (typeof i18n)["locales"][number];