import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map,switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable, of } from '../../node_modules/rxjs';
import { mapChildrenIntoArray } from '../../node_modules/@angular/router/src/url_tree';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private _auth: AuthService, private _userService: UserService) { }

  canActivate() : Observable<boolean>{
    return this._auth.appUser$.pipe(map(appUser=> appUser.isAdmin));
    // .pipe(
    //   switchMap(user=>this._userService.get(user.uid).valueChanges()),
    //   map(appUser=> appUser.isAdmin),
      
    // );
  }
}

