import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Product } from 'src/app/model/product';
import { MessageService } from 'src/app/services/message.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input()
  product: Product;
  isUser = false;
  lang: string;
  langEs: boolean;
  langEn: boolean;
  roles: string[];
  constructor(
    private service: ProductService,
    private messageService: MessageService,
    private translate: TranslateService,
    private tokenService: TokenService
    ) { }

  ngOnInit(): void {
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

this.roles =
this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_USER') {
        this.isUser = true;
      }
    });

  }


  addToCart(): void {
    console.log("Sending...")
    this.messageService.sendMessage(this.product);
  }
}
