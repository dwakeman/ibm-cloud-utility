import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserState } from '../user-state';

@Component({
  selector: 'app-utility-home',
  templateUrl: './utility-home.component.html',
  styleUrls: ['./utility-home.component.css']
})
export class UtilityHomeComponent implements OnInit {

    userState: UserState;

    constructor(private authService: AuthService, private router: Router) { }





    ngOnInit() {

///        this.userState = this.authService.getUserState();
        // if not logged in redirect to the login component
        if (typeof this.authService.getUserState() === 'undefined') {
            this.router.navigate(['/login']);
        }
    }

}
