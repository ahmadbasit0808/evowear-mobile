export const COLORS = {
  primary: "#FFDE59",
  accent: "#269dd3",
  danger: "#d32f2f",
  white: "#fff",
  black: "#000",
  lightBg: "#fff",
  darkBg: "#1a1a2e",
  lightCard: "#f5f5f5",
  darkCard: "#2a2a3e",
  lightText: "#111",
  darkText: "#f0f0f0",
  lightSubText: "#666",
  darkSubText: "#aaa",
  lightInput: "#f0f0f0",
  darkInput: "#3a3a4e",
  lightBorder: "#e0e0e0",
  darkBorder: "#444",
};

export const bgThemeObj = (baseStyle, colorScheme) => [
  baseStyle,
  { backgroundColor: colorScheme === "light" ? COLORS.lightBg : COLORS.darkBg },
];

export const bgThemeProp = (colorScheme) =>
  colorScheme === "light" ? COLORS.lightBg : COLORS.darkBg;

export const cardThemeObj = (baseStyle, colorScheme) => [
  baseStyle,
  { backgroundColor: colorScheme === "light" ? COLORS.lightCard : COLORS.darkCard },
];

export const textThemeObj = (baseStyle, colorScheme) => [
  baseStyle,
  { color: colorScheme === "light" ? COLORS.lightText : COLORS.darkText },
];

export const textThemeProp = (colorScheme) =>
  colorScheme === "light" ? COLORS.lightText : COLORS.darkText;

export const subTextThemeProp = (colorScheme) =>
  colorScheme === "light" ? COLORS.lightSubText : COLORS.darkSubText;

export const inputThemeObj = (baseStyle, colorScheme) => [
  baseStyle,
  {
    backgroundColor: colorScheme === "light" ? COLORS.lightInput : COLORS.darkInput,
    color: colorScheme === "light" ? COLORS.lightText : COLORS.darkText,
    borderColor: colorScheme === "light" ? COLORS.lightBorder : COLORS.darkBorder,
  },
];

export const inputThemeProp = (colorScheme) =>
  colorScheme === "light" ? COLORS.lightInput : COLORS.darkInput;
