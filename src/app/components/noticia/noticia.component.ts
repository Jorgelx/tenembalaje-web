import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Noticia } from 'src/app/model/noticia';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  @Input()
  noticia: Noticia;
  langEs= false;
  langEn= false;
  lang: string;
  constructor(  private translate: TranslateService) {
   }

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

  }

}
