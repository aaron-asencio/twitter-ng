export interface WeatherReport {
    description: string;
    icon: string;
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    clouds: number;
    windSpeed: number;
    windDirection: number;
    name: string;
    latitude: number;
    longitude: number;
    zip: string;
}