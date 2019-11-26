import { Component, OnInit } from '@angular/core';
import { AppInfo } from './app-info';
import { AppInfoService } from './app-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'IBM Cloud Utility';
    appInfo: AppInfo;

    constructor(private appInfoService: AppInfoService) { }



    ngOnInit() {

        this.appInfoService.getAppInfo()
        .subscribe(data => {
            this.appInfo = data;
        })
    }

}
