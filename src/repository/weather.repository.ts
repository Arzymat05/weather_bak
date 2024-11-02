import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {createWeatherDto, updateWeatherDto} from "../dto/createWeather.dto";


@Injectable()
export class WeatherRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async update(dto: updateWeatherDto, lang: string, name: string) {
        if (lang === 'eng') {
            const user = await this.prisma.engWeather.findUnique({where: {name}});
            const ru = await this.prisma.ruWeather.update({where: {id: user.id}, data: {...dto}})
            const eng = await this.prisma.engWeather.update({where: {id: user.id}, data: {...dto}})
            return {eng, ru}
        }
        const user = await this.prisma.ruWeather.findUnique({where: {name}});
        const ru = await this.prisma.ruWeather.update({where: {id: user.id}, data: {...dto}})
        const eng = await this.prisma.engWeather.update({where: {id: user.id}, data: {...dto}})
        return {eng, ru}
    }

    async getWeather(lang: string) {
        if (lang === 'eng') {
            return this.prisma.engWeather.findMany();
        }
        return this.prisma.ruWeather.findMany();
    }

    async getOne(name: string, lang: string) {
        if (lang === 'eng') {
            return this.prisma.engWeather.findUnique({where: {name}});
        }
        return this.prisma.ruWeather.findUnique({where: {name}});
    }

    async delete(name: string, lang: string) {
        if (lang === 'eng') {
            const user = await this.prisma.engWeather.findFirst({where: {name}});
            const ru = await this.prisma.ruWeather.delete({where: {id: user.id}})
            const eng = await this.prisma.engWeather.delete({where: {id: user.id}})
            return {ru, eng}
        }
        const user = await this.prisma.ruWeather.findFirst({where: {name}});
        const ru = await this.prisma.ruWeather.delete({where: {id: user.id}})
        const eng = await this.prisma.engWeather.delete({where: {id: user.id}})
        return {ru, eng}
    }

    createLanguageTranslate(weather: createWeatherDto, lang: string) {
        if (lang == 'ru') {
            return this.prisma.ruWeather.create({
                data: {
                    name: weather.name,
                    temperature: weather.temperature,
                    day: weather.day,
                    humidity: weather.humidity,
                    pressure: weather.pressure,
                    wind: weather.wind,
                }
            })
        }
        return this.prisma.engWeather.create({
            data: {
                name: weather.name,
                temperature: weather.temperature,
                day: weather.day,
                humidity: weather.humidity,
                pressure: weather.pressure,
                wind: weather.wind,
            }
        })
    }
}