import { describe, expect, it } from 'vitest';
import { parseExchangeRates } from './parseExchangeRates';

describe('parseExchangeRates', () => {
  it('should return an empty array when given an empty string', () => {
    expect(parseExchangeRates('')).toEqual([]);
  });

  it('should correctly parse valid exchange rate data', () => {
    const input = `19 Mar 2025 #55
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|14.524
Brazil|real|1|BRL|4.038`;

    const expectedOutput = [
      { country: 'Australia', currency: 'dollar', amount: 1, code: 'AUD', rate: 14.524 },
      { country: 'Brazil', currency: 'real', amount: 1, code: 'BRL', rate: 4.038 },
    ];

    expect(parseExchangeRates(input)).toEqual(expectedOutput);
  });

  it('should correctly parse exchange rate data with leading/trailing whitespace', () => {
    const input = `19 Mar 2025 #55
      Country|Currency|Amount|Code|Rate
      Australia | dollar | 1 | AUD | 14.524
      Brazil|real|1|BRL|123.456`;

    const expectedOutput = [
      { country: 'Australia', currency: 'dollar', amount: 1, code: 'AUD', rate: 14.524 },
      { country: 'Brazil', currency: 'real', amount: 1, code: 'BRL', rate: 123.456 },
    ];

    expect(parseExchangeRates(input)).toEqual(expectedOutput);
  });
});
