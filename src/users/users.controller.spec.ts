import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const fakeAuthService = {
      signup: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password }),
      signin: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password }),
    };

    const fakeUsersService = {};

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
});
