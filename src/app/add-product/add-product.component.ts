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
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private products: DataService) {
    this.myForm = new FormGroup({
      name: new FormControl(null),
      price: new FormControl(null),
      photo: new FormControl(null),
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    const fileReader = new FileReader();
    
    fileReader.onload = (fileReaderEvent) => {
      this.imagePreview = fileReaderEvent.target!.result;
    };
    
    fileReader.readAsDataURL(file);
  }


    onSubmit(): void {
    if (this.myForm.valid) {
      const product = this.myForm.value;
      if (this.imagePreview) {
        product.photo = this.imagePreview; // Set the base64 image data as photo URL
      }
      this.products.addProduct(product);
      this.myForm.reset();
      this.imagePreview = null;
    }
  }

}
