import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { Imagen } from 'src/app/model/imagen';
import { Noticia } from 'src/app/model/noticia';
import { ImagenService } from 'src/app/services/imagen.service';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-crear-noticia',
  templateUrl: './crear-noticia.component.html',
  styleUrls: ['./crear-noticia.component.css']
})
export class CrearNoticiaComponent implements OnInit {
  @ViewChild('imagenInputFile', { static: false }) imagenFile: ElementRef;
  titulo: string;
  tituloEng: string;
  subtitulo: string;
  subtituloEng: string;
  texto: string;
  textoEng: string;
  fecha: string;
  img: string;
  noticia: Noticia;

  imagenSubida: Imagen = null;
  imagen: File;
  imagenMin: File;


  constructor(
    private imagenService: ImagenService,
    private toastr: ToastrService,
    private router: Router,
    private servicio: NoticiasService
    ) { }

  ngOnInit(): void {
  }

  crearNoticia() : void {
    const noticia = new Noticia(this.titulo, this.tituloEng, this.subtitulo, this.subtituloEng,  this.texto, this.textoEng, this.imagenSubida.imagenUrl);
    this.servicio.save(noticia).subscribe(
      data => {
        this.toastr.success('Noticia creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });

        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error("Error subiendo el archivo", 'Error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }

    );

  }


  crear():void {

    if (this.imagen != null) {
      this.onUpload();

      this.router.navigate(['/loading']);
      //Parar 6 segundos para obtener respuesta de cloudbinary
      const source = timer(6000);
      const subscribe = source.subscribe(val => this.crearNoticia());
    }
    else {
      //https://res.cloudinary.com/doypumiit/image/upload/v1623935766/wfq6yr7mvdidyworvncs.jpg
      const noticia = new Noticia(this.titulo, this.tituloEng, this.subtitulo,  this.subtituloEng, this.texto, this.textoEng, this.img);
      this.servicio.save(noticia).subscribe(
        data => {
          this.toastr.success('Noticia Creado', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });

          this.router.navigate(['/']);
        },
        err => {
          this.toastr.error("Error subiendo el archivo", 'Error', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.router.navigate(['/']);
        }

      );
    }
  }



  //Imagen
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
