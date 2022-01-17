import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/CreateReportDto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly reportsRepo: Repository<Report>,
  ) {}

  async create(createReportDto: CreateReportDto) {
    const report = this.reportsRepo.create(createReportDto);

    return this.reportsRepo.save(report);
  }
}
