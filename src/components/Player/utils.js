export const formatTime = ms => {
  if (!ms) {
    return '00:00';
  }

  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / 1000 / 3600) % 24);

  return (hours
    ? [padDigits(hours, 2), padDigits(minutes, 2), padDigits(seconds, 2)]
    : [padDigits(minutes, 2), padDigits(seconds, 2)]
  ).join(':');
};

export function padDigits(number, digits) {
  return (
    Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number
  );
}
