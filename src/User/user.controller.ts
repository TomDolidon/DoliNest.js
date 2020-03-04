import { Controller, Get, UnauthorizedException, InternalServerErrorException, Req, HttpStatus, Post, HttpCode, Redirect, Body, Param, Put, NotFoundException, Delete } from '@nestjs/common';
import { Request } from 'express';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userservice: UserService) { }

  @Get()
  getUsers(): Promise<User[]> {
    return this.userservice.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {

    const user = new User();

    user.firstName = createUserDto.firstName
    user.lastName = createUserDto.lastName
    user.email = createUserDto.email
  
    return user.save();
  }


  @Get(':id')
  async findOne(@Param() params): Promise<User> {
    const user = await this.userservice.findOne(params.id);

    if(!user) {
      throw new NotFoundException()
    }

    return user;
  }

  @Put(':id')
  updateUser(@Param() params, @Body() updateUserDto : UpdateUserDto ): Promise<User> {

    return this.userservice.update(params.id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param() params): Promise<void> {

    return this.userservice.delete(params.id);
  }

}
