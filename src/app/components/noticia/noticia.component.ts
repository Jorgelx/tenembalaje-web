import { Component, Input, OnInit } from '@angular/core';
import { Noticia } from 'src/app/model/noticia';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  @Input()
  noticia: Noticia;
  constructor() { }

  ngOnInit(): void {
  }

}
