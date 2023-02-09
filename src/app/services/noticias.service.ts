import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia } from '../model/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  url = "http://localhost:8080/noticias/"

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Noticia[]>{
    return this.httpClient.get<Noticia[]>(this.url + 'lista');
  }

  public save(noticia: Noticia): Observable<any> {
    return this.httpClient.post<any>(this.url + 'crear', noticia);
  }
  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + `borrar/${id}`)
  }
}
