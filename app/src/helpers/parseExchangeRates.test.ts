import { describe, expect, it } from 'vitest';

export function add(a: number, b: number): number {
  return a + b;
}

describe('add function', () => {
  it('adds two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('handles negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);
  });
});
