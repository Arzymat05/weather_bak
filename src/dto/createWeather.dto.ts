export class createWeatherDto {
    name: string;
    lang: string;
    temperature: number;
    day: string;
    humidity: number;
    pressure: number;
    wind: string;
    windSpeed: number;
}

export class updateWeatherDto {
    temperature: number;
    day: string;
    humidity: number;
    pressure: number;
    wind: string;
    windSpeed: number;
}
