import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  isLogged = false;
  isAdmin = false;
  nombreUsuario: string;
  roles: string[];

  constructor(
    private tokenService: TokenService,
    private router: Router,

    private translate: TranslateService) {


    }



  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = sessionStorage.getItem("AuthUserName");
    } else {
      this.isLogged = false;
    }
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if(rol === 'ROLE_ADMIN') {
      this.isAdmin =true;
      }
    });
  }

  contacto() {
    this.router.navigate(['/contacto']);
  }
  productos() {
    this.router.navigate(['/product']);
  }
  user() {
    this.router.navigate(['/user']);
  }
  changeLang(lang: string) {
   this.translate.use(lang);
   this.router.navigate(['/']);
  }
  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

}
