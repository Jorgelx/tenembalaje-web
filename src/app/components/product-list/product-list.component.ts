import { Component, Input, OnInit } from '@angular/core';
import { Busqueda } from 'src/app/model/busqueda-dto';
import { Product } from 'src/app/model/product';
import { Tipo } from 'src/app/model/tipo';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  tipo: any = null;
  busqueda: Busqueda = {
    tipo: '',
    precio: null
  };
  tipos: Tipo[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.cargarTipos();
  }


  loadProducts(): void {
    this.productService.list().subscribe(
      data => {
        this.products = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  cargarTipos(): void {
    this.productService.cargarTipos().subscribe(
      data => {
        this.tipos = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  cambiarProductos() : void {
    console.log(this.tipo.tipo);

    this.productService.listTipo(this.tipo.tipo).subscribe(
      data => {
        this.products = data;
      },
      err => {
        console.log(err);
      }
    )
  }
}
