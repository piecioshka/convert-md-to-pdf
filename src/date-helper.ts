const toTwoZeros = (value: number): string => String(value).padStart(2, '0');

export function getFormattedDate(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = toTwoZeros(d.getMonth() + 1);
  const day = toTwoZeros(d.getDate());
  const hours = toTwoZeros(d.getHours());
  const minutes = toTwoZeros(d.getMinutes());
  const seconds = toTwoZeros(d.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
