import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Token } from './token';
import { UserState } from './user-state';
// import { LocationService } from './location.service';

/*
export interface Token {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    expiration: number;
}
*/
@Injectable({
  providedIn: 'root'
})
export class AuthService {

    userState: UserState;
    token: Token;
    isLoggedUrl = 'http://localhost:3000/token';
//    isLoggedUrl = 'https://iam.cloud.ibm.com/identity/token';

    constructor(private http: HttpClient) {



    }

    public isAuthenticated(): boolean {

        return this.userState.authenticated;
    }

    public getUserState(): Observable<UserState> {
        return of(this.userState);
    }

    public authenticate(apikey: string): Observable<UserState> {
        console.log('[AuthService] - Entering authenticate with API key ' + apikey);
 //       console.log('[AuthService] - The location is ' + this.locationService.getHostname());
        if (typeof this.userState === 'undefined') {
            this.userState = new UserState();
            this.userState.authToken = new Token();
            this.userState.authenticated = false;
        }

        this.getTokenFromKey(apikey)
            .subscribe(data => {
                this.userState.authToken.accessToken = data['access_token'];
                this.userState.authToken.refreshToken = data['refresh_token'];
                this.userState.authToken.expiration = data['expiration'];
                this.userState.authToken.expiresIn = data['expires_in'];
                this.userState.authToken.tokenType = data['token_type'];
                this.userState.authenticated = true;
                console.log('[AuthService] - in authenticate.subscribe with data ' + JSON.stringify(data));
                console.log('[AuthService] - exiting authenticate with userState ' + JSON.stringify(this.userState));

            });
        return of(this.userState);
    }

    getTokenFromKey(apikey: string) {
        console.log('[AuthService] - Entering getTokenFromKey with API key ' + apikey);

        const body = {};
        const httpOptions = {
            headers: new HttpHeaders({
                'x-api-key': apikey
            })
//            withCredentials: true
        };

        return this.http.post(this.isLoggedUrl, body, httpOptions)
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
