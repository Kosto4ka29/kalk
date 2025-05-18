export const convertPLNToUSD = (PLN) => {
  // jeśli brak wartości — np. undefined
  if (PLN === undefined) return NaN;

  // jeśli typ jest inny niż number lub string
  if (typeof PLN !== 'number' && typeof PLN !== 'string') return 'Error';

  // próba parsowania do liczby
  const value = Number(PLN);

  // jeśli po parsowaniu nadal nie jest liczbą (np. 'abc' albo '')
  if (PLN === '' || isNaN(value)) return NaN;

  // jeśli wartość ujemna — zwracamy $0.00
  const safeValue = value < 0 ? 0 : value;

  const PLNtoUSD = safeValue / 3.5;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
};
