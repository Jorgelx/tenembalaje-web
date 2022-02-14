import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'ngb-modal';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ignoreElements } from 'rxjs';
import { CartItem } from 'src/app/model/cart-item';
import { Product } from 'src/app/model/product';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private storageService: StorageService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) { }

  cartItems = [] as any;
  total = 0;

  public payPalConfig?: IPayPalConfig;
  numeroCarritoLocal: string;
  numeroCarrito: number;


  ngOnInit(): void {
    this.initConfig();
    if (this.storageService.existsCart()) {
      this.cartItems = this.storageService.getCart();
    }
    this.getItem();
    this.total = this.getTotal();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: environment.clientId,
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: this.getTotal().toString(),
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: this.getTotal().toString()
              }
            }
          },
          items: this.getItemsList()
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        this.spinner.show();
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point',
        JSON.stringify(data));
        this.openModal(
          data.purchase_units[0].items,
          data.purchase_units[0].amount.value
        );
        this.emptyCart();
        this.spinner.hide();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }

  getItem(): void {
    this.messageService.getMessage().subscribe((product: Product) => {
      let exists = false;
      this.cartItems.forEach((item: { productId: number; qty: number; }) => {
        if (item.productId === product.id) {
          exists = true;
          item.qty++;
        }

      });
      if (!exists) {
        const cartItem = new CartItem(product);
        this.cartItems.push(cartItem);
      }
      this.total = this.getTotal();
      this.storageService.setCart(this.cartItems);
      console.log(this.getNumeroCarrito)
      localStorage.setItem('carrito', this.getNumeroCarrito());
    });
  }

  getItemsList(): any[] {
    const items: any[] = [];
    let item = {};
    this.cartItems.forEach((it: CartItem )=> {
     item = {
      name: it.productName,
      quantity: it.qty,
      unit_amount: {value: it.productPrice, currency_code: 'EUR'}
     };
     items.push(item);
    });
    return items;
  }

  getTotal(): number {
    let total = 0;
    this.cartItems.forEach((item: { qty: number; productPrice: number; }) => {
      total += item.qty * item.productPrice;
    });
    return +total.toFixed(2);
  }

  getNumeroCarrito() : string {
    let numero = 0;
    this.cartItems.forEach((item: { qty: number; }) => {
      numero += item.qty;
      this.numeroCarritoLocal = numero.toString();
    });

return this.numeroCarritoLocal;
  }
  emptyCart(): void {
    this.cartItems = [];
    this.total = 0;
    this.storageService.clear();
    localStorage.removeItem('carrito');
  }
  deleteItem(i: number): void {
    if (this.cartItems[i].qty > 1) {
      this.cartItems[i].qty--;
    } else {
      this.cartItems.splice(i, 1);
    }
   this.numeroCarrito = Number(this.numeroCarritoLocal) -1;
   this.numeroCarritoLocal = this.numeroCarrito.toString();
    this.total = this.getTotal();
    this.storageService.setCart(this.cartItems);
    localStorage.setItem('carrito', this.getNumeroCarrito());

  }

  openModal(items: any, amount: any): void {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.items = items;
    modalRef.componentInstance.amount = amount;
  }
}
