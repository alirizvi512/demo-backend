import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './../utils/constants';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [DatabaseModule, 
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    ...userProviders,
    UserService,
    LocalStrategy
  ],
})
export class UserModule {}