import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { LocationService } from './location.service';
import { AppInfo } from './app-info';


@Injectable({
  providedIn: 'root'
})
export class AppInfoService {

    appInfo: AppInfo;
    

    constructor(private locationService: LocationService, private http: HttpClient) { }


    getAppInfo(): Observable<AppInfo> {

        console.log('[AppInfoService] - Entering getAppInfo...');
        const apiUrl = this.locationService.getApiDomain() + '/info';

        return this.http.get<AppInfo>(apiUrl)
            .pipe(
                map(data => {
                    let appInfo = new AppInfo();
                    appInfo.region = data['region'];
                    appInfo.runtime = data['runtime'];

                    this.appInfo = appInfo;
                    console.log('[AppInfoService] - Exiting getAppInfo...' + JSON.stringify(this.appInfo));
                    return this.appInfo;
                    
                }),
                catchError(this.handleError)
            );
            
        
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
        }    

}
