import styled from 'styled-components';
import { ExchangeRate } from './model/exchangeRate';

const ItemStyle = styled.div`
  padding: 5px;
  width: 100%;
  max-width: 500px;
  border-radius: 8px;

  h2 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    line-height: 1.4;
  }

  p {
    font-size: 1rem;
    color: #666;
    margin: 5px 0;
  }

  .currency {
    color: #007bff;
    font-weight: 700;
  }

  .country {
    color: #888;
    font-weight: 400;
  }

  .rate {
    color: #28a745;
    font-weight: 600;
  }

  .code {
    color: #6f42c1;
    font-weight: 500;
  }
`;

interface Props {
  rate: ExchangeRate;
}

const ConversionRateItem = ({ rate }: Props) => {
  return (
    <ItemStyle key={rate.code}>
      <h2>
        <span className="currency">{rate.amount} </span>
        <span className="code">{rate.code} </span>
        <span className="country">{`(${rate.country} ${rate.currency}) `}</span>={' '}
        <span className="rate"> {rate.rate}</span> CZK
      </h2>
    </ItemStyle>
  );
};

export default ConversionRateItem;
