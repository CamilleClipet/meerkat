import { Document } from 'mongoose';

export interface IInstrument extends Document {
  readonly name: string;
}
