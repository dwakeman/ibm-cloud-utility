import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Token } from './token';
import { UserState } from './user-state';
import { LocationService } from './location.service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

    userState: UserState;
    token: Token;

    constructor(private locationService: LocationService, private http: HttpClient) {

    }

    public isAuthenticated(): boolean {

        return this.userState.authenticated;
    }

    public getUserState(): UserState {
        return this.userState;
    }

    public authenticate(apikey: string): Observable<UserState> {
        console.log('[AuthService] - Entering authenticate with API key ' + apikey);
        console.log('[AuthService] - The location is ' + this.locationService.getHostname());
        console.log('[AuthService] - The domain is ' + this.locationService.getApiDomain());

        const body = {};
        const httpOptions = {
            headers: new HttpHeaders({
                'x-api-key': apikey
            })
//            withCredentials: true
        };
        const url = this.locationService.getApiDomain() + '/token';
        console.log('[AuthService] - The domain is ' + url);

        return this.http.post<UserState>(url, body, httpOptions)
        .pipe(
            map(data => {
                const userState = new UserState();
                userState.authToken = new Token();
                userState.authenticated = false;
                userState.authToken.accessToken = data['access_token'];
                userState.authToken.refreshToken = data['refresh_token'];
                userState.authToken.expiration = data['expiration'];
                userState.authToken.expiresIn = data['expires_in'];
                userState.authToken.tokenType = data['token_type'];
                userState.authenticated = true;
                this.userState = userState;
                return userState;

            }),
            catchError(this.handleError)
        );
    }





    /*
    public authenticate(apikey: string): Observable<UserState> {
        console.log('[AuthService] - Entering authenticate with API key ' + apikey);
        console.log('[AuthService] - The location is ' + this.locationService.getHostname());
        console.log('[AuthService] - The domain is ' + this.locationService.getApiDomain());
//        if (typeof this.userState === 'undefined') {
//            this.userState = new UserState();
//            this.userState.authToken = new Token();
//            this.userState.authenticated = false;
//        }

        const tempUserState = new Observable<UserState>;
        this.getTokenFromKey(apikey)
            .subscribe(data => {
                let userState = new UserState();
                userState.authToken = new Token();
                userState.authenticated = false;
                userState.authToken.accessToken = data['access_token'];
                userState.authToken.refreshToken = data['refresh_token'];
                userState.authToken.expiration = data['expiration'];
                userState.authToken.expiresIn = data['expires_in'];
                userState.authToken.tokenType = data['token_type'];
                userState.authenticated = true;
                this.userState = userState;
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
