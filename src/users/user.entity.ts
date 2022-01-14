import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
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
