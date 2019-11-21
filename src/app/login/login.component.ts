import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
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

    @ViewChild('inputApiKey', {static: false}) inputApiKey: ElementRef;
    @Input() apiKey: string;

    userState: UserState;
    headers: string[];
    error: any;
    showPassword: boolean;

    constructor(private authService: AuthService, private router: Router) { }

    logUserState() {
        console.log('[Login] - In logUserState with userState ' + JSON.stringify(this.userState));
    }

    public togglePassword() {
        if (this.showPassword) {
            this.showPassword = false;
            this.inputApiKey.nativeElement.setAttribute('type', 'text');
        } else {
            this.showPassword = true;
            this.inputApiKey.nativeElement.setAttribute('type', 'password');
        }
    }
    ngOnInit() {
        this.showPassword = false;
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
