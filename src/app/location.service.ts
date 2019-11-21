import { Injectable, Inject } from '@angular/core';
import { WINDOW } from './window.providers';

@Injectable()
export class LocationService {

    constructor(@Inject(WINDOW) private window: Window) {
    }

    getHostname(): string {
        console.log('the location is ' + JSON.stringify(this.window.location));
        console.log('getting host name now....' + this.window.location.hostname);
        return this.window.location.hostname;

    }

    getApiDomain(): string {
        console.log('the location is ' + JSON.stringify(this.window.location));
        console.log('getting host name now....' + this.window.location.hostname);

//        let tempHostname = 'utility.dev.wakemanco.com';
        let domain = '';

        if (this.window.location.hostname === 'localhost') {
            domain = 'http://localhost:3000';
        } else {
            domain = 'https://utility-api.' + this.window.location.href.substr(this.window.location.href.indexOf('.') + 1 );
        }
        return domain;
//        return this.window.location.hostname;

    }

}
