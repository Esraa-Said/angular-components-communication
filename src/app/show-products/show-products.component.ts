import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrl: './show-products.component.css',
})
export class ShowProductsComponent implements OnInit {
  products: { name: string; price: number; photo: string }[] = [];

  constructor(private productsData: DataService) {}

  ngOnInit(): void {
    this.productsData.currentProducts.subscribe(
      (products) => (this.products = products)
    );
  }

  deleteProduct(index: number){
    this.products.splice(index, 1);
  }
}
