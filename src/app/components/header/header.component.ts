import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged = false;
  isAdmin = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
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
   // this.translate.use(lang);
  }
  onLogOut(): void {
    //this.tokenService.logOut();
   // window.location.reload();
  }

}
