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

    public getInstances(nextUrl: boolean){

        console.log('[Resource Instances] entering getInstances...');
        this.loading = true;

        this.resourceInstancesService.getResourceInstances(nextUrl)
        .subscribe(instances => {
            this.resourceInstances = instances;
/*
            instances.resources.forEach(element => {
                this.resourceInstances.resources.push(element);
                this.resourceInstances.rowCount++;
            });
            this.resourceInstances.nextUrl = instances.nextUrl;
*/            
            console.log('[Resource Instances] in getInstances.subscribe...');
            console.log('[Resource Instances] in getInstances with resources ' + JSON.stringify(this.resourceInstances));
            this.loading = false;

        });
 
    }

    ngOnInit() {

        console.log('[Resource Instances] in ngOnInit...');
        this.loading = true;
/*
        this.resourceInstancesService.fetchInstances()
            .subscribe(data => {
                this.resourceInstances = data;
*/
                if (!this.resourceInstances) {
                    this.resourceInstances = new ResourceInstances();
                    this.resourceInstances.rowCount = 0;
                    this.resourceInstances.resources = [];
                    console.log('[Resource Instances] in ngOnInit with no resource instances yet');
                    this.getInstances(false);
                    
                }
//            });
        
    }

}
