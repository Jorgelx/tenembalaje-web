import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia } from '../model/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  url = "http://localhost:8080/"

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Noticia[]>{
    return this.httpClient.get<Noticia[]>(this.url + 'noticias/lista');
  }

}
