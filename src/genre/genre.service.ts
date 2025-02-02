import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGenre } from '../interface/genre.interface';
import { CreateGenreDto } from '../dto/create-genre.dto';

@Injectable()
export class GenreService {
  constructor(@InjectModel('Genre') private genreModel: Model<IGenre>) {}

  async createGenre(createGenreDto: CreateGenreDto) {
    const existingGenre = await this.genreModel
      .findOne({ name: createGenreDto.name })
      .exec();
    if (existingGenre) {
      throw new ConflictException('A genre with this name already exists');
    }
    const newGenre = new this.genreModel(createGenreDto);
    return newGenre.save();
  }

  async findAllGenres(){
    const allGenres = await this.genreModel.find();
    return allGenres;
  }
}
