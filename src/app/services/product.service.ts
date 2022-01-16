import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { Tipo } from '../model/tipo';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = "http://localhost:8080/"

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.url + 'product/list');
  }

  public cargarTipos(): Observable<Tipo[]>{
    return this.httpClient.get<Tipo[]>(this.url + 'product/tipos');
  }

  public listTipo(tipo:string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url + `product/tipo/`+tipo)
  }
}

