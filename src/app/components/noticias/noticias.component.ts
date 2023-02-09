import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Noticia } from 'src/app/model/noticia';
import { NoticiasService } from 'src/app/services/noticias.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  noticias : Noticia[] = [];

  isAdmin = false;
  roles: string[];

  constructor(
    private noticiasService: NoticiasService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.cargarNoticias();

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });

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

  crear(): void {
    this.router.navigate(['/crear-noticia']);
  }

}
