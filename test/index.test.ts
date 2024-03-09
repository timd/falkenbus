
describe('The boiler plate project', () => {
  test('should have set the GREETING env var', () => {
    expect(process.env.GREETING).toBe('world');
  })
})