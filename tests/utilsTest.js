import { convertCurrency } from "../scripts/util.js";

describe('test suite : convertCurrency', () => { // Name of suite
  it('Converts cents into dollars', () => {  //Name of Test
    expect(convertCurrency(2095)).toEqual('20.95');  //Function to compare values
  });
  it('Works with 0', () => {
    expect(convertCurrency(0)).toEqual('0.00');
  });
  it('Rounds up to the nearest cent', () => {
    expect(convertCurrency(2000.5)).toEqual('20.01');
  });
  it('Rounds up to the nearest cent', () => {
    expect(convertCurrency(2000.4)).toEqual('20.00');
  });
  it('Works with negative numbers', () => {
    expect(convertCurrency(-1000)).toEqual('-10.00');
  });
});