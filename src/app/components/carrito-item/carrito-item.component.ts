import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';


@Component({
  selector: 'app-carrito-item',
  templateUrl: './carrito-item.component.html',
  styleUrls: ['./carrito-item.component.css']
})
export class CarritoItemComponent implements OnInit {

  @Input()
  cartItem!: CartItem;
  constructor() { }
  cartItemTotal!: number;


  ngOnInit(): void {
  }



    if(cartItem: any) {
      this.cartItemTotal = cartItem.productPrice * cartItem.qty;

    }
}
