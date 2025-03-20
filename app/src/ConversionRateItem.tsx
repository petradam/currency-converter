import styled from 'styled-components';
import { ExchangeRate } from './model/exchangeRate';

interface StyledProps {
  size?: 'normal' | 'smaller';
  display?: 'normal' | 'condensed';
}

const ItemStyle = styled.div<StyledProps>`
  display: ${({ display }) => (display === 'normal' ? 'flex' : 'unset')};
  justify-content: ${({ display }) => (display === 'normal' ? 'space-between' : 'unset')};
  padding: 8px 0;
  width: 100%;
  margin: 0;
  font-size: ${({ size }) => (size === 'smaller' ? '1rem' : '1.1rem')};
  font-weight: 600;
  color: #222;
  line-height: 1.4;
  text-align: center;

  .currency {
    color: #ff4f5e;
    font-weight: 700;
  }

  .country {
    color: #6c757d;
    font-weight: 400;
  }

  .rate {
    color: #12c2e9;
    font-weight: 600;
  }

  .code {
    color: #7360f2;
    font-weight: 500;
  }
`;

interface Props {
  rate: ExchangeRate;
  size?: 'normal' | 'smaller';
  display?: 'normal' | 'condensed';
}

const ConversionRateItem = ({ rate, size = 'normal', display = 'normal' }: Props) => {
  return (
    <ItemStyle key={rate.code} size={size} display={display}>
      <span>
        <span className="currency">{rate.amount} </span>
        <span className="code">{rate.code} </span>
        <span className="country">
          ({rate.country} {rate.currency})
        </span>
        {display === 'condensed' && <span>&nbsp;=&nbsp;</span>}
      </span>
      <span>
        <span className="rate">{rate.rate}</span> CZK
      </span>
    </ItemStyle>
  );
};

export default ConversionRateItem;
