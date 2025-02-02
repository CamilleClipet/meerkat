import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IInstrument } from '../interface/instrument.interface';
import { Model } from 'mongoose';
import { CreateInstrumentDto } from '../dto/create-instrument.dto';

@Injectable()
export class InstrumentService {
  constructor(
    @InjectModel('Instrument') private instrumentModel: Model<IInstrument>,
  ) {}

  async createInstrument(createInstrumentDto: CreateInstrumentDto) {
    const existingInstrument = await this.instrumentModel
      .findOne({ name: createInstrumentDto.name })
      .exec();
    if (existingInstrument) {
      throw new ConflictException(
        'An instrument with this name already exists',
      );
    }

    const instrument = new this.instrumentModel(createInstrumentDto);
    return instrument.save();
  }
}
