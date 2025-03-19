import React, { useState } from "react";
import { CurrencyExchangeRate } from "./model/currency";

interface Props {
  exchangeRate: CurrencyExchangeRate;
}

const CurrencyConverter = ({ exchangeRate }: Props) => {
  const [amount, setAmount] = useState<number>(1);

  return (
    <div>
      <h2>
        {exchangeRate.currency} ({exchangeRate.code}): {exchangeRate.rate}
      </h2>
      <input
        type="number"
        value={amount}
        // todo use floating points instead of integers
        onChange={(e) => setAmount(parseInt(e.target.value, 10))}
        placeholder="Amount"
      />
      <p>
        {amount} {exchangeRate.currency} = {amount * exchangeRate.rate} CZK
      </p>
    </div>
  );
};

export default CurrencyConverter;
