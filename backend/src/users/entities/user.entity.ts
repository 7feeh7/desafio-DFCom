import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop([{ type: 'ObjectId', ref: 'RefreshToken' }])
  refreshTokens: string[];

  @Prop()
  refreshTokenId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
