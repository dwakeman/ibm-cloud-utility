import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserState } from '../user-state';
import { KeyInstances } from '../key-instances';
import { KeyInstancesService } from '../key-instances.service';

@Component({
  selector: 'app-keys-list',
  templateUrl: './keys-list.component.html',
  styleUrls: ['./keys-list.component.css']
})
export class KeysListComponent implements OnInit {

    @ViewChild('loadingSpinner', {static: false}) loadingSpinner: ElementRef;
    userState: UserState;
    keyInstances: KeyInstances;
    showPassword: boolean;
    loading: boolean;


    constructor(
        private authService: AuthService,
        private keyInstancesService: KeyInstancesService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router
    ) { }

    public encodeUri(uri: string): string {
    //        console.log('[Keys List] entering encodeUri with URI: ' + uri);
            const encodedUri = uri.replace('/', '%2F');
    //        console.log('[Keys List] encodedUri: ' + encodedUri);
            return encodeURI(encodedUri);
    }

    public getInstances(instanceId: string) {

        console.log('[Keys List] entering getInstances...');
        this.loading = true;

        this.keyInstancesService.getKeyInstances(instanceId)
        .subscribe(instances => {
            this.keyInstances = instances;

            console.log('[Keys List] in getInstances.subscribe...');
            console.log('[Keys List] in getInstances with resources ' + JSON.stringify(this.keyInstances));
            this.loading = false;

        });

    }

    goBack(): void {
        this.location.back();
    }

    ngOnInit() {
        console.log('[Keys List] in ngOnInit...');
        this.loading = true;

        const instanceId = this.route.snapshot.paramMap.get('instanceId');

        this.getInstances(instanceId);



    }

}
