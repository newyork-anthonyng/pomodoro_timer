import localStorage from './localStorage';

beforeEach(() => {
  window.localStorage = {
    getItem: jest.fn(() => '[{ "foo": "bar" }]'),
    setItem: jest.fn(),
  };
});

describe('localStorage.get', () => {
  it('should get items from localStorage', () => {
    const result = localStorage.get();

    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem.mock.calls[0]).toMatchSnapshot();
    expect(result).toMatchSnapshot();
  });

  it('should return empty array if there is an error', () => {
    window.localStorage.getItem = jest.fn(() => {
      return '{INVALID_JSON';
    });
    let result;

    expect(() => {
      result = localStorage.get();
    }).not.toThrow();
    expect(result).toMatchSnapshot();
  });
});

describe('localStorage.updateTasks', () => {
  it('should set items in localStorage', () => {
    localStorage.set([{ foo: 'bar' }]);

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.setItem.mock.calls[0]).toMatchSnapshot();
  });
});
