import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAPIService {
  constructor(private http: HttpClient) {}

  url = 'https://galleryapp-9acd3-default-rtdb.firebaseio.com/products.json';

  saveProducts(products: any[]) {
   return this.http.put(this.url, products);
  }
}
