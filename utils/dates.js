const toLocalTime = (dateUTC) => {
  const date = new Date(dateUTC);
  const localTime = date.toLocaleString('en-US', {
    timeZone: 'America/Lima',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return localTime;
};

module.exports = {
  toLocalTime,
};
