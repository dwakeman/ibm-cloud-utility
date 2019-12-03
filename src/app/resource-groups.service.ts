import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { LocationService } from './location.service';
import { ResourceGroup } from './resource-group';


@Injectable({
  providedIn: 'root'
})
export class ResourceGroupsService {

    resourceGroups: ResourceGroup[];

    constructor(private authService: AuthService, private locationService: LocationService, private http: HttpClient) { }

    public getResourceGroups(): Observable<ResourceGroup[]> {
        if (typeof this.resourceGroups === 'undefined') {
            return this.getGroups()
                .pipe(
                    tap(data => {
                        this.resourceGroups = data;
                    })
                )
        } else {
            return of(this.resourceGroups);
        }
    }

    private getGroups(): Observable<ResourceGroup[]> {

        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.authService.getUserState().authToken.accessToken
            })
        };

        const apiUrl = this.locationService.getApiDomain() + '/resource_groups';
        console.log('[ResourceGroups] - the apiUrl is ' + apiUrl);
        return this.http.get<ResourceGroup[]>(apiUrl, httpOptions)
            .pipe(
                map(data => {
                    console.log('[ResourceGroups] - getGroups with data ' + JSON.stringify(data));

                    const groups = [];
                    data['resources'].forEach(element => {
                        const grp = new ResourceGroup();
                        grp.id = element['id'];
                        grp.name = element['name'];
                        groups.push(grp);
                    });

//                    this.resourceGroups = groups;
                    return groups;
                },
                catchError(this.handleError)

            ));

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
