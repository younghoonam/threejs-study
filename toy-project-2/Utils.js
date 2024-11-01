function getScrollProgress(format) {
  const scrollTop = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollableHeight = documentHeight - windowHeight;
  const scrollPercentage = scrollTop / scrollableHeight;

  return format === "percentage" ? scrollPercentage * 100 : scrollPercentage;
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

export { getRandomNumber, getScrollProgress };
