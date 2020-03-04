import { IsNotEmpty, IsEmail, IsNumber, ValidateNested, IsOptional } from 'class-validator'
import { User } from '../user.entity';

export class UpdateUserDto {

   // id: number;

    firstName: string;

    lastName: string;

    @IsOptional()
    @IsEmail()
    email: string;


    getUpdateValue() {
        return {firstName : this.firstName , lastName : this.lastName, email: this.email}
    }
}