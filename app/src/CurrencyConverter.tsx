import styled from 'styled-components';
import { useState } from 'react';
import { ExchangeRate } from './model/exchangeRate';
import { convertCurrency } from './helpers/convertCurrency';
import ConversionRateItem from './ConversionRateItem';

const ConversionForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

interface Props {
  exchangeRates: ExchangeRate[];
}

const CurrencyConverter = ({ exchangeRates }: Props) => {
  const [amount, setAmount] = useState<number>(1);
  const [selectedExchangeRate, setSelectedExchangeRate] = useState<ExchangeRate>(exchangeRates[0]);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = e.target.value;
    const rate = exchangeRates.find((rate) => rate.code === selectedCode);
    if (rate) {
      setSelectedExchangeRate(rate);
    }
  };

  return (
    <div>
      <ConversionForm>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Amount (CZK)"
          step="0.001"
        />

        <span>CZK</span>

        <p> = {convertCurrency(amount, selectedExchangeRate).toFixed(3)}</p>

        <select onChange={handleCurrencyChange} value={selectedExchangeRate.code}>
          {exchangeRates.map((rate) => (
            <option key={rate.code} value={rate.code}>
              {rate.code} ({rate.country} {rate.currency})
            </option>
          ))}
        </select>
      </ConversionForm>

      <ConversionRateItem rate={selectedExchangeRate} />
    </div>
  );
};

export default CurrencyConverter;
