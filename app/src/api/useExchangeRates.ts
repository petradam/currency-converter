import { useQuery } from '@tanstack/react-query';
import { CurrencyExchangeRate } from '../model/currency';
import { parseExchangeRates } from '../helpers/parseExchangeRates';

export const useExchangeRates = () => {
  return useQuery({
    queryKey: ['exchangeRates'],
    queryFn: async (): Promise<Array<CurrencyExchangeRate>> => {
      const response = await fetch(
        'https://api.allorigins.win/raw?url=https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt'
      );

      return parseExchangeRates(await response.text());
    },
  });
};
