const gradientColors = [
  { threshold: -30, color: "#173070" },
  { threshold: -20, color: "#347cbb" },
  { threshold: -10, color: "#3a8bc6" },
  { threshold: 0, color: "#a1c4fd" },
  { threshold: 10, color: "#87b5c5" },
  { threshold: 20, color: "#b2b487" },
  { threshold: 30, color: "#cc9e62" },
  { threshold: 40, color: "#ca7e48" },
];

const getGradientColors = (temperature) => {
  let startColor = "#87b5c55e";
  let endColor =
    gradientColors.find((color) => temperature <= color.threshold)?.color ||
    "#87b5c55e";
  return `linear-gradient(to bottom right, ${startColor}, ${endColor})`;
};

export default getGradientColors;
