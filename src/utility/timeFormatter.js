const padLeadingZeroes = (number, desiredLength) => {
  let numberString = `${number}`;

  while (numberString.length < desiredLength) {
    numberString = `0${numberString}`;
  }

  return numberString;
};

const timeFormatter = (ms) => {
  const minutes = padLeadingZeroes(Math.floor(ms / 1000 / 60), 2);
  const seconds = padLeadingZeroes((ms - (minutes * 60 * 1000)) / 1000, 2);

  return `${minutes}:${seconds}`;
};

export default timeFormatter;
