import { CurrencyExchangeRate } from '../model/currency';

export const parseExchangeRates = (data: string): CurrencyExchangeRate[] => {
    const lines = data.trim().split("\n");
    const currencyLines = lines.slice(2); // skip headers
  
    return currencyLines.map(line => {
      const [country, currency, amount, code, rate] = line.split("|");
      return {
        country: country.trim(),
        currency: currency.trim(),
        amount: parseInt(amount.trim(), 10),
        code: code.trim(),
        rate: parseFloat(rate.trim())
      };
    });
  };