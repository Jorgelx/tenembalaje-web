import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  goRegistro = false;



  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  registro(): void {
    this.goRegistro = true;
    //Parar 1 segundo para que se vea la animacion de salida.
    const source = timer(600);
    const subscribe = source.subscribe(val => this.router.navigate(['/registro']));

  }
  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario ?? '', this.password ?? '');
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities!;
        this.toastr.success('Bienvenido ' + data.nombreUsuario, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.isLogged = false;
        this.toastr.error('Usuario o contraseña incorrectos', 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

}
