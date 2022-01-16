import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService, fakerUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakerUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakerUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates new user with a salted and hashed password', async () => {
    const user = await service.signup('thanh@gmail.com', '123456');

    expect(user.password).not.toEqual('123456');

    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws error if user signs up with email that already exists', async () => {
    fakerUsersService.find = (email: string) =>
      Promise.resolve([
        { id: 1, email: 'someone@gmail.com', password: 'xyzabc' } as User,
      ]);

    service.signup('someone@gmail.com', '123456').catch((e) => {
      expect(e.message).toBe('Email already exists');
    });
  });

  it('throws error if user signs in with email that does not exist', async () => {
    service.signin('someone@gmail.com', '123456').catch((e) => {
      expect(e.message).toBe('Invalid credentials.');
    });
  });

  it('throws error if password is incorrect', async () => {
    const user = await service.signup('someone@gmail.com', '123456');

    fakerUsersService.find = (email: string) =>
      Promise.resolve([
        {
          id: 1,
          email: 'someone@gmail.com',
          password: user.password,
        } as User,
      ]);

    service.signin('someone@gmail.com', 'incorrect-password').catch((e) => {
      expect(e.message).toBe('Invalid credentials.');
    });
  });

  it('returns user if password is correct', async () => {
    const user = await service.signup('someone@gmail.com', '123456');

    fakerUsersService.find = (email: string) =>
      Promise.resolve([
        {
          id: 1,
          email: 'someone@gmail.com',
          password: user.password,
        } as User,
      ]);

    const signedInUser = await service.signin('someone@gmail.com', '123456');

    expect(signedInUser).toMatchObject({
      id: 1,
      email: 'someone@gmail.com',
    });
  });
});
