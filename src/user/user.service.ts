import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../interface/user.interface';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IInstrument } from '../interface/instrument.interface';
import { IGenre } from '../interface/genre.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    @InjectModel('Instrument') private instrumentModel: Model<IInstrument>,
    @InjectModel('Genre') private genreModel: Model<IGenre>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const instrumentIds: Types.ObjectId[] = [];
    const genreIds: Types.ObjectId[] = [];

    // check instruments
    for (const instrument of createUserDto.instruments) {
      const existingInstrument = await this.instrumentModel
        .findOne({ name: instrument })
        .exec();
      if (!existingInstrument) {
        throw new ConflictException(
          `No instrument with the name ${instrument} exists`,
        );
      }
      instrumentIds.push(existingInstrument._id as Types.ObjectId);
    }
    // check genres
    for (const genre of createUserDto.genres) {
      const existingGenre = await this.genreModel
        .findOne({ name: genre })
        .exec();
      if (!existingGenre) {
        throw new ConflictException(`No genre with this name ${genre} exists`);
      }
      genreIds.push(existingGenre._id as Types.ObjectId);
    }

    const newUser = new this.userModel({
      ...createUserDto, // Copy all properties from the DTO
      zipCode: +createUserDto.zipCode,
      instruments: instrumentIds, // Set the instruments to an array of ObjectIds
      genres: genreIds, // Set the genres to an array of ObjectIds
    });
    return newUser.save();
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUser;
  }

  async getAllUsers(): Promise<IUser[]> {
    const userData = await this.userModel.find();
    if (!userData || userData.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return userData;
  }

  async getUser(userId: string): Promise<IUser> {
    const existingUser = await this.userModel
      .findById(userId)
      .populate('instruments')
      .populate('genres')
      .exec();
    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUser;
  }

  async deleteUser(userId: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return deletedUser;
  }
}
