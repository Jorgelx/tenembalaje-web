import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  backEndUrl = "http://localhost:8080/"

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.backEndUrl + 'product/list');
  }

}

