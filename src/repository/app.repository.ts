import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { updateWeatherDto, createWeatherDto } from 'src/dto/createWeather.dto';

@Injectable()
export class WeatherRepository {
  constructor(private readonly prisma: PrismaService) {}
  async update(dto: updateWeatherDto, name: string) {
    return await this.prisma.weather.update({
      where: { name },
      data: { ...dto },
    });
  }
  async get() {
    return await this.prisma.weather.findMany();
  }
  async getOne(name: string) {
    return await this.prisma.weather.findUnique({ where: { name } });
  }

  async delete(name: any) {
    return await this.prisma.weather.delete({ where: { name: name.name } });
  }
  async create(dto: createWeatherDto) {
    return await this.prisma.weather.create({ data: { ...dto } });
  }
}
