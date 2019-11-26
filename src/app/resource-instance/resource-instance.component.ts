import { Component, OnInit, Input } from '@angular/core';
import { Resource } from '../resource';
import { AuthService } from '../auth.service';
import { UserState } from '../user-state';
import { ResourceInstanceService } from '../resource-instance.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-resource-instance',
  templateUrl: './resource-instance.component.html',
  styleUrls: ['./resource-instance.component.css']
})
export class ResourceInstanceComponent implements OnInit {

    resource: Resource;
    userState: UserState;

    constructor(
        private authService: AuthService,
        private resourceInstanceService: ResourceInstanceService,
        private route: ActivatedRoute,
        private location: Location
        ) { }


    goBack(): void {
        this.location.back();
        }

    ngOnInit() {


        const resourceId = this.route.snapshot.paramMap.get('resourceId');


        this.resourceInstanceService.getResourceInstance(resourceId)
        .subscribe(instance => this.resource = instance);

        console.log('[Resource Instance] in ngOnInit with resources ' + JSON.stringify(this.resource));
    }




}
