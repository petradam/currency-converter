import styled from 'styled-components';
import CurrencyConverter from './CurrencyConverter';
import { useExchangeRates } from './api/useExchangeRates';
import ConversionRateItem from './ConversionRateItem';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 12px;
  padding: 20px;
  background-color: #e9eff3;
`;

const CurrencyList = () => {
  const { data, error, isFetching } = useExchangeRates();

  if (isFetching) return <p>Loading exchange rates...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <ListContainer>
      {data && (
        <>
          <CurrencyConverter exchangeRates={data} />
          <h2>Todays conversion rates</h2>
          {data.map((rate) => (
            <ConversionRateItem rate={rate} key={rate.code} />
          ))}
        </>
      )}
    </ListContainer>
  );
};

export default CurrencyList;
