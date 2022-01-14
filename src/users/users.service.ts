import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  create(email: string, password: string) {
    const user = this.usersRepo.create({ email, password });

    return this.usersRepo.save(user);
  }

  findOne(id: number) {
    return this.usersRepo.findOne(id);
  }

  find(email: string) {
    return this.usersRepo.find({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found.');

    Object.assign(user, attrs);

    return this.usersRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found.');

    return this.usersRepo.remove(user);
  }
}
