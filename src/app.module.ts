import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersModule } from './players/players.module';
import { MerchantModule } from './merchant/merchant.module';
import { dataSourceOptions } from 'src/config/config.service';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), PlayersModule, MerchantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
