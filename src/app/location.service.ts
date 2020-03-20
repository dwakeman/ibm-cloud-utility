import { Injectable, Inject } from '@angular/core';
import { WINDOW } from './window.providers';

@Injectable()
export class LocationService {

    constructor(@Inject(WINDOW) private window: Window) {
    }

    getHostname(): string {
//        console.log('the location is ' + JSON.stringify(this.window.location));
//        console.log('getting host name now....' + this.window.location.hostname);
        return this.window.location.hostname;

    }

    getApiDomain(): string {
        console.log('[LocationService] - in getApiDomain.... the location is ' + JSON.stringify(this.window.location));
        console.log('[LocationService] - getting host name now....' + this.window.location.hostname);

        let domain = '';

        if (this.window.location.hostname === 'localhost') {
            domain = 'http://localhost:3000';
        } else {
            domain = 'https://utility-api-service'
    //        domain = 'https://utility-api.' + this.window.location.hostname.substr(this.window.location.hostname.indexOf('.') + 1 );
        }

        console.log('[LocationService] - returning domain (this should be the kubernetes service name!!): ' + domain);
        return domain;
//        return this.window.location.hostname;

    }

}
