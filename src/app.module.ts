import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'prisma/prisma.service';
import { WeatherRepository } from './repository/app.repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, WeatherRepository],
})
export class AppModule {}
