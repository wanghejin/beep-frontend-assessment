export function debounce() {
  let timeout;
  return function (fnc, delayms) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fnc();
    }, delayms || 500);
  };
}
