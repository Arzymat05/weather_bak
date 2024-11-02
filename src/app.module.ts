import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {PrismaService} from "../prisma/prisma.service";
import {WeatherRepository} from "./repository/weather.repository";

@Module({
    controllers: [AppController],
    providers: [PrismaService, WeatherRepository],
})
export class AppModule {
}
