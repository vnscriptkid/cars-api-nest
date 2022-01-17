import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/CreateReportDto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly reportsRepo: Repository<Report>,
  ) {}

  async create(createReportDto: CreateReportDto, user: User) {
    const report = this.reportsRepo.create(createReportDto);

    report.user = user;

    return this.reportsRepo.save(report);
  }
}
