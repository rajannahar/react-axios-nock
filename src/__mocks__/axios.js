export default {
  // get: jest.fn().mockResolvedValue({ data: {} })
  get: jest.fn(() => Promise.resolve({ data: {} }))
};
