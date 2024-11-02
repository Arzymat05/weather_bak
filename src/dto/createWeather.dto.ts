export class createWeatherDto {
    name: string;
    lang: string;
    temperature: number;
    day: string;
    humidity: string;
    pressure: number;
    wind: string;
}

export class updateWeatherDto {
    temperature: number;
    humidity: string;
    pressure: number;
    wind: string;
}
