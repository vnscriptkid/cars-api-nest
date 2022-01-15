import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.usersService.find(email);

    if (users.length > 0) throw new BadRequestException('Email already exists');

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const finalHash = salt + '.' + hash.toString('hex');

    const user = await this.usersService.create(email, finalHash);

    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) throw new BadRequestException('Invalid credentials.');

    const [salt, hash] = user.password.split('.');

    const calculatedHash = (await scrypt(password, salt, 32)) as Buffer;

    if (calculatedHash.toString('hex') !== hash)
      throw new BadRequestException('Invalid credentials.');

    return user;
  }
}
