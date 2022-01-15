import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { MessageService } from 'src/app/services/message.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input()
  product: Product;
  isAdmin = false;

  constructor(
    private service: ProductService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }


  addToCart(): void {
    console.log("Sending...")
    this.messageService.sendMessage(this.product);
  }
}
