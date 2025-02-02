import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { GenreSchema } from './schema/genre.schema';
import { InstrumentSchema } from './schema/instrument.schema';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { InstrumentService } from './instrument/instrument.service';
import { GenreService } from './genre/genre.service';
import { GenreController } from './genre/genre.controller';
import { InstrumentController } from './instrument/instrument.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'meerkatdb',
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Genre', schema: GenreSchema }]),
    MongooseModule.forFeature([
      { name: 'Instrument', schema: InstrumentSchema },
    ]),
  ],
  controllers: [
    AppController,
    UserController,
    GenreController,
    InstrumentController,
  ],
  providers: [AppService, UserService, InstrumentService, GenreService],
})
export class AppModule {}
