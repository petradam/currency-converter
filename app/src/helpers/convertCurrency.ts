import { ExchangeRate } from '../model/exchangeRate';

export function convertCurrency(amount: number, exchangeRate: ExchangeRate): number {
  if (exchangeRate.rate === 0 || !amount) {
    return 0;
  }

  return (amount * exchangeRate.amount) / exchangeRate.rate;
}
