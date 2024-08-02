import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  myForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  fileValid: Boolean = true;
  constructor(private products: DataService) {
    this.myForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.pattern('^[0-9]*[.,]?[0-9]'),
      ]), // Allows numbers with optional decimal
      photo: new FormControl(null, [Validators.required]),
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];

    const validExtensions = ['image/png', 'image/jpeg', 'image/gif'];
    this.fileValid = validExtensions.includes(file.type);
    console.log(this.fileValid)
    // image
    if (this.fileValid) {
      const fileReader = new FileReader();
      fileReader.onload = (fileReaderEvent) => {
        this.imagePreview = fileReaderEvent.target!.result;
      };
      fileReader.readAsDataURL(file);
    }
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
