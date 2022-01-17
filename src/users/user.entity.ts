import { Exclude } from 'class-transformer';
import { Report } from 'src/reports/report.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  // @Exclude() // exclude while serializing into object
  password: string;

  @Column({ default: true })
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  /* HOOKS */
  @AfterInsert()
  logInsert() {
    console.log(`New user #${this.id} has been inserted.`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`New user #${this.id} has been updated.`);
  }

  @AfterRemove()
  logAfterInsert() {
    console.log(`New user #${this.id} has been deleted.`);
  }
}
