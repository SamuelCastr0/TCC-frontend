export default function debounce(fn: (...args: any) => any, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
