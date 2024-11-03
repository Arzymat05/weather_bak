import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {createWeatherDto, updateWeatherDto} from "../dto/createWeather.dto";


@Injectable()
export class WeatherRepository {
    constructor(private readonly prisma: PrismaService) {
    }

    async update(dto: updateWeatherDto, lang: string, name: string) {
        const engWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        const ruWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
        const engWind = ["Windy", "Cloudy", "Sunny", "Precipitation", "Northern"]
        const ruWind = ["Ветрено", "Облачно", "Солнечно", "Осадки", "Северный"]
        let day = '';
        let wind = '';
        if (lang === 'eng') {
            for (let i = 0; i < engWeek.length; i++) {
                if (dto.day === engWeek[i]) {
                    day = ruWeek[i]
                }
            }
            for (let i = 0; i < engWind.length; i++) {
                if (dto.wind === engWind[i]) {
                    wind = ruWind[i]
                }
            }
            const user = await this.prisma.engWeather.findUnique({where: {name}});
            const ru = await this.prisma.ruWeather.update({
                where: {id: user.id},
                data: {temperature: dto.temperature, day, humidity: dto.humidity, pressure: dto.pressure, wind}
            })
            const eng = await this.prisma.engWeather.update({where: {id: user.id}, data: {...dto}})
            return {eng, ru}
        }
        for (let i = 0; i < ruWeek.length; i++) {
            if (dto.day === ruWeek[i]) {
                day = engWeek[i]
            }
        }
        for (let i = 0; i < ruWind.length; i++) {
            if (dto.wind === ruWind[i]) {
                wind = engWind[i]
            }
        }
        const user = await this.prisma.ruWeather.findUnique({where: {name}});
        const ru = await this.prisma.ruWeather.update({where: {id: user.id}, data: {...dto}})
        const eng = await this.prisma.engWeather.update({
            where: {id: user.id},
            data: {temperature: dto.temperature, day, humidity: dto.humidity, pressure: dto.pressure, wind}
        })
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

    async deleteOne(name: string, lang: string) {
        if (lang === 'eng') {
            return await this.prisma.engWeather.delete({where: {name}})
        }
        return await this.prisma.ruWeather.delete({where: {name}})
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
                    windSpeed: weather.windSpeed
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
                windSpeed: weather.windSpeed
            }
        })
    }
}