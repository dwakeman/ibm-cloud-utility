import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserState } from './user-state';
import { ResourceInstances } from './resource-instances';
import { Resource } from './resource';

@Injectable({
  providedIn: 'root'
})

export class ResourceInstancesService {

    userState: UserState;
    resourceInstances: ResourceInstances;

    constructor(private authService: AuthService, private http: HttpClient) { }


    public getResourceInstances(): Observable<ResourceInstances> {
        console.log('[ResourceInstancesService] - Entering getResourceInstances...');

        this.authService.getUserState()
            .subscribe(user => {
                this.userState = user;
                console.log('[ResourceInstancesService] - User State...' + JSON.stringify(this.userState));

                this.resourceInstances = new ResourceInstances();

                this.getInstances()
                    .subscribe(data => {
                        console.log('[ResourceInstancesService] - instances...' + JSON.stringify(data));
                        this.resourceInstances.nextUrl = data['next_url'];
                        this.resourceInstances.rowCount = data['rows_count'];
                        const dataResources = data['resources'];

                        const resources = [];

                        for (let resource of dataResources) {
                            const r = new Resource();
                            r.id = resource['id'];
                            r.guid = resource['guid'];
                            r.name = resource['name'];
                            r.url = resource['url'];
                            r.type = resource['type'];
                            r.region = resource['region_id'];
                            r.state = resource['state'];
                            resources.push(r);
                        }

                        this.resourceInstances.resources = resources;
                        console.log('[ResourceInstancesService] - in getResourceInstances.subscribe with data ' + JSON.stringify(data));
                    });



            });
/*
        const resourceInstances = new ResourceInstances();

        this.getInstances()
            .subscribe(data => {
                this.resourceInstances.nextUrl = data['next_url'];
                this.resourceInstances.rowCount = data['rows_count'];
                const dataResources = data['resources'];

                const resources = [];

                for (let resource of dataResources) {
                    const r = new Resource();
                    r.id = resource['id'];
                    resources.push(r);
                }

                resourceInstances.resources = resources;
                console.log('[ResourceInstancesService] - in getResourceInstances.subscribe with data ' + JSON.stringify(data));
            });
*/
//        console.log('[ResourceInstancesService] - exiting authenticate with userState ' + JSON.stringify(this.userState));

        return of(this.resourceInstances);

    }



    getInstances() {
        console.log('[ResourceInstancesService] - Entering getInstances...');

//        const userState = this.authService.getUserState();

        const body = {};
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.userState.authToken.accessToken
//                'x-api-key': ''
            })
//            withCredentials: true
        };

        return this.http.get('http://localhost:3000/instances/', httpOptions)
            .pipe(
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
