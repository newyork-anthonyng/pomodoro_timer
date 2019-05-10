function getTimeText(time) {
  const minutes = parseInt(time / 60, 10);
  const seconds = time % 60;
  const paddedSeconds = `${seconds}`.padStart(2, "0");

  return `${minutes}:${paddedSeconds}`;
}

export default getTimeText;
