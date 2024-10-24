export function sleep(delay: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('wait');
    }, delay);
  });
}
