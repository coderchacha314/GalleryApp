import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FirebaseAPIService } from '../firebase-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private FirebaseAPI: FirebaseAPIService) {}

  dataTitle = this.FirebaseAPI.getTitle();
  fetchingData = false;
  @ViewChild('id') id!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('price') price!: ElementRef;
  products: any = [];
  editMode = false;
  editIndex: any;

  onAddProduct(id: any, name: any, price: any) {
    if (this.editMode) {
      this.products[this.editIndex] = {
        id: id.value,
        name: name.value,
        price: price.value,
      };
      this.editMode = false;
      this.id.nativeElement.value = '';
      this.name.nativeElement.value = '';
      this.price.nativeElement.value = '';
    } else {
      this.products.push({
        id: id.value,
        name: name.value,
        price: price.value,
      });
    }
  }

  onSaveProduct() {
    this.FirebaseAPI.saveProducts(this.products).subscribe(
      (Response) => Response,
      (error) => console.log(error)
    );
  }

  onFetchProduct() {
    this.fetchingData = true;
    this.FirebaseAPI.fetchProducts().subscribe(
      (Response) => {
        const data = JSON.stringify(Response);
        this.products = JSON.parse(data);
        this.fetchingData = false;
      },
      (error) => console.log(error)
    );
  }

  onDeleteProduct(id: any) {
    if (confirm('Do You Want to Delete Product?')) {
      this.products.splice(id, 1);
    }
    this.onSaveProduct();
  }

  onEditProduct(index: number) {
    this.editMode = true;
    this.editIndex = index;
    console.log(this.products[index]);
    this.id.nativeElement.value = this.products[index].id;
    this.name.nativeElement.value = this.products[index].name;
    this.price.nativeElement.value = this.products[index].price;
  }

  ngOnInit(): void {
    this.onFetchProduct();
  }
}
