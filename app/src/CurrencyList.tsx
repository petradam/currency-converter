import { CurrencyExchangeRate } from "./model/currency";
import { parseExchangeRates } from "./helpers/parseExchangeRates";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CurrencyConverter from "./CurrencyConverter";

function useExchangeRates() {
  return useQuery({
    queryKey: ["exchangeRates"],
    queryFn: async (): Promise<Array<CurrencyExchangeRate>> => {
      const response = await fetch(
        "https://api.allorigins.win/raw?url=https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"
      );

      return parseExchangeRates(await response.text());
    },
  });
}

const CurrencyList = () => {
  const { status, data, error, isFetching } = useExchangeRates();
  const [selectedExchangeRate, setSelectedExchangeRate] = useState<CurrencyExchangeRate | null>()

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <>
      {selectedExchangeRate && <CurrencyConverter exchangeRate={selectedExchangeRate} />}
      {data && (
        <ul>
          {data.map((exchangeRate) => (
            <li key={exchangeRate.code} onClick={() => setSelectedExchangeRate(exchangeRate)}>
              {exchangeRate.currency} ({exchangeRate.code}): {exchangeRate.rate}{" "}
              {exchangeRate.country}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CurrencyList;
