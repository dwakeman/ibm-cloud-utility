import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { LocationService } from './location.service';
import { UserState } from './user-state';
import { ResourceInstances } from './resource-instances';
import { Resource } from './resource';


@Injectable({
  providedIn: 'root'
})

export class ResourceInstancesService {

    userState: UserState;
    resourceInstances: ResourceInstances;

    constructor(private authService: AuthService, private locationService: LocationService, private http: HttpClient) { }

    public fetchInstances(): Observable<ResourceInstances> {
        return of(this.resourceInstances);
    }

    public getResourceInstances(nextUrl: boolean): Observable<ResourceInstances> {
        console.log('[ResourceInstancesService] - Entering getResourceInstances...');
        console.log('[ResourceInstancesService] - In getResourceInstances...  nextUrl is '+ nextUrl);

        if (this.resourceInstances && !nextUrl) {
            return of(this.resourceInstances);

        } else {  // Either this is the first time being called or the next set of instances has been requested

            // If this is the first time initialize resourceInstances
            if (typeof this.resourceInstances === "undefined") {
                this.resourceInstances = new ResourceInstances();
                this.resourceInstances.rowCount = 0;
                this.resourceInstances.resources = [];
            }

            const body = {};
            const httpOptions = {
                headers: new HttpHeaders({
                    Authorization: 'Bearer ' + this.authService.getUserState().authToken.accessToken
                })
            };

            let apiUrl = '';

            if (nextUrl) {
                apiUrl = this.locationService.getApiDomain() + this.resourceInstances.nextUrl;
            } else {
                apiUrl = this.locationService.getApiDomain() + '/v2/resource_instances?type=service_instance';
            }

            console.log('[ResourceInstancesService] - in getInstances.... apiUrl is ' + apiUrl);
            return this.http.get<ResourceInstances>(apiUrl, httpOptions)
                .pipe(
                    map(data => {
                        console.log('[ResourceInstancesService] - in map.... data is ' + JSON.stringify(data));
//                        let instances = new ResourceInstances();

                        this.resourceInstances.nextUrl = data['next_url'];
//                        this.resourceInstances.rowCount = data['rows_count'];
//                        instances.resources = [];
                        const dataResources = data['resources'];

                        for (let resource of dataResources) {
                            const r = new Resource();
                            r.id = resource['id'];
                            r.guid = resource['guid'];
                            r.name = resource['name'];
                            r.accountId = resource['account_id'];
                            r.url = resource['url'];
                            r.type = resource['type'];
                            r.region = resource['region_id'];
                            r.state = resource['state'];
                            r.crn = resource['crn'];
                            r.targetCrn = resource['target_crn'];
                            r.dashboardUrl = resource['dashboard_url'];
                            r.aliasesUrl = resource['resource_aliases_url'];
                            r.bindingsUrl = resource['resource_bindings_url'];
                            r.keysUrl = resource['resource_keys_url'];
                            r.resourceGroupId = resource['resource_group_id'];
                            r.createdAt = resource['created_at'];
                            r.createdBy = resource['created_by'];
                            r.updatedAt = resource['updated_at'];
                            r.updatedBy = resource['updated_by'];
                            r.deletedAt = resource['deleted_at'];
                            r.deletedBy = resource['deleted_by'];
                            this.resourceInstances.resources.push(r);
                            this.resourceInstances.rowCount++;
                        }
//                        this.resourceInstances = instances;
                        return this.resourceInstances;
                    },

                    catchError(this.handleError)
                ));

        }

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
