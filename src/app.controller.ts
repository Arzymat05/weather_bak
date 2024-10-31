import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { updateWeatherDto, createWeatherDto } from './dto/createWeather.dto';
import { WeatherRepository } from './repository/app.repository';
import { isAdmin } from './dto/isAdmin.dto';

@Controller()
export class AppController {
  constructor(private readonly Arzymat: WeatherRepository) {}

  @Patch('update/:city')
  async update(
    @Param('city') name: string,
    @Body() dto: updateWeatherDto,
    @Req() req: any,
    @Res() res: any,
  ) {
    const weather = await this.Arzymat.update(dto, name);
    res.status(201).json(weather);
  }
  @Get('get')
  async get(@Req() req: any, @Res() res: any) {
    const weather = await this.Arzymat.get();
    res.status(201).json(weather);
  }
  @Get('get/:city')
  async getOne(@Param('city') name: string, @Req() req: any, @Res() res: any) {
    const weather = await this.Arzymat.getOne(name);
    res.status(201).json(weather);
  }

  @Post('create')
  async create(
    @Body() dto: createWeatherDto,
    @Req() req: any,
    @Res() res: any,
  ) {
    const weather = await this.Arzymat.create(dto);
    res.status(201).json(weather);
  }
  @Delete('delete')
  async delete(@Body() name: string, @Req() req: any, @Res() res: any) {
    const weather = await this.Arzymat.delete(name);
    res.status(201).json(weather);
  }

  @Post('admin')
  async isAdmin(@Body() dto: isAdmin, @Req() req: any, @Res() res: any) {
    if ('admin' === dto.password && 'admin' === dto.name) {
      res.json(true);
    } else {
      res.json(false);
    }
  }
}
