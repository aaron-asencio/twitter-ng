import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { appRoutingProviders } from './app.routes';

import { routing } from './app.routes';

import { AppComponent }  from './app.component';
import { TwitterComponent } from './twitter.component';

import { Logger } from 'angular2-logger/core';
 import {LOG_LOGGER_PROVIDERS} from "angular2-logger/core";


@NgModule({
  imports: [ BrowserModule, routing, FormsModule, HttpModule],
  declarations: [  TwitterComponent, AppComponent],
  providers: [
        appRoutingProviders, Logger, LOG_LOGGER_PROVIDERS
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
