import { Component } from '@angular/core';
import { WeatherService } from './weather-service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'], 
  providers: [ WeatherService]
})
export class AppComponent {
  
}
