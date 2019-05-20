function getTimeText(time) {
  const minutes = parseInt(time / 60, 10) || 0;
  const seconds = (time % 60) || 0;
  const paddedSeconds = `${seconds}`.padStart(2, "0");

  return `${minutes}:${paddedSeconds}`;
}

export default getTimeText;
