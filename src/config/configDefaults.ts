export type Theme = "light" | "dark";

export type Config = {
  timezone: string;
  theme: Theme;
  is24Hour: boolean;
  dateFormat: string;
};

export const defaultConfig: Config = {
  timezone: "Europe/Istanbul",
  theme: "dark",
  is24Hour: true,
  dateFormat: "DD/MM/YYYY",
};
