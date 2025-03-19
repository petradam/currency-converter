import { CurrencyExchangeRate } from './model/currency';
import { parseExchangeRates } from './helpers/parseExchangeRates';
import { useQuery } from '@tanstack/react-query';

export function CurrencyConverter() {

    function useExchangeRates() {
        return useQuery({
          queryKey: ['exchangeRates'],
          queryFn: async (): Promise<Array<CurrencyExchangeRate>> => {
            const response = await fetch('https://api.allorigins.win/raw?url=https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt');
      
            return parseExchangeRates(await response.text());
          },
        })
      }
    
    const { status, data, error, isFetching } = useExchangeRates();

    if (isFetching) return <p>Loading...</p>;
    if (error) return <p>Something went wrong!</p>;

    return   <>{data && <ul>
        {data.map(exchangeRate => (
          <li key={exchangeRate.code}>{exchangeRate.currency}</li>
        ))}
      </ul>}  </>;    
  };


// TODO good ol fetch way  
// const fetchExchangeRates = async () => {
//   const response = await fetch('https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt');
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }

//   return parseExchangeRates(await response.text());
// };