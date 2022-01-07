import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  existsCart(): boolean {
    return localStorage.getItem('cart') != null;
  }

  setCart(cart: CartItem[]) : void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): CartItem[] {
  //if(localStorage.getItem('cart') !== null) {
    return JSON.parse(localStorage.getItem('cart') || '{}');
  /*} else {
    return new CartItemModel(new Product(1, 'Error', 'Error', 0, ''));
  }*/

  }

  clear(): void {
    localStorage.removeItem('cart');
  }
}
