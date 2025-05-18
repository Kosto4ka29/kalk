import ResultBox from './ResultBox.js';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  // ✅ PLN → USD
  const plnToUsdCases = [
    { amount: 1, expected: 'PLN 1.00 = $0.29' },
    { amount: 100, expected: 'PLN 100.00 = $28.57' },
    { amount: 50, expected: 'PLN 50.00 = $14.29' },
    { amount: 0, expected: 'PLN 0.00 = $0.00' },
  ];

  for (const test of plnToUsdCases) {
    it(`should render correct text for PLN -> USD conversion (${test.amount})`, () => {
      render(<ResultBox from="PLN" to="USD" amount={test.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(test.expected);
      cleanup();
    });
  }

  // ✅ USD → PLN
  const usdToPlnCases = [
    { amount: 1, expected: '$1.00 = PLN 3.50' },
    { amount: 20, expected: '$20.00 = PLN 70.00' },
    { amount: 99, expected: '$99.00 = PLN 346.50' },
    { amount: 0, expected: '$0.00 = PLN 0.00' },
  ];

  for (const test of usdToPlnCases) {
    it(`should render correct text for USD -> PLN conversion (${test.amount})`, () => {
      render(<ResultBox from="USD" to="PLN" amount={test.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(test.expected);
      cleanup();
    });
  }

  // ✅ Przypadek: from === to
  const sameCurrencyCases = [
    { amount: 100, currency: 'PLN', expected: 'PLN 100.00 = PLN 100.00' },
    { amount: 20, currency: 'USD', expected: '$20.00 = $20.00' },
  ];

  for (const test of sameCurrencyCases) {
    it(`should render same value when currency is the same (${test.currency})`, () => {
      render(<ResultBox from={test.currency} to={test.currency} amount={test.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(test.expected);
      cleanup();
    });
  }
});
