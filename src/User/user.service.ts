
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

 /* update(id: number, user : Partial<User>) {
    return this.usersRepository.update(id, user)
  } */

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    let toUpdate = await this.userRepository.findOne(id);

    //delete toUpdate.password;
    //delete toUpdate.favorites;

    let updated = Object.assign(toUpdate, dto);
    return await this.userRepository.save(updated);
  }
}