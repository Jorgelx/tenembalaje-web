import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(    
    private router:Router
    ) { }

  ngOnInit(): void {
  }
  contacto() {
    this.router.navigate(['/contacto']);
    window.scrollTo(0, 0);
  }
  productos() {
    this.router.navigate(['/productos']);
    window.scrollTo(0, 0);
  }
}

