import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  myForm!: FormGroup;
  constructor(private products: DataService) {
    this.myForm = new FormGroup({
      name: new FormControl(null),
      price: new FormControl(null),
      photo: new FormControl(null),
    });
  }

  onSubmit() {
    console.log('s');
    const product = this.myForm.value;
    if (product.name && product.price && product.photo) {
      this.products.addProduct(product);
      this.myForm.reset();
    }
  }
}
