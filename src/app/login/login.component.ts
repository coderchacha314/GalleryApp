import { Component, OnInit } from '@angular/core';
import { FirebaseAPIService } from '../firebase-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private FirebaseAPI:FirebaseAPIService) {}

  dataTitle = 'Product List';
  products = [
    {
      id: '1',
      name: 'Painting',
      price: '30k',
    },
    {
      id: '2',
      name: 'Hijab',
      price: 'RM 35',
    },
    {
      id: '3',
      name: 'snake Food',
      price: '10$',
    },
  ];

  onAddProduct(id, name, price) {
    this.products.push({
      id: id.value,
      name: name.value,
      price: price.value,
    });
  }

  onSaveProduct(){
    this.FirebaseAPI.saveProducts(this.products).subscribe(
      (Response)=>console.log(Response),
      (error)=>console.log(error)
    )
  }

  onDeleteProduct(id){
if(confirm("Do You Want to Delete Product?")){
  this.products.splice(id,1);
}
  }
  ngOnInit(): void {}
}
