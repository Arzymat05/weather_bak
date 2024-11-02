export class createWeatherDto {
    name: string;
    lang: string;
    temperature: number;
    day: string;
    humidity: number;
    pressure: number;
    wind: string;
}

export class updateWeatherDto {
    temperature: number;
    day: string;
    humidity: number;
    pressure: number;
    wind: string;
}
