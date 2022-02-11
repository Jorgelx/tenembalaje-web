import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  firstValue : any;
  first = false;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.firstValue = this.route.snapshot.paramMap.get('inicio');
    if(this.firstValue==='fade') {
      this.first = true;
    }
  }
}
