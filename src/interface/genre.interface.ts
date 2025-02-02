import { Document } from 'mongoose';

export interface IGenre extends Document {
  readonly name: string;
}
