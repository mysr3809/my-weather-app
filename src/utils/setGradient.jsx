const getGradientColors = (temperature) => {
  let startColor = "#a1c4fd";
  let endColor;

  if (temperature <= -30) {
    endColor = "#173070";
  } else if (temperature <= -20) {
    endColor = "#347cbb";
  } else if (temperature <= -10) {
    endColor = "#3a8bc6";
  } else if (temperature <= 0) {
    endColor = "#7ab3d3";
  } else if (temperature <= 10) {
    endColor = "#87b5c5";
  } else if (temperature <= 20) {
    endColor = "#b2b487";
  } else if (temperature <= 30) {
    endColor = "#cc9e62";
  } else if (temperature <= 40) {
    endColor = "##ca7e48";
  } else {
    endColor = "#7ab3d3";
  }
  return `linear-gradient(to bottom right, ${startColor}, ${endColor})`;
};

export default getGradientColors;
