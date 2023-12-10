import { Injectable } from '@nestjs/common';
import { UpdateTokenDto } from './dto/update-token.dto';
import { Token } from './entities/token.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { setExpiresAt } from 'src/helpers/expires.helper';

@Injectable()
export class TokensService {
  constructor(@InjectModel(Token.name) private tokenModel: Model<Token>) {}

  create(userId: string) {
    const token = new this.tokenModel({
      userId,
      expiresAt: setExpiresAt(),
    });
    return token.save();
  }

  findOne(id: string) {
    return this.tokenModel.findById(id);
  }

  update(id: string, updateTokenDto: UpdateTokenDto) {
    return this.tokenModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        updateTokenDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.tokenModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
