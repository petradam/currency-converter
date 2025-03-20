import { CurrencyExchangeRate } from '../model/currency';

export function convertCurrency(amount: number, exchangeRate: CurrencyExchangeRate): number {
  return (amount * exchangeRate.amount) / exchangeRate.rate;
}
