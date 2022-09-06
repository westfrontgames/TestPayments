import { CurrencyOrDefaultPipe } from './currency-or-default.pipe';

describe('CurrencyOrDefaultPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyOrDefaultPipe();
    expect(pipe).toBeTruthy();
  });
});
