import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserState } from '../user-state';
import { ResourceInstances } from '../resource-instances';
import { KpInstancesService } from '../kp-instances.service';
import { ResourceGroupsService } from '../resource-groups.service';
import { ResourceGroup } from '../resource-group';

@Component({
  selector: 'app-keys-home',
  templateUrl: './keys-home.component.html',
  styleUrls: ['./keys-home.component.css']
})
export class KeysHomeComponent implements OnInit {

    @ViewChild('loadingSpinner', {static: false}) loadingSpinner: ElementRef;
    userState: UserState;
    kpInstances: ResourceInstances;
    showPassword: boolean;
    loading: boolean;
    resourceGroups: ResourceGroup[];
    rGroups: object;

    constructor(
        private authService: AuthService,
        private kpInstancesService: KpInstancesService,
        private resourceGroupsService: ResourceGroupsService,
        private router: Router
    ) { }

    public encodeUri(uri: string): string {
        //        console.log('[Resource Instances] entering encodeUri with URI: ' + uri);
                const encodedUri = uri.replace('/', '%2F');
        //        console.log('[Resource Instances] encodedUri: ' + encodedUri);
                return encodeURI(encodedUri);
        }

    public getInstances(nextUrl: boolean) {

        console.log('[KP Instances] entering getInstances...');
        this.loading = true;

        this.kpInstancesService.getResourceInstances(nextUrl)
        .subscribe(instances => {
            this.kpInstances = instances;

            console.log('[KP Instances] in getInstances.subscribe...');
            console.log('[KP Instances] in getInstances with resources ' + JSON.stringify(this.kpInstances));
            this.loading = false;

        });

    }

    ngOnInit() {

        if (!this.resourceGroups) {
            this.resourceGroupsService.getResourceGroups()
                .subscribe(data => {
                    this.resourceGroups = data;
                    console.log('Resource Instances] - in getResourceGroups.subscribe with groups ' + JSON.stringify(this.resourceGroups));

                    this.rGroups = new Object();
                    this.resourceGroups.forEach(element => {
                        this.rGroups[element['id']] = element['name'];
                    });
                    console.log('KP Instances] - in getResourceGroups.subscribe created group mapping ' + JSON.stringify(this.rGroups));

                    if (!this.kpInstances) {
                        this.kpInstances = new ResourceInstances();
                        this.kpInstances.rowCount = 0;
                        this.kpInstances.resources = [];
                        console.log('[KP Instances] in ngOnInit with no resource instances yet');
                        this.getInstances(false);

                    }
                });
        }
    }

}
