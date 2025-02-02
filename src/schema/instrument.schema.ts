import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Instrument {
  @Prop({ unique: true })
  name: string;
}

export const InstrumentSchema = SchemaFactory.createForClass(Instrument);
