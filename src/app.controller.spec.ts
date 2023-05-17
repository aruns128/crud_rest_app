import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, UserDocument } from './user.models';
import { UserUpdateDto } from './user.udpate.dto';
import { getModelToken } from '@nestjs/mongoose';

import { Document } from 'mongoose';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: getModelToken('user'), // Replace 'User' with your actual model name
          useValue: {}, // Provide a mock or stub object for the userModel dependency
        },
      ],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
  });
  describe('createUser', () => {
    it('should create a new user', async () => {
      const dateString = '2023-05-17';
      const dateObject = new Date(dateString);

      const userDto: User = {
        username: 'arunkumar',
        description: 'test for test',
        date_added: dateObject,
      };

      jest
        .spyOn(appService, 'createUser')
        .mockImplementation(async () => userDto as any);

      expect(await appController.createUser(userDto)).toBe(userDto);
    });
  });

  describe('readUser', () => {
    it('should read users', async () => {
      const dateString = '2023-05-17';
      const dateObject = new Date(dateString);
      const users: User[] = [
        {
          username: 'arunkumar',
          description: 'test for test',
          date_added: dateObject,
        },
      ];

      jest
        .spyOn(appService, 'readUser')
        .mockImplementation(async () => users as any);

      expect(await appController.readUser()).toBe(users);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const userId = '1';
      const userData: UserUpdateDto = {
        description: 'check update',
      };

      jest.spyOn(appService, 'updateUser').mockImplementation(
        async () =>
          ({
            id: userId,
            ...userData,
          } as any),
      );

      expect(await appController.updateUser(userId, userData)).toEqual({
        id: userId,
        ...userData,
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userId = '1';

      jest.spyOn(appService, 'deleteUser').mockImplementation(async () => null);

      expect(await appController.deleteUser(userId)).toBeNull();
    });
  });
});
