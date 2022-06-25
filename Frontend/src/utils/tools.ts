export const shortenStr = (str?: string, length = 20): string => {
  if (!str) return "";
  if (length < 20) {
    length = 20;
  }
  const half = Math.floor(length / 2);
  const remaining = half - 3 - length;
  return str.length <= length
    ? str
    : `${str.slice(0, half)}...${str.slice(remaining)}`;
};
