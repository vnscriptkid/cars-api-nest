import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  let fakeAuthService: Partial<AuthService>;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeAuthService = {
      signup: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
      signin: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    fakeUsersService = {
      findOne: (id: number) =>
        Promise.resolve({ id, email: 'someone@gmail.com' } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createUser should returns correct user', async () => {
    const session: any = {};

    const user = await controller.createUser(
      { email: 'someone@gmail.com', password: '123456' } as User,
      session,
    );

    expect(user).toMatchObject({
      id: 1,
      email: 'someone@gmail.com',
      password: '123456',
    });

    expect(session.userId).toBe(1);
  });

  it('signin should return correct user', async () => {
    const session: any = {};

    const user = await controller.signIn(
      { email: 'someone@gmail.com', password: '123456' },
      session,
    );

    expect(user).toMatchObject({
      id: 1,
      email: 'someone@gmail.com',
      password: '123456',
    });

    expect(session.userId).toBe(1);
  });

  it('findUser should return correct user', async () => {
    const user = await controller.findUser('1');

    expect(user).toMatchObject({
      id: 1,
      email: 'someone@gmail.com',
    });
  });

  it('findUser throws NotFound if there is no matching user', async () => {
    fakeUsersService.findOne = () => Promise.resolve(null);

    controller.findUser('1').catch((e) => {
      expect(e.message).toBe('User not found.');
    });
  });
});
