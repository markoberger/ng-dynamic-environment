import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { AppInitService } from './app-init.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {
      // This is where the magic happens. NOTE we are returning an Observable and converting it to Promise
      // IMPORTANT It has to be a Promise 
      provide: APP_INITIALIZER,
      useFactory: (appInit: AppInitService) => () => appInit.loadConfiguration().toPromise(),
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
