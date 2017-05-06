const webworkerWrapper = jest.fn(() => {
  return {
    postMessage: jest.fn(),
  };
});

export default webworkerWrapper;
