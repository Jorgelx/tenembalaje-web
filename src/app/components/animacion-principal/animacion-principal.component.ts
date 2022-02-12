import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-animacion-principal',
  templateUrl: './animacion-principal.component.html',
  styleUrls: ['./animacion-principal.component.css']
})
export class AnimacionPrincipalComponent implements OnInit {

  animacion1 = false;
  animacion2 = false;
  inicio = 'fade';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.startAnimaciones()
  }

  startAnimaciones() : void {
 this.animacion1 = true;
 const source = timer(1600);
 const subscribe = source.subscribe(val =>  this.animacion2 = true);
 const source2 = timer(2200)
 const subscribe2 = source2.subscribe(val => this.router.navigate(['/inicio',this.inicio] ));
  }

   wait(ms: number) : void{
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }
}
