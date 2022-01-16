
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Imagen } from 'src/app/model/imagen';
import { Product } from 'src/app/model/product';
import { ImagenService } from 'src/app/services/imagen.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-producto-crear',
  templateUrl: './producto-crear.component.html',
  styleUrls: ['./producto-crear.component.css']
})
export class ProductoCrearComponent implements OnInit {
  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;

  imagenSubida: Imagen = null;
  imagen: File;
  imagenMin: File;
  nombre = '';
  nombreEng = '';
  precio: number = null;
  tipo: string = null;
  descripcion: string = null;
  descripcionEng: string = null;
  img: string = null;
  enVenta = false;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private servicio: ProductService,
    private imagenService: ImagenService,
  ) { }


  ngOnInit(): void {
  }


  onCreate(): void {
    if (this.imagen != null) {
      this.onUpload();
      //(nombre: string, nombreEng:string, tipo: string,precio: number,descripcion:string, descripcionEng: string, img: string,enVenta:boolean){
        const producto = new Product(this.nombre, this.nombreEng, this.tipo, this.precio, this.descripcion, this.descripcionEng, this.imagenSubida.imagenUrl, this.enVenta);
      this.servicio.save(producto).subscribe(
        data => {
          this.toastr.success('Producto Creado', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });

          this.router.navigate(['/productos']);
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });

          this.router.navigate(['/productos']);
        }
      ); }
    else {
      const bolsa = new Product(this.nombre, this.nombreEng, this.tipo, this.precio, this.descripcion,this.descripcion, 'https://res.cloudinary.com/doypumiit/image/upload/v1623935766/wfq6yr7mvdidyworvncs.jpg', this.enVenta);
      this.servicio.save(bolsa).subscribe(
        data => {
          this.toastr.success('Producto Creado', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });

          this.router.navigate(['/productos']);
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });

          this.router.navigate(['/productos']);
        }
      );
    }



  }
  onFileChange(event) {
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }

  onUpload(): void {
    this.imagenService.upload(this.imagen).subscribe(
      data => {
        this.imagenSubida = data;
      },
      err => {
        alert(err.error.mensaje);
        this.reset();
      }
    );

  }

  reset(): void {
    this.imagen = null;
    this.imagenMin = null;
    this.imagenFile.nativeElement.value = '';
  }

}
