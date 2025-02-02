import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly zipCode: number;
  readonly instruments: Types.ObjectId[];
  readonly genres: Types.ObjectId[];
}
