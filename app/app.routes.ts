import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './weather.component';

import { AppComponent } from './app.component';

// Route config let's you map routes to components
const routes: Routes = [
  // map '/weather' to the weather component
  {
    path: 'weather',
    component: WeatherComponent,
  },
  // map '/' to '/weather' as our default route
  {
    path: '',
    redirectTo: '/weather',
    pathMatch: 'full'
  },
];

export const routing = RouterModule.forRoot(routes);
//attempt to resolve routing error
export const appRoutingProviders: any[] = [];
