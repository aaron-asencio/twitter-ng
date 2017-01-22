import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { WeatherReport } from './models/weather-report';
import { Logger } from 'angular2-logger/core';

@Injectable()
export class WeatherService {
    // Resolve HTTP using the constructor
    constructor(private http: Http, private logger: Logger) { }
    private APPID: string = '';

    // private instance variable to hold base url
    private baseUrl = `http://api.openweathermap.org/data/2.5/weather?APPID=${this.APPID}&units=imperial&zip=us,`;
    getWeather(zipcode: string): Observable<WeatherReport> {

        this.logger.log('first log message from log4ng');
        zipcode = '95409';
        //  replace with regex  /(^\d{5}$)/
        if (zipcode && zipcode.length == 5) {
            let result = this.http.get(`${this.baseUrl}${zipcode}`, { headers: this.getHeaders() })
                // ...and calling .json() on the response to return data
                .map((mapWeatherReport))
                //...errors if any
                .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

            return result;
        } else {

        }
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }
}

function mapWeatherReport(response: Response): WeatherReport {
    // toPerson looks just like in the previous example
    return toWeatherReport(response.json());
}

function toWeatherReport(r: any): WeatherReport {
    let weatherReport = <WeatherReport>({
        description: r.weather[0].description,
        icon: r.weather[0].icon,
        temp: r.main.temp,
        temp_max: r.main.temp_max,
        temp_min: r.main.temp_min,
        clouds: r.clouds.all,
        windSpeed: r.wind.speed,
        windDirection: r.wind.deg,
        pressure: r.main.pressure,
        humidity: r.main.humidity,
        name: r.name,
        latitude: r.coord.lon,
        longitude: r.coord.lat


        /*   weather: r.weather,
           base: r.base,
           main: r.main,
           coord: r.coord,
           clouds: r.clouds,
           wind: r.wind,
           */


    });
    return weatherReport;
}


function printkeys(result: any) {
    for (var k in result) {
        if (typeof result[k] !== 'function') {
            alert("Key is " + k + ", value is" + result[k]);
        }
    }
}