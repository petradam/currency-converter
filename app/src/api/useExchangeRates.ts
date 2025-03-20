import { useQuery } from '@tanstack/react-query';
import { ExchangeRate } from '../model/exchangeRate';
import { parseExchangeRates } from '../helpers/parseExchangeRates';

// https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/
// rates are updated daily after 14:30 CET
const getTimeUntilNextFetch = (): number => {
  const now = new Date();

  // TODO improve to work with Daylight Saving Time
  const utcOffset = 1;
  const nextFetchTime = new Date(now.setHours(15, 0, 0, 0)); // 15:00 CET

  nextFetchTime.setHours(nextFetchTime.getHours() + utcOffset);

  if (now > nextFetchTime) {
    nextFetchTime.setDate(nextFetchTime.getDate() + 1); // Next day
  }

  return nextFetchTime.getTime() - now.getTime();
};

export const useExchangeRates = () => {
  return useQuery({
    queryKey: ['exchangeRates'],
    queryFn: async (): Promise<Array<ExchangeRate>> => {
      const response = await fetch(
        'https://api.allorigins.win/raw?url=https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt'
      );
      return parseExchangeRates(await response.text());
    },
    staleTime: 24 * 3600 * 1000, // 24 hours
    refetchInterval: getTimeUntilNextFetch(), // Refetch at 15:00 CET each day
  });
};
