import { testFunction } from "../src/index";

describe('The boiler plate project', () => {
  
  test('should have set the GREETING env var', () => {
    expect(process.env.GREETING).toBe('world');
  })

  test('should return the correct string from the test function', () => {
    const testValue = testFunction();
    expect(testValue).toBe('hello, world!');
  })

})