import { Injectable } from '@angular/core';
import { AngularFireAuth } from '../../node_modules/angularfire2/auth';
import * as firebase from 'firebase/app'
import { Observable, of } from '../../node_modules/rxjs';
import { ActivatedRoute } from '../../node_modules/@angular/router';
import { AppUser } from './models/app.user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  
  constructor(
    // if the type of the parameters are omitted, 
    //will throw an error Can't resolve all parameters for [called class name]
    private _afAuth: AngularFireAuth, 
    private _route: ActivatedRoute, 
    private _userService: UserService 
  ) {
    this.user$ = _afAuth.authState;
  }

  login(){
    let returnUrl = this._route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this._afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this._afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return  this.user$.pipe(switchMap(user=>{
      if(user) return this._userService.get(user.uid).valueChanges()

      return of(null);
    }))
  }
}
