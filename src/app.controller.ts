import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.models';
import { identity } from 'rxjs';
import { UserUpdateDto } from './user.udpate.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createUser(@Body() userDto: User) {
    return this.appService.createUser(userDto);
  }

  @Get()
  async readUser() {
    return this.appService.readUser();
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: UserUpdateDto,
  ): Promise<User> {
    return this.appService.updateUser(id, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(id);
  }
}
