import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Instrument } from '../schema/instrument.schema';
import { Genre } from '../schema/genre.schema';
import { Model } from 'mongoose';
import { instrumentFactory } from '../instrument/instrument.factory';
import { genreFactory } from '../genre/genre.factory';

const mockUserModel = {
  create: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
};
const mockUserModelClass = jest.fn().mockImplementation(() => ({
  save: mockUserModel.save, // mock save method on the instance
}));

const mockInstrumentModel = {
  findOne: jest.fn(),
  save: jest.fn(),
};

const mockGenreModel = {
  findOne: jest.fn(),
  save: jest.fn(),
};

describe('UserService', () => {
  let userService: UserService;
  let instrumentModel: Model<Instrument>;
  let genreModel: Model<Genre>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'), // Mock the UserModel here
          useValue: mockUserModelClass, // Mock the class constructor
        },
        {
          provide: getModelToken('Instrument'), // Mock the InstrumentModel here
          useValue: mockInstrumentModel, // Use the mock
        },
        {
          provide: getModelToken('Genre'), // Mock the GenreModel here
          useValue: mockGenreModel, // Use the mock
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    instrumentModel = module.get<Model<Instrument>>(
      getModelToken('Instrument'),
    );
    genreModel = module.get<Model<Genre>>(getModelToken('Genre'));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a user', async () => {
    const mockInstrument = instrumentFactory({ name: 'Guitar' });
    const mockGenre = genreFactory({ name: 'Rock' });

    // Mock `findOne` and ensure that it returns an object with an `exec` method
    mockInstrumentModel.findOne.mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockInstrument),
    });
    mockGenreModel.findOne.mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockGenre),
    });

    mockUserModel.save.mockResolvedValue({
      firstName: 'Alex',
      lastName: 'Gaskarth',
      zipCode: 1720,
      instruments: [{ id: 'instrument-id', name: 'Guitar' }],
      genres: [{ id: 'genre-id', name: 'Rock' }],
    });

    const userData = {
      firstName: 'Alex',
      lastName: 'Gaskarth',
      zipCode: 1720,
      instruments: ['Guitar'],
      genres: ['Rock'],
    };

    const user = await userService.createUser(userData);

    expect(user).toBeDefined();
    expect(user.firstName).toBe('Alex');
    expect(user.lastName).toBe('Gaskarth');
    expect(user.instruments).toEqual([{ id: 'instrument-id', name: 'Guitar' }]);
    expect(user.genres).toEqual([{ id: 'genre-id', name: 'Rock' }]);

    expect(instrumentModel.findOne).toHaveBeenCalledWith({ name: 'Guitar' });
    expect(genreModel.findOne).toHaveBeenCalledWith({ name: 'Rock' });
  });
});
