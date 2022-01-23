import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Busqueda } from 'src/app/model/busqueda-dto';
import { Product } from 'src/app/model/product';
import { Tipo } from 'src/app/model/tipo';
import { ProductService } from 'src/app/services/product.service';
import { TokenService } from 'src/app/services/token.service';

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
  isAdmin = false;
  roles: string[];

  constructor(
    private router: Router,
    private productService: ProductService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.cargarTipos();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }


  crear(): void {
    this.router.navigate(['/crear-producto']);
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
    this.productService.listTipo(this.tipo.tipo).subscribe(
      data => {
        this.products = data;
      },
      err => {
        console.log(err);
      }
    )
  }
  cambiarProductos2(tipo2:Tipo) : void {
    this.productService.listTipo(tipo2.tipo).subscribe(
      data => {
        this.products = data;
      },
      err => {
        console.log(err);
      }
    )
  }

}
