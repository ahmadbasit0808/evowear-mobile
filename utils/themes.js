export const bgThemeObj = (baseStyle, colorScheme) => {
  return [
    baseStyle,
    {
      backgroundColor: colorScheme === "light" ? "#fff" : "#333",
    },
  ];
};
export const bgThemeProp = (colorScheme) => {
  return colorScheme === "light" ? "#fff" : "#333";
};
export const textThemeObj = (baseStyle, colorScheme) => {
  return [
    baseStyle,
    {
      color: colorScheme === "light" ? "#000" : "#fff",
    },
  ];
};
export const textThemeProp = (colorScheme) => {
  return colorScheme === "light" ? "#000" : "#fff";
};
export const inputThemeObj = (baseStyle, colorScheme) => {
  return [
    baseStyle,
    {
      backgroundColor: colorScheme === "light" ? "#eee" : "#bbb",
    },
  ];
};
export const inputThemeProp = (colorScheme) => {
  return colorScheme === "light" ? "#eee" : "#bbb";
};
