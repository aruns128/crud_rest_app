import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

export type UserDocument = User & Document;
@Schema()
export class User {
  @Prop()
  @IsNotEmpty()
  username: string;

  @Prop()
  @IsNotEmpty()
  description: string;

  @Prop({ default: Date.now })
  date_added: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
