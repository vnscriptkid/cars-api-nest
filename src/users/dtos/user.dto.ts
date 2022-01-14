import { Expose } from 'class-transformer';

// shape of user to be shown to outside world
export class UserDto {
  @Expose()
  id: number;

  @Expose() // >< @Exclude()
  email: string;
}
