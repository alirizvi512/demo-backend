import { Injectable, Inject } from '@nestjs/common';
import { Hash } from 'src/utils/hash';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async login(loginDto: LoginDto): Promise<any> {
    const userObj = await this.userRepository.findOne({
      email: loginDto.email
    });
    if (userObj) {
      if (Hash.verifyHash(loginDto.password, userObj.password)) {
        const payload = { email: userObj.email };
        return { data: this.jwtService.sign(payload), message: 'Success' };
      } else {
        return { message: 'Invalid Password' }
      }
    } else {
      return { message: 'User Not Found' };
    }
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create({ email: createUserDto.email, password: await Hash.createHash(createUserDto.password) });
  }

  async validateUser(email: string) {
    return await this.userRepository.findOne({ email: email});
  }
}