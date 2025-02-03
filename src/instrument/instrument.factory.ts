import { Types } from 'mongoose';

// Factory function to create an instrument
export const instrumentFactory = (overrides = {}) => {
  const instrumentData = {
    name: 'Guitar', // Default value
    _id: new Types.ObjectId(), // Ensure there's an _id by default
    ...overrides, // Allow overrides
  };

  // Returning a mock instance of the model (not saving it to DB)
  return instrumentData;
};
