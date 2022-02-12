
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Imagen } from 'src/app/model/imagen';
import { Product } from 'src/app/model/product';
import { ImagenService } from 'src/app/services/imagen.service';
import { ProductService } from 'src/app/services/product.service';
import { timer } from 'rxjs';
import { Tipo } from 'src/app/model/tipo';

@Component({
  selector: 'app-producto-crear',
  templateUrl: './producto-crear.component.html',
  styleUrls: ['./producto-crear.component.css']
})
export class ProductoCrearComponent implements OnInit {
  @ViewChild('imagenInputFile', { static: false }) imagenFile: ElementRef;

  imagenSubida: Imagen = null;
  imagen: File;
  imagenMin: File;
  nombre = '';
  nombreEng = '';
  precio: number = null;
  tipo: string = null;
  tipoEng: string = null;
  descripcion: string = null;
  descripcionEng: string = null;
  img: string = null;
  enVenta = false;
  tipos: Tipo[] = [];
  isNewTipo = false;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private servicio: ProductService,
    private imagenService: ImagenService,
    private productService: ProductService,
  ) { }


  ngOnInit(): void {
    this.cargarTipos();
  }


  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  crearProducto() {

    const producto = new Product(this.nombre, this.nombreEng, this.tipo, this.tipoEng, this.precio, this.descripcion, this.descripcionEng, this.imagenSubida.imagenUrl, this.enVenta);
    this.servicio.save(producto).subscribe(
      data => {
        this.toastr.success('Producto Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });

        this.router.navigate(['/product']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });

      }
    );
  }

  onCreate(): void {
    if (this.imagen != null) {
      this.onUpload();

      this.router.navigate(['/loading']);
      //Parar 6 segundos para obtener respuesta de cloudbinary
      const source = timer(6000);
      const subscribe = source.subscribe(val => this.crearProducto());
    }
    else {
      const product = new Product(this.nombre, this.nombreEng, this.tipo,  this.tipoEng, this.precio, this.descripcion, this.descripcionEng, 'https://res.cloudinary.com/doypumiit/image/upload/v1623935766/wfq6yr7mvdidyworvncs.jpg', this.enVenta);
      this.servicio.save(product).subscribe(
        data => {
          this.toastr.success('Producto Creado', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });

          this.router.navigate(['/product']);
        },
        err => {
          this.toastr.error("Error subiendo el archivo", 'Error', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.router.navigate(['/product']);
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

  cargarTipos(): void {
    this.productService.cargarTipos().subscribe(
      data => {
        this.tipos = data;
      },
      err => {
        console.log(err);
      }
    )
  }
  public onIsNewTipoChanged(value:boolean){
    this.isNewTipo = value;
}
}
