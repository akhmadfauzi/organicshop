import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private _db: AngularFireDatabase) { }

  create(product){
    return this._db.list('/products').push(product);
  }

  getAll(){
    return this._db.list<Product>('/products')
    .snapshotChanges()
    .pipe(
      map(categories=> categories.map(c=> ({
        key:c.key, 
        title: c.payload.val().title,
        category: c.payload.val().category,
        imageUrl: c.payload.val().imageUrl,
        price: c.payload.val().price
      })))
    )
    
  }

  get(productId){
    return this._db.object('/products/'+productId);
  }

  update(productId, product){
    return this._db.object('/products/'+productId).update(product);
  }

  delete(productId){
    this._db.object('/products/'+productId).remove();
  }
}
