import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Tipo } from 'src/app/model/tipo';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-inicio-tipos',
  templateUrl: './inicio-tipos.component.html',
  styleUrls: ['./inicio-tipos.component.css']
})
export class InicioTiposComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private translate: TranslateService,
    private router: Router ) {  }

  tipos: Tipo[] = [];
  langEs= false;
  langEn= false;
  lang: string;
  tipoSelec: string;

  ngOnInit(): void {
    this.cargarTipos();
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


}
