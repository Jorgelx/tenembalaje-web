import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  isAdmin = false;
  
  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() : void {
    this.service.list().subscribe(
      data => {
        this.products = data;
      },
      err => {
        console.log(err);
      }
    )
  }
}
