export class Noticia {

  id?:number;
  titulo: string;
  tituloEng: string;
  subtitulo: string;
  subtituloEng: string;
  texto: string;
  textoEng: string;
  fecha: string;
  img: string;

  constructor(titulo: string, tituloEng:string, subtitulo: string, subtituloEng:string, texto: string, textoEng: string, img: string) {
    this.titulo = titulo;
    this.tituloEng = tituloEng;
    this.subtitulo = subtitulo;
    this.subtituloEng = subtituloEng;
    this.textoEng = textoEng;
    this.img = img;

  }
}
