import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Noticia } from 'src/app/model/noticia';
import { Product } from 'src/app/model/product';
import { Tipo } from 'src/app/model/tipo';
import { NoticiasService } from 'src/app/services/noticias.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-usuario-admin',
  templateUrl: './usuario-admin.component.html',
  styleUrls: ['./usuario-admin.component.css']
})
export class UsuarioAdminComponent implements OnInit {

  noticias : Noticia[] = [];
  tipos: Tipo[] = [];
  products: Product[] = [];
  tipo: any = null;
  idModal: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private noticiasService: NoticiasService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {

    this.cargarNoticias();
    this.cargarProductos();
    this.cargarTipos();
  }

  cargarNoticias(): void {
    this.noticiasService.list().subscribe(
      data => {
        this.noticias = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  crearNoticia(): void {
    this.router.navigate(['/crear-noticia']);
  }



  crearProducto(): void {
    this.router.navigate(['/crear-producto']);
  }

  cargarProductos(): void {
    this.productService.list().subscribe(
      data => {
        this.products = data;
      },
      err => {
        console.log(err);
      }
    )
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

  //BORRAR
  borrarProducto(id: any): void {
    this.productService.borrar(id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        window.location.reload();
        //this.cargarBolsas();

      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  borrarNoticia(id: any): void {
    this.noticiasService.borrar(id).subscribe(
      data => {
        this.toastr.success('Noticia Eliminada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        window.location.reload();
        //this.cargarBolsas();

      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  borrarTipo(id: any): void {
    this.productService.borrarTipo(id).subscribe(
      data => {
        this.toastr.success('Noticia Eliminada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        window.location.reload();
        //this.cargarBolsas();

      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }


  borrarModal(id:any) : void {
    this.idModal = id;
  }

}
