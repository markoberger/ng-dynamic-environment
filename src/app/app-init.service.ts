import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  /** config.js file that will contain out environment variables */
  private readonly CONFIG_URL = 'assets/config/config.js';
  private config$: Observable<any>;
  
  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
    ) { }
  
    /**
     * Method for loading configuration
     */
    loadConfiguration(){
      if(this.config$ && environment.production){
        this.config$ = this.http.get(this.CONFIG_URL)
        .pipe(
          shareReplay(1)
        );
      } else {
        this.config$ = of(environment);
      }

      this.environmentService.setEnvironment(this.config$);
      return this.config$;
  }
}
