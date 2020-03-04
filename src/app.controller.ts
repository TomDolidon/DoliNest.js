import { Controller, Get, UnauthorizedException, InternalServerErrorException, Req, HttpStatus, Post, HttpCode, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { User } from './User/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  // @HttpCode(402)
  getHello(@Req() request: Request): string {
    console.log(request.query);

    

    // throw new InternalServerErrorException();
    return this.appService.getHello();
  }

  @Post()
  create(): Promise<User> {

    const user = new User();

    user.firstName = "Romain"
    user.lastName = "le boss"

  
    return user.save();

  }

  @Get('bla*')
  @Redirect('localhost:3000/', 301)
  findAll() {
    return 'This route uses a wildcard';
  }

}
