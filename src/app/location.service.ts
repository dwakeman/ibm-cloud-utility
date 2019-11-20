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


}
