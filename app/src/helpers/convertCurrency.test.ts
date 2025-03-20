import { describe, expect, it } from 'vitest';
import { convertCurrency } from './convertCurrency';
import { ExchangeRate } from '../model/exchangeRate';

describe('convertCurrency', () => {
  it('should return 0 when exchange rate is 0', () => {
    const exchangeRate = { amount: 1, rate: 0 } as ExchangeRate;
    const amountToConvert = 123;

    expect(convertCurrency(amountToConvert, exchangeRate)).toEqual(0);
  });

  it('should return 0 when amount is 0', () => {
    const exchangeRate = { amount: 1, rate: 1 } as ExchangeRate;
    const amountToConvert = 0;

    expect(convertCurrency(amountToConvert, exchangeRate)).toEqual(0);
  });

  it('should return correct calculation when exchange rate amount equals 1', () => {
    const exchangeRate = { amount: 1, rate: 3.1415 } as ExchangeRate;
    const amountToConvert = 123;

    expect(convertCurrency(amountToConvert, exchangeRate)).toBeCloseTo(39.153, 3);
  });

  it('should return correct calculation when exchange rate amount equals 100', () => {
    const exchangeRate = { amount: 100, rate: 3.1415 } as ExchangeRate;
    const amountToConvert = 123;

    expect(convertCurrency(amountToConvert, exchangeRate)).toBeCloseTo(3915.327, 3);
  });
});
