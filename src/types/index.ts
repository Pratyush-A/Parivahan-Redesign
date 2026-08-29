export type LanguageCode = "en" | "hi" | "or";

export type AccessibilityPreference = {
  language: LanguageCode;
  textScale: "default" | "large" | "extra-large";
  readAloud: boolean;
  lowDataMode: boolean;
};
