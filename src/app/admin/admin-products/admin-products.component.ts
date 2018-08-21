import { Component, OnDestroy  } from '@angular/core';
import { ProductService } from '../../product.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';

import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  product$;
  products:Product[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private _productService: ProductService) {
    this.subscription = this._productService.getAll()
    .subscribe(products=> this.filteredProducts = this.products = products);
  }

  filter(query: string){
    this.filteredProducts = (query) ? 
    this.products
    .filter((p:Product) => p.title.toLowerCase().includes(query.toLowerCase()) ) 
    : this.products;
    console.log(this.filteredProducts);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

 
}

