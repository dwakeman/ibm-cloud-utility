import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { LocationService } from './location.service';
import { UserState } from './user-state';
import { Resource } from './resource';

@Injectable({
  providedIn: 'root'
})
export class ResourceInstanceService {

    userState: UserState;
    resource: Resource;

    constructor(private authService: AuthService, private locationService: LocationService, private http: HttpClient) { }

    public getResourceInstance(id: string): Observable<Resource> {
        console.log('[ResourceInstanceService] - Entering getResourceInstance...');
/*
        this.authService.getUserState()
            .subscribe(user => {
                this.userState = user;
                console.log('[ResourceInstanceService] - User State...' + JSON.stringify(this.userState));
*/
        this.resource = new Resource();

        const body = {};
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.authService.getUserState().authToken.accessToken
            })
        };

        const apiUrl = this.locationService.getApiDomain() + '/v2/resource_instances/' + id;
        console.log('[ResourceInstanceService] - in getInstance.... apiUrl is ' + apiUrl);
        return this.http.get(apiUrl, httpOptions)
            .pipe(
                map(data => {
                    let resource = new Resource();
                    resource.id = data['id'];
                    resource.guid = data['guid'];
                    resource.name = data['name'];
                    resource.url = data['url'];
                    resource.type = data['type'];
                    resource.region = data['region_id'];
                    resource.state = data['state'];
                    resource.dashboardUrl = data['dashboard_url'];
                    return resource;
                }),
                catchError(this.handleError)
            );

    }


/*
    getInstance(id: string) {
        console.log('[ResourceInstanceService] - Entering getInstance...');

//        const userState = this.authService.getUserState();

        const body = {};
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.userState.authToken.accessToken
//                'x-api-key': ''
            })
//            withCredentials: true
        };

        const apiUrl = this.locationService.getApiDomain() + '/v2/resource_instances/' + id;
        console.log('[ResourceInstanceService] - in getInstance.... apiUrl is ' + apiUrl);
        return this.http.get(apiUrl, httpOptions)
            .pipe(
                catchError(this.handleError)
            );

    }
*/
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
