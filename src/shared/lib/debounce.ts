export const debounce = <T extends (...args: Parameters<T>) => void>(callback: T, ms: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>): void => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, ms);
  };
};
