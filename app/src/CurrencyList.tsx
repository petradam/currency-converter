import styled from 'styled-components';
import ConversionRateItem from './ConversionRateItem';
import { ExchangeRate } from './model/exchangeRate';

const ComponentStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px 0;
`;

const ListContainer = styled.div`
  padding: 15px;
  width: 100%;
  max-width: 450px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  background-color: #f7f7f7;
`;

interface Props {
  exchangeRates: ExchangeRate[];
}

const CurrencyList = ({ exchangeRates }: Props) => {
  return (
    <ComponentStyle>
      <h2>Todays conversion rates</h2>
      <ListContainer>
        {exchangeRates.map((rate) => (
          <ConversionRateItem rate={rate} key={rate.code} />
        ))}
      </ListContainer>
    </ComponentStyle>
  );
};

export default CurrencyList;
