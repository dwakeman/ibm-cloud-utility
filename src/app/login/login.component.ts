import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserState } from '../user-state';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    @Input() apiKey: string;

    userState: UserState;
    headers: string[];
    error: any;

    constructor(private authService: AuthService, private router: Router) { }

    logUserState() {
        console.log('[Login] - In logUserState with userState ' + JSON.stringify(this.userState));
    }


    ngOnInit() {
//        this.apiKey = 'test';
    }

    getAuthToken(apikey: string) {
        console.log('[Login] - Entering getAuthToken with API Key ' + this.apiKey);
        this.authService.authenticate(this.apiKey)
            .pipe(first())
            .subscribe((data: UserState) => {
                this.userState = data;
                console.log('[Login] - Exiting getAuthToken with userState ' + JSON.stringify(this.userState));
                this.router.navigate(['/home']);
                console.log('[Login] - Exiting getAuthToken after navigation.... Should never see this!');
            });

    }

}
