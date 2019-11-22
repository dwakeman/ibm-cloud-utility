import { Component, OnInit } from '@angular/core';
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

    userState: UserState;
    resourceInstances: ResourceInstances;
    showPassword: boolean;

    constructor(private authService: AuthService, private resourceInstancesService: ResourceInstancesService, private router: Router) { }


    ngOnInit() {

        this.authService.getUserState()
            .subscribe(data => {
                this.userState = data;
                this.resourceInstancesService.getResourceInstances()
                .subscribe(instances => this.resourceInstances = instances);
            });
        console.log('[Resource Instances] in ngOnInit with resources ' + JSON.stringify(this.resourceInstances));
    }

}
