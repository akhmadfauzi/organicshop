import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app.user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  constructor(private _auth: AuthService) {
    _auth.appUser$.subscribe(appUser=> this.appUser = appUser);
  }

  ngOnInit() {

  }

  logout(){
    this._auth.logout();
  }

}
