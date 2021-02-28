import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAPIService {
  constructor(private http: HttpClient) {}

  url = 'https://galleryapp-9acd3-default-rtdb.firebaseio.com/products.json';
  getProducttitleUrl =
    'https://galleryapp-9acd3-default-rtdb.firebaseio.com/dataTitle.json';

  saveProducts(products: any[]) {
    return this.http.put(this.url, products);
  }

  fetchProducts() {
    return this.http.get(this.url);
  }
  getTitle() {
    return this.http.get(this.getProducttitleUrl);
  }
}
