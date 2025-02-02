import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  zipCode: number;

  @Prop({ type: [Types.ObjectId], ref: 'Instrument' }) // Reference to Instrument schema
  instruments: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Genre' }) // Reference to Genre schema
  genres: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
