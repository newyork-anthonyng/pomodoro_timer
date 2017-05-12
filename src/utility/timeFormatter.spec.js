import timeFormatter from './timeFormatter';

it('should handle minutes', () => {
  const time = 25 * 60 * 1000; // 25 minutes

  expect(timeFormatter(time)).toEqual('25:00');
});

it('should handle seconds', () => {
  const time = 25 * 1000; // 25 seconds

  expect(timeFormatter(time)).toEqual('00:25');
});

it('should handle minutes and seconds', () => {
  const time = 25 * 1000 + 25 * 60 * 1000; // 25 minutes, 25 seconds

  expect(timeFormatter(time)).toEqual('25:25');
});

it('should handle 0 ms', () => {
  const time = 0;

  expect(timeFormatter(time)).toEqual('00:00');
});
