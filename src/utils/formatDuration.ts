export function formatDuration(duration: number) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const formatSeconds = seconds < 10 ? '0' + seconds : seconds;
  return `${minutes}:${formatSeconds}`;
}
