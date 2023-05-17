import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.models';
import { UserUpdateDto } from './user.udpate.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  // create user
  async createUser(user: User) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  // reading the user collection
  async readUser() {
    return this.userModel
      .find({})
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }

  // updating the data
  async updateUser(id: string, data: UserUpdateDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, data, { new: true });
  }

  // delete the data
  async deleteUser(id: string) {
    return this.userModel.findByIdAndRemove(id, { new: true });
  }
}
