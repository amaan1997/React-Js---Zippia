import basic from "./default";

const themes = {
  basic,
};

export default function getTheme(theme) {
  return themes[theme];
}
