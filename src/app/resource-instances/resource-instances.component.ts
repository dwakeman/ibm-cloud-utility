import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserState } from '../user-state';
import { ResourceInstances } from '../resource-instances';
import { ResourceInstancesService } from '../resource-instances.service';

@Component({
  selector: 'app-resource-instances',
  templateUrl: './resource-instances.component.html',
  styleUrls: ['./resource-instances.component.css']
})

export class ResourceInstancesComponent implements OnInit {

    @ViewChild('loadingSpinner', {static: false}) loadingSpinner: ElementRef;
    userState: UserState;
    resourceInstances: ResourceInstances;
    showPassword: boolean;
    loading: boolean;

    constructor(private authService: AuthService, private resourceInstancesService: ResourceInstancesService, private router: Router) { }

    public encodeUri(uri: string): string {
        console.log('[Resource Instances] entering encodeUri with URI: ' + uri);
        const encodedUri = uri.replace('/', '%2F');
        console.log('[Resource Instances] encodedUri: ' + encodedUri);
        return encodeURI(encodedUri);
    };

    public getInstances(nextUrl: boolean){

        console.log('[Resource Instances] entering getInstances...');
        this.loading = true;

        this.resourceInstancesService.getResourceInstances(nextUrl)
        .subscribe(instances => {
            this.resourceInstances = instances;

            console.log('[Resource Instances] in getInstances.subscribe...');
            console.log('[Resource Instances] in getInstances with resources ' + JSON.stringify(this.resourceInstances));
            this.loading = false;

        });

    }

    ngOnInit() {

        console.log('[Resource Instances] in ngOnInit...');
        this.loading = true;

        if (!this.resourceInstances) {
            this.resourceInstances = new ResourceInstances();
            this.resourceInstances.rowCount = 0;
            this.resourceInstances.resources = [];
            console.log('[Resource Instances] in ngOnInit with no resource instances yet');
            this.getInstances(false);

        }

    }

}
