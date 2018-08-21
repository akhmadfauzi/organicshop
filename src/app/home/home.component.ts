import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories$;
  products$;
  
  constructor(
    private _productsService: ProductService,
    private _categoryService: CategoryService,
    private _route : ActivatedRoute,
    private _router : Router
  ) { 
    this.categories$ = this._categoryService.getCategories();
    this.products$ = this._productsService.getAll();
  }
  
  
  ngOnInit() {
  }

}
