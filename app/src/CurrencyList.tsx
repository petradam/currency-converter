import React, { useState } from 'react';
import styled from 'styled-components';
import CurrencyConverter from './CurrencyConverter';
import { useExchangeRates } from './api/useExchangeRates';
import { CurrencyExchangeRate } from './model/currency';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: var(--background-color);
  color: var(--color);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CurrencyItem = styled.div`
  padding: 15px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  background: var(--button-bg, #1a1a1a);
  color: var(--color);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.3s ease;

  &:hover {
    background: var(--hover-bg, #535bf2);
    transform: scale(1.02);
  }

  h2 {
    margin: 0;
    font-size: 1.2rem;
  }
`;

const CurrencyList = () => {
  const { data, error, isFetching } = useExchangeRates();
  const [selectedExchangeRate, setSelectedExchangeRate] = useState<CurrencyExchangeRate | null>(null);

  if (isFetching) return <p>Loading exchange rates...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <ListContainer>
      {selectedExchangeRate && <CurrencyConverter exchangeRate={selectedExchangeRate} />}
      {data && (
        <>
          <h2>Todays conversion rates</h2>
          {data.map((rate) => (
            <CurrencyItem key={rate.code} onClick={() => setSelectedExchangeRate(rate)}>
              <h2>
                {rate.currency} ({rate.code}): {rate.rate} ({rate.country})
              </h2>
            </CurrencyItem>
          ))}
        </>
      )}
      <pre>{JSON.stringify(selectedExchangeRate, null, 2)}</pre>
    </ListContainer>
  );
};

export default CurrencyList;
