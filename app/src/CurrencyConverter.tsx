import React, { useState } from "react";
import { CurrencyExchangeRate } from "./model/currency";
import { convertCurrency } from "./helpers/convertCurrency";

interface Props {
  exchangeRate: CurrencyExchangeRate;
}

const CurrencyConverter = ({ exchangeRate }: Props) => {
  const [amount, setAmount] = useState<number>(1);

  return (
    <div>
      <h2>
        {exchangeRate.amount} {exchangeRate.currency} ({exchangeRate.code}):{" "}
        {exchangeRate.rate}
      </h2>
      <input
        type="number"
        value={amount}
        // todo use floating points instead of integers
        onChange={(e) => setAmount(parseInt(e.target.value, 10))}
        placeholder="Amount"
      />
      <div>
        {amount > 0 && (
          <p>
            {amount} {exchangeRate.currency} =
            <span> {convertCurrency(amount, exchangeRate).toFixed(3)} CZK</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
