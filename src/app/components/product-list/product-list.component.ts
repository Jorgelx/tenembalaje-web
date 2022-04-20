import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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

  @Input()
  tipoSelectIni!: string;

  products: Product[] = [];
  tipo: any = null;
  busqueda: Busqueda = {
    tipo: '',
    precio: null
  };
  tipos: Tipo[] = [];
  isAdmin = false;
  roles: string[];
  isSelected = false;
  lang: string;
  langEs: boolean;
  langEn: boolean;
  tipoSelect: any;

  constructor(
    private router: Router,
    private productService: ProductService,
    private tokenService: TokenService,
    private translate: TranslateService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {


    this.loadProducts();
    this.cargarTipos();
    if(this.tipoSelectIni){
      this.tipo = new Tipo(this.tipoSelectIni);
      this.cambiarProductos2(this.tipo);
    }

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });

    this.lang = this.translate.currentLang;
    if(this.lang == null){
    this.lang = this.translate.defaultLang;
    }
    if(this.lang=='es'){
      this.langEs=true;
    }
    if(this.lang=='en') {
      this.langEn=true;
    }
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
        this.isSelected = true;
      },
      err => {
        console.log(err);
      }
    )
  }

  reload():void {
    window.location.reload();
  }

}
