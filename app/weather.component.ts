import { Component, OnInit } from '@angular/core';
import { WeatherReport } from './models/weather-report';
import { WeatherService } from './weather-service';
import { routing } from './app.routes';
import { ActivatedRoute, Router } from '@angular/router';

//when @component is present the app won't run
@Component({
    selector: 'weather-app',
    templateUrl: 'app/weather.component.html',
    providers: [WeatherService]
})
export class WeatherComponent implements OnInit {

    weather: WeatherReport;
    zipCode: string;
    sub: any;
    errorMessage: string;
    isLoading: boolean = true;
    submitted: boolean = false;
  
    constructor(private weatherService: WeatherService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {


        this.sub = this.route.params.subscribe(params => {
           
           //set default zip - could use browser coordinates to get default - see angular2-google-map
            let zip = '95409';
            this.weatherService.getWeather(zip).subscribe(
                w => {
                    this.weather = w;
                    this.weather.zip = zip;
                }, e => this.errorMessage = e, () => this.isLoading = false
            );
        });
        this.isLoading = false;
    }

    searchByZip() {

        let zip = this.weather.zip;//store zip in temp
        this.submitted = true;
        this.sub = this.route.params.subscribe(params => {
            if (this.weather.zip && this.weather.zip.length == 5) {
                  this.weatherService.getWeather(this.weather.zip).subscribe(
                    w => {
                        this.weather = w;
                        this.weather.zip = zip;
                    }, e => {this.errorMessage = e; console.log('error: '+ e)}, () => this.isLoading = false
                );
            }
        });

    }

   

}