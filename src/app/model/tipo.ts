export class Tipo {
  id: number;
  tipo: string;
  tipoEng: string;
  descripcion: string;
  descripcionEng: string;
  img: string;

  constructor(tipo: string, tipoEng?:string, descripcion?:string, descripcionEng?:string, img?: string) {
    this.tipo = tipo;
    this.tipoEng = tipoEng;
    this.descripcion = descripcion;
    this.descripcionEng = descripcionEng;
    this.img = img;
  }

}

