import styled from 'styled-components';
import CurrencyConverter from './CurrencyConverter';
import { useExchangeRates } from './api/useExchangeRates';
import CurrencyList from './CurrencyList';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CurrencyConverterPage = () => {
  const { data, error, isFetching } = useExchangeRates();

  return (
    <PageContainer>
      {isFetching && <p>Loading exchange rates...</p>}
      {error && <p>Something went wrong!</p>}
      {data && (
        <>
          <CurrencyConverter exchangeRates={data} />

          <CurrencyList exchangeRates={data} />
        </>
      )}
    </PageContainer>
  );
};

export default CurrencyConverterPage;
