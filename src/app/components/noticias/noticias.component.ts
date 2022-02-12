import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/model/noticia';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  noticias : Noticia[] = [];


  constructor(
    private noticiasService: NoticiasService
  ) { }

  ngOnInit(): void {
    this.cargarNoticias();
  }


  cargarNoticias(): void {
    this.noticiasService.list().subscribe(
      data => {
        this.noticias = data;
      },
      err => {
        console.log(err);
      }
    )
  }

}
