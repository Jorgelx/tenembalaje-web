import { Product } from "./product";

export class CartItem {


  productId!: number | undefined;
  productName!: string;
  productPrice!: number;
  qty: number | undefined;


  constructor(product: Product) {
    this.productId = product.id;
    this.productName = product.nombre;
    this.productPrice = product.precio;
    this.qty = 1;
  }

}
