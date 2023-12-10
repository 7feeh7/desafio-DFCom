import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Token extends Document {
  @Prop({ default: Date.now })
  expiresAt: Date;

  @Prop({ type: 'ObjectId', ref: 'User' })
  user: string;

  @Prop()
  userId: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
