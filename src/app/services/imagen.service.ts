import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Imagen } from '../model/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  imagenURL = "http://localhost:8080/cloudinary/"

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Imagen[]> {
    return this.httpClient.get<Imagen[]>(this.imagenURL + 'list');
  }

  public img(id: number): Observable<Imagen> {
    return this.httpClient.get<Imagen>(this.imagenURL + `img/${id}`);
  }

  public upload(imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', imagen);
    return this.httpClient.post<any>(this.imagenURL + 'upload', formData);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.imagenURL + `delete/${id}`);
  }

  public imgByUrl(url: string): Observable<Imagen> {
    return this.httpClient.post<any>(this.imagenURL + 'url', url);
  }
}
