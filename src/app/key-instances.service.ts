import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { LocationService } from './location.service';
import { UserState } from './user-state';
import { Key } from './key';
import { KeyInstances } from './key-instances';

@Injectable({
  providedIn: 'root'
})
export class KeyInstancesService {

    userState: UserState;

    constructor(private authService: AuthService, private locationService: LocationService, private http: HttpClient) { }

    public getKeyInstances(instanceId: string): Observable<KeyInstances> {
        console.log('[KeyInstancesService] - Entering getKeyInstances...');
        console.log('[KeyInstancesService] - In getKeyInstances... instanceId is ' + instanceId);



        const body = {};
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.authService.getUserState().authToken.accessToken
            })
        };

        const apiUrl = this.locationService.getApiDomain() + '/kpinstances/' + instanceId + '/keys';



        console.log('[KeyInstancesService] - in getKeyInstances.... apiUrl is ' + apiUrl);
        return this.http.get<KeyInstances>(apiUrl, httpOptions)
            .pipe(
                map(data => {
                    console.log('[KeyInstancesService] - in map.... data is ' + JSON.stringify(data));
//                        let instances = new ResourceInstances();

                    const keyInstances = new KeyInstances();
                    keyInstances.keys = [];

                    const keyResources = data['resources'];

                    for (let key of keyResources) {
                        const r = new Key();
                        r.id = key['id'];

                        r.name = key['name'];

                        r.type = key['type'];

                        r.state = key['state'];
                        r.crn = key['crn'];

                        r.createdAt = key['creationDate'];
                        r.createdBy = key['createdBy'];
                        r.updatedAt = key['lastUpdateDate'];
                        r.extractable = key['extractable'];
                        r.imported = key['imported'];

                        keyInstances.keys.push(r);

                    }
//                        this.resourceInstances = instances;
                    return keyInstances;
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

/*
{
    "metadata": {
        "collectionType": "application/vnd.ibm.kms.key+json",
        "collectionTotal": 2
    },
    "resources": [
        {
            "id": "d52b23b3-90a5-4267-8139-d299faa758fc",
            "type": "application/vnd.ibm.kms.key+json",
            "name": "kp-key-crk-01",
            "state": 1,
            "crn": "crn:v1:staging:public:kms:us-south:a/b718cf15cf2152978fc211aa00e0fed3:9bb71719-73ca-4533-b95f-356a67f63935:key:d52b23b3-90a5-4267-8139-d299faa758fc",
            "createdBy": "IBMid-110000J6VA",
            "creationDate": "2019-12-20T21:07:14Z",
            "lastUpdateDate": "2019-12-20T21:07:14Z",
            "algorithmMetadata": {
                "bitLength": "256",
                "mode": "CBC_PAD"
            },
            "extractable": false,
            "imported": false,
            "algorithmMode": "CBC_PAD",
            "algorithmBitSize": 256
        },
        {
            "id": "e3ee0b4b-e014-490a-810e-3bc23d01952a",
            "type": "application/vnd.ibm.kms.key+json",
            "name": "dw-test-crk-01",
            "state": 1,
            "crn": "crn:v1:staging:public:kms:us-south:a/b718cf15cf2152978fc211aa00e0fed3:9bb71719-73ca-4533-b95f-356a67f63935:key:e3ee0b4b-e014-490a-810e-3bc23d01952a",
            "createdBy": "IBMid-110000J6VA",
            "creationDate": "2019-12-20T21:07:02Z",
            "lastUpdateDate": "2019-12-20T21:07:02Z",
            "algorithmMetadata": {
                "bitLength": "256",
                "mode": "CBC_PAD"
            },
            "extractable": false,
            "imported": false,
            "algorithmMode": "CBC_PAD",
            "algorithmBitSize": 256
        }
    ]
}
*/