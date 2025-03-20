import styled, { css } from 'styled-components';
import { useState } from 'react';
import { ExchangeRate } from './model/exchangeRate';
import { convertCurrency } from './helpers/convertCurrency';
import ConversionRateItem from './ConversionRateItem';

const ConversionForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const formElementStyles = css`
  padding: 8px 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  color: #333;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

const Input = styled.input`
  ${formElementStyles}
  width: 100px;
  font-size: 1.1rem;
`;

const Select = styled.select`
  ${formElementStyles}
`;

const ConversionResult = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  color: #4a90e2;
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
    <ConversionForm>
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        placeholder="Amount"
        step="0.001"
      />
      <span>CZK</span>

      <ConversionResult>= {convertCurrency(amount, selectedExchangeRate).toFixed(3)}</ConversionResult>

      <Select onChange={handleCurrencyChange} value={selectedExchangeRate.code}>
        {exchangeRates.map((rate) => (
          <option key={rate.code} value={rate.code}>
            {rate.code} ({rate.country} {rate.currency})
          </option>
        ))}
      </Select>

      <ConversionRateItem rate={selectedExchangeRate} size="smaller" display="condensed" />
    </ConversionForm>
  );
};

export default CurrencyConverter;
