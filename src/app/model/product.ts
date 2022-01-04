export class Product {

  id?:number;
  nombre: string;
  nombreEng: string;
  tipo: string;
  precio: number;
  descripcion:string;
  descripcionEng: string;
  img: string;
  enVenta:boolean;

constructor(nombre: string, nombreEng:string, tipo: string,precio: number,descripcion:string, descripcionEng: string, img: string,enVenta:boolean){
  this.nombre = nombre;
  this.nombreEng = nombreEng;
  this.tipo = tipo;
  this.precio = precio;
  this.descripcion = descripcion;
  this.descripcionEng = descripcionEng;
  this.img = img;
  this.enVenta = enVenta;

}
}
