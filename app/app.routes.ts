import { Routes, RouterModule } from '@angular/router';
import { TwitterComponent } from './twitter.component';

import { AppComponent } from './app.component';

// Route config let's you map routes to components
const routes: Routes = [
 
  {
    path: 'tweets',
    component: TwitterComponent,
  },
  // map '/' to '/tweets' as our default route
  {
    path: '',
    redirectTo: '/tweets',
    pathMatch: 'full'
  },
];

export const routing = RouterModule.forRoot(routes);
//attempt to resolve routing error
export const appRoutingProviders: any[] = [];
