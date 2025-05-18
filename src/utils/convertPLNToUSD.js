export const convertPLNToUSD = (PLN) => {
  // Jeśli typ nie jest string lub number → błąd
  if (typeof PLN !== 'string' && typeof PLN !== 'number') return 'Error';

  // Konwersja do liczby
  const numericValue = Number(PLN);

  // Jeżeli nie da się przekonwertować → NaN
  if (isNaN(numericValue)) return NaN;

  // Jeśli ujemne → zwracamy $0.00
  const safeValue = numericValue < 0 ? 0 : numericValue;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(safeValue / 3.5).replace(/\u00a0/g, ' ');
};
