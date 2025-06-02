export const debounce = <T extends (...args: Parameters<T>) => void>(callback: T, ms: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>): void => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
      timeoutId = null;
    }, ms);
  };

  debounced.flush = (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    callback(...args);
  };

  return debounced;
};
