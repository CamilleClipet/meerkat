import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { CreateInstrumentDto } from '../dto/create-instrument.dto';

@Controller('instrument')
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {
  }

  @Post()
  async createInstrument(
    @Res() response,
    @Body() createInstrumentDto: CreateInstrumentDto,
  ) {
    try {
      const newInstrument =
        await this.instrumentService.createInstrument(createInstrumentDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'new instrument successfully created',
        newInstrument,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Instrument not created!',
        error: err,
      });
    }
  }
}
