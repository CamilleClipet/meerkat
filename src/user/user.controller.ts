import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return response.status(HttpStatus.CREATED).json({
      message: 'User has been created successfully',
      newUser,
    });
  }

  @Delete('/:id')
  async deleteUser(@Res() response, @Param('id') userId: string) {
    try {
      const deletedUser = await this.userService.deleteUser(userId);
      return response.status(HttpStatus.OK).json({
        message: `User ${userId} deleted successfully`,
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getAllUsers(@Res() response) {
    const allUsers = await this.userService.getAllUsers();
    return response.status(HttpStatus.FOUND).json(allUsers);
  }

  @Get('/:id')
  async getUser(@Res() response, @Param('id') userId: string) {
    try {
      const user = await this.userService.getUser(userId);
      return response.status(HttpStatus.FOUND).json(user);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
