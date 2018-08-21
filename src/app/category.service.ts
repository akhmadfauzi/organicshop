import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../node_modules/angularfire2/database';
import { toArray, map,switchMap } from '../../node_modules/rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private _db: AngularFireDatabase) { }

  getCategories(){
    return this._db.list('/categories', ref => ref.orderByChild('name'))
    .snapshotChanges()
    .pipe(
      map(categories=>
        categories.map(c=> ({key:c.key, item: c.payload.val()})
      )))
  }
}
