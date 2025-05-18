export const convertPLNToUSD = (PLN) => {
  // Dopuszczalne typy: number i string
  if (typeof PLN !== 'number' && typeof PLN !== 'string') return 'Error';

  // Przekształcenie na liczbę
  const numericValue = Number(PLN);

  // Jeśli nie jest możliwe przekształcenie (np. 'abc')
  if (isNaN(numericValue)) return NaN;

  // Jeśli wartość mniejsza niż 0 – zwracamy $0.00
  const safeValue = numericValue < 0 ? 0 : numericValue;

  const PLNtoUSD = safeValue / 3.5;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
};
