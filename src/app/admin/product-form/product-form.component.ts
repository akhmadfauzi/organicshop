import { Component } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import {take, map} from 'rxjs/operators';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product={};
  id;
  constructor(
    private _router: Router,
    private _categoryService: CategoryService, 
    private _productService: ProductService,
    private _route: ActivatedRoute
  ) { 
    
    this.categories$ = this._categoryService.getCategories();
    this.id = this._route.snapshot.paramMap.get('id');
    if (this.id) {
      this._productService
      .get(this.id)
      .snapshotChanges()
      .pipe(take(1))
      .subscribe(p=>{
        this.product = p.payload.val();
      });
    }
  }

  save(product){
    if (this.id) this._productService.update(this.id,product);
    else this._productService.create(product);
    this._router.navigate(['/admin/products']);
  }

  delete(id){
    // console.log(id)
    if (confirm('Are you sure you want to delete this product?')) {
      this._productService.delete(id);
      this._router.navigate(['/admin/products']);
    }
  }

}
