import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AppInfo } from './app-info';
import { AppInfoService } from './app-info.service';
import { AuthService } from './auth.service';
import { UserState } from './user-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {

    title = 'IBM Cloud Utility';
    appInfo: AppInfo;
    userState: UserState;
    isAuthenticated: boolean;

    constructor(private appInfoService: AppInfoService, private authService: AuthService) { }

    ngAfterViewChecked() {
        console.log('[AppComponent] - ngAfterViewChecked....');
//        this.userState = this.authService.getUserState();
//        this.isAuthenticated = this.userState.authenticated;
    }

    ngOnInit() {
        console.log('[AppComponent] - ngOnInit....');
/*
        this.isAuthenticated = false;
        this.userState = this.authService.getUserState();
*/
        this.appInfoService.getAppInfo()
        .subscribe(data => {
            this.appInfo = data;
        });

    }

}
