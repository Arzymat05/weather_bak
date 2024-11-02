import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    Res,
} from '@nestjs/common';
import {updateWeatherDto, createWeatherDto} from './dto/createWeather.dto';
import {isAdmin} from './dto/isAdmin.dto';
import {WeatherRepository} from "./repository/weather.repository";

@Controller()
export class AppController {
    constructor(private readonly Arzymat: WeatherRepository) {
    }

    @Patch('update/:city/:lang')
    async update(
        @Param('city') name: string,
        @Param('lang') lang: string,
        @Body() dto: updateWeatherDto,
        @Req() req: any,
        @Res() res: any,
    ) {
        const weather = await this.Arzymat.update(dto, lang, name);
        res.status(201).json(weather);
    }

    @Get('get/:lang')
    async get(@Param('lang') lang: string, @Req() req: any, @Res() res: any) {
        const weather = await this.Arzymat.getWeather(lang);
        res.status(201).json(weather);
    }

    @Get('get/:name/:lang')
    async getOne(@Param('name') name: string, @Param('lang') lang: string, @Req() req: any, @Res() res: any) {
        const weather = await this.Arzymat.getOne(name, lang);
        res.status(201).json(weather);
    }

    @Post('create/:lang')
    async create(
        @Param('lang') lang: string,
        @Body() dto: createWeatherDto[],
        @Req() req: any,
        @Res() res: any,
    ) {
        const result = [];
        for (let cityWeather of dto) {
            const weather = await this.Arzymat.createLanguageTranslate(cityWeather, lang);
            result.push(weather)
        }
        res.status(201).json(result);
    }

    @Delete('delete/:name/:lang')
    async delete(@Param('name') name: string, @Param('lang') lang: string, @Req() req: any, @Res() res: any) {
        const weather = await this.Arzymat.delete(name, lang);
        res.status(201).json(weather);
    }

    @Delete('deleteOne/:name/:lang')
    async deleteOne(@Param('name') name: string, @Param('lang') lang: string, @Req() req: any, @Res() res: any) {
        const weather = await this.Arzymat.deleteOne(name, lang);
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
