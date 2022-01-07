import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message = new Subject();

  constructor() { }

  sendMessage(product: Product):void {
    this.message.next(product);

  }

  getMessage(): Observable<any> {
    return this.message.asObservable();
  }
}
