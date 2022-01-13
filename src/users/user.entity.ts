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
