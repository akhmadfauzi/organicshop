import { Component, OnDestroy  } from '@angular/core';
import { ProductService } from '../../product.service';
import { Observable, Subscription, Subject } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';

import { Product } from '../../models/product';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  product$;
  products:Product[];
  subscription: Subscription;
  tableResource :DataTableResource<Product>;
  items: Product[]=[];
  itemCount: number;

  constructor(private _productService: ProductService) {
    this.subscription = this._productService.getAll()
    .subscribe(products=> {
      this.products = products;
      this._initializeTable(products);
    });
  }
  private _initializeTable(products: Product[]){
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({offset:0})
    .then(items=> {
      this.items = items
      console.log(this.items);
    });
    this.tableResource.count()
    .then(count=> this.itemCount = count);
  }
  filter(query: string){
    let filteredProducts = (query) ? 
    this.products
    .filter((p:Product) => p.title.toLowerCase().includes(query.toLowerCase()) ) 
    : this.products;
    
    this._initializeTable(filteredProducts);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

 
}

