import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyForm from './CurrencyForm';

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
  });

  const testCases = [
    { amount: '100', from: 'PLN', to: 'USD' },
    { amount: '20', from: 'USD', to: 'PLN' },
    { amount: '200', from: 'PLN', to: 'USD' },
    { amount: '345', from: 'USD', to: 'PLN' },
  ];

  for (const testCase of testCases) {
    it(`should call action with proper data when form is used with ${testCase.amount} ${testCase.from} -> ${testCase.to}`, () => {
      const action = jest.fn();

      render(<CurrencyForm action={action} />);

      const amountField = screen.getByTestId('amount');
      const fromSelect = screen.getByTestId('from-select');
      const toSelect = screen.getByTestId('to-select');
      const convertButton = screen.getByText('Convert');

      userEvent.clear(amountField);
      userEvent.type(amountField, testCase.amount);
      userEvent.selectOptions(fromSelect, testCase.from);
      userEvent.selectOptions(toSelect, testCase.to);
      userEvent.click(convertButton);

      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({
        amount: parseInt(testCase.amount),
        from: testCase.from,
        to: testCase.to,
      });

      cleanup();
    });
  }
});
