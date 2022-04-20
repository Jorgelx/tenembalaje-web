import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  roles: string[];
  isUser = false;
  tipoSelect: string;
  conTipo: boolean;

  constructor(
    private tokenService: TokenService,
    private route: ActivatedRoute
    ) {
   }

  ngOnInit(): void {
    //JORGE - Prueba tipos:
    this.tipoSelect = this.route.snapshot.paramMap.get('tipoSelec');

    if(this.tipoSelect != null) {
      this.conTipo = true;
    }

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_USER') {
        this.isUser = true;
      }
    });

  }


}
